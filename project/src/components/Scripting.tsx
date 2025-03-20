import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Maximize2, X, BookOpen, Film, Video, Tv, Mic, Presentation, FileQuestion } from 'lucide-react';

type ScriptCategory = 'all' | 'commercial' | 'documentary' | 'short-film' | 'podcast' | 'presentation';

interface Script {
  id: string;
  title: string;
  category: ScriptCategory;
  description: string;
  thumbnail: string;
  client?: string;
  date: string;
  excerpt: string;
}

// Sample script data
const scripts: Script[] = [
  {
    id: 'script-1',
    title: 'Eco-Friendly Product Launch',
    category: 'commercial',
    description: 'A 60-second commercial script for a sustainable product line, highlighting eco-friendly features and benefits.',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
    client: 'GreenEarth Products',
    date: 'March 2023',
    excerpt: 'FADE IN: Close-up of a water droplet falling onto a leaf. The droplet sparkles in the sunlight.\n\nVOICEOVER (warm, engaging): "Nature has always known the answer..."\n\nWIDE SHOT: A family using eco-friendly cleaning products in their home, smiling.'
  },
  {
    id: 'script-2',
    title: 'Wildlife Conservation Documentary',
    category: 'documentary',
    description: 'A documentary script exploring wildlife conservation efforts in Southeast Asia, featuring interviews with local conservationists.',
    thumbnail: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?auto=format&fit=crop&q=80&w=1000',
    client: 'Nature Channel',
    date: 'January 2023',
    excerpt: 'FADE IN: Aerial shot of lush rainforest canopy, morning mist rising.\n\nNARRATOR: "The forests of Southeast Asia are home to some of the world\'s most endangered species..."\n\nCUT TO: Close-up of a critically endangered Sumatran tiger moving silently through dense foliage.'
  },
  {
    id: 'script-3',
    title: 'The Last Letter',
    category: 'short-film',
    description: 'A poignant short film script about a person discovering an unsent letter from a deceased loved one, exploring themes of regret and closure.',
    thumbnail: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?auto=format&fit=crop&q=80&w=1000',
    date: 'November 2022',
    excerpt: 'INT. ATTIC - EVENING\n\nDust particles dance in the beam of light from a small window. MAYA (30s) opens an old wooden chest, her fingers trembling slightly.\n\nMAYA finds a bundle of letters tied with a faded ribbon. She notices one envelope, unsealed, addressed but never sent.'
  },
  {
    id: 'script-4',
    title: 'Future of AI Technology',
    category: 'podcast',
    description: 'A script for a tech podcast episode discussing the ethical implications and future developments of artificial intelligence.',
    thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&q=80&w=1000',
    client: 'Tech Insights Podcast',
    date: 'April 2023',
    excerpt: 'HOST: "Welcome to another episode of Tech Insights. Today we\'re diving into the fascinating and sometimes concerning world of artificial intelligence. I\'m joined by Dr. Sarah Chen, an AI ethics researcher..."\n\nDR. CHEN: "Thank you for having me. I think it\'s crucial that we have these conversations about AI development in public forums..."'
  },
  {
    id: 'script-5',
    title: 'Startup Pitch Deck',
    category: 'presentation',
    description: 'A compelling script for a startup pitch presentation, structured to engage investors and clearly communicate the business value proposition.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
    client: 'NovaTech Startup',
    date: 'February 2023',
    excerpt: 'SLIDE 1: [Company Logo]\n\nPRESENTER: "Imagine a world where data analysis is accessible to everyone, not just technical experts. That\'s the world NovaTech is creating."\n\nSLIDE 2: [Problem Statement]\n\nPRESENTER: "Today, 78% of small businesses struggle with data-driven decision making due to complex analytics tools..."'
  },
  {
    id: 'script-6',
    title: 'Mountain Expedition',
    category: 'documentary',
    description: 'A documentary script following a team of climbers attempting to summit one of the world\'s most challenging peaks.',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    date: 'December 2022',
    excerpt: 'FADE IN: Extreme wide shot of jagged mountain peaks against a dawn sky.\n\nNARRATOR: "For centuries, humans have been drawn to the impossible. And few things embody the impossible like the savage beauty of the world\'s highest mountains."\n\nCUT TO: Close-up of ALEX (40s), expedition leader, checking equipment, his weathered face telling stories of previous climbs.'
  },
  {
    id: 'script-7',
    title: 'New Smartphone Launch',
    category: 'commercial',
    description: 'A dynamic script for a smartphone launch commercial highlighting innovative features and sleek design.',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    client: 'TechPro Mobile',
    date: 'May 2023',
    excerpt: 'FADE IN: Extreme close-up of a human eye, reflecting light.\n\nVOICEOVER (confident, smooth): "We see the world differently..."\n\nPULL BACK to reveal a person using the new smartphone camera to capture a stunning sunset. The interface is sleek, minimal.'
  },
  {
    id: 'script-8',
    title: 'Childhood Memories',
    category: 'short-film',
    description: 'A nostalgic short film script exploring how childhood memories shape adult identity, told through parallel timelines.',
    thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?auto=format&fit=crop&q=80&w=1000',
    date: 'August 2022',
    excerpt: 'FADE IN:\n\nINT. CHILDHOOD BEDROOM - 1995 - DAY\n\nA sunlit room filled with toys, posters, and the treasures of childhood. YOUNG EMMA (8) sits on the floor, carefully drawing in a sketchbook.\n\nCUT TO:\n\nINT. APARTMENT - PRESENT DAY\n\nEMMA (35) unpacks a box labeled "Mom\'s House." She pulls out the same sketchbook, now worn and faded.'
  },
  {
    id: 'script-9',
    title: 'Health & Wellness Series',
    category: 'podcast',
    description: 'A script for a wellness podcast series focusing on holistic approaches to mental and physical health.',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    client: 'Mindful Living Network',
    date: 'June 2023',
    excerpt: 'HOST: "Welcome to Mindful Living. I\'m your host, Dr. James Wilson. Today we\'re exploring the connection between nutrition and mental health with nutritional psychiatrist Dr. Maya Patel."\n\nSOUND EFFECT: Gentle transition music\n\nDR. PATEL: "Thank you for having me, James. This is such an important topic that doesn\'t get enough attention..."'
  },
  {
    id: 'script-10',
    title: 'Annual Investor Meeting',
    category: 'presentation',
    description: 'A comprehensive script for an annual investor meeting, balancing technical financial information with compelling company vision.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    client: 'Global Investments Inc.',
    date: 'April 2023',
    excerpt: 'CEO: "Good morning, everyone. Thank you for joining us for our annual investor meeting. Before we dive into the numbers, I want to take a moment to reflect on our journey this past year."\n\nSLIDE: [Year in Review - Key Milestones]\n\nCEO: "Despite market challenges, we\'ve achieved three major milestones that position us for strong future growth..."'
  },
  {
    id: 'script-11',
    title: 'Ocean Conservation',
    category: 'documentary',
    description: 'A documentary script exploring innovative ocean conservation efforts around the world and their impact on marine ecosystems.',
    thumbnail: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000',
    client: 'Ocean Alliance',
    date: 'July 2023',
    excerpt: 'FADE IN: Underwater shot of vibrant coral reef teeming with life.\n\nNARRATOR: "Our oceans cover more than 70% of our planet, yet we\'ve explored less than 5% of them. What we do know is that they\'re in danger."\n\nCUT TO: Time-lapse showing coral bleaching, the once colorful ecosystem turning ghostly white.'
  },
  {
    id: 'script-12',
    title: 'Electric Vehicle Revolution',
    category: 'commercial',
    description: 'A forward-thinking commercial script for a new electric vehicle, emphasizing sustainability without compromising on performance.',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a56bbc8df8c9?auto=format&fit=crop&q=80&w=1000',
    client: 'EcoMotors',
    date: 'March 2023',
    excerpt: 'FADE IN: Aerial shot of a winding coastal road at dawn.\n\nVOICEOVER (thoughtful, inspiring): "The road forward isn\'t always clear..."\n\nCUT TO: The sleek electric vehicle navigating the curves with precision, almost silently.\n\nVOICEOVER: "But sometimes, the right choice is."'
  }
];

