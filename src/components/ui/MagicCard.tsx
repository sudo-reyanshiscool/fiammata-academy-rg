import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import { useState } from 'react';

type MagicCardProps = {
  children: ReactNode;
  className?: string;
};

/** A restrained adaptation of Magic UI's cursor-following Magic Card. */
export default function MagicCard({ children, className = '' }: MagicCardProps) {
  const [active, setActive] = useState(false);
  const [point, setPoint] = useState({ x: '50%', y: '50%' });

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPoint({ x: `${event.clientX - bounds.left}px`, y: `${event.clientY - bounds.top}px` });
  }

  const style = {
    '--magic-card-x': point.x,
    '--magic-card-y': point.y,
  } as CSSProperties;

  return (
    <div
      className={`magic-card ${active ? 'is-active' : ''} ${className}`}
      style={style}
      onPointerMove={movePointer}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(false);
      }}
    >
      {children}
    </div>
  );
}
