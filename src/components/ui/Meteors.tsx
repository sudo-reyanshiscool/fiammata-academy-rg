import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface MeteorConfig {
  id: number;
  /** Relative starting x (0 to 1 of canvas width) */
  originXRatio: number;
  /** Relative starting y (0 to 1 of canvas height) */
  originYRatio: number;
  /** Angle in degrees (e.g. 215 = traveling toward bottom-left) */
  angleDeg: number;
  /** Size multiplier (affects radius, tail length, sparks) */
  scale: number;
  /** Base tail length in pixels at scale 1.0 */
  baseTailLength: number;
  /** Core glow radius in pixels at scale 1.0 */
  baseGlowRadius: number;
  /** Scroll sensitivity: how much scroll affects its advance */
  scrollFactor: number;
  /** Idle drift speed in px per 60fps frame */
  idleSpeed: number;
  /** Initial progress offset along path in pixels */
  initialOffset: number;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  decay: number;
}

export interface MeteorsProps {
  /** Number of meteors to render (defaults to 4 distinct realistic bolides) */
  number?: number;
  /** Custom container class */
  className?: string;
  /** Position mode: 'absolute' (covers parent container) or 'fixed' (viewport fixed) */
  mode?: 'absolute' | 'fixed';
  /** Global scroll responsiveness multiplier (default 1.0) */
  scrollSensitivity?: number;
  /** Ambient idle drift multiplier (default 1.0) */
  idleSpeedMultiplier?: number;
}

// 4 curated, distinct meteor trajectories with varying depths, angles, and speeds
const METEOR_PRESETS: MeteorConfig[] = [
  {
    id: 1,
    originXRatio: 0.88,
    originYRatio: -0.06,
    angleDeg: 216,
    scale: 1.15, // Foreground lead bolide (largest, richest details)
    baseTailLength: 480,
    baseGlowRadius: 54,
    scrollFactor: 1.25,
    idleSpeed: 0.38,
    initialOffset: 60,
  },
  {
    id: 2,
    originXRatio: 0.62,
    originYRatio: -0.12,
    angleDeg: 208,
    scale: 0.88, // Midground atmospheric piercer
    baseTailLength: 370,
    baseGlowRadius: 40,
    scrollFactor: 0.90,
    idleSpeed: 0.30,
    initialOffset: 240,
  },
  {
    id: 3,
    originXRatio: 1.06,
    originYRatio: 0.14,
    angleDeg: 224,
    scale: 0.68, // Deep background stratosphere comet
    baseTailLength: 290,
    baseGlowRadius: 28,
    scrollFactor: 0.55,
    idleSpeed: 0.22,
    initialOffset: 420,
  },
  {
    id: 4,
    originXRatio: 0.78,
    originYRatio: 0.28,
    angleDeg: 212,
    scale: 0.95, // Horizon tracer, sweeping across lower hero/mid-screen
    baseTailLength: 390,
    baseGlowRadius: 44,
    scrollFactor: 1.05,
    idleSpeed: 0.34,
    initialOffset: 120,
  },
];

