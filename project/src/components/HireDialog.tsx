import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Send, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Rnd } from 'react-rnd';
import CountryCodeSelector from './CountryCodeSelector';

interface HireDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

const socialPlatforms = ['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Others'];
const services = [
  'Shorts/Reels',
  'Documentaries',
  'Restaurants',
  'Real Estate',
  'Posters',
  'Thumbnails',
  'Script Writing'
];

const HireDialog: React.FC<HireDialogProps> = ({ isOpen, onClose, selectedService }) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isWhatsappRevealed, setIsWhatsappRevealed] = useState(false);
  const [platform, setPlatform] = useState(socialPlatforms[0]);
  const [service, setService] = useState(selectedService || services[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMaximized, setIsMaximized] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneLength, setPhoneLength] = useState(10);
  const [isFormValid, setIsFormValid] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = email.trim() !== '' && 
                   whatsapp.length === phoneLength &&
                   platform !== '' &&
                   service !== '';
    setIsFormValid(isValid);
  }, [email, whatsapp, platform, service, phoneLength]);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll when dialog is closed
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!whatsapp) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (whatsapp.length !== phoneLength) {
      newErrors.whatsapp = `Please enter a valid ${phoneLength}-digit number`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setErrors({});
    setEmail('');
    setWhatsapp('');
    setPlatform(socialPlatforms[0]);
    setService(services[0]);
    setIsWhatsappRevealed(false);
    onClose();
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className={`bg-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden relative max-w-md w-full mx-auto ${
              isMobile ? 'max-h-[90vh]' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 relative">
              <div className="absolute right-4 top-4 flex items-center space-x-2">
                <button
                  onClick={toggleMaximize}
                  className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                >
                  {isMaximized ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0-4l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white">Let's Work Together</h2>
              <p className="text-white/80 mt-2">Fill in your details and we'll get back to you soon!</p>
            </div>

            <div className={`${isMobile ? 'max-h-[calc(90vh-120px)] overflow-y-auto' : ''}`}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* WhatsApp Input with Country Code */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">WhatsApp Number</label>
                    <div className="relative">
                      <div className="flex">
                        <CountryCodeSelector
                          value={countryCode}
                          onChange={(dialCode, length) => {
                            setCountryCode(dialCode);
                            setPhoneLength(length);
                            setWhatsapp(''); // Clear number when country changes
                          }}
                        />
                        <div className="relative flex-1 ml-2">
                          {isWhatsappRevealed ? (
                            <input
                              type="tel"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, phoneLength))}
                              className={`w-full bg-white/5 border ${
                                errors.whatsapp ? 'border-red-500' : 'border-white/10'
                              } rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                              placeholder={`${phoneLength}-digit number`}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsWhatsappRevealed(true)}
                              className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/80 hover:bg-white/10 transition-colors"
                            >
                              <span>Click to reveal input</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      {errors.whatsapp && (
                        <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                      )}
                    </div>
                  </div>

                  {/* Social Platform Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Social Platform</label>
                    <div className="relative">
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-10"
                      >
                        {socialPlatforms.map((p) => (
                          <option key={p} value={p} className="bg-[#1A1A1A]">
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Required Service</label>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-10"
                      >
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-[#1A1A1A]">
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    whileHover={isFormValid ? { scale: 1.02 } : {}}
                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                    className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg px-6 py-3 font-medium flex items-center justify-center gap-2 mt-6 transition-opacity duration-300 ${
                      !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Submit Request</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Thank you for choosing the best decision that changes Your life and your brand value.
                  </h3>
                  <p className="text-white/60 mb-6">
                    Our team will reach out to you within 1-2 days. If need urgently, than plese send a WhatsApp message with "Hi" to{' '}
                    <a
                      href="https://wa.me/919643078583"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      +91 9643078583
                    </a>
                    , and you will be contacted within an hour.
                  </p>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 text-white rounded-lg px-6 py-3 font-medium hover:bg-white/20 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HireDialog;