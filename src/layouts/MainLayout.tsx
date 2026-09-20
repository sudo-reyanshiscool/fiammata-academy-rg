import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import CommandPalette from '../components/CommandPalette';
import ScrollToTop from '../components/ScrollToTop';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] font-sans text-white antialiased md:cursor-none [&_*]:md:cursor-none">
      <ScrollToTop />
      <CustomCursor />
      <CommandPalette />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <main className="w-full pt-[68px] flex-1 flex flex-col relative overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
