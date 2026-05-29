/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Monitor,
  Smartphone,
  Layout,
  Instagram,
  Video
} from 'lucide-react';

// ==========================================
// 📸 图片配置中心 - 在这里替换你的图片链接
// ==========================================
const IMAGE_CONFIG = {
  // 个人头像 (建议 1:1)
  profile: "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/9c0145145a7e298182d822ceeef8c0b6.jpg", // 个人头像
  
  // 精选作品 (使用用户提供的 GitHub 链接)
  projects: [
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260314134229_621_154.jpg", // 精选作品 1
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260314134231_622_154.jpg", // 精选作品 2
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260314134236_626_154.jpg", // 精选作品 3
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260314134237_627_154.jpg", // 精选作品 4
  ],
  
  // 抖音视频封面 (建议 9:16 竖图)
  douyin: [
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260314134235_625_154.jpg", // 视频 1
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-03-14%20162110.png", // 视频 2
    "https://raw.githubusercontent.com/3067667213-collab/13425950653/refs/heads/main/4ca570748a2d3b1b2a1d09a8f2da5327.png", // 视频 3
  ]
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const cursorSpring = {
    type: "spring",
    damping: 20,
    stiffness: 250,
    mass: 0.5
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/20 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(0,0,0,0.05)" : "transparent",
          borderColor: isHovering ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.2)",
        }}
        transition={cursorSpring}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 4 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? 'py-4 glass border-b border-black/5' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tighter"
        >
          ZHANG.DESIGN
        </motion.div>
        <div className="hidden md:flex space-x-12 text-sm font-medium tracking-tight">
          {['作品', '品牌', '关于'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="hover:opacity-50 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          联系我
        </motion.button>
      </div>
    </motion.nav>
  );
};

// --- Marquee ---
const Marquee = ({ text, reverse = false }: { text: string[], reverse?: boolean }) => {
  return (
    <div className="relative flex overflow-x-hidden border-y border-black/5 py-12 bg-white">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...text, ...text, ...text, ...text].map((item, i) => (
          <span key={i} className="text-6xl md:text-8xl font-bold mx-8 tracking-tighter text-black/5 hover:text-black transition-colors duration-500 cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Hero ---
const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-neutral-100 border border-black/5"
            >
              <img 
                src={IMAGE_CONFIG.profile} 
                alt="陈怡彤" 
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div>
              <span className="text-sm font-semibold tracking-widest text-neutral-400 uppercase mb-4 block">
                Content Operations & AIGC Creator
              </span>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]">
                HELLO,<br />我是<span className="text-neutral-300">陈怡彤</span>
              </h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="max-w-md text-lg text-neutral-500 leading-relaxed">
            深耕内容运营与 IP 打造，擅长数据驱动的内容优化。熟练运用 GPT、Midjourney、Runway 等 AIGC 工具，打通“内容-流量-转化”闭环。
          </p>
          
          <div className="flex space-x-6">
            <motion.div whileHover={{ y: -5 }} className="p-3 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Github size={20} />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-3 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Linkedin size={20} />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-3 rounded-full border border-black/5 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Mail size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-300"
      >
        <div className="w-[1px] h-12 bg-neutral-200 mx-auto" />
      </motion.div>
    </section>
  );
};

