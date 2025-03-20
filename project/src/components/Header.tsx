import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onContactClick: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

interface SectionColors {
  [key: string]: {
    textColor: string;
    backgroundColor: string;
    buttonStyle: string;
  };
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentSection, setCurrentSection] = useState('home');
  const [headerStyle, setHeaderStyle] = useState({
    textColor: 'text-white',
    backgroundColor: 'bg-white/5',
    buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
  });
  
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Define section-specific colors
  const sectionColors: SectionColors = {
    home: {
      textColor: 'text-white',
      backgroundColor: 'bg-white/5',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    about: {
      textColor: 'text-primary',
      backgroundColor: 'bg-white/90',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    work: {
      textColor: 'text-white',
      backgroundColor: 'bg-white/5',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    scripts: {
      textColor: 'text-primary',
      backgroundColor: 'bg-white/90',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    services: {
      textColor: 'text-white',
      backgroundColor: 'bg-white/5',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    whyhireme: {
      textColor: 'text-white',
      backgroundColor: 'bg-white/5',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    },
    testimonials: {
      textColor: 'text-white',
      backgroundColor: 'bg-white/5',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-teal-500'
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setIsScrolled(window.scrollY > 50);

      // Detect which section is currently in view
      const sections = ['home', 'about', 'work', 'scripts', 'services', 'whyhireme', 'testimonials'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section in view when its top is near the header (within 100px)
          if (rect.top <= 100 && rect.bottom > 0) {
            if (currentSection !== section) {
              setCurrentSection(section);
              // Apply the appropriate style for the current section
              setHeaderStyle({
                textColor: sectionColors[section].textColor,
                backgroundColor: sectionColors[section].backgroundColor,
                buttonStyle: sectionColors[section].buttonStyle
              });
            }
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentSection]);

  const createParticles = useCallback((x: number, y: number) => {
    const particleCount = 30;
    const colors = ['#3B82F6', '#14B8A6', '#38BDF8', '#2DD4BF'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        angle,
        speed: 2 + Math.random() * 4,
        size: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticles(x, y);
    }
    onContactClick();
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Scripts', href: '#scripts' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const glowStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(42, 157, 143, 0.1) 0%, transparent 50%)`,
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 right-0 z-50 w-11/12 max-w-7xl transition-all duration-500 rounded-2xl ${
        isScrolled 
          ? `${headerStyle.backgroundColor} backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/20` 
          : 'bg-white/5 backdrop-blur-sm'
      }`}
      style={glowStyle}
      role="banner"
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-2xl"
        style={{ 
          width: `${scrollProgress}%`,
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />

      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold group relative transition-colors duration-500"
            aria-label="F2 Bhai - Home"
          >
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent group-hover:from-teal-500 group-hover:to-blue-500 transition-all duration-300">
              F2
            </span>
            <span className={`transition-colors duration-500 ${headerStyle.textColor}`}>
              {" "}Bhai
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative text-sm font-medium transition-all duration-500 group ${
                  isScrolled 
                    ? `${headerStyle.textColor}/80 hover:${headerStyle.textColor}` 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
              </motion.a>
            ))}
            <div className="relative">
              <motion.button
                ref={buttonRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className={`relative px-6 py-2 ${headerStyle.buttonStyle} text-white rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden group`}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                    },
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 blur-xl" />
                </motion.div>

                {/* Button Text */}
                <span className="relative z-10">Let's Talk</span>

                {/* Particle Effects */}
                <AnimatePresence>
                  {particles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      initial={{
                        x: particle.x,
                        y: particle.y,
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={{
                        x: particle.x + Math.cos(particle.angle) * 100 * particle.speed,
                        y: particle.y + Math.sin(particle.angle) * 100 * particle.speed,
                        opacity: 0,
                        scale: 0,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute pointer-events-none"
                      style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        borderRadius: '50%',
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <X size={24} className={`transition-colors duration-500 ${headerStyle.textColor}`} />
              ) : (
                <Menu size={24} className={`transition-colors duration-500 ${headerStyle.textColor}`} />
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/10 rounded-b-2xl overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col space-y-4" role="navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-primary/80 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
                onClick={() => {
                  onContactClick();
                  setIsOpen(false);
                }}
              >
                Let's Talk
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;