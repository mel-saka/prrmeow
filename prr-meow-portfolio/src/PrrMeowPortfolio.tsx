import React, { useMemo, useState, useEffect } from "react";
import { logoImg, designer } from "@/assets";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Search, Mail, Instagram, Globe, ChevronRight, Sparkles, Star, ArrowUpRight, X, Heart, Zap, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Dreamy color palette
const BRAND_PINK = "#FFE4F1";
const SOFT_PINK = "#FFF0F7";
const DEEP_PINK = "#FF6B9D";
const PURPLE_PINK = "#C9669F";
const CORAL = "#FFC3A0";
const LAVENDER = "#E0BBE4";
const MINT = "#A8E6CF";

const CATEGORIES = ["NEW", "Tops", "Pants", "Dresses", "Coats", "Accessories", "Custom"] as const;

const DESIGNERS = [
  {
    id: "pm",
    name: "Cat Gonzalez",
  avatar: designer,
    bio: "Meet the DesignerZ~ sustainable beauty ~ ethereal femininity ~ timeless individuality ~ playful elegance ~ layered expression ~",
    story: `prrmeow is a brand that celebrates modern femininity through timeless, playful and elegant garments that encourage self expression and connecting with your softer side - regardless of gender. Inspired by historical silhouettes and Lolita fashion yet grounded by everyday wearability, each piece is designed to be layered, customized and cherished beyond trends.

With sustainability, ethical production and transparency at its core, the brand also creates clothing that not only makes the wearer feel pretty and confident, but also reflects a commitment to natural fibres, thoughtful design and lasting value.`,
    experience: "5 years",
    pieces: "200+",
    socials: { instagram: "#", web: "#" },
  },
];

const LOOKS = [
  {
    id: "d1",
    title: "Blush Midi Dress",
    designerId: "pm",
    category: "Dresses" as const,
    palette: ["#FFB6C1", "#FFF", "#333"],
    fabric: "Silk crepe",
    sizeRange: "XS–XL",
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    ],
    notes: "Soft A‑line midi with subtle pleating and back tie.",
    price: "Enquire",
    isNew: true,
    likes: 234,
  },
  {
    id: "t1",
    title: "Lime Pop Top",
    designerId: "pm",
    category: "Tops" as const,
    palette: ["#E2F9AE", "#111", "#fff"],
    fabric: "Cotton‑silk",
    sizeRange: "S–L",
    hero: "https://images.unsplash.com/photo-1520975661595-64567cd0dc68?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1520975661595-64567cd0dc68?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    ],
    notes: "Relaxed cropped top with dropped shoulder and boxy silhouette.",
    price: "Enquire",
    isNew: false,
    likes: 189,
  },
  {
    id: "c1",
    title: "Structured Coat",
    designerId: "pm",
    category: "Coats" as const,
    palette: ["#1f2937", "#9ca3af", "#FFB6C1"],
    fabric: "Wool blend",
    sizeRange: "Made‑to‑measure",
    hero: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1600&auto=format&fit=crop",
    ],
    notes: "Single‑breasted long coat with sculpted shoulder.",
    price: "Enquire",
    isNew: true,
    likes: 412,
  },
  {
    id: "p1",
    title: "Wide Leg Trousers",
    designerId: "pm",
    category: "Pants" as const,
    palette: ["#8B4513", "#F5DEB3", "#000"],
    fabric: "Linen blend",
    sizeRange: "XS–XXL",
    hero: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1600&auto=format&fit=crop",
    ],
    notes: "High-waisted palazzo pants with flowing silhouette.",
    price: "Enquire",
    isNew: false,
    likes: 156,
  },
  {
    id: "d2",
    title: "Evening Gown",
    designerId: "pm",
    category: "Dresses" as const,
    palette: ["#4A0E4E", "#81689D", "#FFD700"],
    fabric: "Tulle & satin",
    sizeRange: "Custom",
    hero: "https://images.unsplash.com/photo-1566479117917-26f24e451eae?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1566479117917-26f24e451eae?q=80&w=1600&auto=format&fit=crop",
    ],
    notes: "Dramatic ballgown with hand-embroidered details.",
    price: "Enquire",
    isNew: true,
    likes: 523,
  },
];

const getDesigner = (id: string) => DESIGNERS.find(d => d.id === id)!;