// --- Project Card ---
const ProjectCard = ({ title, category, image, index, className = "" }: { title: string, category: string, image: string, index: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 mb-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${className}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-full">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-1">{title}</h3>
          <p className="text-neutral-400 font-medium">{category}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Experience ---
const Experience = () => {
  const experiences = [
    {
      company: "北京吉善全息传媒有限公司",
      role: "内容运营",
      period: "2025.02 - 2026.02",
      desc: "负责个人 IP 形象运营，聚焦短视频流量获取与直播引流。独立负责文案撰写、脚本策划及素材制作，实现公域流量精准对接。"
    },
    {
      company: "家天下国学研究院",
      role: "内容运营",
      period: "2023.08 - 2025.02",
      desc: "主导国学研究院线上传播与线下转化全链路运营，核心通过公众号自传播、小红书图文公域转私域，沉淀精准意向用户。"
    }
  ];

  return (
    <section id="经历" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-6 block">
              Professional Journey
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
              工作经历
            </h2>
            <p className="text-xl text-neutral-500 max-w-md leading-relaxed">
              具备多平台内容运营、团队管理及 IP 打造经验。擅长数据驱动优化，熟练运用 AI 工具提升创作效率。
            </p>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-black/5 pb-12 last:border-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {exp.company}
                  </h3>
                  <span className="text-neutral-400 font-mono text-sm">{exp.period}</span>
                </div>
                <p className="text-xl font-medium mb-4 text-neutral-800">{exp.role}</p>
                <p className="text-neutral-500 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Douyin Section ---
const DouyinSection = () => {
  return (
    <section id="品牌" className="py-32 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-6 block">
              Personal Brand
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              内容增长
            </h2>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="#"
            className="flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-full font-bold"
          >
            <span>关注我 @陈怡彤</span>
            <Video size={20} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-black/5"
            >
              <div className="aspect-[9/16] bg-neutral-200 relative group">
                <img 
                  src={IMAGE_CONFIG.douyin[i-1]} 
                  alt="Douyin Content" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                    <Video className="text-white" fill="white" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-neutral-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {i === 1 ? '100W+ 爆款' : i === 2 ? 'AI 创作' : '运营实战'}
                  </span>
                </div>
                <h4 className="text-xl font-bold leading-tight">
                  {i === 1 ? '通过播放 / 点赞 / 评论数据复盘选题方向，迭代内容标签与发布节奏' : i === 2 ? '利用 AI 工具实现短视频全流程自动化' : 'AIGC 驱动下的内容高效创作与迭代'}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Education ---
const Education = () => {
  return (
    <section className="py-20 px-6 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-neutral-300 uppercase mb-2 block">
            Background
          </span>
          <h3 className="text-2xl font-bold tracking-tight">教育背景</h3>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <p className="font-bold text-lg">四川传媒学院</p>
            <p className="text-neutral-400 text-sm">视觉传达设计 · 本科 (2018-2023)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
              期待与你<br />共同创造价值
            </h2>
            <motion.a 
              whileHover={{ x: 10 }}
              href="mailto:13425950653@163.com"
              className="text-2xl md:text-4xl font-medium border-b-2 border-white/20 pb-2 hover:border-white transition-all inline-flex items-center gap-4"
            >
              13425950653@163.com
              <ArrowUpRight size={32} />
            </motion.a>
          </div>
          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-neutral-500 mb-4 uppercase text-xs font-bold tracking-widest">Contact</p>
                <ul className="space-y-2">
                  <li><span className="text-neutral-400">电话:</span> 13425950653</li>
                  <li><span className="text-neutral-400">城市:</span> 北京</li>
                </ul>
              </div>
              <div>
                <p className="text-neutral-500 mb-4 uppercase text-xs font-bold tracking-widest">Social</p>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neutral-400 transition-colors">抖音</a></li>
                  <li><a href="#" className="hover:text-neutral-400 transition-colors">小红书</a></li>
                  <li><a href="#" className="hover:text-neutral-400 transition-colors">微信</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-neutral-500 text-sm">
          <p>© 2024 CHEN YITONG. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="font-sans selection:bg-black selection:text-white">
      <CustomCursor />
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX }}
      />

      <main>
        <Hero />
        
        <Marquee text={['CONTENT OPS', 'AIGC CREATOR', 'BRANDING', 'IP STRATEGY', 'SHORT VIDEO', 'LIVE STREAMING']} />

        <section id="作品" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-6 block">
                  Selected Works
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                  精选作品
                </h2>
              </div>
              <p className="text-neutral-400 font-medium max-w-xs">
                每一个爆款背后，都是对数据与人性的深度洞察。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              <ProjectCard 
                index={0}
                title="千一老师国学文化 IP 孵化" 
                category="IP Branding / Douyin" 
                image={IMAGE_CONFIG.projects[0]} 
              />
              <ProjectCard 
                index={1}
                title="0~1国学智慧账号运营" 
                category="一周时间达到 5000+ 粉丝" 
                image={IMAGE_CONFIG.projects[1]} 
              />
              <ProjectCard 
                index={2}
                title="禅修疗愈营品牌建设" 
                category="品牌策略 / 禅意生活" 
                image={IMAGE_CONFIG.projects[2]} 
              />
              <ProjectCard 
                index={3}
                title="身心灵治愈类爆款笔记" 
                category="小红书运营 / 情感治愈" 
                image={IMAGE_CONFIG.projects[3]} 
              />
            </div>
          </div>
        </section>

        <Marquee text={['DATA DRIVEN', 'USER GROWTH', 'CREATIVE CONTENT', 'AI WORKFLOW']} reverse />

        <DouyinSection />
      </main>

      <Footer />
    </div>
  );
}
