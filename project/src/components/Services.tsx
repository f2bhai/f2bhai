import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Film, 
  Building2, 
  Image as ImageIcon, 
  Pencil,
  MessageCircle,
  Star
} from 'lucide-react';
import HireDialog from './HireDialog';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  uniqueness: string;
  gradient: string;
}

const services: Service[] = [
  {
    icon: Video,
    title: 'Shorts/Reels',
    description: "I create short, vibrant, and high-energy videos that captivate audiences instantly. Whether it's a quick reel or a short-form content piece, I focus on delivering impactful, engaging content that aligns with your brand's voice.",
    uniqueness: 'I specialize in fast-paced edits that tell your story within seconds, ensuring that every shot counts.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Film,
    title: 'Documentaries',
    description: 'Documentaries need precision and a compelling narrative. I craft cinematic, emotionally resonant documentaries that engage your audience from start to finish, using high-quality visuals and storytelling techniques.',
    uniqueness: 'I bring your vision to life with attention to detail, ensuring your message is conveyed powerfully through every frame.',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Building2,
    title: 'Restaurants & Real Estate',
    description: 'From mouth-watering food shots to high-quality real estate visuals, I specialize in capturing your space or cuisine in the best possible light, bringing attention to every detail.',
    uniqueness: 'I understand the importance of showcasing your property or food in a way that leaves a lasting impression on potential buyers or customers.',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: ImageIcon,
    title: 'Posters & Thumbnails',
    description: "Creating striking posters and eye-catching thumbnails that are designed to grab attention. Whether it's for your marketing or social media presence, I ensure that each visual resonates with your target audience.",
    uniqueness: 'My designs are focused on boosting engagement by making sure they stand out and convey your message quickly and effectively.',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Pencil,
    title: 'Script Writing',
    description: 'I provide professional scriptwriting services for all types of media. From crafting narratives for short films to detailed scripts for commercials, I ensure that the story flows seamlessly and keeps the audience engaged.',
    uniqueness: 'I write scripts that not only tell a compelling story but also include thorough research and proof, ensuring the content is both accurate and engaging.',
    gradient: 'from-purple-500 to-violet-500'
  }
];

const Services = () => {
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();
  const letters = "Services".split("");

  const handleHireClick = (service: string) => {
    setSelectedService(service);
    setIsHireDialogOpen(true);
  };

  return (
    <section className="min-h-screen bg-[#1A1A1A] py-20 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(45, 212, 191, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Animated Typography */}
        <div className="text-center mb-20">
          <div className="flex flex-wrap justify-center">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.03,
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className={`text-4xl md:text-6xl font-bold ${
                  letter === " " ? "mr-4" : "mr-[0.02em]"
                } bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent relative`}
                style={{
                  textShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
                }}
              >
                {letter}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* First Row - 3 Services */}
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              onHire={() => handleHireClick(service.title)}
            />
          ))}

          {/* Second Row - 2 Services Centered */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {services.slice(3).map((service, index) => (
              <ServiceCard 
                key={service.title} 
                service={service} 
                index={index + 3}
                onHire={() => handleHireClick(service.title)}
              />
            ))}
          </div>
        </div>
      </div>

      <HireDialog
        isOpen={isHireDialogOpen}
        onClose={() => setIsHireDialogOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
};

// Extracted ServiceCard component for better organization
const ServiceCard = ({ 
  service, 
  index,
  onHire 
}: { 
  service: Service; 
  index: number;
  onHire: () => void;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Icon */}
      <motion.div
        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300 relative`}
      >
        <motion.div
          className="absolute inset-0 blur-xl opacity-50"
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
        <div className="w-full h-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center relative">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

      {/* Description */}
      <p className="text-white/60 mb-4">{service.description}</p>

      {/* Uniqueness */}
      <div className="flex items-start gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
        <p className="text-white/80 text-sm italic">{service.uniqueness}</p>
      </div>

      {/* Hire Me Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHire}
        className="group relative w-full"
      >
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.gradient} blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="relative flex items-center justify-center gap-2 bg-[#1A1A1A] text-white rounded-xl px-6 py-3 group-hover:bg-transparent transition-colors duration-300">
          <span className="font-semibold">Hire Me</span>
          <MessageCircle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default Services;