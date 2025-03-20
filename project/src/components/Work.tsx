import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X } from 'lucide-react';

type VideoCategory = 'all' | 'shorts' | 'documentaries' | 'restaurants' | 'real-estate' | 'posters' | 'thumbnails';

interface Media {
  id: string;
  title: string;
  category: VideoCategory;
  subCategory?: 'landscape' | 'portrait' | 'shorts' | 'regular';
  thumbnail: string;
  aspectRatio: '16:9' | '9:16';
  type: 'video' | 'image';
}

// Sample media data - replace thumbnails with actual content
const media: Media[] = [
  // Shorts/Reels (20 items)
  ...Array(20).fill(null).map((_, i) => ({
    id: `short-${i}`,
    title: `Short Video ${i + 1}`,
    category: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=1000',
    aspectRatio: '9:16',
    type: 'video',
  })),
  // Documentaries (16 items)
  ...Array(16).fill(null).map((_, i) => ({
    id: `doc-${i}`,
    title: `Documentary ${i + 1}`,
    category: 'documentaries',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000&h=600',
    aspectRatio: '16:9',
    type: 'video',
  })),
  // Restaurants (12 items)
  ...Array(12).fill(null).map((_, i) => ({
    id: `rest-${i}`,
    title: `Restaurant Video ${i + 1}`,
    category: 'restaurants',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000&h=600',
    aspectRatio: '16:9',
    type: 'video',
  })),
  // Real Estate (12 items - 6 portrait, 6 landscape)
  ...Array(6).fill(null).map((_, i) => ({
    id: `estate-portrait-${i}`,
    title: `Real Estate Portrait Video ${i + 1}`,
    category: 'real-estate',
    subCategory: 'portrait',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1080&h=1920',
    aspectRatio: '9:16',
    type: 'video',
  })),
  ...Array(6).fill(null).map((_, i) => ({
    id: `estate-landscape-${i}`,
    title: `Real Estate Landscape Video ${i + 1}`,
    category: 'real-estate',
    subCategory: 'landscape',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920&h=1080',
    aspectRatio: '16:9',
    type: 'video',
  })),
  // Posters - Landscape (8 items)
  ...Array(8).fill(null).map((_, i) => ({
    id: `poster-landscape-${i}`,
    title: `Landscape Poster ${i + 1}`,
    category: 'posters',
    subCategory: 'landscape',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000&h=600',
    aspectRatio: '16:9',
    type: 'image',
  })),
  // Posters - Portrait (8 items)
  ...Array(8).fill(null).map((_, i) => ({
    id: `poster-portrait-${i}`,
    title: `Portrait Poster ${i + 1}`,
    category: 'posters',
    subCategory: 'portrait',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=1000',
    aspectRatio: '9:16',
    type: 'image',
  })),
  // Thumbnails - Portrait Format (4 items)
  ...Array(4).fill(null).map((_, i) => ({
    id: `thumbnail-portrait-${i}`,
    title: `Portrait Thumbnail ${i + 1}`,
    category: 'thumbnails',
    subCategory: 'portrait',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=1000',
    aspectRatio: '9:16',
    type: 'image',
  })),
  // Thumbnails - Landscape Format (8 items)
  ...Array(8).fill(null).map((_, i) => ({
    id: `thumbnail-landscape-${i}`,
    title: `Landscape Thumbnail ${i + 1}`,
    category: 'thumbnails',
    subCategory: 'landscape',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000&h=600',
    aspectRatio: '16:9',
    type: 'image',
  })),
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'shorts', label: 'Shorts/Reels' },
  { id: 'documentaries', label: 'Documentaries' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'posters', label: 'Posters' },
  { id: 'thumbnails', label: 'Thumbnails' },
] as const;

