/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Wifi, 
  Coffee, 
  Shield, 
  Zap, 
  Users, 
  Star, 
  ChevronRight, 
  Calendar,
  Info,
  CheckCircle2,
  Camera,
  MessageSquare,
  Bed,
  Bath,
  DoorOpen,
  Armchair,
  Briefcase,
  Battery,
  Utensils,
  Wind,
  Smartphone,
  Stethoscope,
  Bell,
  AlarmClock,
  PlusSquare,
  Bus,
  Plane,
  Monitor,
  Droplets,
  CreditCard,
  Eye,
  Flame,
  BellRing,
  Printer,
  Copy,
  AlertTriangle,
  Sparkles,
  Refrigerator,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';

const IMAGES = {
  living: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-f43ce39a-043f-4758-977e-e3ac729f3305.jpg",
  beds: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-f43ce39a-043f-4758-977e-e3ac729f3305.jpg",
  washroom: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-f498841d-817f-44a6-9a00-ddb974698d0c.jpg?downsize=540:*",
  washroom2: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-fe29d670-4a8b-498a-aca0-d6c74a20a614.jpg?downsize=540:*",
  washroom3: "https://r1imghtlak.mmtcdn.com/67ce5861-83ff-4a3d-8801-febad35bb070.jpg?downsize=540:*",
  reception: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-88069262-2fab-43be-bde8-6ba29f1c1ff0.jpg?downsize=540:*",
  entrance: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-c1df2917-aec1-4334-8df9-d70111cbe095.jpg?downsize=540:*",
  traveller1: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
  traveller2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  traveller3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
};

