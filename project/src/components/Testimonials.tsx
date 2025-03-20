import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

// Client testimonials with real data
const testimonials: Testimonial[] = [
  { id: 1, name: "John Smith", location: "USA", role: "Business Owner", rating: 4, text: "I had the pleasure of working with F2 Bhai for video editing. His creativity and attention to detail are unmatched. His work has truly taken my projects to new heights, and I can always rely on him to bring out the best in my content.", image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Alice Johnson", location: "USA", role: "Content Creator", rating: 5, text: "F2 Bhai's scripting skills are incredible! He took my ideas and turned them into a well-structured, engaging script. His creativity and ability to capture the essence of my content is beyond impressive.", image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Robert Brown", location: "USA", role: "Business Owner", rating: 4, text: "F2 Bhai worked on creating an amazing reel for my business. His editing style is dynamic and engaging, and it helped boost my brand's visibility. His creativity knows no bounds.", image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Mary Davis", location: "USA", role: "Content Creator", rating: 4, text: "I recently worked with F2 Bhai on a documentary project, and I am blown away by his work. His ability to bring stories to life through editing is remarkable. He is highly professional and creative.", image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Michael Lee", location: "USA", role: "Business Owner", rating: 5, text: "F2 Bhai designed posters for my upcoming event, and the final designs were absolutely stunning. He perfectly captured the vision of the event. His creativity and attention to detail make him the go-to for all my design needs.", image: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Emily Wilson", location: "USA", role: "Content Creator", rating: 4, text: "F2 Bhai did an amazing job with my YouTube thumbnails. They are eye-catching and have definitely helped boost my click-through rates. His design skills are exceptional.", image: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "David Taylor", location: "USA", role: "Business Owner", rating: 4, text: "F2 Bhai's work on my real estate project has been outstanding. He created an engaging reel that highlights the best features of my properties. His editing is top-notch.", image: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Sarah Clark", location: "USA", role: "Content Creator", rating: 5, text: "Working with F2 Bhai on my scripted content was a breeze. He took my ideas and transformed them into a clear, concise, and captivating script. His attention to detail is impeccable.", image: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "William Harris", location: "USA", role: "Business Owner", rating: 4, text: "I collaborated with F2 Bhai on creating a reel for my restaurant, and the result was fantastic! His editing captured the essence of our brand, and the final video exceeded my expectations.", image: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "Linda Lewis", location: "USA", role: "Content Creator", rating: 5, text: "F2 Bhai's work on my documentary project was exceptional. He helped bring my vision to life with his editing expertise. The final product was impactful.", image: "https://i.pravatar.cc/150?img=10" },
  { id: 11, name: "James Robinson", location: "USA", role: "Business Owner", rating: 4, text: "I worked with F2 Bhai on creating a set of thumbnails for my website. The designs were creative, professional, and aligned perfectly with my brand.", image: "https://i.pravatar.cc/150?img=11" },
  { id: 12, name: "Jessica Walker", location: "USA", role: "Content Creator", rating: 4, text: "I hired F2 Bhai for scriptwriting, and he delivered a perfectly crafted script that captured my voice and message. He has an incredible ability to write engaging content that resonates with the audience.", image: "https://i.pravatar.cc/150?img=12" },
  { id: 13, name: "Daniel Scott", location: "USA", role: "Business Owner", rating: 5, text: "F2 Bhai helped me with editing a short video for my business. His attention to detail and creativity brought the video to life. I am extremely happy with the outcome and will be using his services again.", image: "https://i.pravatar.cc/150?img=13" },
  { id: 14, name: "Laura Hall", location: "USA", role: "Content Creator", rating: 4, text: "Working with F2 Bhai on my social media content was a fantastic experience. He created a visually striking poster that perfectly aligned with my branding. His work is always creative and professional.", image: "https://i.pravatar.cc/150?img=14" },
  { id: 15, name: "Kevin Allen", location: "USA", role: "Business Owner", rating: 4, text: "I had F2 Bhai design a thumbnail for my new product launch, and it was a hit! His design helped increase my click-through rate and drew in more customers.", image: "https://i.pravatar.cc/150?img=15" },
  { id: 16, name: "Olivia Young", location: "USA", role: "Content Creator", rating: 4, text: "F2 Bhai's scriptwriting for my upcoming video series was absolutely spot-on. He understood my vision and transformed it into a captivating script.", image: "https://i.pravatar.cc/150?img=16" },
  { id: 17, name: "Brian King", location: "USA", role: "Business Owner", rating: 5, text: "I hired F2 Bhai for video editing services for my business's promotional material, and the result was phenomenal. His work added a level of professionalism and creativity that helped elevate my content.", image: "https://i.pravatar.cc/150?img=17" },
  { id: 18, name: "Sophia Wright", location: "USA", role: "Content Creator", rating: 4, text: "F2 Bhai's work on my documentary project was exceptional. His editing skills helped tell the story in a unique and impactful way. I couldn't be more pleased with the final result.", image: "https://i.pravatar.cc/150?img=18" },
  { id: 19, name: "Ethan Martin", location: "USA", role: "Business Owner", rating: 4, text: "F2 Bhai edited an amazing commercial for my new product launch. The video was engaging and perfectly highlighted the features of the product.", image: "https://i.pravatar.cc/150?img=19" },
  { id: 20, name: "Charlotte Adams", location: "USA", role: "Content Creator", rating: 5, text: "F2 Bhai helped me with scriptwriting for a recent project. He delivered an engaging and impactful script that brought my ideas to life.", image: "https://i.pravatar.cc/150?img=20" },
  
  // Indian testimonials
  { id: 21, name: "Priya Sharma", location: "India", role: "Business Owner", rating: 5, text: "I had F2 Bhai work on a video advertisement for my business, and it was outstanding! His editing was flawless, and the video really captured the essence of my brand.", image: "https://i.pravatar.cc/150?img=21" },
  { id: 22, name: "Amit Kumar", location: "India", role: "Content Creator", rating: 4, text: "F2 Bhai helped me with scripting for my content, and he did an amazing job. The script was perfectly aligned with my audience, and it made my content much more engaging.", image: "https://i.pravatar.cc/150?img=22" },
  { id: 23, name: "Ravi Patel", location: "India", role: "Business Owner", rating: 5, text: "I had the pleasure of working with F2 Bhai for video editing. His work helped me elevate the promotional content for my restaurant. The final video was vibrant and professional.", image: "https://i.pravatar.cc/150?img=23" },
  { id: 24, name: "Anjali Verma", location: "India", role: "Content Creator", rating: 4, text: "F2 Bhai's scripting skills are top-notch. He created a script that was engaging, informative, and perfectly matched my tone.", image: "https://i.pravatar.cc/150?img=24" },
  { id: 25, name: "Sanjay Gupta", location: "India", role: "Business Owner", rating: 4, text: "F2 Bhai designed a flyer for my business event, and I was impressed by the results. The flyer was visually appealing and effectively communicated the event's key details.", image: "https://i.pravatar.cc/150?img=25" },
  { id: 26, name: "Neha Desai", location: "India", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting was incredible. He captured the exact tone and message I wanted to convey. The final script was both engaging and entertaining.", image: "https://i.pravatar.cc/150?img=26" },
  { id: 27, name: "Vikram Reddy", location: "India", role: "Business Owner", rating: 5, text: "I hired F2 Bhai for video editing for my real estate project, and I was impressed with the final video. His editing skills showcased my properties beautifully.", image: "https://i.pravatar.cc/150?img=27" },
  { id: 28, name: "Simran Singh", location: "India", role: "Content Creator", rating: 4, text: "F2 Bhai's scriptwriting services were fantastic. He helped me craft a script that was both creative and concise. It added great value to my content.", image: "https://i.pravatar.cc/150?img=28" },
  { id: 29, name: "Rahul Mehta", location: "India", role: "Business Owner", rating: 5, text: "F2 Bhai helped me with editing a promotional video for my business. The video turned out amazing, and his attention to detail was excellent.", image: "https://i.pravatar.cc/150?img=29" },
  { id: 30, name: "Kiran Chauhan", location: "India", role: "Content Creator", rating: 5, text: "I worked with F2 Bhai for scripting a recent video, and the result was impressive. His writing captured the essence of the project and made it very engaging.", image: "https://i.pravatar.cc/150?img=30" },
  { id: 31, name: "Sunil Kumar", location: "India", role: "Business Owner", rating: 5, text: "F2 Bhai created a fantastic poster for my event, and I couldn't be happier with the result. His creativity and attention to detail made the poster stand out.", image: "https://i.pravatar.cc/150?img=31" },
  { id: 32, name: "Pooja Mishra", location: "India", role: "Content Creator", rating: 4, text: "I had F2 Bhai write a script for a video series, and his work was exceptional. The script was perfectly tailored to my audience and kept them engaged.", image: "https://i.pravatar.cc/150?img=32" },
  
  // European testimonials
  { id: 33, name: "Luca Rossi", location: "Italy", role: "Content Creator", rating: 4, text: "F2 Bhai's scripting for my content was outstanding. He delivered an engaging script that was perfectly aligned with my brand's voice.", image: "https://i.pravatar.cc/150?img=33" },
  { id: 34, name: "Maria Gonzalez", location: "Spain", role: "Business Owner", rating: 5, text: "F2 Bhai created an amazing promotional video for my business. His editing skills helped convey the message clearly and effectively.", image: "https://i.pravatar.cc/150?img=34" },
  { id: 35, name: "Julian Weber", location: "Germany", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting skills are exceptional. He took my ideas and turned them into a clear, engaging script that worked perfectly for my audience.", image: "https://i.pravatar.cc/150?img=35" },
  { id: 36, name: "Clara Müller", location: "France", role: "Business Owner", rating: 4, text: "F2 Bhai designed an eye-catching promotional flyer for my business, and it really helped drive attention to my brand.", image: "https://i.pravatar.cc/150?img=36" },
  { id: 37, name: "Liam O'Connor", location: "Ireland", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting services helped me create engaging and memorable content. His creativity and attention to detail helped improve my scripts.", image: "https://i.pravatar.cc/150?img=37" },
  { id: 38, name: "Sophie Moreau", location: "France", role: "Business Owner", rating: 5, text: "F2 Bhai helped me with a promotional video for my brand, and the results were fantastic. His editing really helped my message stand out.", image: "https://i.pravatar.cc/150?img=38" },
  { id: 39, name: "Charlotte Dupont", location: "France", role: "Content Creator", rating: 4, text: "I worked with F2 Bhai on scriptwriting for my content, and he did an amazing job. His scripts are always engaging and on point.", image: "https://i.pravatar.cc/150?img=39" },
  { id: 40, name: "Amélie Lemoine", location: "Italy", role: "Business Owner", rating: 4, text: "F2 Bhai's video editing skills helped me create a stunning video for my business. The final product exceeded my expectations.", image: "https://i.pravatar.cc/150?img=40" },
  
  // Canadian testimonials
  { id: 41, name: "Lucas Tremblay", location: "Montreal, Canada", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting for my video was exceptional. He captured my brand's voice perfectly and created an engaging narrative.", image: "https://i.pravatar.cc/150?img=41" },
  { id: 42, name: "Emma Wilson", location: "Toronto, Canada", role: "Business Owner", rating: 4, text: "I hired F2 Bhai for video editing, and I'm extremely satisfied with the results. His work is professional and creative.", image: "https://i.pravatar.cc/150?img=42" },
  { id: 43, name: "William Chen", location: "Vancouver, Canada", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting services are top-notch. He helped me create content that resonates with my audience.", image: "https://i.pravatar.cc/150?img=43" },
  { id: 44, name: "Oliver Roy", location: "Calgary, Canada", role: "Business Owner", rating: 5, text: "F2 Bhai edited a promotional video for my business, and the results were outstanding. His attention to detail is impressive.", image: "https://i.pravatar.cc/150?img=44" },
  
  // Middle East testimonials
  { id: 45, name: "Mohammed Al-Farsi", location: "Dubai, UAE", role: "Content Creator", rating: 4, text: "F2 Bhai's scriptwriting service was a game-changer for my content. He helped me create a captivating script that kept my audience hooked.", image: "https://i.pravatar.cc/150?img=45" },
  { id: 46, name: "Ahmed Al-Sayed", location: "Dubai, UAE", role: "Business Owner", rating: 5, text: "F2 Bhai helped me create a promotional video for my business. The final video was creative, professional, and aligned perfectly with my brand.", image: "https://i.pravatar.cc/150?img=46" },
  { id: 47, name: "Sarah Al-Mansoori", location: "Dubai, UAE", role: "Content Creator", rating: 5, text: "F2 Bhai's scriptwriting helped me craft an engaging story for my content. The script was clear, concise, and held the attention of my audience.", image: "https://i.pravatar.cc/150?img=47" },
  { id: 48, name: "Mariam Al-Shamsi", location: "Dubai, UAE", role: "Business Owner", rating: 5, text: "I hired F2 Bhai for video editing for my business, and the results were fantastic. The video was professional, and I received positive feedback from my clients.", image: "https://i.pravatar.cc/150?img=48" },
  { id: 49, name: "Hassan Ali", location: "Dubai, UAE", role: "Content Creator", rating: 5, text: "F2 Bhai's scripting services helped me create a captivating story for my content. He understood my vision and helped bring it to life.", image: "https://i.pravatar.cc/150?img=49" },
  { id: 50, name: "Fatima Zahra", location: "Dubai, UAE", role: "Business Owner", rating: 5, text: "F2 Bhai helped me with editing a promotional video for my business, and the video turned out great. It truly captured the essence of my brand.", image: "https://i.pravatar.cc/150?img=50" },
  { id: 51, name: "Rami Al-Sabah", location: "Dubai, UAE", role: "Content Creator", rating: 5, text: "I worked with F2 Bhai on scriptwriting, and his work was incredible. He helped me craft a script that perfectly aligned with my message.", image: "https://i.pravatar.cc/150?img=51" },
];

const Testimonials = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrame: number;
    let lastTimestamp = 0;
    let position = 0;

    const animate = (timestamp: number) => {
      if (!isPaused) {
        const elapsed = timestamp - lastTimestamp;
        
        // Slow, gentle movement - very slow speed
        position -= elapsed * 0.01; // Right to left movement - very slow

        // Reset position when enough items have scrolled by
        const carouselWidth = carousel.scrollWidth / 2;
        
        if (Math.abs(position) >= carouselWidth) position = 0;

        carousel.style.transform = `translateX(${position}px)`;
        lastTimestamp = timestamp;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-20 bg-[#0A0A14] relative overflow-hidden">
      {/* Enhanced Heart-Shaped Background with Glowing Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Left Heart Circle */}
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[60px]"
          style={{ 
            left: 'calc(50% - 20vw - 10vw)', 
            top: 'calc(50% - 20vw + 5vw)' 
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Right Heart Circle */}
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 blur-[60px]"
          style={{ 
            left: 'calc(50% - 20vw + 10vw)', 
            top: 'calc(50% - 20vw + 5vw)' 
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        
        {/* Heart Outline SVG */}
        <svg 
          className="absolute w-full h-full max-w-[1200px] max-h-[800px]" 
          viewBox="0 0 1200 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.3 }}
        >
          <motion.path 
            d="M600 700C600 700 900 400 1100 400C1300 400 1300 600 1100 700C900 800 600 700 600 700ZM600 700C600 700 300 400 100 400C-100 400 -100 600 100 700C300 800 600 700 600 700Z" 
            stroke="url(#heartGradient)" 
            strokeWidth="2"
            fill="none"
            animate={{
              strokeDasharray: ["0 1500", "1500 0"],
              strokeDashoffset: [1500, 0],
              opacity: [0, 1],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Subtle Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [null, 0],
                scale: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      </div>

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

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full"
        >
          <span className="text-white/60">Wall of love</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
            Loved by thinkers
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg"
        >
          Here's what people are saying about us
        </motion.p>
      </div>

      {/* Single Row Testimonials */}
      <div className="relative">
        {/* Single Row - Right to Left (slow) */}
        <div className="relative overflow-hidden py-8">
          <div
            ref={carouselRef}
            className="flex gap-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Duplicate all testimonials to create a seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`testimonial-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A14] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A14] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

// Separate TestimonialCard component for better organization
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  // Function to highlight "F2 Bhai" in the text
  const renderHighlightedText = (text: string) => {
    const parts = text.split(/(F2 Bhai)/g);
    return parts.map((part, index) => 
      part === "F2 Bhai" ? 
        <span key={index} className="text-blue-400">{part}</span> : 
        part
    );
  };

  return (
    <motion.div
      className="testimonial-item flex-shrink-0 w-[300px] md:w-[350px] bg-white/5 backdrop-blur-lg rounded-2xl p-6 relative group"
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl" />
      
      {/* Glow Effect on Hover */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ 
          boxShadow: [
            "0 0 0px rgba(56, 189, 248, 0)",
            "0 0 20px rgba(56, 189, 248, 0.3)",
            "0 0 0px rgba(56, 189, 248, 0)"
          ]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(56, 189, 248, 0)",
                  "0 0 10px rgba(56, 189, 248, 0.5)",
                  "0 0 0px rgba(56, 189, 248, 0)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">{testimonial.name}</h3>
            <p className="text-white/60 text-sm">{testimonial.role}, {testimonial.location}</p>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-white/80 mb-4">"{renderHighlightedText(testimonial.text)}"</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5).fill(null).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < testimonial.rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

export default Testimonials;