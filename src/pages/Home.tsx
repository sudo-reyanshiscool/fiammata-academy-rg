import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ClipboardList, Cog, Handshake, Mic2, Trophy } from 'lucide-react';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';

const disciplines = [
  {
    number: '01',
    title: 'Engineering & car',
    description: 'D&E Portfolio, CAD topology and CFD optimisation.',
    details: 'CFD aerodynamics · CAD tolerances · D&E rubric',
    icon: Cog,
  },
  {
    number: '02',
    title: 'Enterprise',
    description: 'Enterprise Portfolio, sponsorship and brand pitching.',
    details: 'Sponsorship pitch · Branding kit · Budgeting',
    icon: Handshake,
  },
  {
    number: '03',
    title: 'Project management',
    description: 'PM Portfolio, Gantt timelines and risk matrices.',
    details: 'Gantt milestones · Risk mitigation · Scrum roles',
    icon: ClipboardList,
  },
  {
    number: '04',
    title: 'Presentation',
    description: '10-minute verbal presentation and judge Q&A prep.',
    details: 'Judge Q&A · Script cadence · Stage presence',
    icon: Mic2,
  },
];

const metrics = [
  { value: '50+', title: 'Student teams coached', detail: 'Across national & regional STEM rounds' },
  { value: '100%', title: 'Community access', detail: 'Free mentorship, no barriers' },
  { value: '100%', title: 'World Finalist judges', detail: 'Trusted by real World Finalist judges' },
  { value: '<24h', title: 'Pit-wall response', detail: 'Rapid review turnaround for teams' },
];

export default function Home() {
  return (
    <div className="academy-home">
      <section className="academy-hero">
        <div className="academy-wrap academy-hero-grid">
          <div className="academy-hero-copy">
            <div className="academy-kicker"><span className="academy-kicker-dot" /> Free STEM Racing mentorship</div>
            <h1>Engineer your<br /><em>podium finish.</em></h1>
            <p className="academy-hero-lede">
              Find the right Fiammata mentor to strengthen your engineering, portfolio and presentation—from people who have been through the challenge themselves.
            </p>
            <div className="academy-hero-actions">
              <Link to="/find-a-mentor" className="academy-button academy-button-pink">Meet the mentors <ArrowRight size={18} /></Link>
              <Link to="/ask-an-expert" className="academy-text-link">Ask an expert <ArrowUpRight size={16} /></Link>
            </div>
            <div className="academy-hero-proof">
              <div className="academy-proof-avatars" aria-hidden="true"><span>S</span><span>V</span><span>N</span><span>R</span></div>
              <div><strong>Built from real competition experience</strong><span>National finalists · World finalists · World Finalist judges</span></div>
            </div>
          </div>

          <div className="academy-hero-visual">
            <div className="academy-photo-frame">
              <img src="/images/team_celebration.jpg" alt="Fiammata Racing team celebrating together" />
              <div className="academy-photo-wash" />
              <div className="academy-photo-caption"><span>FIAMMATA RACING</span><strong>Learn from experience.<br />Build it yourself.</strong></div>
              <span className="academy-photo-index">01 / THE TEAM</span>
            </div>
            <div className="academy-award-note"><span className="academy-award-mark"><Trophy size={21} /></span><span><strong>National runner-up</strong><small>A team that knows the journey</small></span></div>
          </div>
        </div>
        <a className="academy-scroll-hint" href="#story"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      </section>

      <section className="academy-cred-strip" aria-label="Academy impact">
        <div className="academy-wrap academy-cred-grid">
          {metrics.map(({ value, title, detail }) => <div className="academy-cred" key={title}><strong className="academy-metric-value">{value}</strong><span><b>{title}</b><small>{detail}</small></span></div>)}
        </div>
      </section>

      <section className="academy-story" id="story">
        <div className="academy-wrap academy-story-grid">
          <div className="academy-section-heading">
            <span className="academy-eyebrow">01 — Why Fiammata Academy</span>
            <h2>Beyond<br />the track.</h2>
          </div>
          <div className="academy-story-copy">
            <p className="academy-story-intro">Fiammata Academy is built from the battle-tested experience we've gained through our own STEM Racing journey.</p>
            <p>We are an elite, high-performance STEM Racing team combining cutting-edge engineering with sustainability-focused innovation. Now, we share what we have learned with teams taking on the challenge next.</p>
            <Link to="/workshops" className="academy-inline-link">Explore workshops <ArrowUpRight size={16} /></Link>
          </div>
          <figure className="academy-story-image"><img src="/images/team_award.jpg" alt="Fiammata Racing team with their national award" /><figcaption>Fiammata Racing · National Finals</figcaption></figure>
          <div className="academy-story-stat"><span>From the pit wall<br />to your team.</span><strong>01<span>/</span>01</strong></div>
        </div>
      </section>

      <section className="academy-disciplines" id="disciplines">
        <div className="academy-wrap">
          <div className="academy-section-topline"><span className="academy-eyebrow">02 — Where we can help</span><p>Tailored guidance across every judged portfolio criterion, car design regulation and verbal presentation.</p></div>
          <h2 className="academy-section-title">One team.<br /><em>Every discipline.</em></h2>
          <div className="academy-discipline-grid">
            {disciplines.map(({ number, title, description, details, icon: Icon }) => <Link to="/find-a-mentor" className="academy-discipline" key={number}>
              <span className="academy-discipline-number">{number}</span><Icon className="academy-discipline-icon" size={25} strokeWidth={1.6} /><h3>{title}</h3><p>{description}</p><small>{details}</small><span className="academy-discipline-arrow"><ArrowUpRight size={18} /></span>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="academy-roster" id="mentors">
        <div className="academy-wrap">
          <div className="academy-section-topline"><span className="academy-eyebrow">03 — People who have done it</span><p>Mentored by National Finalists, World Finalists and active World Finalist judges. <b>Always 100% free.</b></p></div>
          <div className="academy-roster-heading"><h2>Meet the<br /><em>Fiammata roster.</em></h2><Link to="/find-a-mentor" className="academy-button academy-button-outline">View all mentors <ArrowRight size={17} /></Link></div>
          <div className="academy-mentor-grid">
            {mentors.map((mentor, index) => <motion.div key={mentor.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.06 }}><MentorCard mentor={mentor} layout="home" /></motion.div>)}
          </div>
        </div>
      </section>

      <section className="academy-cta">
        <div className="academy-wrap academy-cta-inner">
          <span className="academy-eyebrow">Your next lap starts here</span>
          <h2>Ready to<br /><em>accelerate?</em></h2>
          <div className="academy-cta-side"><p>Connect directly with national finalists, world finalists and active world finalist judges who have walked the walk and built winning portfolios.</p><Link to="/find-a-mentor" className="academy-button academy-button-dark">Find your mentor <ArrowRight size={18} /></Link></div>
        </div>
      </section>
    </div>
  );
}
