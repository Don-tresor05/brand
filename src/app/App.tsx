import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe, Smartphone, Server, Cpu, ArrowUp, CheckCircle2, Quote, Calendar, Award, GraduationCap } from 'lucide-react';
import GitHubHeatmap from './components/GitHubHeatmap';
import CodeShowcase from './components/CodeShowcase';
import TechStack from './components/TechStack';
import StatsCounter from './components/StatsCounter';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-background text-foreground transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
            whileHover={{ scale: 1.05 }}
          >
            Trésor Irakoze
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group cursor-pointer"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface hover:bg-accent hover:text-accent-foreground transition-all"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Available Badge */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 right-6 z-40 bg-card border border-border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
      >
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="text-sm">Available for work</span>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/about.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-accent mb-4 tracking-widest text-sm uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Full-Stack Developer
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-[120px] leading-[0.9] tracking-tight mb-6"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Building Secure
                <br />
                <span className="text-accent">Apps</span> for Web
              </motion.h1>
            </div>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Software engineer based in Kigali, Rwanda, building full-stack web and mobile products with React, React Native, Spring Boot, Django, Node.js, and a security-first mindset.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-accent text-accent-foreground rounded-full text-lg cursor-pointer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-8 py-4 border border-border rounded-full text-lg cursor-pointer hover:bg-surface transition-colors"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                View projects
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-6 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: Github, href: 'https://github.com/Don-tresor05', color: '#333' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/don-tr%C3%A9sor-750a3a289', color: '#0A66C2' },
                { icon: XSocialIcon, href: 'https://x.com/dtresor_', color: '#000000' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="p-3 rounded-full border border-border hover:border-accent cursor-pointer transition-colors"
                  whileHover={{ scale: 1.1, borderColor: social.color }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/_DSC7833.JPG"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl mb-6" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              Passionate about creating exceptional digital experiences
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm Trésor Irakoze, an IT software engineer and full-stack developer with hands-on experience across frontend, backend, mobile, databases, UI/UX design, and cybersecurity.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I work with Java, TypeScript, Python, C#, React, React Native, Spring Boot, Django REST Framework, Node.js, MySQL, MongoDB, SQL Server, Linux, and VAPT workflows. I also bring creative experience from Figma, Adobe Photoshop, and professional photography.
            </p>
            <div className="space-y-4">
              {['Full-Stack Web & Mobile Development', 'Cybersecurity & Linux Administration', 'UI/UX Design & Visual Production'].map((skill, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="text-lg">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section title="Tech Stack">
        <TechStack />
      </Section>

      {/* Code Showcase */}
      <Section title="Live Code">
        <CodeShowcase />
      </Section>

      {/* GitHub Activity */}
      <Section title="GitHub Contributions">
        <GitHubHeatmap username="Don-tresor05" />
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'NGO Fund Frontend',
              desc: 'Frontend work for an NGO funding platform, with active GitHub contribution history.',
              tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
              image: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
            {
              title: 'NGO Fund Backend',
              desc: 'Backend services supporting funding workflows and application data management.',
              tech: ['Django', 'REST API', 'Python', 'Database Design'],
              image: 'https://images.unsplash.com/photo-1675495666895-9091741bfd78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
            {
              title: 'Fitness Management Solution',
              desc: 'Java-based management system for fitness operations and records.',
              tech: ['Java', 'MySQL', 'Desktop/Web App'],
              image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
            {
              title: 'Veterinary System',
              desc: 'Application for veterinary service records and operational workflows.',
              tech: ['Java', 'Database Management', 'UI Design'],
              image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
          ].map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Experience">
        <div className="space-y-12">
          {[
            {
              company: 'Codveda Technologies',
              role: 'Full-Stack Developer Intern',
              period: '2025 - Present',
              description: 'Developing end-to-end web applications while working across frontend and backend systems with modern development practices.',
            },
            {
              company: 'Jackal Tech Ltd',
              role: 'Frontend Developer Intern',
              period: '2025 - Present',
              description: 'Building responsive user interfaces, improving UI/UX quality, and implementing modern frontend best practices.',
            },
            {
              company: 'Solvit Africa & Digital Opportunity Trust Rwanda',
              role: 'Django Fellow - Code2Connect Fellowship II',
              period: 'Dec 2025 - Feb 2026',
              description: 'Completed an intensive fellowship focused on Django web development, practical backend projects, and professional skills.',
            },
            {
              company: 'Catamaran Studio LTD',
              role: 'Photographer',
              period: '2024 - 2026',
              description: 'Captured, edited, and retouched professional studio photography using Adobe Photoshop while managing client sessions.',
            },
            {
              company: 'Freelance / Personal Projects',
              role: 'UI/UX Designer',
              period: '2024 - Present',
              description: 'Designing interfaces and prototypes in Figma, creating wireframes, mockups, design systems, and visual assets.',
            },
          ].map((job, i) => (
            <ExperienceCard key={i} {...job} index={i} />
          ))}
        </div>
      </Section>

      {/* Education Section */}
      <Section title="Education">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              degree: "Bachelor's Degree in Software Engineering",
              school: 'Adventist University of Central Africa (AUCA)',
              year: '2022 - 2025',
              icon: GraduationCap,
            },
            {
              degree: 'Networking Essentials Certificate',
              school: 'Cisco Networking Academy',
              year: '2022 - 2023',
              icon: Award,
            },
          ].map((edu, i) => (
            <EducationCard key={i} {...edu} index={i} />
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section title="Impact">
        <StatsCounter />
      </Section>

      {/* Certifications Section */}
      <Section title="Achievements">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Code2Connect Fellowship II',
              role: 'Django Certificate',
              text: 'Completed a 3-month intensive Django program delivered by Solvit Africa and Digital Opportunity Trust Rwanda.',
            },
            {
              name: 'Artificial Intelligence',
              role: 'Saturdays.AI Certificate',
              text: 'Completed AI training focused on practical learning and applied technology skills.',
            },
            {
              name: 'Space Hackathon',
              role: 'Certificate of Participation',
              text: 'Participated in a hackathon delivered by The Spring Institute for Forests on the Moon.',
            },
          ].map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} index={i} />
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section title="Services">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: 'Web Development',
              desc: 'Full-stack applications using React, Django, Spring Boot, Node.js, and modern APIs.',
            },
            {
              icon: Smartphone,
              title: 'Mobile Apps',
              desc: 'Cross-platform mobile interfaces and app experiences with React Native.',
            },
            {
              icon: Server,
              title: 'Cybersecurity',
              desc: 'Linux administration, server security analysis, vulnerability assessment, and penetration testing.',
            },
            {
              icon: Database,
              title: 'Database Design',
              desc: 'Database development with MySQL, MongoDB, SQL Server, and PL/SQL.',
            },
            {
              icon: Code2,
              title: 'API Development',
              desc: 'RESTful APIs with Django REST Framework, Node.js, and Spring Boot.',
            },
            {
              icon: Cpu,
              title: 'UI/UX & Visual Design',
              desc: 'Figma prototypes, interface systems, Photoshop assets, and photography workflows.',
            },
          ].map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </Section>

      {/* GitHub Repositories Section */}
      <Section title="Popular Repositories">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'My-portfolio',
              date: 'Language: JavaScript',
              readTime: 'Visibility: Public',
              image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
            {
              title: 'Fitness-mgt-sol',
              date: 'Language: Java',
              readTime: 'Visibility: Public',
              image: 'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
            {
              title: 'VeterinarySystem',
              date: 'Language: Java',
              readTime: 'Visibility: Public',
              image: 'https://images.unsplash.com/photo-1675495667069-d18d7d78eeb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            },
          ].map((article, i) => (
            <ArticleCard key={i} {...article} index={i} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Let's Work Together">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="text-xl text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            I'm based in Kabuga, Kigali, Rwanda, and open to internships, full-stack roles, freelance UI/UX work, and collaborations around software, mobile apps, databases, and secure systems.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CopyEmailButton />
            <motion.a
              href="tel:+250784809323"
              className="px-8 py-4 border border-border rounded-full text-lg cursor-pointer hover:bg-surface transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              +250 784 809 323
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/don-tr%C3%A9sor-750a3a289"
              className="px-8 py-4 border border-border rounded-full text-lg cursor-pointer hover:bg-surface transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              Trésor Irakoze
            </div>
            <div className="text-muted-foreground">
              © 2026 All rights reserved
            </div>
            <div className="flex gap-6">
              {[
                { icon: Github, href: 'https://github.com/Don-tresor05' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/don-tr%C3%A9sor-750a3a289' },
                { icon: XSocialIcon, href: 'https://x.com/dtresor_' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-accent text-accent-foreground rounded-full shadow-lg z-40 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </div>
  );
}

function XSocialIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.9 2h3.7l-8.1 9.3L24 22h-7.4l-5.8-7.6L4.2 22H.5l8.7-10L0 2h7.6l5.2 6.9L18.9 2Zm-1.3 18.1h2L6.5 3.8H4.3l13.3 16.3Z" />
    </svg>
  );
}

// Section Component
function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-32">
      <motion.h2
        className="text-6xl mb-16 tracking-tight"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

// Project Card
function ProjectCard({ title, desc, tech, image, index }: any) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden bg-card cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl mb-3" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t: string) => (
            <span
              key={t}
              className="px-3 py-1 bg-surface text-sm rounded-full"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {t}
            </span>
          ))}
        </div>
        <motion.div
          className="flex items-center gap-2 text-accent"
          whileHover={{ x: 5 }}
        >
          View Project <ExternalLink size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Experience Card
function ExperienceCard({ company, role, period, description, index }: any) {
  return (
    <motion.div
      className="relative pl-8 border-l-2 border-accent"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full" />
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-2xl mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            {role}
          </h3>
          <div className="text-lg text-accent mb-2">{company}</div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={16} />
          <span>{period}</span>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Education Card
function EducationCard({ degree, school, year, icon: Icon, index }: any) {
  return (
    <motion.div
      className="p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Icon className="text-accent mb-4" size={32} />
      <h3 className="text-2xl mb-2" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
        {degree}
      </h3>
      <div className="text-lg text-accent mb-2">{school}</div>
      <div className="text-muted-foreground">{year}</div>
    </motion.div>
  );
}

// Testimonial Card
function TestimonialCard({ name, role, text, index }: any) {
  return (
    <motion.div
      className="p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Quote className="text-accent mb-4" size={32} />
      <p className="text-muted-foreground leading-relaxed mb-6">{text}</p>
      <div>
        <div className="text-lg" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
          {name}
        </div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </motion.div>
  );
}

// Service Card
function ServiceCard({ icon: Icon, title, desc, index }: any) {
  return (
    <motion.div
      className="p-8 bg-card rounded-2xl border border-border group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, borderColor: 'var(--accent)' }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="text-accent mb-4" size={40} />
      </motion.div>
      <h3 className="text-2xl mb-3" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Article Card
function ArticleCard({ title, date, readTime, image, index }: any) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span>{date}</span>
        <span>•</span>
        <span>{readTime}</span>
      </div>
      <h3 className="text-2xl mb-2 group-hover:text-accent transition-colors" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
        {title}
      </h3>
      <motion.div
        className="flex items-center gap-2 text-accent"
        whileHover={{ x: 5 }}
      >
        View Repository <ExternalLink size={16} />
      </motion.div>
    </motion.div>
  );
}

// Copy Email Button
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('dontresor922@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={copyEmail}
      className="px-8 py-4 bg-accent text-accent-foreground rounded-full text-lg cursor-pointer flex items-center justify-center gap-2"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      animate={copied ? { scale: [1, 1.1, 1] } : {}}
    >
      <Mail size={20} />
      {copied ? 'Copied!' : 'Copy Email'}
    </motion.button>
  );
}
