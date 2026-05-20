import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  Zap,
  Shield,
  Brain,
  Clock,
  Calendar,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Lock,
  Code2,
} from 'lucide-react';
import './AIHub.css';

// Mock data structure with realistic 2026 trends
const hubData = [
  // Latest AI News
  {
    id: 1,
    category: 'AI_NEWS',
    title: 'Breakthrough: Multimodal LLMs Achieve Human-Level Reasoning in Complex Tasks',
    description:
      'Latest research demonstrates that advanced LLMs can now handle complex multi-step reasoning tasks with 97% accuracy. This breakthrough has implications for autonomous systems and decision-making in enterprises.',
    date: '2026-05-18',
    readTime: '5 min',
    icon: Brain,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 2,
    category: 'AI_NEWS',
    title: 'OpenAI Releases GPT-5: Real-time Processing and Context Windows Expand to 1M Tokens',
    description:
      'The latest iteration of GPT introduces real-time inference capabilities and expanded context windows, enabling more sophisticated applications in code generation and data analysis.',
    date: '2026-05-15',
    readTime: '7 min',
    icon: Zap,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 3,
    category: 'AI_NEWS',
    title: 'Anthropic Unveils Constitutional AI 2.0 Framework for Ethical AI Alignment',
    description:
      'A comprehensive framework designed to ensure AI systems remain aligned with human values. Organizations are adopting this standard across industries.',
    date: '2026-05-12',
    readTime: '6 min',
    icon: Code2,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },

  // Cloud & AI Tips
  {
    id: 4,
    category: 'CLOUD_TIPS',
    title: 'Optimize Your LLM Inference: Quantization Techniques for 50% Cost Reduction',
    description:
      'Learn how to implement int8 and fp16 quantization in production environments. We cover tools like GPTQ, AWQ, and LoRA to maximize performance while minimizing compute costs.',
    date: '2026-05-17',
    readTime: '9 min',
    icon: TrendingUp,
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    id: 5,
    category: 'CLOUD_TIPS',
    title: 'Building Efficient RAG Systems: Best Practices for Production Deployments',
    description:
      'A deep dive into Retrieval-Augmented Generation architecture. Including embedding optimization, vector database selection, and prompt engineering strategies for minimal latency.',
    date: '2026-05-14',
    readTime: '11 min',
    icon: Code2,
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    id: 6,
    category: 'CLOUD_TIPS',
    title: 'Kubernetes & LLM Scaling: Auto-scaling Strategies for AI Workloads',
    description:
      'Master horizontal and vertical scaling for containerized LLM services. Covers GPU optimization, load balancing, and cost monitoring across cloud platforms.',
    date: '2026-05-10',
    readTime: '8 min',
    icon: TrendingUp,
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },

  // Cyber Security Alerts
  {
    id: 7,
    category: 'SECURITY',
    title: 'CRITICAL: Zero-Day Vulnerability in AI Model Serialization Frameworks',
    description:
      'A remote code execution vulnerability (CVE-2026-4821) has been discovered affecting PyTorch, TensorFlow, and ONNX serialization. Immediate patching required. CVSS 9.8.',
    date: '2026-05-19',
    readTime: '4 min',
    icon: AlertTriangle,
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 8,
    category: 'SECURITY',
    title: 'Supply Chain Alert: Compromised NPM Package Targets ML Training Pipelines',
    description:
      'Security researchers identified malicious code in 12 popular ML utility packages. The attack steals training data and model weights. Update your dependencies immediately.',
    date: '2026-05-16',
    readTime: '5 min',
    icon: Lock,
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 9,
    category: 'SECURITY',
    title: 'Enterprise Alert: New AI-Powered Phishing Campaign Targets Cloud Credentials',
    description:
      'Threat actors are using fine-tuned LLMs to generate highly personalized phishing emails with 45% click-through rate. Learn detection and prevention strategies.',
    date: '2026-05-13',
    readTime: '6 min',
    icon: Shield,
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
];

// Category configuration
const categories = [
  { id: 'ALL', label: 'All Updates', icon: Zap },
  { id: 'AI_NEWS', label: 'Latest AI News', icon: Brain },
  { id: 'CLOUD_TIPS', label: 'Cloud & AI Tips', icon: Code2 },
  { id: 'SECURITY', label: 'Cyber Security Alerts', icon: AlertTriangle },
];

// Individual card component
const InsightCard = ({ insight, index }) => {
  const IconComponent = insight.icon;

  return (
    <motion.article
      className="insight-card group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <motion.div
            className="desktop-icon p-2.5 bg-green-500/10 rounded-lg border border-green-500/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <IconComponent size={20} className="text-green-400" />
          </motion.div>

          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${insight.badgeColor}`}>
            {insight.category === 'AI_NEWS' && 'AI News'}
            {insight.category === 'CLOUD_TIPS' && 'Tips'}
            {insight.category === 'SECURITY' && 'Alert'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
          {insight.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {insight.description}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-5 gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(insight.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {insight.readTime}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium text-sm transition-colors duration-300 group/btn"
          whileHover={{ x: 4 }}
          onClick={(e) => e.preventDefault()}
        >
          Read Full Story
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Border accent */}
      <div className="absolute inset-0 rounded-xl border border-green-500/0 group-hover:border-green-500/30 transition-colors duration-500" />
    </motion.article>
  );
};

// Main component
const AIHub = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Filter data based on active category
  const filteredInsights =
    activeCategory === 'ALL'
      ? hubData
      : hubData.filter((item) => item.category === activeCategory);

  return (
    <PageTransition className="page-container">
      <section className="ai-hub-section">
        {/* Header */}
        <motion.div
          className="ai-hub-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-content">
            <motion.div className="header-icon-box" whileHover={{ scale: 1.05, rotate: 5 }}>
              <Zap size={32} className="header-icon" />
            </motion.div>
            <h1 className="mono header-title">AI_HUB://INSIGHTS</h1>
            <p className="mono header-subtitle">LATEST_AI_TRENDS | CLOUD_OPTIMIZATION | SECURITY_INTELLIGENCE</p>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="category-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category) => {
            const TabIcon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`tab-button mono ${isActive ? 'active' : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <TabIcon size={18} />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          className="insights-grid"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredInsights.length > 0 ? (
            filteredInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="mono">NO_INSIGHTS_AVAILABLE</p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="ai-hub-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="mono">SUBSCRIBE_TO_UPDATES</p>
          <motion.button
            className="cyber-btn mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            GET_ALERTS()
          </motion.button>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default AIHub;
