import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const titleText = "F2 Bhai";
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8,
      filter: "blur(8px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A]">
      {/* Animated Background Glow */}
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

      <div className="container mx-auto px-4 h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            {/* Animated Title */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-lg blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <h1 className="text-4xl md:text-6xl font-bold relative">
                <motion.div className="flex flex-wrap">
                  {titleText.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      custom={i}
                      className={`inline-block ${
                        letter === " " ? "mr-2" : "mr-[0.02em]"
                      } ${
                        i < 2 
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent" 
                          : "text-white"
                      }`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  Creative Developer & Designer
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              Crafting Digital Experiences That Scale
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="relative z-10"
            >
              <motion.a
                href="#work"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button Content */}
                <span className="relative flex items-center font-medium">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">
                    View My Work
                  </span>
                  <ArrowRight 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                    size={20} 
                  />
                </span>

                {/* Hover Glow Effect */}
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
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden md:block"
          >
            <div className="relative w-full h-[500px]">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-2xl"
                animate={{
                  rotate: [6, 3, 6],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-teal-500/20 rounded-2xl"
                animate={{
                  rotate: [-6, -3, -6],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;