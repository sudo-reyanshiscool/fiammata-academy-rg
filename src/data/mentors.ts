export interface Mentor {
  id: string;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  description: string;
  categories: string[];
  phone?: string;
  email?: string;
}

export const mentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Swastik Katiyar",
    role: "Enterprise Lead",
    image: "/images/swastik.png",
    expertise: ["Enterprise Portfolio", "Marketing", "Sponsorship Pitching", "Digital Media", "Sustainability", "Portfolio"],
    description: "With experience leading an award-winning Enterprise Portfolio, Swastik helped his team secure a national nomination for Marketing and Sponsorship. He specializes in turning team vision into a compelling brand story, offering practical guidance on digital media, corporate sustainability, and securing valuable sponsorships.",
    categories: ["enterprise"],
    phone: "918130423448", // Used for WhatsApp wa.me link
    email: "Swastik316250206@genesisgs.edu.in"
  },
  {
    id: "mentor-2",
    name: "Vedant Jain",
    role: "Engineering Lead",
    image: "/images/vedant.png",
    expertise: ["Design & Engineering Portfolio", "Car Optimization", "Aerodynamics", "Engineering"],
    description: "Vedant engineered one of the nation's most impressive Design & Engineering portfolios, driving the team to achieve the second-highest D&E points in the National Finals. He mentors teams on critical aerodynamic trade-offs, structural optimization, and the exact methodology needed to translate complex manufacturing data into a high-scoring portfolio.",
    categories: ["engineering"],
    phone: "917982224031",
    email: "VEDANT306150099@genesisgs.edu.in"
  },
  {
    id: "mentor-3",
    name: "Shaurea Vardhan",
    role: "Project Management Lead",
    image: "/images/shaurea.png",
    expertise: ["Project Management", "Portfolio Design", "Logistics", "Team Organization"],
    description: "Shaurea created the highest-scoring Project Management Portfolio of the season, earning a prestigious national nomination. He is an expert in navigating the chaos of a racing season, guiding teams through diverse management categories, strict timeline execution, and building bulletproof documentation that judges love.",
    categories: ["project-management"],
    phone: "918300000202",
    email: "SHAUREA306150085@genesisgs.edu.in"
  },
  {
    id: "mentor-4",
    name: "Naisha Singla",
    role: "Global Enterprise Mentor",
    image: "https://ui-avatars.com/api/?name=Naisha+Singla&background=D9382D&color=fff&size=512&font-size=0.35&bold=true",
    expertise: ["Enterprise Portfolio", "Sustainability", "Marketing", "Sponsorship Pitching", "Verbal Presentation"],
    description: "Competing on the global stage, Naisha created the highest-scoring Enterprise Portfolio at the 2025 World Finals. Her strategic vision secured a World Finals nomination in Marketing & Sponsorship and won the coveted Sustainability Award. She provides elite-level guidance on global standards, corporate sustainability integration, and world-class presentation delivery.",
    categories: ["enterprise", "presentation"],
    phone: "919625164852",
    email: "naishasingla@gmail.com"
  },
  {
    id: "mentor-5",
    name: "Reyansh Gupta",
    role: "World Finalist Judge · Engineering",
    image: "https://ui-avatars.com/api/?name=Reyansh+Gupta&background=D9382D&color=fff&size=512&font-size=0.35&bold=true",
    expertise: ["World Finalist Judge", "Engineering", "Car Optimization", "CAD/CAM", "Renders"],
    description: "Serving as an active World Finalist Judge and competing at the pinnacle of the 2024-25 World Finals with Team Supercharged, he evaluates and coaches cars against rigorous international adjudication rubrics. He offers insider insight into world-stage engineering scrutiny, aerodynamic compliance, and high-performance CAD optimization.",
    categories: ["engineering"],
    phone: "917827280072",
    email: "reyansh@fiammata.com"
  }
];
