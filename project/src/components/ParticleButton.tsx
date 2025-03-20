import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

interface ParticleButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const ParticleButton: React.FC<ParticleButtonProps> = ({
  to,
  children,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback((x: number, y: number) => {
    const particleCount = 20;
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
    setTimeout(() => setParticles([]), 600);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createParticles(x, y);
  }, [createParticles]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      createParticles(rect.width / 2, rect.height / 2);
    }
  }, [createParticles]);

  return (
    <div 
      ref={buttonRef}
      className="relative"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <Link
        to={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center space-x-1 hover:text-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] rounded-md ${className}`}
      >
        <span>{children}</span>
        <ExternalLink 
          size={12} 
          className="opacity-0 group-hover:opacity-100 transition-opacity" 
        />
      </Link>

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
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
    </div>
  );
};

export default ParticleButton;