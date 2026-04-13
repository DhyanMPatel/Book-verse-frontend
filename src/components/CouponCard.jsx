import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Clock, 
  Tag, 
  Users,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import './CouponCard.css';

const CouponCard = ({ 
  brand = "BookVerse",
  discount = 20,
  code = "Bookv20",
  validUntil = "Dec 31, 2025",
  discountType = "percentage",
  category = null,
  usageCount = 0,
  maxUsage = null,
  isUsed = false,
  isExpired = false,
  onCopy,
  onApply,
  showApplyButton = false
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  // Calculate days left on mount
  useEffect(() => {
    if (validUntil) {
      const today = new Date();
      const expiry = new Date(validUntil);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    }
  }, [validUntil]);

  const handleCopy = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setShowConfetti(true);
    
    if (onCopy) onCopy(code);
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleApply = (e) => {
    e?.stopPropagation();
    if (onApply && !isUsed && !isExpired) {
      onApply(code);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusClass = () => {
    if (isUsed) return 'coupon-card--used';
    if (isExpired) return 'coupon-card--expired';
    return '';
  };

  const getStatusText = () => {
    if (isUsed) return 'USED';
    if (isExpired) return 'EXPIRED';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={!isUsed && !isExpired ? { y: -8, scale: 1.02 } : {}}
      className={`coupon-card ${getStatusClass()}`}
      data-status={getStatusText()}
    >
      {/* Shine Effect */}
      <div className="coupon-card__shine" />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="coupon-card__confetti">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti-piece"
                style={{
                  backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i % 5],
                  left: `${10 + (i * 7)}%`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Ticket Shape with Cutouts */}
      <div className="flex h-full">
        {/* Left Side - Brand Area */}
        <div className="coupon-card__brand">
          <div className="coupon-card__brand-pattern" />
          <div className="coupon-card__cutout-right" />
          
          <div>
            <BookOpen className="coupon-card__icon" />
          </div>
          <p className="coupon-card__brand-name">{brand}</p>
        </div>
        
        {/* Perforated Line */}
        <div className="coupon-card__perforation">
          <div className="coupon-card__perforation-line" />
          <div className="coupon-card__cutout-left" />
        </div>
        
        {/* Right Side - Coupon Details */}
        <div className="coupon-card__details">
          {/* Category Badge */}
          {category && category.name && (
            <div className="coupon-card__category-badge">
              <Tag />
              {category.name}
            </div>
          )}
          
          {/* Discount Display */}
          <div className="coupon-card__discount">
            <span className="coupon-card__discount-symbol">
              {discountType === "percentage" ? "%" : "₹"}
            </span>
            <span className="coupon-card__discount-amount">
              {discount}
            </span>
            <span className="coupon-card__discount-label">OFF</span>
          </div>
          
          {/* Validity */}
          <div className={`coupon-card__validity ${daysLeft !== null && daysLeft <= 3 ? 'coupon-card__validity--urgent' : ''}`}>
            <Clock />
            {isExpired ? (
              <span>Expired on {formatDate(validUntil)}</span>
            ) : daysLeft !== null && daysLeft <= 3 ? (
              <span>Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}!</span>
            ) : (
              <span>Valid until {formatDate(validUntil)}</span>
            )}
          </div>
          
          {/* Code & Copy */}
          <div className="coupon-card__code-section">
            <span className="coupon-card__code">{code}</span>
            
            <button 
              onClick={handleCopy}
              disabled={isUsed || isExpired}
              className={`coupon-card__copy-btn ${copied ? 'coupon-card__copy-btn--copied' : ''}`}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy />
                  </motion.span>
                )}
              </AnimatePresence>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
              
              {/* Tooltip */}
              <span className="coupon-card__tooltip">
                {copied ? 'Code copied!' : 'Click to copy'}
              </span>
            </button>
            
            {/* Apply Button */}
            {showApplyButton && !isUsed && !isExpired && (
              <motion.button
                onClick={handleApply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="coupon-card__copy-btn"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white'
                }}
              >
                <Sparkles />
                <span>Apply</span>
              </motion.button>
            )}
          </div>
          
          {/* Usage Info */}
          {maxUsage && (
            <div className="coupon-card__usage">
              <Users />
              <span>
                Used <span className="coupon-card__usage-count">{usageCount}</span>
                {maxUsage !== Infinity && ` / ${maxUsage}`} times
              </span>
              {usageCount >= maxUsage && (
                <AlertCircle style={{ color: '#ef4444', width: '0.875rem', height: '0.875rem' }} />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CouponCard;
