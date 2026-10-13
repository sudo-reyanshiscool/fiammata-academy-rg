import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';

interface MentorCardProps {
  mentor: Mentor;
  layout?: 'home' | 'directory';
}

export default function MentorCard({ mentor, layout = 'home' }: MentorCardProps) {
  const useMonogram = !mentor.image || mentor.image.includes('ui-avatars.com');
  const initials = mentor.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  const portrait = useMonogram
    ? <span className="academy-mentor-monogram" aria-hidden="true">{initials}</span>
    : <img src={mentor.image} alt={mentor.name} loading="lazy" decoding="async" />;

  if (layout === 'directory') {
    return (
      <article className="academy-mentor-card academy-mentor-card-directory">
        <Link to={`/mentor/${mentor.id}`} className="academy-mentor-photo" aria-label={`View profile for ${mentor.name}`}>
          {portrait}
        </Link>
        <div className="academy-mentor-content">
          <div className="academy-mentor-heading">
            <div><span className="academy-mentor-role">{mentor.role}</span><h3>{mentor.name}</h3></div>
            <Link to={`/mentor/${mentor.id}`} className="academy-mentor-profile-link">View profile <span>↗</span></Link>
          </div>
          <div className="academy-mentor-skills">{mentor.expertise.map((expertise) => <span key={expertise}>{expertise}</span>)}</div>
          <p>{mentor.description}</p>
          <div className="academy-mentor-actions">
            <Link to={`/request/${mentor.id}`} className="academy-button academy-button-pink">Request mentorship <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="academy-mentor-card">
      <Link to={`/mentor/${mentor.id}`} className="academy-mentor-photo" aria-label={`View profile for ${mentor.name}`}>
        {portrait}
        <span className="academy-mentor-tag">{mentor.role}</span>
        <span className="academy-mentor-open" aria-hidden="true">↗</span>
      </Link>
      <div className="academy-mentor-content">
        <h3>{mentor.name}</h3>
        <div className="academy-mentor-skills">{mentor.expertise.map((expertise) => <span key={expertise}>{expertise}</span>)}</div>
        <p>{mentor.description}</p>
        <div className="academy-mentor-actions">
          <Link to={`/request/${mentor.id}`} className="academy-button academy-button-pink">Request mentorship</Link>
          <Link to={`/mentor/${mentor.id}`} className="academy-mentor-profile-link">Profile <span>↗</span></Link>
        </div>
      </div>
    </article>
  );
}