const Work = () => {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const filteredMedia = media.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const handleMediaClick = (item: Media) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const renderSectionTitle = (subCategory: string, count: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full mb-4 mt-8 first:mt-0"
    >
      <h3 className="text-xl font-semibold text-white/90 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" />
        {subCategory} <span className="text-white/50 text-sm">({count} items)</span>
      </h3>
    </motion.div>
  );

  const renderGrid = () => {
    if (activeCategory === 'real-estate') {
      const portraitVideos = filteredMedia.filter(item => item.subCategory === 'portrait');
      const landscapeVideos = filteredMedia.filter(item => item.subCategory === 'landscape');

      return (
        <>
          {renderSectionTitle('Portrait Format (1080x1920)', portraitVideos.length)}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {portraitVideos.map(renderMediaItem)}
          </div>

          {renderSectionTitle('Landscape Format (1920x1080)', landscapeVideos.length)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landscapeVideos.map(renderMediaItem)}
          </div>
        </>
      );
    }

    if (activeCategory === 'posters') {
      const landscapePosters = filteredMedia.filter(item => item.subCategory === 'landscape');
      const portraitPosters = filteredMedia.filter(item => item.subCategory === 'portrait');

      return (
        <>
          {renderSectionTitle('Landscape Posters', landscapePosters.length)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {landscapePosters.map(renderMediaItem)}
          </div>

          {renderSectionTitle('Portrait Posters', portraitPosters.length)}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {portraitPosters.map(renderMediaItem)}
          </div>
        </>
      );
    }

    if (activeCategory === 'thumbnails') {
      const portraitThumbnails = filteredMedia.filter(item => item.subCategory === 'portrait');
      const landscapeThumbnails = filteredMedia.filter(item => item.subCategory === 'landscape');

      return (
        <>
          {renderSectionTitle('Portrait Format (1080x1920)', portraitThumbnails.length)}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {portraitThumbnails.map(renderMediaItem)}
          </div>

          {renderSectionTitle('Landscape Format (1920x1080)', landscapeThumbnails.length)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {landscapeThumbnails.map(renderMediaItem)}
          </div>
        </>
      );
    }

    return (
      <div className={`grid gap-6 ${
        activeCategory === 'shorts' || 
        (activeCategory === 'all' && filteredMedia[0]?.aspectRatio === '9:16')
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {filteredMedia.map(renderMediaItem)}
      </div>
    );
  };

  const renderMediaItem = (item: Media) => (
    <motion.div
      key={item.id}
      layoutId={item.id}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 p-1"
      whileHover={{ scale: 1.02 }}
      onClick={() => handleMediaClick(item)}
    >
      <div className={`relative overflow-hidden rounded-lg cursor-pointer ${
        item.aspectRatio === '9:16' ? 'pt-[177.77%]' : 'pt-[56.25%]'
      }`}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
          >
            {item.type === 'video' ? (
              <Play className="w-6 h-6" />
            ) : (
              <Maximize2 className="w-6 h-6" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="work" className="min-h-screen bg-[#1A1A1A] py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => setActiveCategory(id as VideoCategory)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative group
                  ${activeCategory === id 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg shadow-teal-500/20' 
                    : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                {activeCategory === id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Media Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderGrid()}
            </motion.div>
          </AnimatePresence>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-200 z-50"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Image Container with Aspect Ratio Handling */}
                  <div className={`relative max-w-full max-h-full ${
                    selectedMedia.aspectRatio === '9:16'
                      ? 'w-auto h-[90vh]' // For portrait images
                      : 'w-[90vw] h-auto' // For landscape images
                  }`}>
                    <img
                      src={selectedMedia.thumbnail}
                      alt={selectedMedia.title}
                      className={`w-full h-full ${
                        selectedMedia.aspectRatio === '9:16'
                          ? 'object-contain'
                          : 'object-contain rounded-lg'
                      }`}
                    />

                    {/* Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 backdrop-blur-sm">
                      <h3 className="text-white font-semibold text-lg">
                        {selectedMedia.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {selectedMedia.aspectRatio === '9:16' ? '1080×1920' : '1920×1080'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;