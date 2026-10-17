'use client';

import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { allExamples } from './aivideo.data';
import FlowLines from './FlowLines';
import Hero from './Hero';
import About from './About';
import WorkSection from './WorkSection';
import Contact from './Contact';
import VideoLightbox from './VideoLightbox';

/**
 * Holds the one piece of shared state: which video is open full screen.
 * Both the hero card and every work card open the same viewer, and its
 * arrows walk the whole page in order.
 */
export default function Portfolio() {
  const [open, setOpen] = useState<number | null>(null);
  const openExample = (id: string) => setOpen(allExamples.findIndex((a) => a.example.id === id));

  // reducedMotion="user": framer's entrances respect the OS setting, as the
  // CSS animations, the lines and the rotator already do.
  return (
    <MotionConfig reducedMotion="user">
      {/* Soft light on the off-white ground, behind the lines. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(28% 30% at 0% 0%, rgba(255,190,175,0.35) 0%, rgba(255,190,175,0) 70%)',
        }}
      />
      <FlowLines />

      <div className="relative z-[1]">
        <Hero onOpen={openExample} />
        <main>
          <About />
          <WorkSection onOpen={openExample} />
        </main>
        <Contact />
      </div>

      {open !== null && (
        <VideoLightbox items={allExamples} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </MotionConfig>
  );
}
