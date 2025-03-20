import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Check, 
  Clock, 
  Music, 
  Crown, 
  Sparkles,
  Rocket,
  MessageCircle
} from 'lucide-react';
import HireDialog from './HireDialog';

const WhyHireMe = () => {
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);

  const comparisonData = [
    {
      ordinary: { text: 'Say they are "experienced" but lack creativity!', detail: 'Just basic editing skills' },
      f2bhai: { text: 'Experience + Creativity + Market Trend Analysis!', detail: 'Proven track record of viral content' }
    },
    {
      ordinary: { text: 'Use the same text style in every video!', detail: 'Generic and boring' },
      f2bhai: { text: 'Custom text styling based on video theme & branding!', detail: 'Each project gets unique treatment' }
    },
    {
      ordinary: { text: 'Lie about their skills – Fake Promises!', detail: 'Overpromise and underdeliver' },
      f2bhai: { text: 'Honest Work Ethic – What you see is what you get!', detail: 'Portfolio reflects actual capabilities' }
    },
    {
      ordinary: { text: 'Lazy editing – Same templates, no uniqueness!', detail: 'Copy-paste approach' },
      f2bhai: { text: 'Handcrafted edits with unique transitions & effects!', detail: 'Every project is a masterpiece' }
    },
    {
      ordinary: { text: 'No research, no storytelling, just basic cuts!', detail: 'Missing the emotional connect' },
      f2bhai: { text: 'Deep research & compelling storytelling in every video!', detail: 'Engaging content that converts' }
    },
    {
      ordinary: { text: 'Late delivery & zero communication!', detail: 'Ghost you after taking the project' },
      f2bhai: { text: 'Ultra-Fast Delivery + 24/7 Communication Support!', detail: 'Always available for updates' }
    },
    {
      ordinary: { text: 'No extra perks – You pay for everything!', detail: 'Hidden costs add up quickly' },
      f2bhai: { text: 'FREE Premium Bonuses (Worth Over $500!)', detail: 'All-inclusive premium service' }
    },
    {
      ordinary: { text: 'Generic editing style for all niches', detail: 'One-size-fits-all approach' },
      f2bhai: { text: 'Custom Brand-Specific Editing', detail: 'Tailored to your unique brand identity' }
    }
  ];

  const benefits = [
    {
      icon: Music,
      title: 'FREE Premium Epidemic Sound Subscription!',
      description: 'Worth $150/yr – Yours FREE! Access to millions of premium tracks.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Crown,
      title: 'FREE Access to Any Paid Software',
      description: "After your first project, get any software you need at no extra cost!",
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Lifetime VIP Client Support',
      description: "Work with me once, and you'll always have priority access!",
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sparkles,
      title: '100% Transparency Guarantee',
      description: "No Lies, No Fake Promises, Just Premium Work!",
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Why Hire F2 Bhai?
            </span>
            <span className="text-white"> (Not Just Another Editor!)</span>
          </h2>
          <p className="text-white/60 text-lg">
            Others vs. F2 Bhai – See the Difference!
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-16"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-red-500/10 rounded-xl">
              <h3 className="text-xl font-semibold text-red-500 mb-2 flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                Ordinary Editors
              </h3>
            </div>
            <div className="text-center p-4 bg-emerald-500/10 rounded-xl">
              <h3 className="text-xl font-semibold text-emerald-500 mb-2 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Work with F2 Bhai & Level Up!
              </h3>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-red-500">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{item.ordinary.text}</span>
                  </div>
                  {item.ordinary.detail && (
                    <p className="text-white/40 text-sm mt-1 ml-7">{item.ordinary.detail}</p>
                  )}
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{item.f2bhai.text}</span>
                  </div>
                  {item.f2bhai.detail && (
                    <p className="text-white/40 text-sm mt-1 ml-7">{item.f2bhai.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extra Benefits Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3"
          >
            <span className="text-yellow-500">🎁</span>
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              EXTRA BENEFITS – JUST FOR YOU!
            </span>
            <span className="text-yellow-500">💥</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            Work with F2 Bhai & Unlock Premium Bonuses! 🎯🔥
          </motion.p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 group hover:bg-white/10 transition-all duration-300"
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/60 text-lg mb-6">
            <Rocket className="inline-block w-5 h-5 mr-2" />
            Want to take your content to the NEXT LEVEL? Let's talk! 🔥
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setIsHireDialogOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
            >
              <span>Hire Me Now</span>
              <MessageCircle className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setIsHireDialogOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
            >
              <span>Let's Discuss Your Project</span>
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <HireDialog 
        isOpen={isHireDialogOpen}
        onClose={() => setIsHireDialogOpen(false)}
      />
    </section>
  );
};

export default WhyHireMe;