export const Meteors: React.FC<MeteorsProps> = ({
  number = 4,
  className,
  mode = 'absolute',
  scrollSensitivity = 1.0,
  idleSpeedMultiplier = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Active meteors configuration sliced to requested count (max 4)
    const activePresets = METEOR_PRESETS.slice(0, Math.min(number, METEOR_PRESETS.length));

    // Runtime state per meteor: progress distance, particle sparks
    const meteorStates = activePresets.map((preset) => {
      const rad = (preset.angleDeg * Math.PI) / 180;
      const dirX = Math.cos(rad);
      const dirY = Math.sin(rad);
      return {
        ...preset,
        rad,
        dirX,
        dirY,
        revX: -dirX,
        revY: -dirY,
        normX: -dirY,
        normY: dirX,
        progress: preset.initialOffset,
        embers: [] as Ember[],
      };
    });

    let targetScrollY = window.scrollY;
    let smoothedScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handling with high-DPI crispness
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    // Render loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      // Smooth scroll lerping for silky inertia
      const scrollDelta = targetScrollY - smoothedScrollY;
      smoothedScrollY += scrollDelta * 0.08;
      const scrollStep = smoothedScrollY - lastScrollY;
      lastScrollY = smoothedScrollY;

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Global composite for photorealistic additive incandescent glow
      ctx.globalCompositeOperation = 'lighter';

      const diagonal = Math.hypot(width, height) + 600;

      meteorStates.forEach((m) => {
        // Calculate advance: idle constant drift + scroll-driven progression
        if (!prefersReducedMotion) {
          const idleDelta = m.idleSpeed * idleSpeedMultiplier * (dt * 60);
          const scrollAdvance = scrollStep * m.scrollFactor * scrollSensitivity;
          m.progress += idleDelta + scrollAdvance;
        }

        // Seamless wrap around when it leaves the bottom-left boundary
        if (m.progress > diagonal) {
          m.progress -= diagonal;
        } else if (m.progress < 0) {
          m.progress += diagonal;
        }

        // Coordinate along trajectory
        const startX = m.originXRatio * width;
        const startY = m.originYRatio * height;
        const headX = startX + m.dirX * m.progress;
        const headY = startY + m.dirY * m.progress;

        const tailLength = m.baseTailLength * m.scale;
        const glowRadius = m.baseGlowRadius * m.scale;
        const coreRadius = 4.2 * m.scale;

        // Skip drawing if completely out of viewport margin
        const margin = tailLength + glowRadius + 100;
        if (
          headX < -margin ||
          headX > width + margin ||
          headY < -margin ||
          headY > height + margin
        ) {
          return;
        }

        // ==========================================
        // 1. ABLATION EMBERS / SHEDDING SPARKS
        // ==========================================
        if (!prefersReducedMotion && Math.random() < 0.35 * m.scale) {
          // Spawn new spark behind the head
          const spread = (Math.random() - 0.5) * (coreRadius * 1.8);
          m.embers.push({
            x: headX + m.normX * spread,
            y: headY + m.normY * spread,
            vx: m.revX * (m.idleSpeed * 2.5 + Math.random() * 2.0) + m.normX * (Math.random() - 0.5) * 1.2,
            vy: m.revY * (m.idleSpeed * 2.5 + Math.random() * 2.0) + m.normY * (Math.random() - 0.5) * 1.2,
            size: (1.2 + Math.random() * 1.8) * m.scale,
            life: 1.0,
            maxLife: 1.0,
            decay: 0.018 + Math.random() * 0.02,
          });
        }

        // Update and draw embers
        for (let i = m.embers.length - 1; i >= 0; i--) {
          const ember = m.embers[i];
          ember.x += ember.vx;
          ember.y += ember.vy;
          ember.vx *= 0.96; // Atmospheric drag
          ember.vy *= 0.96;
          ember.life -= ember.decay;

          if (ember.life <= 0) {
            m.embers.splice(i, 1);
            continue;
          }

          const alpha = Math.max(0, ember.life);
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size * alpha, 0, Math.PI * 2);

          // Color shift: bright gold -> Fiammata crimson -> fading smoke
          if (ember.life > 0.6) {
            ctx.fillStyle = `rgba(255, 235, 170, ${alpha * 0.9})`;
          } else if (ember.life > 0.3) {
            ctx.fillStyle = `rgba(255, 90, 20, ${alpha * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(230, 0, 126, ${alpha * 0.6})`;
          }
          ctx.fill();
        }

        // ==========================================
        // 2. TAIL: LAYER 1 - OUTER IONIZATION ENVELOPE (Tapered Wake)
        // ==========================================
        const tailTipX = headX + m.revX * tailLength;
        const tailTipY = headY + m.revY * tailLength;

        // Shock expansion point at ~30% behind the head
        const midDist = tailLength * 0.32;
        const midX = headX + m.revX * midDist;
        const midY = headY + m.revY * midDist;

        const wHead = coreRadius * 2.2;
        const wMid = coreRadius * 3.6; // Supersonic atmospheric expansion
        const wTip = 0.5;

        const outerGrad = ctx.createLinearGradient(headX, headY, tailTipX, tailTipY);
        outerGrad.addColorStop(0, 'rgba(255, 140, 40, 0.45)');
        outerGrad.addColorStop(0.18, 'rgba(230, 0, 126, 0.32)');
        outerGrad.addColorStop(0.55, 'rgba(180, 0, 25, 0.16)');
        outerGrad.addColorStop(1, 'rgba(120, 0, 15, 0)');

        ctx.beginPath();
        // Left flank
        ctx.moveTo(headX + m.normX * wHead, headY + m.normY * wHead);
        ctx.lineTo(midX + m.normX * wMid, midY + m.normY * wMid);
        ctx.lineTo(tailTipX + m.normX * wTip, tailTipY + m.normY * wTip);
        // Right flank
        ctx.lineTo(tailTipX - m.normX * wTip, tailTipY - m.normY * wTip);
        ctx.lineTo(midX - m.normX * wMid, midY - m.normY * wMid);
        ctx.lineTo(headX - m.normX * wHead, headY - m.normY * wHead);
        ctx.closePath();

        ctx.fillStyle = outerGrad;
        ctx.fill();

        // ==========================================
        // 3. TAIL: LAYER 2 - PLASMA CORE SHEATH
        // ==========================================
        const plasmaGrad = ctx.createLinearGradient(headX, headY, tailTipX, tailTipY);
        plasmaGrad.addColorStop(0, 'rgba(255, 255, 240, 0.95)');
        plasmaGrad.addColorStop(0.08, 'rgba(255, 195, 60, 0.88)');
        plasmaGrad.addColorStop(0.26, 'rgba(255, 65, 0, 0.72)');
        plasmaGrad.addColorStop(0.60, 'rgba(230, 0, 126, 0.42)');
        plasmaGrad.addColorStop(1, 'rgba(140, 0, 20, 0)');

        const innerWHead = coreRadius * 1.3;
        const innerWMid = coreRadius * 1.8;

        ctx.beginPath();
        ctx.moveTo(headX + m.normX * innerWHead, headY + m.normY * innerWHead);
        ctx.lineTo(midX + m.normX * innerWMid, midY + m.normY * innerWMid);
        ctx.lineTo(tailTipX, tailTipY);
        ctx.lineTo(midX - m.normX * innerWMid, midY - m.normY * innerWMid);
        ctx.lineTo(headX - m.normX * innerWHead, headY - m.normY * innerWHead);
        ctx.closePath();

        ctx.fillStyle = plasmaGrad;
        ctx.fill();

        // ==========================================
        // 4. TAIL: LAYER 3 - INCANDESCENT THERMAL SPINE (Razor Core)
        // ==========================================
        const spineLength = tailLength * 0.65;
        const spineTipX = headX + m.revX * spineLength;
        const spineTipY = headY + m.revY * spineLength;

        const spineGrad = ctx.createLinearGradient(headX, headY, spineTipX, spineTipY);
        spineGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        spineGrad.addColorStop(0.25, 'rgba(255, 245, 190, 0.85)');
        spineGrad.addColorStop(0.60, 'rgba(255, 150, 40, 0.45)');
        spineGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(headX + m.normX * (coreRadius * 0.5), headY + m.normY * (coreRadius * 0.5));
        ctx.lineTo(spineTipX, spineTipY);
        ctx.lineTo(headX - m.normX * (coreRadius * 0.5), headY - m.normY * (coreRadius * 0.5));
        ctx.closePath();

        ctx.fillStyle = spineGrad;
        ctx.fill();

        // ==========================================
        // 5. SUPERSONIC BOW SHOCK WAVE (Compression Front)
        // ==========================================
        const shockApexDist = coreRadius * 1.4;
        const apexX = headX + m.dirX * shockApexDist;
        const apexY = headY + m.dirY * shockApexDist;
        const shockSpread = coreRadius * 2.8;
        const shockBack = coreRadius * 1.6;

        ctx.beginPath();
        ctx.moveTo(
          apexX + m.normX * shockSpread + m.revX * shockBack,
          apexY + m.normY * shockSpread + m.revY * shockBack
        );
        ctx.quadraticCurveTo(
          apexX,
          apexY,
          apexX - m.normX * shockSpread + m.revX * shockBack,
          apexY - m.normY * shockSpread + m.revY * shockBack
        );
        ctx.strokeStyle = 'rgba(255, 240, 210, 0.45)';
        ctx.lineWidth = 1.4 * m.scale;
        ctx.stroke();

        // ==========================================
        // 6. ATMOSPHERIC CORONAL GLOW BLOOM (Head Halo)
        // ==========================================
        const haloGrad = ctx.createRadialGradient(headX, headY, 0, headX, headY, glowRadius);
        haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        haloGrad.addColorStop(0.12, 'rgba(255, 200, 70, 0.65)');
        haloGrad.addColorStop(0.35, 'rgba(230, 0, 126, 0.35)');
        haloGrad.addColorStop(0.75, 'rgba(160, 0, 25, 0.12)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(headX, headY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // ==========================================
        // 7. INCANDESCENT NUCLEUS (White-Hot Core)
        // ==========================================
        const coreGrad = ctx.createRadialGradient(headX, headY, 0, headX, headY, coreRadius);
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.6, '#FFF4D0');
        coreGrad.addColorStop(1, '#FF7A00');

        ctx.beginPath();
        ctx.arc(headX, headY, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [number, scrollSensitivity, idleSpeedMultiplier]);

  return (
    <div
      ref={containerRef}
      className={cn(
        mode === 'fixed'
          ? 'fixed inset-0 pointer-events-none z-[2] overflow-hidden'
          : 'absolute inset-0 pointer-events-none z-0 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default Meteors;
