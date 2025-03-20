import React, { useState, useCallback } from 'react';
import { Mail, Instagram, Youtube, Twitter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleButton from './ParticleButton';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

interface FooterProps {
  isDialogOpen: boolean;
  onDialogOpenChange: (isOpen: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ isDialogOpen, onDialogOpenChange }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/f2bhai',
      color: 'hover:text-pink-500',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@f2bhai',
      color: 'hover:text-red-500',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/f2bhai',
      color: 'hover:text-blue-400',
    },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', to: '/privacy', ariaLabel: 'View Privacy Policy in new tab' },
    { name: 'Cookie Policy', to: '/cookies', ariaLabel: 'View Cookie Policy in new tab' },
    { name: 'Terms of Service', to: '/terms', ariaLabel: 'View Terms of Service in new tab' },
  ];

  const createParticles = useCallback((x: number, y: number) => {
    const particleCount = 30;
    const colors = ['#25D366', '#128C7E', '#34B7F1', '#075E54'];
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

  const handleWhatsAppClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createParticles(x, y);
    onDialogOpenChange(true);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white/80 py-12 relative overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(45, 212, 191, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold inline-block"
            >
              <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                F2
              </span>
              <span className="text-white"> Bhai</span>
            </motion.a>
            <p className="text-sm text-white/60 max-w-xs">
              Crafting exceptional digital experiences through creative video editing and design.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white"
            >
              Contact
            </motion.h3>
            <ul className="space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2"
              >
                <Mail size={16} className="text-teal-500" />
                <a href="mailto:f2business26@gmail.com" className="hover:text-teal-500 transition-colors">
                  f2business26@gmail.com
                </a>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2 relative"
              >
                <MessageCircle size={16} className="text-green-500" />
                <button
                  onClick={handleWhatsAppClick}
                  className="text-left hover:text-green-500 transition-colors flex items-center gap-2 relative whitespace-nowrap"
                >
                  <span>View WhatsApp Number</span>
                  <motion.div
                    className="relative inline-flex items-center"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-green-500/50 to-green-400/50 rounded-full blur-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.span
                      className="relative text-xs bg-gradient-to-r from-green-500 to-green-400 text-white px-2 py-0.5 rounded-full"
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      Click to reveal
                    </motion.span>
                  </motion.div>

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
                </button>
              </motion.li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white"
            >
              Legal
            </motion.h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ParticleButton 
                    to={link.to}
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </ParticleButton>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white"
            >
              Connect
            </motion.h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`transform hover:scale-110 transition-all ${social.color}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-blue-500/20 my-8"
        />

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/60"
        >
          © {currentYear} F2 Bhai. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;