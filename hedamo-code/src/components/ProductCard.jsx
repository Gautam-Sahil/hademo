import React, { useState, useRef } from 'react';
import {
  BuildingOfficeIcon,
  TagIcon,
  ArrowRightIcon,
  DocumentCheckIcon,
  EyeIcon,
  LinkIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProductCard = ({ product, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  // --- 3D Tilt & Mouse Follow Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth mouse following
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation degrees (max 15 degrees tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // Calculate normalized mouse position (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // --- Configuration & Helpers ---
  const getStatusConfig = (status) => {
    const configs = {
        draft: { bg: 'from-slate-200 to-slate-300', text: 'text-slate-600', icon: ClockIcon, label: 'Draft', shadow: 'shadow-slate-300/50' },
        submitted: { bg: 'from-blue-400 to-indigo-400', text: 'text-white', icon: EyeIcon, label: 'Under Review', shadow: 'shadow-blue-400/50' },
        published: { bg: 'from-emerald-400 to-teal-500', text: 'text-white', icon: DocumentCheckIcon, label: 'Published', shadow: 'shadow-emerald-400/50' }
    };
    return configs[status.toLowerCase()] || configs.draft;
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const statusConfig = getStatusConfig(product.status);
  const StatusIcon = statusConfig.icon;
  const priorityLevel = Math.min(product.evidenceCount || 0, 10);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay) => ({ opacity: 1, y: 0, transition: { delay: customDelay * 0.1, duration: 0.4 } })
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[400px] perspective-1000 mx-auto my-8"
    >
      {/* --- Dynamic Background Light (Follows Mouse) --- */}
      <motion.div
        style={{
          translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]),
          translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-10%", "10%"]),
        }}
        className={`absolute -inset-4 bg-gradient-to-br ${statusConfig.bg} opacity-20 blur-xl rounded-[3rem] -z-10 transition-opacity duration-500 ${isHovered ? 'opacity-15' : 'opacity-10'}`}
      />

      {/* --- MAIN GLASS CARD STRUCTURE --- */}
      {/* This outer div creates the shimmering diamond border effect */}
      <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-white/80 via-white/20 to-white/40 overflow-hidden shadow-[0_10px_30px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md">
        
        {/* Subtle Noise Texture for Premium Feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>

        <div className="relative h-full w-full rounded-[2.4rem] bg-white/60 backdrop-blur-md p-6 overflow-hidden">
          
          {/* Decorative Top Light Reflection */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

          {/* --- HEADER SECTION --- */}
          <motion.div custom={1} variants={contentVariants} className="flex justify-between items-start mb-8 relative z-10">
            <div>
              {/* Jewel-like Status Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${statusConfig.bg} ${statusConfig.shadow} shadow-md mb-3`}
              >
                <StatusIcon className={`h-4 w-4 ${statusConfig.text}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${statusConfig.text}`}>{statusConfig.label}</span>
              </motion.div>
              <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">{product.name}</h3>
              <div className="flex items-center text-slate-500 text-sm mt-1 font-medium">
                  <ClockIcon className="h-4 w-4 mr-1.5" />
                  {formatDate(product.lastUpdated)}
              </div>
            </div>

            {/* Glowing Priority Gauge */}
            <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity"/>
                <div className="h-16 w-16 rounded-full bg-white/50 backdrop-blur-md border border-white/80 flex items-center justify-center relative shadow-inner">
                  {/* SVGs for the gauge rings */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 p-1">
                      <circle cx="50%" cy="50%" r="24" fill="none" stroke="#e2e8f0" strokeWidth="4"/>
                      <motion.circle
                          cx="50%" cy="50%" r="24" fill="none" stroke="url(#priorityGrad)" strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${priorityLevel * 15} 150`}
                          initial={{ strokeDashoffset: 150 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      />
                       <defs>
                        <linearGradient id="priorityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                  </svg>
                  <div className="text-center z-10">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5">Level</span>
                      <span className="block text-xl font-black text-slate-800 leading-none">{priorityLevel}</span>
                  </div>
                </div>
            </div>
          </motion.div>

          {/* --- CONTENT CHIPS --- */}
          <motion.div custom={2} variants={contentVariants} className="grid grid-cols-2 gap-4 mb-6">
             <GlassChip icon={TagIcon} label="Category" value={product.category} color="blue" delay={2.2} />
             <GlassChip icon={BuildingOfficeIcon} label="Producer" value={product.producer} color="emerald" delay={2.3} />
          </motion.div>

          {/* --- EVIDENCE PROGRESS BAR (Liquid Light) --- */}
          <motion.div custom={3} variants={contentVariants} className="mb-6 p-4 rounded-2xl bg-white/40 border border-white/50 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center text-slate-700 font-bold text-sm">
                <DocumentCheckIcon className="h-5 w-5 text-indigo-500 mr-2" />
                Evidence Strength
              </div>
              <span className="text-sm font-black text-indigo-600">{product.evidenceCount || 0} / 10</span>
            </div>
            <div className="h-3 bg-slate-200/50 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full absolute left-0 top-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_100%]"
                initial={{ width: 0 }}
                animate={{
                    width: `${Math.min((product.evidenceCount || 0) * 10, 100)}%`,
                    backgroundPosition: ["0% 0%", "200% 0%"] // Shimmer effect
                }}
                transition={{
                    width: { duration: 1, delay: 0.8, ease: "easeOut" },
                    backgroundPosition: { repeat: Infinity, duration: 3, ease: "linear" }
                 }}
              />
              {/* Glow at the tip of the progress bar */}
              <motion.div
                 className="absolute top-0 h-full w-4 bg-white blur-[6px]"
                 initial={{ left: 0, opacity: 0 }}
                 animate={{ left: `${Math.min((product.evidenceCount || 0) * 10, 100)}%`, opacity: 1 }}
                 transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                 style={{ marginLeft: '-8px' }}
              />
            </div>
          </motion.div>

           {/* --- HOVER ACTIONS (Spring Up) --- */}
           <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute bottom-24 left-0 right-0 flex justify-center space-x-4 z-20"
              >
                <QuickActionButton icon={EyeIcon} color="blue" />
                <QuickActionButton icon={ChartBarIcon} color="emerald" />
                <QuickActionButton icon={LinkIcon} color="purple" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- FOOTER & CTA --- */}
          <motion.div custom={4} variants={contentVariants} className="pt-6 border-t border-white/40 flex items-end justify-between relative z-10">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ID: {product.id.substring(0, 8)}</span>
                {product.description && (
                     <p className="text-xs text-slate-500 line-clamp-1 italic max-w-[150px]">"{product.description}"</p>
                )}
             </div>
            
            {/* Gemstone CTA Button */}
           <motion.button
  onClick={onClick}
  whileHover="hover"
  whileTap="tap"
  variants={{ hover: { scale: 1.05 }, tap: { scale: 0.95 } }}
  className="relative group"
>
  {/* Subtle Glow Layer */}
  <motion.div
    variants={{ hover: { opacity: 0.4, scale: 1.05 }, tap: { scale: 0.95 } }}
    className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-fuchsia-400 rounded-xl blur-sm opacity-20 group-hover:opacity-30 transition-all duration-300"
  />

  {/* Glassy Background */}
  <div className="relative px-5 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-fuchsia-500/20 flex items-center gap-2 overflow-hidden">
    {/* Light Sheen */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
      initial={{ x: '-100%' }}
      variants={{ hover: { x: '200%', transition: { duration: 0.7, ease: 'easeInOut' } } }}
    />

    <span className="text-sm font-bold text-gray-600 tracking-wide">View Details</span>
    <ArrowRightIcon className="h-4 w-4 text-white/90 stroke-[2.5px] group-hover:translate-x-1 transition-transform" />
  </div>
</motion.button>

          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENTS for cleaner code ---

// Glassy info chip
const GlassChip = ({ icon: Icon, label, value, color, delay }) => {
    const colorMap = {
        blue: { text: 'text-blue-600', icon: 'text-blue-500', bg: 'bg-blue-50/50 hover:bg-blue-100/50', border: 'border-blue-100/50' },
        emerald: { text: 'text-emerald-600', icon: 'text-emerald-500', bg: 'bg-emerald-50/50 hover:bg-emerald-100/50', border: 'border-emerald-100/50' },
    }
    const theme = colorMap[color];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 0.1, duration: 0.4 }}
        whileHover={{ y: -2, scale: 1.02 }}
        className={`p-3.5 rounded-2xl backdrop-blur-sm border transition-colors duration-300 ${theme.bg} ${theme.border}`}
      >
        <div className="flex items-start">
          <Icon className={`h-5 w-5 ${theme.icon} mr-2.5 mt-0.5`} />
          <div>
            <div className={`text-[11px] font-bold uppercase tracking-wider ${theme.text} opacity-80`}>{label}</div>
            <div className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">{value}</div>
          </div>
        </div>
      </motion.div>
    )
}

// Circular quick action buttons
const QuickActionButton = ({ icon: Icon, color }) => {
    const colorMap = {
        blue: 'from-blue-400 to-indigo-500 shadow-blue-400/30 text-white',
        emerald: 'from-emerald-400 to-teal-500 shadow-emerald-400/30 text-white',
        purple: 'from-purple-400 to-fuchsia-500 shadow-purple-400/30 text-white',
    };
    const bg = colorMap[color];

    return (
        <motion.button
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full bg-gradient-to-tr ${bg} shadow-lg border border-white/20 backdrop-blur-md`}
        >
            <Icon className="h-5 w-5" />
        </motion.button>
    );
}

export default ProductCard;