const GALLERY_IMAGES = [
  { url: IMAGES.beds, category: 'Rooms', title: 'Luxury Dormitory Beds' },
  { url: IMAGES.living, category: 'Common Areas', title: 'Spacious Living Area' },
  { url: IMAGES.reception, category: 'Facilities', title: 'Modern Reception' },
  { url: IMAGES.entrance, category: 'Facilities', title: 'Grand Entrance' },
  { url: IMAGES.washroom, category: 'Facilities', title: 'Hygienic Washrooms' },
  { url: IMAGES.washroom2, category: 'Facilities', title: 'Clean Facilities' },
  { url: IMAGES.washroom3, category: 'Facilities', title: 'Modern Bathrooms' },
  { url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410062345212593-f43ce39a-043f-4758-977e-e3ac729f3305.jpg", category: 'Common Areas', title: 'Relaxation Zone' },
];

const WHATSAPP_NUMBER = "+918758753338";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '').replace(/\s/g, '')}`;

const AMENITY_CATEGORIES = [
  {
    title: "Popular Amenities",
    items: [
      { name: "Luggage Storage", icon: Briefcase },
      { name: "Power Backup", icon: Battery },
      { name: "Seating Area", icon: Armchair },
      { name: "Dining Area", icon: Utensils },
      { name: "Housekeeping", icon: Sparkles },
      { name: "Luggage Assistance", icon: Briefcase },
      { name: "Air Conditioning (Centralized)", icon: Wind },
      { name: "Free Wi-Fi (Free - Speed Suitable for working)", icon: Wifi }
    ]
  },
  {
    title: "Basic Facilities",
    items: [
      { name: "Power Backup", icon: Battery },
      { name: "Housekeeping", icon: Sparkles },
      { name: "Air Conditioning (Centralized)", icon: Wind },
      { name: "Free Wi-Fi (Free - Speed Suitable for working)", icon: Wifi },
      { name: "Refrigerator", icon: Refrigerator },
      { name: "Room Service", icon: Clock, desc: "Limited duration" },
      { name: "Smoke Detector", icon: Eye, desc: "In Room, Lobby" },
      { name: "Newspaper", icon: Copy, desc: "English, Local Language" },
      { name: "Laundry Service", icon: Droplets, desc: "Paid - Limited Pieces of Laundry Free" }
    ]
  },
  {
    title: "General Services",
    items: [
      { name: "Luggage Storage", icon: Briefcase },
      { name: "Luggage Assistance", icon: Briefcase },
      { name: "Doctor on Call", icon: Stethoscope },
      { name: "Bellboy Service", icon: Bell },
      { name: "Wake-up Call", icon: AlarmClock }
    ]
  },
  {
    title: "Health and Wellness",
    items: [
      { name: "First-aid Services", icon: PlusSquare }
    ]
  },
  {
    title: "Transfers",
    items: [
      { name: "Paid Shuttle Service", icon: Bus },
      { name: "Paid Airport Transfers", icon: Plane, desc: "Paid - Luxury Car, Private taxi, Shared shuttle" }
    ]
  },
  {
    title: "Room Amenities",
    items: [
      { name: "Work Desk", icon: Monitor, desc: "Available in some rooms" },
      { name: "Toiletries", icon: Bath, desc: "Conditioner, Shampoo, Shower Gel" },
      { name: "Mineral Water", icon: Droplets }
    ]
  },
  {
    title: "Food and Drinks",
    items: [
      { name: "Dining Area", icon: Utensils },
      { name: "Food Options Available", icon: Coffee }
    ]
  },
  {
    title: "Payment Services",
    items: [
      { name: "ATM", icon: CreditCard }
    ]
  },
  {
    title: "Safety and Security",
    items: [
      { name: "CCTV", icon: Eye },
      { name: "Fire Extinguishers", icon: Flame },
      { name: "Security Alarms", icon: BellRing }
    ]
  },
  {
    title: "Common Area",
    items: [
      { name: "Seating Area", icon: Armchair },
      { name: "Reception", icon: Clock, desc: "24 hours" }
    ]
  },
  {
    title: "Business Center and Conferences",
    items: [
      { name: "Printer", icon: Printer },
      { name: "Photocopying", icon: Copy }
    ]
  },
  {
    title: "Other Facilities",
    items: [
      { name: "Carbon Monoxide Detector", icon: AlertTriangle }
    ]
  }
];

const LANDMARKS = [
  { name: "Delhi Gate, Surat", dist: "3 min walk" },
  { name: "Burhani Hospital", dist: "1.1 km" },
  { name: "Gopi Talav", dist: "3 km" },
  { name: "Aquamagicaa", dist: "4 km" },
  { name: "Shalby Hospitals", dist: "4.9 km" }
];

const DecorativePattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 3" />
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
    <path d="M50 5V95M5 50H95" stroke="currentColor" strokeWidth="0.2" strokeOpacity="0.5" />
    <path d="M20 20L80 80M80 20L20 80" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.3" />
    <rect x="45" y="45" width="10" height="10" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, (Math.random() * -100 - 50) + "px"],
            opacity: [null, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
        />
      ))}
    </div>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        style={{ y }}
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-[120%] object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const LuxuryDivider = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
    <div className="w-2 h-2 rounded-full bg-emerald-600/50" />
    <div className="w-3 h-3 rotate-45 border border-emerald-600/50" />
    <div className="w-2 h-2 rounded-full bg-emerald-600/50" />
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
  </div>
);

const AbstractShape = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    animate={{ 
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1]
    }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay }}
    className={className}
  >
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 0L117.365 64.6927H184.776L130.206 104.615L147.571 169.307L100 129.385L52.4289 169.307L69.7937 104.615L15.2241 64.6927H82.6352L100 0Z" fill="currentColor" />
    </svg>
  </motion.div>
);

const LuxuryIllustration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path 
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      d="M20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100Z" 
      stroke="currentColor" 
      strokeWidth="0.5" 
    />
    <motion.path 
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      d="M60 100L100 60L140 100L100 140L60 100Z" 
      stroke="currentColor" 
      strokeWidth="1" 
    />
    <motion.circle 
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      cx="100" cy="100" r="5" 
      fill="currentColor" 
    />
  </svg>
);

const TRAVELLER_PHOTOS = [];

const GOOGLE_REVIEWS = [
  {
    name: "PAWAN KUMAR YADAV",
    rating: 5,
    date: "2 months ago",
    comment: "AGRA SE HUN AUR SURAT KAI BAAR A CHUKA HU BUT IN DECEMBER 2025 FIRST TIME WITH FAMILY AYA FOR SHOPING AND MERI SISTER, MERI MAA, UNCLE, AUNTY SATH AYE. FIRST TIME HAMNE DORMITORY DEKHA IN SURAT JO FEMALE AND MALE SABKE LIYE VERY VERY GOOD.",
    isLocalGuide: true,
    reviewsCount: 28
  },
  {
    name: "Rakib Khan",
    rating: 5,
    date: "3 weeks ago",
    comment: "Hm surat aaye aur gurudev dormitory m gaye vha ki facility dekhkr mai achambhit rh gaya kyoki itne chief rate m itni sari facility. Mai bahut hi prabhit ho gaya.",
    isLocalGuide: false
  },
  {
    name: "Burhan Selva",
    rating: 5,
    date: "4 months ago",
    comment: "Amazing stay! The dormitory is super clean and well-maintained. Service was excellent, and the bed quality was top-notch. The air conditioner worked perfectly, and the location is also very convenient. Bathrooms were clean, and the reception staff was polite and helpful.",
    isLocalGuide: false
  },
  {
    name: "Amit Darji",
    rating: 5,
    date: "7 months ago",
    comment: "Shri Gurudev Luxurious A/C Dormitory, Surat (gujrat). This dormitory is just a 3-minute walk from Surat Railway Station and only 2 minutes from the bus stop. Very convenient.",
    isLocalGuide: false
  },
  {
    name: "Ganesh Patane",
    rating: 5,
    date: "3 months ago",
    comment: "Only dormitory i have ever satisfied, with my 72 hours stay. I have traveled half of india, but never had such stay in dormitory. Keep it up vimal bhai (saurabh).",
    isLocalGuide: true,
    reviewsCount: 47
  },
  {
    name: "Maneesh Sawant",
    rating: 5,
    date: "5 months ago",
    comment: "Greetings!!! Thanks to Jay Gurudev hotel management team it's really great housing facilities, well house keeping at over all premises.",
    isLocalGuide: false,
    reviewsCount: 3
  },
  {
    name: "Shruti",
    rating: 5,
    date: "3 months ago",
    comment: "The dormitory was clean and well-maintained. The beds were comfortable, and basic facilities were provided properly. It's a good budget-friendly option for short stays.",
    isLocalGuide: true,
    reviewsCount: 44
  },
  {
    name: "karan kabra",
    rating: 5,
    date: "2 months ago",
    comment: "Everyone must visit and stay once you will get best experience best service and best toilet bathroom very clean must visit.....",
    isLocalGuide: false,
    reviewsCount: 4
  },
  {
    name: "Akela Musafir",
    rating: 5,
    date: "7 months ago",
    comment: "Excellent Stay – Highly Recommended! Main abhi haali mein is hotel mein ruka tha aur mera experience bahut hi achha raha. Sab kuch perfect tha.",
    isLocalGuide: false,
    reviewsCount: 2
  },
  {
    name: "Khushal Patel",
    rating: 5,
    date: "3 months ago",
    comment: "Best Stay place near Rail and Bus Stop at Surat. Bed and Wash rooms good. Rooms: 5/5.",
    isLocalGuide: false,
    reviewsCount: 2
  },
  {
    name: "Saurabh Sharma",
    rating: 5,
    date: "5 months ago",
    comment: "The best dormitory available near surat railway station. Suitable for everyone with lots of facilities. Kind and supportive staff.",
    isLocalGuide: true,
    reviewsCount: 12
  },
  {
    name: "ANKIT GANDHI",
    rating: 5,
    date: "5 months ago",
    comment: "Exillent. Service. Best in higine. Clean as looking in pictures. In net. Travel group.",
    isLocalGuide: false,
    reviewsCount: 2
  }
];

const REVIEW_TAGS = [
  { label: "dormitory", count: 51 },
  { label: "cleanliness", count: 4 },
  { label: "staff behaviour", count: 5 },
  { label: "budget", count: 4 },
  { label: "affordable", count: 3 },
  { label: "complementary tea", count: 2 }
];

const LuxuryBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02),transparent_70%)]" />
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 50, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/5 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2],
        x: [0, -50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-amber-500/5 rounded-full blur-[120px]" 
    />
  </div>
);

export default function App() {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    gender: 'male',
    persons: 1
  });

  const [galleryFilter, setGalleryFilter] = useState('All');
  const [feedback, setFeedback] = useState({ name: '', rating: 5, comment: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === galleryFilter);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Booking', href: '#booking' }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      <LuxuryBackground />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isMenuOpen ? 'bg-white dark:bg-stone-950 shadow-xl' : 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800'}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/20">SG</div>
            <span className="font-bold text-lg font-serif tracking-tight hidden sm:block">Shri Gurudev <span className="text-emerald-600 dark:text-emerald-400">Luxurious</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-xs font-bold uppercase tracking-widest hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="#booking" 
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Book Now
            </a>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-stone-600 dark:text-stone-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 overflow-hidden"
            >
              <div className="px-4 py-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold uppercase tracking-widest hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    {item.name}
                  </a>
                ))}
                <a 
                  href="#booking" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles />
        {/* Parallax Background */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 400]) }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={IMAGES.living} 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-[2px]" />
        </motion.div>

        <div className="absolute inset-0 z-10">
          <DecorativePattern className="w-full h-full opacity-10 text-emerald-400" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-bold tracking-[0.3em] uppercase mb-8">
              Premium Dormitory Experience
            </span>
            
            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter font-serif leading-[0.9] text-white">
              The Gold <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-200 to-emerald-400 italic bg-[length:200%_auto] animate-gradient">Standard</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-stone-200 font-light max-w-3xl mx-auto leading-relaxed">
              Highly hygienic & luxurious, with an affordable price. Experience the first of its kind in Gujarat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#booking" className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/40 flex items-center justify-center gap-3 group">
                Reserve Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#gallery" className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                View Gallery <Camera className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <AbstractShape className="absolute top-1/4 left-10 w-32 h-32 text-emerald-500/20 hidden lg:block" delay={0} />
        <AbstractShape className="absolute bottom-1/4 right-10 w-48 h-48 text-amber-500/20 hidden lg:block" delay={5} />
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <AbstractShape className="absolute top-20 right-10 w-64 h-64 text-emerald-600" delay={2} />
        <AbstractShape className="absolute bottom-20 -left-20 w-80 h-80 text-stone-200" delay={5} />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100 rounded-full -z-10" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-stone-100 rounded-full -z-10" />
              <ParallaxImage 
                src={IMAGES.beds} 
                alt="Luxury Beds" 
                className="rounded-[3rem] shadow-2xl relative z-10 aspect-[4/3]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 text-center">
                <p className="text-4xl font-bold text-emerald-600">₹500</p>
                <p className="text-stone-500 font-medium">Per 24 Hours</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold mb-8 font-serif leading-tight">Why Shri Gurudev <br /><span className="text-emerald-600">Is Unique</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Unbeatable Location", desc: "Just 1 minute walk from Surat Railway Station & Central Bus Stand.", icon: MapPin },
                  { title: "First in Gujarat", desc: "The first dormitory of its kind in Gujarat with premium AC facilities.", icon: Star },
                  { title: "Maximum Hygiene", desc: "Highly hygienic environment with daily cleaning and fresh linens.", icon: CheckCircle2 },
                  { title: "Ladies Safety", desc: "Completely separate hall and facilities dedicated to female travellers.", icon: Shield }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Info className="w-4 h-4" />
              About The Hostel
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 font-serif leading-tight">
              Newly Built <br /> <span className="text-emerald-600 italic">Excellence</span>
            </h2>
            
            <div className="space-y-8 text-stone-600 dark:text-stone-400 leading-relaxed text-lg">
              <p>
                Highly hygienic & luxurious, with an affordable price. Located just <span className="text-emerald-600 dark:text-emerald-400 font-bold">2 minutes</span> from Surat Railway Station & Bus Stand.
              </p>
              <p>
                Comfortable bed size with comfortable mattresses and huge spaces in dormitory halls. It's the first of its kind in Gujarat.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Separate Lockers", icon: Shield },
                  { title: "Individual Lights", icon: Zap },
                  { title: "Ladies Hall", icon: Users },
                  { title: "Complementary Kit", icon: Coffee }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="bg-stone-900 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] text-white flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-1">Availability</p>
                  <p className="text-2xl font-bold font-serif">24 Hours Open</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <ParallaxImage 
                  src={IMAGES.reception} 
                  alt="Reception" 
                  className="rounded-[3rem] shadow-2xl aspect-[3/4]" 
                />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square bg-emerald-600 p-8 flex flex-col justify-end text-white">
                  <Sparkles className="w-12 h-12 mb-4" />
                  <h4 className="text-2xl font-bold font-serif">Gujarat's First</h4>
                  <p className="text-white/70 text-sm">Luxury Dormitory Concept</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square bg-stone-100 dark:bg-stone-800 p-8 flex flex-col justify-center items-center text-center">
                  <p className="text-5xl font-bold text-emerald-600 mb-2">2</p>
                  <p className="text-stone-500 dark:text-stone-400 font-bold uppercase text-xs tracking-widest">Minutes from Station</p>
                </div>
                <ParallaxImage 
                  src={IMAGES.entrance} 
                  alt="Entrance" 
                  className="rounded-[3rem] shadow-2xl aspect-[3/4]" 
                />
              </div>
            </motion.div>
            
            {/* Decorative Graphics */}
            <LuxuryIllustration className="absolute -bottom-20 -left-20 w-64 h-64 text-emerald-600/10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
            <DecorativePattern className="absolute -top-10 -right-10 w-48 h-48 text-emerald-600/10" />
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-32 bg-stone-50 dark:bg-stone-900 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <DecorativePattern className="w-full h-full text-stone-900 dark:text-white" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Facilities</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-serif">World-Class <span className="italic text-emerald-600">Amenities</span></h2>
            <LuxuryDivider className="mx-auto mb-8" />
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg">We've thought of everything to make your stay as comfortable as a 5-star hotel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITY_CATEGORIES.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-stone-950 p-10 rounded-[3rem] shadow-xl border border-stone-200 dark:border-stone-800 group hover:border-emerald-500/50 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    {(() => {
                      const Icon = category.items[0].icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold font-serif">{category.title}</h3>
                </div>
                
                <ul className="space-y-5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-stone-900 flex items-center justify-center text-stone-400 group-hover/item:text-emerald-600 transition-colors">
                        {(() => {
                          const Icon = item.icon;
                          return <Icon className="w-4 h-4" />;
                        })()}
                      </div>
                      <div>
                        <p className="font-bold text-stone-800 dark:text-stone-200 group-hover/item:text-emerald-600 transition-colors">{item.name}</p>
                        {item.desc && <p className="text-xs text-stone-400 mt-1">{item.desc}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Experience Section - New */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">The Experience</span>
              <h2 className="text-5xl font-bold mb-8 font-serif leading-tight">Luxury That Doesn't <br /> <span className="text-emerald-600">Break The Bank</span></h2>
              <p className="text-stone-500 text-lg mb-10 leading-relaxed">
                We've redefined the dormitory concept. It's not just a bed; it's a curated experience designed for the modern traveller who values both quality and economy.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Bath className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-bold mb-2">Hygienic Bathrooms</h4>
                  <p className="text-sm text-stone-500">Modern, clean, and fully equipped facilities.</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <DoorOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-bold mb-2">Private Access</h4>
                  <p className="text-sm text-stone-500">Secure entry and individual locker access.</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-emerald-600 rounded-[4rem] rotate-3 -z-10 opacity-10" />
              <ParallaxImage 
                src={IMAGES.reception} 
                alt="Luxury Reception" 
                className="rounded-[4rem] shadow-2xl relative z-10 aspect-[4/3]"
              />
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-stone-100 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">Top Rated</p>
                    <p className="text-stone-500 text-sm">In Surat, Gujarat</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <DecorativePattern className="w-full h-full text-stone-900 dark:text-white" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Camera className="w-4 h-4" />
              Visual Tour
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-serif">Property <span className="italic text-emerald-600">Gallery</span></h2>
            <LuxuryDivider className="mx-auto mb-8" />
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['All', 'Rooms', 'Common Areas', 'Facilities'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all ${
                    galleryFilter === filter 
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/40' 
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-emerald-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img, idx) => (
                <motion.div
                  key={img.url + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group relative aspect-square overflow-hidden rounded-[2.5rem] shadow-xl border border-stone-200 dark:border-stone-800"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">{img.category}</p>
                    <p className="text-white font-bold text-xl font-serif">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section id="reviews" className="py-32 bg-white dark:bg-stone-950 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <DecorativePattern className="w-full h-full text-emerald-900 dark:text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Review Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
                <h2 className="text-5xl font-bold mb-8 font-serif">Google <br /> <span className="text-emerald-600">Reviews</span></h2>
                
                <div className="bg-stone-50 dark:bg-stone-900 p-10 rounded-[3rem] border border-stone-100 dark:border-stone-800 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl font-bold text-stone-900 dark:text-stone-100">4.8</div>
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-emerald-500 text-emerald-500" />)}
                      </div>
                      <p className="text-stone-500 dark:text-stone-400 font-medium">302 reviews</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-4">
                        <span className="text-sm font-bold w-3 text-stone-600 dark:text-stone-400">{rating}</span>
                        <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: rating === 5 ? '85%' : rating === 4 ? '10%' : '5%' }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {REVIEW_TAGS.map(tag => (
                    <span key={tag.label} className="px-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full text-xs font-bold text-stone-600 dark:text-stone-400 hover:border-emerald-600 transition-colors cursor-default">
                      {tag.label} <span className="text-stone-400 dark:text-stone-500 ml-1">{tag.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="lg:col-span-2 space-y-8">
              {GOOGLE_REVIEWS.map((review, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 bg-stone-50 dark:bg-stone-900 rounded-[3rem] border border-stone-100 dark:border-stone-800 hover:shadow-xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl group-hover:scale-110 transition-transform">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          {review.isLocalGuide && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                              Local Guide • {review.reviewsCount} reviews
                            </span>
                          )}
                          <span className="text-stone-400 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg italic">
                    "{review.comment}"
                  </p>
                  <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 flex gap-6 text-xs font-bold text-stone-400 uppercase tracking-widest">
                    <button className="hover:text-emerald-600 transition-colors">Like</button>
                    <button className="hover:text-emerald-600 transition-colors">Share</button>
                  </div>
                </motion.div>
              ))}
              
              <div className="text-center pt-8">
                <button className="px-12 py-5 bg-stone-900 dark:bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-xl">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      {TRAVELLER_PHOTOS.length > 0 && (
        <section className="py-32 bg-stone-900 text-white px-4 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <DecorativePattern className="w-full h-full text-emerald-400" />
          </div>
          
          <AbstractShape className="absolute -top-20 -right-20 w-96 h-96 text-emerald-400" delay={0} />
          <AbstractShape className="absolute -bottom-20 -left-20 w-96 h-96 text-emerald-400" delay={7} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Community</span>
                <h2 className="text-5xl md:text-7xl font-bold font-serif leading-tight">Voices of Our <br /> <span className="italic text-emerald-400">Guests</span></h2>
                <LuxuryDivider className="justify-start mt-6" />
              </div>
              <p className="text-stone-400 text-lg max-w-sm">Join thousands of happy travellers who have made Shri Gurudev their home in Surat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {TRAVELLER_PHOTOS.map((photo, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative rounded-[3rem] overflow-hidden mb-8 aspect-[4/5] shadow-2xl ring-1 ring-white/10 group-hover:ring-emerald-400/50 transition-all duration-500">
                    <img src={photo.img} alt={photo.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex gap-1 mb-3">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-emerald-400 text-emerald-400" />)}
                      </div>
                      <p className="text-2xl font-bold mb-1">{photo.name}</p>
                      <p className="text-emerald-400 text-sm font-medium">{photo.date}</p>
                    </div>
                  </div>
                  <div className="px-4">
                    <p className="text-stone-400 italic leading-relaxed">"{photo.comment}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Section */}
      <section id="booking" className="py-32 px-4 bg-stone-50 dark:bg-stone-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <DecorativePattern className="w-full h-full text-emerald-900 dark:text-white" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Calendar className="w-4 h-4" />
              Secure Your Stay
            </div>
            <h2 className="text-5xl font-bold mb-6 font-serif">Reserve Your <span className="text-emerald-600 italic">Bed</span></h2>
            <LuxuryDivider className="mx-auto mb-8" />
            <p className="text-stone-500 dark:text-stone-400 text-lg">Secure your spot in Surat's most luxurious dormitory. 24-hour booking available.</p>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 dark:border-stone-800 p-8 md:p-12">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-2">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input 
                      type="date" 
                      required
                      className="w-full pl-14 pr-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium dark:text-white"
                      value={bookingData.checkIn}
                      onChange={e => setBookingData({...bookingData, checkIn: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-2">Check-out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input 
                      type="date" 
                      required
                      className="w-full pl-14 pr-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium dark:text-white"
                      value={bookingData.checkOut}
                      onChange={e => setBookingData({...bookingData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-2">Total Persons</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input 
                      type="number" 
                      min="1"
                      className="w-full pl-14 pr-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium dark:text-white"
                      value={bookingData.persons}
                      onChange={e => setBookingData({...bookingData, persons: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-2">Adults</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input 
                      type="number" 
                      min="1"
                      className="w-full pl-14 pr-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium dark:text-white"
                      value={bookingData.adults}
                      onChange={e => setBookingData({...bookingData, adults: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-2">Section</label>
                  <select 
                    className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none dark:text-white"
                    value={bookingData.gender}
                    onChange={e => setBookingData({...bookingData, gender: e.target.value})}
                  >
                    <option value="male">Male Section</option>
                    <option value="female">Female Section (Separate Hall)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <Zap className="w-6 h-6 fill-current" />
                  Confirm Booking Request
                </button>
              </div>
              
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-4 text-emerald-700 dark:text-emerald-400 shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div className="font-medium">
                      <p className="font-bold">Request Sent Successfully!</p>
                      <p className="text-sm opacity-80">We will contact you shortly to confirm your stay.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Call for Booking</p>
                <p className="text-xl font-bold text-stone-900 dark:text-stone-100">+91 87587 53338</p>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Check-in Availability</p>
                <p className="text-xl font-bold text-stone-900 dark:text-stone-100">24 Hours Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 bg-stone-100 dark:bg-stone-900 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <DecorativePattern className="w-full h-full text-stone-900 dark:text-white" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Connectivity</span>
              <h2 className="text-5xl font-bold mb-12 font-serif">Perfectly <br /> <span className="text-emerald-600">Positioned</span></h2>
              
              <div className="bg-white dark:bg-stone-950 p-10 rounded-[3rem] shadow-xl border border-stone-200 dark:border-stone-800 mb-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="flex gap-6 mb-8">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-600/30">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl mb-2 text-stone-900 dark:text-stone-100">Shri Gurudev Luxurious</p>
                      <p className="text-stone-500 dark:text-stone-400 leading-relaxed">Below Bank of Baroda Sufibagh Branch, Opp. Alankar Hotel, Varachha, Surat, Gujarat 395003</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/H6AyhvqPsCyaRdMs8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-stone-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-lg"
                  >
                    Get Directions <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LANDMARKS.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-600 transition-colors">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{item.name}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">{item.dist}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="h-[600px] bg-stone-200 dark:bg-stone-800 rounded-[4rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://picsum.photos/seed/surat-map/1200/1200" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-900/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-900 dark:text-white p-12 text-center">
                <div className="w-20 h-20 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center shadow-2xl mb-6 animate-bounce">
                  <MapPin className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Varachha, Surat</h3>
                <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-xs">Busy area known for diamond cutting & polishing, classic dining & Shantikunj Park.</p>
                <a 
                  href="https://maps.app.goo.gl/H6AyhvqPsCyaRdMs8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-emerald-600 text-stone-900 dark:text-white px-10 py-4 rounded-2xl shadow-xl font-bold hover:scale-105 transition-transform"
                >
                  Open Live Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Feedback</span>
          <h2 className="text-5xl font-bold mb-6 font-serif">Your Thoughts <br /> <span className="text-emerald-600 italic">Matter</span></h2>
          <p className="text-stone-500 dark:text-stone-400 mb-16 text-lg">We strive for excellence. Share your experience with us.</p>
          
          <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-stone-100 dark:border-stone-800 text-left relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-600 rounded-full hidden md:flex items-center justify-center text-white shadow-xl rotate-12">
              <Star className="w-12 h-12 fill-current" />
            </div>
            
            <div className="flex gap-3 mb-10 justify-center">
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star} 
                  onClick={() => setFeedback({...feedback, rating: star})}
                  className="transition-all hover:scale-125 active:scale-90"
                >
                  <Star className={`w-10 h-10 ${star <= feedback.rating ? 'fill-emerald-400 text-emerald-400' : 'text-stone-200 dark:text-stone-700'}`} />
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  className="w-full px-8 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                  value={feedback.name}
                  onChange={e => setFeedback({...feedback, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-4">Rating</label>
                <div className="w-full px-8 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-stone-400 font-bold">
                  {feedback.rating} / 5 Stars
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-4">Your Message</label>
              <textarea 
                placeholder="Tell us about your stay..."
                rows={4}
                className="w-full px-8 py-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                value={feedback.comment}
                onChange={e => setFeedback({...feedback, comment: e.target.value})}
              />
            </div>
            
            <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98]">
              Send Feedback
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <DecorativePattern className="w-full h-full text-white" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-24">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-600/20">SG</div>
                <span className="font-bold text-3xl font-serif tracking-tight">Shri Gurudev <br /> <span className="text-emerald-400 text-lg">Luxurious</span></span>
              </div>
              <p className="text-stone-400 text-xl max-w-md mb-10 leading-relaxed">
                Setting the benchmark for affordable luxury in Gujarat. Your comfort is our priority.
              </p>
              <div className="flex gap-6">
                {[Phone, MapPin, MessageSquare].map((Icon, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10 cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-serif">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.name}>
                    <a href={item.href} className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-serif">Contact Us</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-stone-400 text-sm leading-relaxed">Below Bank of Baroda Sufibagh Branch, Opp. Alankar Hotel, Varachha, Surat, Gujarat 395003</p>
                </li>
                <li className="flex gap-4">
                  <Phone className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-stone-400">+91 87587 53338</p>
                </li>
                <li className="flex gap-4">
                  <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-stone-400">24/7 Available</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm font-medium">
            <p>© 2026 Shri Gurudev Luxurious. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="fixed bottom-8 right-8 z-[100] bg-emerald-500 text-white p-4 rounded-2xl shadow-2xl shadow-emerald-500/40 group"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-stone-900 text-stone-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-stone-100 dark:border-stone-800">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
