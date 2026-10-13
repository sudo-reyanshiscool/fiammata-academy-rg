import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Workshops() {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const downloadIcs = (title: string, description: string, location: string, filename: string) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fiammata Academy//Workshops//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'DTSTART:20270402T090000Z',
      'DTEND:20270402T110000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(filename);
    setTimeout(() => setDownloaded(null), 3000);
  };

  const workshopSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationEvent",
        "@id": "https://fiammata-academy-rg.vercel.app/workshops#masterclass",
        "name": "Fiammata In-Person STEM Masterclass",
        "description": "An elite, hands-on masterclass covering enterprise portfolio scaling, project management, and aerodynamic car optimization.",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": "Genesis Global School",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Noida",
            "addressRegion": "UP",
            "addressCountry": "IN"
          }
        },
        "organizer": {
          "@type": "EducationalOrganization",
          "name": "Fiammata Academy",
          "url": "https://fiammata-academy-rg.vercel.app/"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-09-01"
        },
        "performer": [
          { "@type": "Person", "name": "Swastik Katiyar" },
          { "@type": "Person", "name": "Shaurea Vardhan" },
          { "@type": "Person", "name": "Vedant Jain" }
        ]
      },
      {
        "@type": "EducationEvent",
        "@id": "https://fiammata-academy-rg.vercel.app/workshops#enterprise-basics",
        "name": "Enterprise Portfolio Basics (Virtual Workshop)",
        "description": "Foundational workshop on structuring a high-scoring enterprise portfolio and pitching sponsors for STEM competitions.",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "organizer": {
          "@type": "EducationalOrganization",
          "name": "Fiammata Academy",
          "url": "https://fiammata-academy-rg.vercel.app/"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "performer": {
          "@type": "Person",
          "name": "Swastik Katiyar"
        }
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#000000] min-h-screen text-white pt-16 pb-24 px-6 sm:px-8">
      {/* JSON-LD Schema for Workshops */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopSchema) }}
      />

      <div className="max-w-[1140px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/30 mb-4 shadow-[0_0_20px_rgba(237,109,5,0.2)]">
            <span className="material-symbols-outlined text-[15px]">event_upcoming</span>
            Hands-on Learning Sessions
          </span>
          <h1 className="font-display-hero text-4xl sm:text-[54px] tracking-tight font-extrabold mb-4 uppercase leading-none">
            Fiammata <span className="text-primary">Workshops</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed font-sans max-w-2xl">
            Join our free interactive masterclasses and virtual sessions designed to help student teams design, engineer, and pitch championship-caliber portfolios.
          </p>
        </div>

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Main In-Person Workshop (Large Bento Tile, 2 cols) */}
          <div className="bg-[#0c0c0e] rounded-2xl p-7 sm:p-9 border border-white/10 shadow-lg flex flex-col justify-between hover:border-primary/50 hover:shadow-[0_0_35px_rgba(237,109,5,0.2)] transition-all group relative overflow-hidden md:col-span-2">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-bl-full pointer-events-none blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded text-[11px] uppercase tracking-widest font-bold bg-primary/15 text-primary border border-primary/30 shadow-sm">
                  <span className="material-symbols-outlined text-[15px] mr-1.5">school</span>
                  In-Person • Genesis Global School
                </div>
                <span className="text-[11px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded border border-brand-green/20">
                  100% Free
                </span>
              </div>

              <h2 className="font-display-hero text-[28px] sm:text-[34px] font-extrabold text-white mb-2 uppercase tracking-wide">
                Fiammata Masterclass
              </h2>
              <p className="text-[13px] uppercase tracking-widest text-primary font-bold mb-4">
                Lead Instructors: Swastik Katiyar, Shaurea Vardhan, Vedant Jain
              </p>
              <p className="text-[15px] text-white/80 mb-6 font-sans leading-relaxed max-w-xl">
                An elite, hands-on masterclass covering everything from enterprise portfolio scaling and project management to aerodynamic car optimization and CAD modeling.
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Aerodynamics Testing', 'Budget & Sponsorship Pitching', 'Portfolio Architecture', 'GGS Club Hours'].map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 text-[13px] font-medium text-white/80">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-brand-green">calendar_month</span>
                  <span>Every Friday during Club Periods</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-[12px]">
                  <span className="material-symbols-outlined text-[15px]">location_on</span>
                  <span>Genesis Global School Campus</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadIcs(
                  'Fiammata In-Person Masterclass',
                  'Fiammata Academy Hands-on Masterclass at Genesis Global School.',
                  'Genesis Global School, Noida',
                  'fiammata-masterclass'
                )}
                className="min-h-[44px] px-5 py-2.5 rounded bg-primary hover:bg-primary/90 text-white font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                aria-label="Add Fiammata Masterclass to calendar"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {downloaded === 'fiammata-masterclass' ? 'check' : 'calendar_add_on'}
                </span>
                {downloaded === 'fiammata-masterclass' ? 'Calendar Event Saved!' : 'Add to Calendar'}
              </motion.button>
            </div>
          </div>

          {/* Virtual Workshop (1 col) */}
          <div className="bg-[#0c0c0e] rounded-2xl p-7 border border-white/10 shadow-lg flex flex-col justify-between hover:border-primary/50 hover:shadow-[0_0_30px_rgba(237,109,5,0.15)] transition-all group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-bold bg-white/5 text-white/80 border border-white/10 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-[14px] mr-1">videocam</span>
                  Virtual Session
                </span>
                <span className="text-[11px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-2.5 py-0.5 rounded border border-brand-green/20">
                  Free
                </span>
              </div>

              <h2 className="font-display-hero text-[22px] font-extrabold text-white mb-2 uppercase tracking-wide">
                Enterprise Portfolio Basics
              </h2>
              <p className="text-[12px] uppercase tracking-widest text-primary font-bold mb-4">
                Host: Swastik Katiyar
              </p>
              <p className="text-[14px] text-white/80 mb-6 font-sans leading-relaxed">
                Learn the core frameworks of structuring an award-winning Enterprise Portfolio: team identity, financial planning, and ROI for sponsors.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-[12px] text-white/70">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                  <span>National Award-Winning Methodology</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/70">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                  <span>Live Q&A + Feedback</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5 mt-auto flex items-center justify-between gap-2">
              <span className="text-[12px] uppercase tracking-widest text-white/60 font-semibold">
                Dates TBA
              </span>
              <a
                href="/ask-an-expert"
                className="min-h-[44px] px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                aria-label="Request notification for Virtual Workshop"
              >
                <span>Notify Me</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

