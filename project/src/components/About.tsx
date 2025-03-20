import React from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const skills = [
  { 
    name: 'Adobe After Effects',
    level: 93,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    gradient: 'from-[#CF96FD] to-[#9B36FD]'
  },
  {
    name: 'Adobe Premiere Pro',
    level: 84,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
    gradient: 'from-[#9999FF] to-[#4B4BFF]'
  },
  {
    name: 'Adobe Photoshop',
    level: 81,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    gradient: 'from-[#30A8FF] to-[#0066FF]'
  },
  {
    name: 'Visual Design',
    level: 95,
    logo: 'https://api.iconify.design/solar:pen-new-square-bold-duotone.svg?color=%23FF9A00',
    gradient: 'from-[#FF9A00] to-[#FF5C00]'
  },
  {
    name: 'Motion Graphics',
    level: 87,
    logo: 'https://api.iconify.design/solar:play-circle-bold-duotone.svg?color=%23FF61F6',
    gradient: 'from-[#FF61F6] to-[#FF00EB]'
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const About: React.FC = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(45, 212, 191, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div 
            variants={itemVariants} 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="F2 Bhai Portrait"
                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              variants={itemVariants} 
              className="space-y-4"
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-primary"
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Crafting Digital
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  {" "}Excellence
                </span>
              </motion.h2>
              <motion.div
                className="space-y-4"
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  With 2-3 years of experience as a creative video editor and designer, I bring precision to every pixel for high-quality work. Finding creative solutions for design challenges while collaborating seamlessly with teams and clients.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Highly proficient in Adobe's latest software, especially Adobe Premiere, Adobe Photoshop, and After Effects, specializing in creating engaging video content. I have edited over 168 long-form videos and more than 1264 short-form videos, with expertise in documentary-style edits and motion graphics, including map animations.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I always strive to deliver 100% client satisfaction, ensuring that brand identity and consistency are maintained throughout all projects.
                </p>
              </motion.div>
              <motion.a 
                href="https://drive.google.com/uc?export=download&id=10r3sJuWl_TiG-hAAsl6eI5c2S501djvA"
                download="F2_Bhai_Resume.pdf"
                className="group inline-flex items-center px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Download Resume</span>
                <FileDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300 relative z-10" size={20} />
                <motion.div
                  className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.a>
            </motion.div>

            <motion.div 
              ref={skillsRef}
              variants={itemVariants} 
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-primary">Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.img 
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className="w-6 h-6"
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={skillsInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        />
                        <span className="font-medium text-primary group-hover:text-blue-500 transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <motion.span 
                        className="text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={skillsInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1.5,
                          delay: 0.2 + index * 0.1,
                          ease: "easeOut"
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
                      >
                        <motion.div
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center"
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          animate={skillsInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -180 }}
                          transition={{ 
                            duration: 0.5,
                            delay: 1.2 + index * 0.1
                          }}
                        >
                          <motion.img 
                            src={skill.logo}
                            alt={`${skill.name} icon`}
                            className="w-2.5 h-2.5"
                            initial={{ opacity: 0 }}
                            animate={skillsInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 1.3 + index * 0.1 }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;