const categories = [
  { id: 'all', label: 'All Scripts', icon: FileText },
  { id: 'commercial', label: 'Commercial', icon: Tv },
  { id: 'documentary', label: 'Documentary', icon: Film },
  { id: 'short-film', label: 'Short Film', icon: Video },
  { id: 'podcast', label: 'Podcast', icon: Mic },
  { id: 'presentation', label: 'Presentation', icon: Presentation }
] as const;

interface ScriptModalProps {
  script: Script;
  onClose: () => void;
}

const ScriptModal: React.FC<ScriptModalProps> = ({ script, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={script.thumbnail} 
            alt={script.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-200 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white">{script.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">
                {script.category.charAt(0).toUpperCase() + script.category.slice(1).replace('-', ' ')}
              </span>
              {script.client && (
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">
                  {script.client}
                </span>
              )}
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">
                {script.date}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white/90 mb-2">Description</h4>
            <p className="text-white/70">{script.description}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white/90 mb-2">Script Excerpt</h4>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-white/80 whitespace-pre-line text-sm leading-relaxed border border-white/10">
              {script.excerpt}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Scripting: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ScriptCategory>('all');
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  
  const filteredScripts = scripts.filter(
    script => activeCategory === 'all' || script.category === activeCategory
  );

  const getCategoryIcon = (categoryId: ScriptCategory) => {
    const category = categories.find(cat => cat.id === categoryId);
    const Icon = category?.icon || FileText;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <section id="scripting" className="min-h-screen bg-[#1A1A1A] py-20 px-4 relative overflow-hidden">
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

      <div className="container mx-auto max-w-7xl relative">
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
            <span className="text-white/60">Words that inspire</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Scripting & Storytelling
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Crafting compelling narratives across various formats, from commercial scripts to documentary storytelling. Each script is meticulously researched and tailored to engage the target audience.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveCategory(id as ScriptCategory)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative group flex items-center gap-2
                ${activeCategory === id 
                  ? 'text-white bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg shadow-teal-500/20' 
                  : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {activeCategory === id && (
                <motion.div
                  layoutId="activeScriptCategory"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Scripts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredScripts.map((script) => (
              <motion.div
                key={script.id}
                layoutId={script.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300"
                onClick={() => setSelectedScript(script)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={script.thumbnail}
                    alt={script.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    {getCategoryIcon(script.category)}
                    <span className="text-white/90 text-xs font-medium">
                      {script.category.charAt(0).toUpperCase() + script.category.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{script.title}</h3>
                    {script.client && (
                      <p className="text-white/70 text-sm line-clamp-1">Client: {script.client}</p>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                    >
                      <BookOpen className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-white/60 text-sm line-clamp-2">{script.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white/50 text-xs">{script.date}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-teal-500 hover:text-teal-400 flex items-center gap-1"
                    >
                      <span>Read excerpt</span>
                      <Maximize2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Script Modal */}
        <AnimatePresence>
          {selectedScript && (
            <ScriptModal 
              script={selectedScript} 
              onClose={() => setSelectedScript(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Scripting;