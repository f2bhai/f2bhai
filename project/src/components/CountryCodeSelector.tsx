import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
  phoneLength: number;
}

interface CountryCodeSelectorProps {
  value: string;
  onChange: (dialCode: string, phoneLength: number) => void;
  onBlur?: () => void;
}

const countries: Country[] = [
  { name: 'Afghanistan', code: 'AF', flag: '🇦🇫', dialCode: '+93', phoneLength: 9 },
  { name: 'Albania', code: 'AL', flag: '🇦🇱', dialCode: '+355', phoneLength: 8 },
  { name: 'Algeria', code: 'DZ', flag: '🇩🇿', dialCode: '+213', phoneLength: 9 },
  { name: 'Andorra', code: 'AD', flag: '🇦🇩', dialCode: '+376', phoneLength: 6 },
  { name: 'Angola', code: 'AO', flag: '🇦🇴', dialCode: '+244', phoneLength: 9 },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷', dialCode: '+54', phoneLength: 10 },
  { name: 'Armenia', code: 'AM', flag: '🇦🇲', dialCode: '+374', phoneLength: 8 },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61', phoneLength: 9 },
  { name: 'Austria', code: 'AT', flag: '🇦🇹', dialCode: '+43', phoneLength: 10 },
  { name: 'Azerbaijan', code: 'AZ', flag: '🇦🇿', dialCode: '+994', phoneLength: 9 },
  { name: 'Bahrain', code: 'BH', flag: '🇧🇭', dialCode: '+973', phoneLength: 8 },
  { name: 'Bangladesh', code: 'BD', flag: '🇧🇩', dialCode: '+880', phoneLength: 11 },
  { name: 'Belarus', code: 'BY', flag: '🇧🇾', dialCode: '+375', phoneLength: 9 },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪', dialCode: '+32', phoneLength: 9 },
  { name: 'Bhutan', code: 'BT', flag: '🇧🇹', dialCode: '+975', phoneLength: 8 },
  { name: 'Bolivia', code: 'BO', flag: '🇧🇴', dialCode: '+591', phoneLength: 8 },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', dialCode: '+55', phoneLength: 11 },
  { name: 'Bulgaria', code: 'BG', flag: '🇧🇬', dialCode: '+359', phoneLength: 8 },
  { name: 'Cambodia', code: 'KH', flag: '🇰🇭', dialCode: '+855', phoneLength: 9 },
  { name: 'Cameroon', code: 'CM', flag: '🇨🇲', dialCode: '+237', phoneLength: 9 },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1', phoneLength: 10 },
  { name: 'Chile', code: 'CL', flag: '🇨🇱', dialCode: '+56', phoneLength: 9 },
  { name: 'China', code: 'CN', flag: '🇨🇳', dialCode: '+86', phoneLength: 11 },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴', dialCode: '+57', phoneLength: 10 },
  { name: 'Costa Rica', code: 'CR', flag: '🇨🇷', dialCode: '+506', phoneLength: 8 },
  { name: 'Croatia', code: 'HR', flag: '🇭🇷', dialCode: '+385', phoneLength: 8 },
  { name: 'Cuba', code: 'CU', flag: '🇨🇺', dialCode: '+53', phoneLength: 8 },
  { name: 'Cyprus', code: 'CY', flag: '🇨🇾', dialCode: '+357', phoneLength: 8 },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿', dialCode: '+420', phoneLength: 9 },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰', dialCode: '+45', phoneLength: 8 },
  { name: 'Ecuador', code: 'EC', flag: '🇪🇨', dialCode: '+593', phoneLength: 9 },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', dialCode: '+20', phoneLength: 10 },
  { name: 'Estonia', code: 'EE', flag: '🇪🇪', dialCode: '+372', phoneLength: 8 },
  { name: 'Ethiopia', code: 'ET', flag: '🇪🇹', dialCode: '+251', phoneLength: 9 },
  { name: 'Finland', code: 'FI', flag: '🇫🇮', dialCode: '+358', phoneLength: 9 },
  { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33', phoneLength: 9 },
  { name: 'Georgia', code: 'GE', flag: '🇬🇪', dialCode: '+995', phoneLength: 9 },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49', phoneLength: 11 },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', dialCode: '+233', phoneLength: 9 },
  { name: 'Greece', code: 'GR', flag: '🇬🇷', dialCode: '+30', phoneLength: 10 },
  { name: 'Hong Kong', code: 'HK', flag: '🇭🇰', dialCode: '+852', phoneLength: 8 },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺', dialCode: '+36', phoneLength: 9 },
  { name: 'Iceland', code: 'IS', flag: '🇮🇸', dialCode: '+354', phoneLength: 7 },
  { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91', phoneLength: 10 },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩', dialCode: '+62', phoneLength: 10 },
  { name: 'Iran', code: 'IR', flag: '🇮🇷', dialCode: '+98', phoneLength: 10 },
  { name: 'Iraq', code: 'IQ', flag: '🇮🇶', dialCode: '+964', phoneLength: 10 },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪', dialCode: '+353', phoneLength: 9 },
  { name: 'Israel', code: 'IL', flag: '🇮🇱', dialCode: '+972', phoneLength: 9 },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', dialCode: '+39', phoneLength: 10 },
  { name: 'Jamaica', code: 'JM', flag: '🇯🇲', dialCode: '+1-876', phoneLength: 10 },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81', phoneLength: 11 },
  { name: 'Jordan', code: 'JO', flag: '🇯🇴', dialCode: '+962', phoneLength: 9 },
  { name: 'Kazakhstan', code: 'KZ', flag: '🇰🇿', dialCode: '+7', phoneLength: 10 },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪', dialCode: '+254', phoneLength: 10 },
  { name: 'Kuwait', code: 'KW', flag: '🇰🇼', dialCode: '+965', phoneLength: 8 },
  { name: 'Kyrgyzstan', code: 'KG', flag: '🇰🇬', dialCode: '+996', phoneLength: 9 },
  { name: 'Laos', code: 'LA', flag: '🇱🇦', dialCode: '+856', phoneLength: 8 },
  { name: 'Latvia', code: 'LV', flag: '🇱🇻', dialCode: '+371', phoneLength: 8 },
  { name: 'Lebanon', code: 'LB', flag: '🇱🇧', dialCode: '+961', phoneLength: 8 },
  { name: 'Libya', code: 'LY', flag: '🇱🇾', dialCode: '+218', phoneLength: 9 },
  { name: 'Liechtenstein', code: 'LI', flag: '🇱🇮', dialCode: '+423', phoneLength: 8 },
  { name: 'Lithuania', code: 'LT', flag: '🇱🇹', dialCode: '+370', phoneLength: 8 },
  { name: 'Luxembourg', code: 'LU', flag: '🇱🇺', dialCode: '+352', phoneLength: 9 },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾', dialCode: '+60', phoneLength: 9 },
  { name: 'Maldives', code: 'MV', flag: '🇲🇻', dialCode: '+960', phoneLength: 7 },
  { name: 'Malta', code: 'MT', flag: '🇲🇹', dialCode: '+356', phoneLength: 8 },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', dialCode: '+52', phoneLength: 10 },
  { name: 'Moldova', code: 'MD', flag: '🇲🇩', dialCode: '+373', phoneLength: 8 },
  { name: 'Monaco', code: 'MC', flag: '🇲🇨', dialCode: '+377', phoneLength: 8 },
  { name: 'Mongolia', code: 'MN', flag: '🇲🇳', dialCode: '+976', phoneLength: 8 },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦', dialCode: '+212', phoneLength: 9 },
  { name: 'Myanmar', code: 'MM', flag: '🇲🇲', dialCode: '+95', phoneLength: 9 },
  { name: 'Nepal', code: 'NP', flag: '🇳🇵', dialCode: '+977', phoneLength: 10 },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', dialCode: '+31', phoneLength: 9 },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', dialCode: '+64', phoneLength: 9 },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', dialCode: '+234', phoneLength: 10 },
  { name: 'North Korea', code: 'KP', flag: '🇰🇵', dialCode: '+850', phoneLength: 8 },
  { name: 'Norway', code: 'NO', flag: '🇳🇴', dialCode: '+47', phoneLength: 8 },
  { name: 'Oman', code: 'OM', flag: '🇴🇲', dialCode: '+968', phoneLength: 8 },
  { name: 'Pakistan', code: 'PK', flag: '🇵🇰', dialCode: '+92', phoneLength: 10 },
  { name: 'Palestine', code: 'PS', flag: '🇵🇸', dialCode: '+970', phoneLength: 9 },
  { name: 'Panama', code: 'PA', flag: '🇵🇦', dialCode: '+507', phoneLength: 8 },
  { name: 'Paraguay', code: 'PY', flag: '🇵🇾', dialCode: '+595', phoneLength: 9 },
  { name: 'Peru', code: 'PE', flag: '🇵🇪', dialCode: '+51', phoneLength: 9 },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭', dialCode: '+63', phoneLength: 10 },
  { name: 'Poland', code: 'PL', flag: '🇵🇱', dialCode: '+48', phoneLength: 9 },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', dialCode: '+351', phoneLength: 9 },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦', dialCode: '+974', phoneLength: 8 },
  { name: 'Romania', code: 'RO', flag: '🇷🇴', dialCode: '+40', phoneLength: 9 },
  { name: 'Russia', code: 'RU', flag: '🇷🇺', dialCode: '+7', phoneLength: 10 },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', dialCode: '+966', phoneLength: 9 },
  { name: 'Serbia', code: 'RS', flag: '🇷🇸', dialCode: '+381', phoneLength: 9 },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', dialCode: '+65', phoneLength: 8 },
  { name: 'Slovakia', code: 'SK', flag: '🇸🇰', dialCode: '+421', phoneLength: 9 },
  { name: 'Slovenia', code: 'SI', flag: '🇸🇮', dialCode: '+386', phoneLength: 8 },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', dialCode: '+27', phoneLength: 9 },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷', dialCode: '+82', phoneLength: 10 },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', dialCode: '+34', phoneLength: 9 },
  { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰', dialCode: '+94', phoneLength: 9 },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', dialCode: '+46', phoneLength: 9 },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', dialCode: '+41', phoneLength: 9 },
  { name: 'Syria', code: 'SY', flag: '🇸🇾', dialCode: '+963', phoneLength: 9 },
  { name: 'Taiwan', code: 'TW', flag: '🇹🇼', dialCode: '+886', phoneLength: 9 },
  { name: 'Tajikistan', code: 'TJ', flag: '🇹🇯', dialCode: '+992', phoneLength: 9 },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭', dialCode: '+66', phoneLength: 9 },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷', dialCode: '+90', phoneLength: 10 },
  { name: 'Turkmenistan', code: 'TM', flag: '🇹🇲', dialCode: '+993', phoneLength: 9 },
  { name: 'Ukraine', code: 'UA', flag: '🇺🇦', dialCode: '+380', phoneLength: 9 },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', dialCode: '+971', phoneLength: 9 },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44', phoneLength: 10 },
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1', phoneLength: 10 },
  { name: 'Uruguay', code: 'UY', flag: '🇺🇾', dialCode: '+598', phoneLength: 8 },
  { name: 'Uzbekistan', code: 'UZ', flag: '🇺🇿', dialCode: '+998', phoneLength: 9 },
  { name: 'Vatican City', code: 'VA', flag: '🇻🇦', dialCode: '+379', phoneLength: 8 },
  { name: 'Venezuela', code: 'VE', flag: '🇻🇪', dialCode: '+58', phoneLength: 10 },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳', dialCode: '+84', phoneLength: 9 },
  { name: 'Yemen', code: 'YE', flag: '🇾🇪', dialCode: '+967', phoneLength: 9 },
  { name: 'Zimbabwe', code: 'ZW', flag: '🇿🇼', dialCode: '+263', phoneLength: 9 },
].sort((a, b) => a.name.localeCompare(b.name));

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedCountry = countries.find(country => country.dialCode === value) || countries[0];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          onChange(filteredCountries[highlightedIndex].dialCode, filteredCountries[highlightedIndex].phoneLength);
          setIsOpen(false);
          setSearchQuery('');
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        aria-label="Select country code"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="min-w-[40px]">{selectedCountry.dialCode}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 w-64 bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg shadow-lg border border-gray-600 overflow-hidden"
          >
            <div className="p-2 border-b border-gray-600">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(0);
                  }}
                  placeholder="Search countries..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gradient-to-b from-gray-700 to-gray-600 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  aria-label="Search countries"
                />
              </div>
            </div>

            <ul
              ref={listRef}
              className="max-h-64 overflow-y-auto py-2"
              role="listbox"
              aria-label="Countries list"
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <motion.li
                    key={country.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    role="option"
                    aria-selected={country.dialCode === value}
                    className={`px-4 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                      highlightedIndex === index
                        ? 'bg-gray-600/50 text-white'
                        : 'text-gray-300 hover:bg-gray-600/30 hover:text-white'
                    }`}
                    onClick={() => {
                      onChange(country.dialCode, country.phoneLength);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-gray-400 text-sm">{country.dialCode}</span>
                  </motion.li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-400 text-center">
                  No countries found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryCodeSelector;