import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, FileText, Download, Check } from 'lucide-react';

interface Script {
  id: string;
  title: string;
  category: string;
  filename: string;
}

const scripts: Script[] = [
  {
    id: 'script-1',
    title: 'Eco-Friendly Product Launch',
    category: 'Commercial',
    filename: 'eco-friendly-product-launch.pdf'
  },
  {
    id: 'script-2',
    title: 'Wildlife Conservation Documentary',
    category: 'Documentary',
    filename: 'wildlife-conservation.pdf'
  },
  {
    id: 'script-3',
    title: 'The Last Letter',
    category: 'Short Film',
    filename: 'the-last-letter.pdf'
  },
  {
    id: 'script-4',
    title: 'Future of AI Technology',
    category: 'Podcast',
    filename: 'future-of-ai.pdf'
  },
  {
    id: 'script-5',
    title: 'Startup Pitch Deck',
    category: 'Presentation',
    filename: 'startup-pitch.pdf'
  },
  {
    id: 'script-6',
    title: 'Mountain Expedition',
    category: 'Documentary',
    filename: 'mountain-expedition.pdf'
  },
  {
    id: 'script-7',
    title: 'New Smartphone Launch',
    category: 'Commercial',
    filename: 'smartphone-launch.pdf'
  },
  {
    id: 'script-8',
    title: 'Childhood Memories',
    category: 'Short Film',
    filename: 'childhood-memories.pdf'
  },
  {
    id: 'script-9',
    title: 'Health & Wellness Series',
    category: 'Podcast',
    filename: 'health-wellness.pdf'
  },
  {
    id: 'script-10',
    title: 'Annual Investor Meeting',
    category: 'Presentation',
    filename: 'investor-meeting.pdf'
  },
  {
    id: 'script-11',
    title: 'Ocean Conservation',
    category: 'Documentary',
    filename: 'ocean-conservation.pdf'
  },
  {
    id: 'script-12',
    title: 'Electric Vehicle Revolution',
    category: 'Commercial',
    filename: 'ev-revolution.pdf'
  }
];

const ScriptDownloads: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownload = (script: Script) => {
    if (downloadingId || downloadedIds.includes(script.id)) return;
    
    setDownloadingId(script.id);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => [...prev, script.id]);
      
      // Create a fake download link
      const link = document.createElement('a');
      link.href = `/scripts/${script.filename}`;
      link.download = script.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset downloaded status after 3 seconds
      setTimeout(() => {
        setDownloadedIds(prev => prev.filter(id => id !== script.id));
      }, 3000);
    }, 800);
  };

  return (
    <section id="scripts" className="min-h-screen bg-[#1A1A1A] py-20 relative overflow-hidden">
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full"
          >
            <span className="text-white/60">Creative writing</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Script Samples
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Download sample scripts to see my writing style and approach. Each script showcases different techniques and formats tailored to specific content types.
          </p>
        </motion.div>

        {/* Scripts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script, index) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              className="relative"
            >
              <motion.button
                className="w-full group flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                onMouseEnter={() => setHoveredId(script.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleDownload(script)}
                whileHover={{ y: -5 }}
                disabled={downloadingId === script.id || downloadedIds.includes(script.id)}
              >
                {/* Background Gradient on Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredId === script.id ? { 
                    boxShadow: [
                      "0 0 0px rgba(56, 189, 248, 0)",
                      "0 0 20px rgba(56, 189, 248, 0.3)",
                      "0 0 0px rgba(56, 189, 248, 0)"
                    ]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: hoveredId === script.id ? Infinity : 0,
                    repeatType: "loop" 
                  }}
                />
                
                {/* Content */}
                <div className="flex items-center flex-1 z-10">
                  <div className="mr-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {script.title}
                    </h3>
                    <p className="text-sm text-white/60">{script.category}</p>
                  </div>
                </div>
                
                {/* Download Icon */}
                <AnimatePresence mode="wait">
                  {downloadedIds.includes(script.id) ? (
                    <motion.div
                      key="downloaded"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="download"
                      className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white overflow-hidden"
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ 
                        scale: hoveredId === script.id || downloadingId === script.id ? 1 : 0.8,
                        opacity: hoveredId === script.id || downloadingId === script.id ? 1 : 0.5,
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        animate={downloadingId === script.id ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 1, repeat: downloadingId === script.id ? Infinity : 0, ease: "linear" }}
                      >
                        <FileDown className="w-5 h-5" />
                      </motion.div>
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={hoveredId === script.id ? {
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: hoveredId === script.id ? Infinity : 0,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 blur-xl" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Progress Indicator */}
                {downloadingId === script.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScriptDownloads;