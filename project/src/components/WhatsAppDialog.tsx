import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import { Rnd } from 'react-rnd';
import CountryCodeSelector from './CountryCodeSelector';

interface WhatsAppDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneLength, setPhoneLength] = useState(10); // Default for India
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: 20 });
  const [size, setSize] = useState({ width: 400, height: 'auto' });
  const [prevSize, setPrevSize] = useState({ width: 400, height: 'auto' });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        setSize({ width: window.innerWidth - 40, height: window.innerHeight - 40 });
        setPosition({ x: 20, y: 20 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMaximized]);

  const validatePhoneNumber = (number: string = phoneNumber) => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');

    if (cleanNumber.length === 0) {
      setError('Phone number is required');
      return false;
    }

    if (cleanNumber.length !== phoneLength) {
      setError(`Phone number must be exactly ${phoneLength} digits for the selected country`);
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber()) {
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRegistered(true);
    setIsLoading(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const cleanValue = value.replace(/\D/g, '');
    
    // Limit input length to the required phone length
    if (cleanValue.length <= phoneLength) {
      setPhoneNumber(cleanValue);
      
      if (cleanValue.length > 0) {
        validatePhoneNumber(cleanValue);
      } else {
        setError('');
      }
    }
  };

  const handleCountryChange = (dialCode: string, length: number) => {
    setCountryCode(dialCode);
    setPhoneLength(length);
    // Clear the phone number when country changes
    setPhoneNumber('');
    setError('');
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setSize(prevSize);
      setPosition(prevPosition);
    } else {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth - 40, height: window.innerHeight - 40 });
      setPosition({ x: 20, y: 20 });
    }
    setIsMaximized(!isMaximized);
  };

  const handleDragStop = (_e: any, d: { x: number; y: number }) => {
    setPosition({ x: d.x, y: d.y });
  };

  const handleResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: { x: number; y: number }) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
    setPosition(position);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <Rnd
            default={{
              x: position.x,
              y: position.y,
              width: size.width,
              height: size.height,
            }}
            minWidth={320}
            minHeight={400}
            maxWidth={window.innerWidth - 40}
            maxHeight={window.innerHeight - 40}
            bounds="window"
            dragHandleClassName="handle"
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            enableResizing={!isMaximized}
            disableDragging={isMaximized}
            className="absolute"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={dialogRef}
              className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-shadow duration-300 h-full
                ${!isMaximized ? 'hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]' : ''}`}
              style={{
                cursor: isMaximized ? 'default' : 'move',
              }}
            >
              {/* Header */}
              <div className="handle bg-gradient-to-r from-blue-500 to-teal-500 p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Contact via WhatsApp</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMaximize}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  >
                    {isMaximized ? (
                      <Minimize2 size={20} />
                    ) : (
                      <Maximize2 size={20} />
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-gradient-to-b from-gray-50 to-white h-[calc(100%-64px)] overflow-y-auto">
                {!isRegistered ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter your phone number
                      </label>
                      <div className="flex gap-2">
                        <CountryCodeSelector
                          value={countryCode}
                          onChange={handleCountryChange}
                        />
                        
                        {/* Phone Number Input */}
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          placeholder="Your phone number"
                          className={`flex-1 bg-gradient-to-b from-gray-800 to-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            error ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                          required
                        />
                      </div>
                      
                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-sm mt-1"
                        >
                          <AlertCircle size={16} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                      
                      {/* Phone Length Hint */}
                      <p className="text-sm text-gray-500 mt-1">
                        Enter {phoneLength} digits for {countryCode}
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading || !!error || !phoneNumber}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg px-4 py-2 font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? 'Processing...' : 'Register'}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="text-green-500" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">You can now contact us on WhatsApp at:</p>
                      <a
                        href={`https://wa.me/${countryCode.slice(1)}${phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-primary hover:text-teal-500 transition-colors"
                      >
                        {countryCode} {phoneNumber}
                      </a>
                    </div>
                    <motion.button
                      onClick={onClose}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Resize Handles */}
              {!isMaximized && (
                <>
                  <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize" />
                  <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize" />
                  <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize" />
                </>
              )}
            </div>
          </Rnd>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppDialog;