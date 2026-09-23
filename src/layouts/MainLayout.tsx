import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import ScrollToTop from '../components/ScrollToTop';
import PitPassBanner from '../components/PitPassBanner';
import { motion, useScroll } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] font-sans text-white antialiased">
      <ScrollToTop />
      <CommandPalette />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress, willChange: 'transform' }}
      />
      <Navbar />
      <main className="w-full pt-[68px] flex-1 flex flex-col relative overflow-hidden">
        <PitPassBanner />
        {children}
      </main>
      <Footer />
    </div>
  );
}