// Floating particles animation
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-64 w-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? CORAL : LAVENDER}20 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Floating cat icons animation
function FloatingCats() {
  const catEmojis = ['🐱', '😺', '😸', '😻', '🐈', '🐾'];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {catEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 0.2, 0.2, 0],
            y: [0, -30, -60, -90],
            x: [0, 20 * (i % 2 === 0 ? 1 : -1), 40 * (i % 2 === 0 ? 1 : -1), 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

function BrandWordmark() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="flex items-center gap-3 select-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.img
          src={logoImg}
          alt="Prr Meow logo"
          className="h-12 w-12 rounded-3xl object-cover shadow-2xl"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -inset-2 rounded-3xl opacity-40 blur-xl -z-10"
          style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C9669F 100%)' }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
        />
      </div>
      <div>
        <span 
          className="font-black text-2xl tracking-tight block"
          style={{ 
            fontFamily: '"Playwrite Indonesia", cursive',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C9669F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Prr Meow
        </span>
        <span className="text-xs text-purple-400 tracking-widest">COUTURE</span>
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${DEEP_PINK}40 0%, transparent 50%)`,
            filter: 'blur(40px)',
            y: y1
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${PURPLE_PINK}40 0%, transparent 50%)`,
            filter: 'blur(40px)',
            y: y2
          }}
        />
      </motion.div>
      
      <motion.div 
        className="relative z-10 text-center px-6"
        style={{ opacity }}
      >
        {/* Floating badge */}
        <motion.div 
          className="inline-block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
            <Sparkles className="h-5 w-5 text-pink-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Exclusive Collection 2025</span>
            <motion.div 
              className="flex gap-1"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Main title with staggered animation */}
        <motion.div className="space-y-4">
          <motion.h1 
            className="text-7xl sm:text-9xl font-black tracking-tighter"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <span 
              style={{ 
                fontFamily: '"Playwrite Indonesia", cursive',
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C9669F 50%, #FFB6C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px rgba(255, 107, 157, 0.3))'
              }}
            >
              Prr Meow
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Where Fashion Meets Fantasy
          </motion.p>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-pink-300 flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LookCard({ look, onOpen, index }: { look: typeof LOOKS[number]; onOpen: (id: string) => void; index: number }) {
  const designer = getDesigner(look.designerId);
  const [isLiked, setIsLiked] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set((y - centerY) / 20);
    rotateY.set((x - centerX) / 20);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(look.id)}
      className="transform-gpu cursor-pointer"
    >
      <Card className="group overflow-hidden bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-[0_20px_70px_-15px_rgba(255,107,157,0.5)] transition-all duration-500 border-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img 
            src={look.hero} 
            alt={look.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {look.isNew && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 shadow-lg">
                  <Zap className="h-3 w-3 mr-1" />
                  NEW
                </Badge>
              </motion.div>
            )}
            
            <motion.button
              className="ml-auto p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`}
              />
            </motion.button>
          </div>
          
          {/* Hover hint at bottom */}
          <motion.div 
            className="absolute bottom-6 left-6 right-6 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="text-white text-center">
              <ArrowUpRight className="h-5 w-5 mx-auto mb-2" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </motion.div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{look.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{designer.name}</p>
          </div>
          
          {/* Color palette with glow effect */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {look.palette.map((color, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  <div 
                    className="h-6 w-6 rounded-full shadow-lg"
                    style={{ 
                      background: color,
                      boxShadow: `0 4px 20px ${color}40`
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-1 text-gray-400">
              <Heart className="h-3 w-3" />
              <span className="text-xs">{look.likes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LookDialog({ openId, onClose }: { openId: string | null; onClose: () => void }) {
  const look = useMemo(() => LOOKS.find(l => l.id === openId) || null, [openId]);
  const designer = look ? getDesigner(look.designerId) : null;
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (openId) setSelectedImage(0);
  }, [openId]);

  return (
    <AnimatePresence>
      {openId && look && (
        <Dialog open={true} onOpenChange={() => onClose()}>
          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border-0 shadow-2xl rounded-3xl mx-auto">
              <motion.button
                onClick={onClose}
                className="absolute right-6 top-6 z-50 rounded-full bg-white/90 backdrop-blur-sm p-3 shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
              {/* Image section with parallax */}
              <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
                <motion.img 
                  key={selectedImage}
                  src={look.gallery[selectedImage] || look.hero}
                  alt={look.title}
                  className="w-full h-full object-cover min-h-[60vh] lg:min-h-full"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Image navigation dots */}
                {look.gallery.length > 1 && (
                  <div className="absolute sm:bottom-8 bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {look.gallery.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`h-2 rounded-full bg-white/80 transition-all ${
                          idx === selectedImage ? 'w-6 sm:w-12' : 'w-2'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Details section */}
              <div className="p-6 sm:p-8 lg:p-12 space-y-8 max-h-[70vh] sm:max-h-[80vh] lg:max-h-none overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="mb-4 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 border-0">
                    {look.category}
                  </Badge>
                  <h2 className="text-4xl font-black text-gray-800 mb-3">{look.title}</h2>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={designer!.avatar} 
                      className="h-12 w-12 rounded-full object-cover ring-4 ring-pink-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-700">{designer!.name}</div>
                      <div className="text-sm text-gray-500">{designer!.bio}</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-5">
                    <Moon className="h-5 w-5 text-purple-500 mb-2" />
                    <div className="text-sm font-medium text-gray-600">Size Range</div>
                    <p className="text-gray-800 font-semibold">{look.sizeRange}</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-5">
                    <Sparkles className="h-5 w-5 text-pink-500 mb-2" />
                    <div className="text-sm font-medium text-gray-600">Fabric</div>
                    <p className="text-gray-800 font-semibold">{look.fabric}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-sm font-medium text-gray-600 mb-4">Color Story</div>
                  <div className="flex gap-4">
                    {look.palette.map((color, i) => (
                      <motion.div 
                        key={i}
                        className="flex flex-col items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div 
                          className="h-16 w-16 rounded-2xl shadow-xl"
                          style={{ 
                            background: color,
                            boxShadow: `0 10px 40px ${color}50`
                          }}
                        />
                        <span className="text-xs text-gray-500 font-mono">{color}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-gray"
                >
                  <p className="text-gray-600 leading-relaxed text-lg">{look.notes}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <InquiryForm look={look} designer={designer!} />
                </motion.div>
              </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

function InquiryForm({ look, designer }: { look: typeof LOOKS[number]; designer: typeof DESIGNERS[number] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`Hello ${designer.name},\n\nI'm interested in the "${look.title}". Could you please provide more details about availability and pricing?\n\nBest regards,`);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Enquiry: ${look.title}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    return `mailto:studio@prrmeow.com?subject=${subject}&body=${body}`;
  }, [name, email, message, look.title]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 border border-pink-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Make It Yours
      </h3>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input 
            placeholder="Your name" 
            value={name} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="bg-white/80 backdrop-blur-sm border-pink-200 focus:border-pink-400 rounded-xl"
          />
          <Input 
            type="email" 
            placeholder="Your email" 
            value={email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="bg-white/80 backdrop-blur-sm border-pink-200 focus:border-pink-400 rounded-xl"
          />
        </div>
        
        <Textarea 
          rows={5} 
          value={message} 
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          className="bg-white/80 backdrop-blur-sm border-pink-200 focus:border-pink-400 rounded-xl resize-none"
        />
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:shadow-2xl transition-all rounded-xl py-6 text-lg font-semibold"
          >
            <a href={mailto}>
              <Mail className="h-5 w-5 mr-3" />
              Send Enquiry
            </a>
          </Button>
        </motion.div>
        
        <p className="text-center text-sm text-gray-500">
          ✨ Expect a personalized response within 24 hours
        </p>
      </div>
    </div>
  );
}

export default function PrrMeowPortfolio() {
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("NEW");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const filtered = useMemo(() => {
    return LOOKS.filter(l => {
      const matchesQ = q
        ? [l.title, l.fabric, l.notes, getDesigner(l.designerId).name]
            .some(v => v.toLowerCase().includes(q.toLowerCase()))
        : true;
      
      const matchesCat = activeCategory === "All" 
        ? true 
        : activeCategory === "NEW"
        ? l.isNew
        : l.category === activeCategory;
      
      return matchesQ && matchesCat;
    });
  }, [q, activeCategory]);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${BRAND_PINK} 0%, ${SOFT_PINK} 50%, ${LAVENDER}30 100%)` }}>
      <FloatingParticles />
      
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+Indonesia&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
        
        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }
  `}</style>
      
      {/* Header */}
      <motion.header 
        className="fixed top-0 z-50 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-2xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <BrandWordmark />
            
            <nav className="hidden md:flex items-center gap-8">
              <motion.a 
                href="#collections" 
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Collections
              </motion.a>
              <motion.a 
                href="#designer" 
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Designer
              </motion.a>
              <motion.a 
                href="#contact" 
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.header>

      <Hero />

      {/* Collections with floating sidebar */}
      <section id="collections" className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-gray-800 mb-4">
            The Collection
          </h2>
          <p className="text-gray-600 text-lg">Each piece is a work of art</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Mobile Explore dropdown (visible on small screens) */}
          <div className="lg:hidden mb-4">
            <div className="max-w-7xl mx-auto px-6">
              <button
                onClick={() => setMobileExploreOpen(v => !v)}
                className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/50 shadow-sm"
                aria-expanded={mobileExploreOpen}
                aria-controls="mobile-explore-panel"
              >
                <span className="font-medium">Explore</span>
                <ChevronRight className={`h-4 w-4 transform transition ${mobileExploreOpen ? 'rotate-90' : ''}`} />
              </button>

              {mobileExploreOpen && (
                <div id="mobile-explore-panel" className="mt-3 bg-white/80 rounded-2xl p-4 shadow-2xl border border-white/50">
                  <nav className="space-y-2">
                    {["NEW", ...CATEGORIES.filter(c => c !== "NEW")].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setMobileExploreOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                          activeCategory === cat
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-pink-50'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {cat}
                          {cat === "NEW" && <Star className="h-4 w-4" />}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>

          {/* Floating Sidebar (desktop only) */}
          <motion.aside 
            className="hidden lg:block lg:sticky lg:top-24 h-max space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-6 text-lg">Explore</h3>
              <nav className="space-y-2">
                { ["NEW", ...CATEGORIES.filter(c => c !== "NEW")] .map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-3 rounded-2xl transition-all font-medium ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-pink-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      {cat}
                      {cat === "NEW" && <Star className="h-4 w-4" />}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-6 text-lg">Search</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={q}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
                  placeholder="Find your dream piece..."
                  className="pl-11 bg-white/50 border-pink-200 focus:border-pink-400 rounded-2xl"
                />
              </div>
            </div>
          </motion.aside>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {filtered.map((look, idx) => (
                <LookCard key={look.id} look={look} onOpen={setOpenId} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Meet the Designer Section */}
      <section id="designer" className="relative py-32 overflow-hidden">
        <FloatingCats />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-4">
              Meet the Designer
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">prrmeow is a brand that celebrates modern femininity through timeless, playful and elegant garments that encourage self expression and connecting with your softer side - regardless of gender. Inspired by historical silhouettes and Lolita fashion yet grounded by everyday wearability, each piece is designed to be layered, customized and cherished beyond trends. With sustainability, ethical production and transparency at its core, the brand also creates clothing that not only makes the wearer feel pretty and confident, but also reflects a commitment to natural fibres, thoughtful design and lasting value.</p>
          </div>

          {DESIGNERS.map(designer => (
            <div key={designer.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={designer.avatar}
                    alt={designer.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-4xl font-bold text-white mb-2">{designer.name}</h3>
                    <p className="text-white/90 text-lg">{designer.bio}</p>
                  </div>
                </div>
                
                {/* Floating stats */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-3xl font-bold text-pink-500">{designer.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <div className="text-3xl font-bold text-purple-500">{designer.pieces}</div>
                  <div className="text-sm text-gray-600">Pieces Created</div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">The Story</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {designer.story}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Connect</h4>
                  <div className="flex gap-4">
                    <motion.a 
                      href={designer.socials.instagram}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Instagram className="h-5 w-5 text-pink-500" />
                      <span className="font-medium text-gray-700">Instagram</span>
                    </motion.a>
                    <motion.a 
                      href={designer.socials.web}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Globe className="h-5 w-5 text-purple-500" />
                      <span className="font-medium text-gray-700">Website</span>
                    </motion.a>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-4xl">🐱</span>
                  <p className="text-gray-600 italic">
                    "Fashion should make you purr with delight"
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="bg-white/80 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h3 className="text-4xl font-black text-gray-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 text-lg">Start your fashion journey today</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.a 
                href="mailto:studio@prrmeow.com"
                className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="h-6 w-6 text-pink-500" />
                <div>
                  <div className="font-semibold text-gray-800">Email</div>
                  <div className="text-sm text-gray-600">studio@prrmeow.com</div>
                </div>
              </motion.a>
              
              <motion.a 
                href="#"
                className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <Instagram className="h-6 w-6 text-purple-500" />
                <div>
                  <div className="font-semibold text-gray-800">Instagram</div>
                  <div className="text-sm text-gray-600">@prr.meow</div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <BrandWordmark />
          <p className="mt-6 text-sm text-gray-600">
            © {new Date().getFullYear()} Prr Meow Couture. Where fashion meets fantasy.
          </p>
        </div>
      </footer>

      <LookDialog openId={openId} onClose={() => setOpenId(null)} />
    </div>
  );
}