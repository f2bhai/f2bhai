import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Video, Briefcase, Lightbulb, Trophy, Star, X, Sun, Moon } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  category: 'award' | 'project' | 'milestone';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: '2023',
    title: 'Best Video Editor Award',
    description: 'Recognized for exceptional creativity and technical excellence in video editing.',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1579447745798-74c4e464b84c?auto=format&fit=crop&q=80&w=2000',
    category: 'award'
  },
  {
    id: 2,
    date: '2022',
    title: 'Documentary Series Launch',
    description: 'Successfully launched a documentary series exploring cultural narratives across India.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000',
    category: 'project'
  },
  {
    id: 3,
    date: '2022',
    title: 'Creative Innovation Prize',
    description: 'Awarded for innovative approach to motion graphics and visual storytelling.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2000',
    category: 'award'
  },
  {
    id: 4,
    date: '2021',
    title: 'Major Client Partnership',
    description: 'Established long-term partnership with leading brands for video content creation.',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000',
    category: 'milestone'
  },
  {
    id: 5,
    date: '2021',
    title: 'Short Film Festival Winner',
    description: 'Won first place at the International Short Film Festival for editing excellence.',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000',
    category: 'award'
  },
  {
    id: 6,
    date: '2020',
    title: 'Rising Star Recognition',
    description: 'Named as one of the top emerging talents in video editing and motion design.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000',
    category: 'milestone'
  }
];

interface TimelineLightboxProps {
  event: TimelineEvent;
  onClose: () => void;
}

const TimelineLightbox: React.FC<TimelineLightboxProps> = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {event.image && (
          <div className="relative h-96">
            <motion.img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              layoutId={`event-image-${event.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <motion.h3 
                className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent mb-2"
                layoutId={`event-title-${event.id}`}
              >
                {event.title}
              </motion.h3>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 dark:text-gray-400">{event.date}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.category === 'award'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : event.category === 'project'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
}

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const createParticles = useCallback((x: number, y: number) => {
    const particleCount = Math.floor(Math.random() * 600) + 200;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * Math.random());
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        angle,
        speed,
        size: 8 + Math.random() * 4,
        opacity: 0.8 + Math.random() * 0.2,
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  }, []);

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
    setIsDarkMode(!isDarkMode);
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const FloatingElement = useCallback(({ delay = 0 }) => (
    <motion.div
      className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-sm"
      style={{
        y: useTransform(scrollYProgress, [0, 1], [0, -50 * (1 + delay)]),
        rotate: useTransform(scrollYProgress, [0, 1], [0, 360 * (1 + delay)]),
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
      }}
    />
  ), [scrollYProgress]);

  return (
    <div className={`py-20 relative transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80")',
            opacity: isDarkMode ? 0.15 : 0.1,
          }}
        />
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900' 
              : 'bg-gradient-to-b from-white via-white/95 to-white'
          }`}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} />
        <FloatingElement delay={0.2} />
        <FloatingElement delay={0.4} />
        <FloatingElement delay={0.6} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-16">
          <div className="relative">
            <motion.div
              className={`absolute inset-0 rounded-full blur-xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[rgba(100,100,255,0.5)]' 
                  : 'bg-[rgba(255,255,200,0.5)]'
              }`}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.button
              onClick={handleToggleClick}
              className={`relative mb-8 p-3 rounded-full shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-700" />
                )}
              </motion.div>

              <AnimatePresence>
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    initial={{
                      x: particle.x,
                      y: particle.y,
                      scale: 1,
                      opacity: particle.opacity,
                    }}
                    animate={{
                      x: particle.x + Math.cos(particle.angle) * 100 * particle.speed,
                      y: particle.y + Math.sin(particle.angle) * 100 * particle.speed,
                      scale: 0,
                      opacity: 0,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: particle.size,
                      height: particle.size,
                      borderRadius: "50%",
                      backgroundColor: isDarkMode 
                        ? 'rgba(100, 100, 255, 0.8)' 
                        : 'rgba(255, 255, 200, 0.8)',
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.button>
          </div>

          <h2 className="text-3xl font-bold text-center dark:text-white">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Creative Journey
            </span>
          </h2>
        </div>

        <div className="relative">
          <motion.svg
            className="absolute left-1/2 -translate-x-1/2 h-full w-4"
            initial="hidden"
            animate="visible"
            style={{ pathLength }}
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <motion.stop
                  offset="0%"
                  stopColor="#3B82F6"
                  animate={{
                    stopColor: ['#3B82F6', '#14B8A6', '#3B82F6'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.stop
                  offset="100%"
                  stopColor="#14B8A6"
                  animate={{
                    stopColor: ['#14B8A6', '#3B82F6', '#14B8A6'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </linearGradient>
            </defs>
            <motion.path
              d="M 2 0 L 2 100"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              variants={pathVariants}
              className="stroke-current"
            />
          </motion.svg>

          <div className="relative">
            {timelineEvents.map((event, index) => {
              const [ref, inView] = useInView({
                threshold: 0.2,
                triggerOnce: false
              });

              const Icon = event.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  ref={ref}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={itemVariants}
                  style={{ y: useTransform(scrollYProgress, [0, 1], [0, index * -20]) }}
                  className={`relative mb-24 last:mb-0 ${
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'
                  } md:w-1/2 ${isLeft ? 'md:ml-0' : 'md:ml-auto'}`}
                >
                  <div className="group relative">
                    <motion.div
                      className={`absolute top-0 ${
                        isLeft ? 'md:-right-16' : 'md:-left-16'
                      } w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-lg z-10`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedEvent(event)}
                      layoutId={`event-card-${event.id}`}
                    >
                      {event.image && (
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={event.image}
                            alt={event.title}
                            layoutId={`event-image-${event.id}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                              {event.date}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <motion.h3 
                          className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"
                          layoutId={`event-title-${event.id}`}
                        >
                          {event.title}
                        </motion.h3>
                        <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === 'award'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : event.category === 'project'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <TimelineLightbox
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;