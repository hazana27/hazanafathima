import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Terminal, 
  Database, 
  Laptop, 
  ShieldCheck, 
  Zap,
  Menu,
  X,
  ChevronRight,
  ChevronUp,
  BookOpen,
  Trophy,
  User,
  Coffee
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import * as React from "react";

// --- Components ---

interface TooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className = "w-full" }) => {
  const [show, setShow] = useState(false);
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] bottom-full mb-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#FFF5F9]/95 border border-[#FF007F]/20 text-[#1A0012] text-[11px] font-mono rounded shadow-[0_10px_30px_rgba(255,0,127,0.1)] backdrop-blur-md pointer-events-none w-max max-w-[280px] whitespace-normal leading-relaxed text-center border-glow"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFF5F9]/95 border-r border-b border-[#FF007F]/20 rotate-45 -translate-y-[5px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 127, 0.1), rgba(6, 182, 212, 0.08) 40%, transparent 80%)`
      }}
    />
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 bg-white/80 backdrop-blur-md border border-[#FF007F]/20 text-[#FF007F] rounded-full shadow-[0_0_20px_rgba(255, 0, 127, 0.15)] hover:shadow-[0_0_30px_rgba(6, 182, 212, 0.2)] hover:border-[#06B6D4] hover:text-[#06B6D4] transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_#06B6D4]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-[#FF007F]/10 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-mono font-bold tracking-tighter text-[#1A0012]"
        >
          <span className="text-[#FF007F]">HAZANA</span>.FATHIMA
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest text-[#1A0012]/70 hover:text-[#FF007F] transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#1A0012]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFF5F9]/95 border-b border-[#FF007F]/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-mono text-[#1A0012]/80 hover:text-[#FF007F]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="font-mono text-[#FF007F] text-sm">{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-[#1A0012] group-hover:text-glow transition-all">{title}</h2>
    <div className="h-px flex-1 bg-[#FF007F]/10" />
  </div>
);

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[2px] bg-[#FF007F]/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -200, 0],
          opacity: [0, 0.4, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

export default function App() {
  const skills = [
    {
      category: "Design & Frontend",
      icon: <Globe className="w-5 h-5" />,
      items: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "Frontend Development", "Responsive Design"]
    },
    {
      category: "AI & Programming",
      icon: <Cpu className="w-5 h-5" />,
      items: ["Python", "Prompt Engineering", "AI Concepts", "Generative AI", "Data Science Fundamentals"]
    },
    {
      category: "Full Stack & Tools",
      icon: <Terminal className="w-5 h-5" />,
      items: ["Full Stack Development", "GitHub", "MongoDB", "Express", "Node.js", "Backend Concepts"]
    }
  ];

  const internships = [
    {
      role: "UI/UX & Web Development Intern",
      company: "Wibits Web Solutions LLP",
      period: "July 02, 2025 – July 18, 2025",
      description: "Completed an intensive internship focusing on modern design principles and frontend execution.",
      skills: ["UI/UX Design", "Wireframing", "User Flow", "Frontend Web Development"]
    },
    {
      role: "Full Stack Web Development Intern",
      company: "EDU TANTR",
      period: "10 February 2026 – 10 May 2026",
      description: "Hands-on experience with end-to-end web application development and workflow management.",
      skills: ["Frontend Development", "Backend Concepts", "Full Stack Basics", "Real-world Development Workflow"]
    }
  ];

  const certifications = [
    {
      title: "Prompt Engineering for Everyone",
      issuer: "IBM Skills Network",
      via: "Cognitive Class",
      skills: ["Prompt Engineering", "AI Communication", "Generative AI Basics", "AI Tool Usage"]
    },
    {
      title: "Python for Data Science",
      issuer: "IBM Skills Network",
      via: "IBM",
      skills: ["Python Basics", "Data Science Fundamentals", "Problem Solving", "Data Handling"]
    }
  ];

  const projects = [
    {
      title: "AI Smart Banking Assistant",
      type: "MERN Stack Application",
      status: "In Progress",
      description: "A smart banking assistant using react and node.js with chatbot-based interaction for automated service requests.",
      insight: "Developing sophisticated response logic using modern MERN patterns to create a seamless, human-like banking experience.",
      tags: ["React", "Node.js", "Express", "AI Bot"],
      icon: <Cpu className="w-8 h-8 text-[#FF007F]" />
    },
    {
      title: "Marine Fall Detection System",
      type: "Safety Monitoring System",
      status: "In Progress",
      description: "Intelligent monitoring system designed to detect accidents in marine environments and trigger instant emergency alerts.",
      insight: "Focusing on low-latency detection algorithms and hardware-software integration for real-time safety in harsh conditions.",
      tags: ["AI", "Safety", "Alert System", "IoT"],
      icon: <Zap className="w-8 h-8 text-[#FF007F]" />
    },
    {
      title: "Hospital Management",
      type: "Healthcare Application",
      status: "In Progress",
      description: "System for managing patient records, doctor schedules, and appointments efficiently within a clinical environment.",
      insight: "Optimizing database structures for rapid record retrieval and secure doctor-patient data synchronization.",
      tags: ["Data Mgmt", "CRUD", "Desktop View"],
      icon: <BookOpen className="w-8 h-8 text-[#FF007F]" />
    }
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundEffects />
      <MouseGlow />
      <ScrollToTop />
      <Nav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Decorative Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF007F]/10 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[150px] rounded-full pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#FF007F] font-mono text-sm uppercase tracking-[0.4em] mb-8"
            >
              Artificial Intelligence & Data Science
            </motion.div>
            
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,0,127,0.2)]">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block text-[#1A0012]"
              >
                HAZANA
              </motion.span> <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] via-[#FF007F] to-[#06B6D4] animate-gradient-x"
              >
                FATHIMA
              </motion.span>
            </h1>

            <p className="text-[#1A0012]/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Motivated B.Tech Artificial Intelligence and Data Science student passionate about building user-friendly digital experiences and innovative AI solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,0,127,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-[#FF007F] text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(255,0,127,0.3)]"
              >
                Explore Projects
              </motion.button>
              <div className="flex items-center gap-6">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com/hazana27" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/hazana-fathima-b77b64355/" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:hazanafathima1927@gmail.com" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ scale: 1.2, color: "#FF007F", y: -4 }}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1A0012]/40 hover:text-[#FF007F] transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 12, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A0012]/20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
          <ChevronRight className="rotate-90 w-6 h-6" />
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-6 space-y-32 py-32">
        
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
          <SectionHeading number="01" title="About Me" />
          <div className="space-y-6 text-[#1A0012]/70 text-lg md:text-xl font-light">
            <p>
              I am currently a 2nd-year B.Tech student specializing in <span className="text-[#1A0012] font-medium">Artificial Intelligence & Data Science</span> at DMI Engineering College.
            </p>
            <p>
              My journey is fueled by a curiosity for how data and algorithms can solve real-world problems—from banking assistants to marine safety systems. I bridge the gap between creative frontend design and robust programming logic.
            </p>
            <div className="grid grid-cols-2 gap-4 py-8">
              {[
                { label: "College", val: "DMI Engineering College" },
                { label: "University", val: "Anna University" },
                { label: "Strengths", val: "Consistent Learner, Creative" },
                { label: "Location", val: "India" },
                { label: "Relocation", val: "UAE Ready" },
              ].map(stat => (
                <div key={stat.label} className="border-l border-[#FF007F]/30 pl-4 py-2">
                  <div className="text-xs uppercase tracking-widest text-[#1A0012]/40 mb-1">{stat.label}</div>
                  <div className="text-sm font-medium text-[#1A0012]">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tech Stack Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="!mt-[-80px] pb-12 flex flex-wrap gap-3"
        >
          {["Python", "React.js", "Node.js", "Express", "MongoDB", "JavaScript", "Prompt Engineering", "UI/UX", "Full Stack", "GitHub", "AI Concepts"].map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 0, 127, 0.1)",
                borderColor: "rgba(255, 0, 127, 0.4)",
                color: "#FF007F"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white border border-[#FF007F]/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#1A0012]/40 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(255,0,127,0.1)]"
            >
              #{skill}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeading number="02" title="Technical Expertise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 bg-white/60 border border-[#FF007F]/10 rounded-3xl overflow-hidden hover:border-[#FF007F]/40 transition-all hover:shadow-[0_0_50px_rgba(255, 0, 127, 0.1)]"
              >
                {/* Glowing Blob Background Effect */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF007F]/5 blur-[60px] rounded-full group-hover:bg-[#FF007F]/10 transition-colors"
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-[#FF007F]/10 text-[#FF007F] rounded-2xl group-hover:bg-[#FF007F] group-hover:text-white transition-all duration-300 border border-[#FF007F]/20 group-hover:shadow-[0_0_30px_rgba(255,0,127,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,0,127,0.7)]">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#1A0012]">{skill.category}</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {skill.items.map((item, i) => (
                      <motion.li 
                        key={item} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 + (i * 0.05) }}
                        className="flex items-center gap-3 text-[#1A0012]/50 group-hover:text-[#1A0012]/80 transition-colors text-sm font-light"
                      >
                        <div className="w-1.5 h-1.5 bg-[#FF007F] rounded-full shadow-[0_0_8px_#FF007F]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading number="03" title="Key Projects" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative group overflow-hidden bg-white/60 border border-[#FF007F]/10 rounded-3xl shadow-[0_10px_40px_rgba(255,0,127,0.05)]"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#FF007F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                
                <div className="relative p-8 pb-32 z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,0,127,0.7)] group-hover:scale-110">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#FF007F]/20 bg-[#FF007F]/10 text-[9px] font-mono font-bold text-[#FF007F] uppercase tracking-tighter">
                         <span className="w-1 h-1 bg-[#FF007F] rounded-full animate-pulse" />
                         {project.status}
                       </span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#FF007F] mb-2 tracking-widest uppercase font-bold">
                    {project.type}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#1A0012]">{project.title}</h3>
                  <p className="text-[#1A0012]/50 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 pt-0 z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-[#FF007F]/5 rounded-full border border-[#FF007F]/10 uppercase font-medium text-[#1A0012]/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover Reveal Details (Insight Section) */}
                <div className="absolute inset-0 bg-[#FFF5F9]/95 p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out border border-[#FF007F]/20 z-20 backdrop-blur-md">
                   <h3 className="text-xl font-bold mb-4 text-[#FF007F]">Project Insight</h3>
                   <Tooltip text={project.insight}>
                     <p className="text-sm text-[#1A0012]/70 mb-6 font-light leading-relaxed line-clamp-2 cursor-help">
                       {project.insight}
                     </p>
                   </Tooltip>
                   
                   <div className="mb-8">
                     <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1A0012]/40 mb-3">Technologies Used</h4>
                     <div className="flex flex-wrap gap-2">
                       {project.tags.map((tag, i) => (
                         <Tooltip key={tag} text={tag} className="inline-block">
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.3 + (i * 0.1) }}
                             className="text-[9px] font-mono px-2 py-1 bg-[#FF007F]/10 text-[#FF007F] rounded border border-[#FF007F]/20 uppercase cursor-help"
                           >
                             {tag}
                           </motion.span>
                         </Tooltip>
                       ))}
                     </div>
                   </div>

                   <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FF007F] hover:gap-4 transition-all">
                     Learn More <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Certifications Section */}
        <section id="experience" className="space-y-20">
          {/* Internships */}
          <div className="space-y-12">
            <SectionHeading number="04" title="Internships" />
            <div className="grid md:grid-cols-2 gap-8">
              {internships.map((intern, i) => (
                <motion.div
                  key={intern.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-[#FF007F]/20 group hover:border-[#FF007F]/40 transition-colors"
                >
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-[#FF007F] rounded-full shadow-[0_0_10px_#FF007F] group-hover:scale-125 transition-transform" />
                  <div className="text-[#FF007F] font-mono text-xs mb-2 font-bold tracking-widest">{intern.period}</div>
                  <h3 className="text-xl font-bold mb-1 text-[#1A0012] group-hover:text-[#FF007F] transition-colors">{intern.role}</h3>
                  <div className="text-sm font-bold text-[#1A0012]/80 mb-3">{intern.company}</div>
                  <p className="text-sm text-[#1A0012]/50 font-light mb-4 italic leading-relaxed">
                    {intern.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {intern.skills.map(s => (
                       <span key={s} className="text-[9px] font-mono px-2 py-1 bg-white border border-[#FF007F]/10 text-[#1A0012]/40 rounded-full">
                         {s}
                       </span>
                     ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-12">
            <SectionHeading number="05" title="Certifications" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-[#FF007F]/5 border border-[#FF007F]/10 rounded-2xl relative overflow-hidden group hover:border-[#FF007F]/30 transition-all hover:bg-[#FF007F]/10 shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                    <Trophy className="w-16 h-16 text-[#FF007F]" />
                  </div>
                  <div className="text-[10px] font-mono text-[#FF007F] uppercase tracking-widest mb-1 font-bold">Issued by {cert.issuer}</div>
                  <h3 className="text-lg font-bold mb-3 text-[#1A0012] pr-8 leading-tight">{cert.title}</h3>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-[#1A0012]/30 mb-2">Skills Learned</div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map(s => (
                        <span key={s} className="text-[9px] font-mono text-[#1A0012]/60 bg-white/50 px-2 py-0.5 rounded border border-[#FF007F]/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading number="06" title="Background" />
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-[#FF007F]/20">
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-[#FF007F] rounded-full shadow-[0_0_10px_#FF007F]" />
                <div className="text-[#FF007F] font-mono text-xs mb-2">2022 - PRESENT</div>
                <h3 className="text-xl font-bold mb-1 text-[#1A0012]">B.Tech AI & Data Science</h3>
                <div className="text-[#1A0012]/60 mb-4">DMI Engineering College (Anna University)</div>
                <p className="text-sm text-[#1A0012]/40 font-light max-w-md">Currently in 2nd year. Concentrating on machine learning architectures, statistical analysis, and advanced networking protocols.</p>
              </div>

              <div className="relative pl-8 border-l border-[#FF007F]/10">
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-[#1A0012]/20 rounded-full" />
                <div className="text-[#1A0012]/40 font-mono text-xs mb-2 uppercase">SECONDARY EDUCATION</div>
                <h3 className="text-xl font-bold mb-1 text-[#1A0012]">High School Studies</h3>
                <div className="text-[#1A0012]/40">Technical Stream</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FF007F]/5 border border-[#FF007F]/10 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#1A0012]">
               <Trophy className="w-32 h-32" />
             </div>
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#1A0012]">
               <Coffee className="w-6 h-6 text-[#FF007F]" />
               Personal Ethos
             </h3>
             <div className="space-y-6">
                {[
                  { title: "Quick Learner", desc: "Adaptive to new technologies and fast-evolving AI landscapes." },
                  { title: "Creative Thinker", desc: "Approaching problems with unique, design-forward solutions." },
                  { title: "Tech Focused", desc: "Always exploring the latest in Python, AI, and Frontend ecosystems." }
                ].map(item => (
                  <div key={item.title}>
                    <h4 className="font-mono text-sm text-[#FF007F] mb-1 tracking-tighter uppercase font-bold">{item.title}</h4>
                    <p className="text-[#1A0012]/50 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FF007F]/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter text-[#1A0012]">
              Let's <span className="text-[#FF007F]">connect</span>.
            </h2>
            <p className="text-[#1A0012]/40 max-w-sm mb-8 font-light italic">
              "Building the future with data and design, one project at a time."
            </p>
            <div className="flex gap-4">
               <motion.a 
                 whileHover={{ y: -5, color: "#FF007F" }}
                 href="https://github.com/hazana27" 
                 target="_blank"
                 rel="noreferrer"
                 className="p-4 bg-[#FF007F]/5 rounded-2xl border border-[#FF007F]/10 text-[#1A0012]/70 hover:text-[#FF007F]"
               >
                 <Github className="w-6 h-6" />
               </motion.a>
               <motion.a 
                 whileHover={{ y: -5, color: "#FF007F" }}
                 href="https://www.linkedin.com/in/hazana-fathima-b77b64355/" 
                 target="_blank"
                 rel="noreferrer"
                 className="p-4 bg-[#FF007F]/5 rounded-2xl border border-[#FF007F]/10 text-[#1A0012]/70 hover:text-[#FF007F]"
               >
                 <Linkedin className="w-6 h-6" />
               </motion.a>
               <motion.a 
                 whileHover={{ y: -5, color: "#FF007F" }}
                 href="mailto:hazanafathima1927@gmail.com" 
                 className="p-4 bg-[#FF007F]/5 rounded-2xl border border-[#FF007F]/10 text-[#1A0012]/70 hover:text-[#FF007F]"
               >
                 <Mail className="w-6 h-6" />
               </motion.a>
            </div>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end gap-4 text-sm font-mono text-[#1A0012]/30 uppercase tracking-[0.2em]">
            <a href="mailto:hazanafathima1927@gmail.com" className="hover:text-[#FF007F] transition-colors lowercase">hazanafathima1927@gmail.com</a>
            <div className="text-[10px]">© 2026 DESIGNED BY HAZANA FATHIMA</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
