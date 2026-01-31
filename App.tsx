import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, FileText, User, ChevronRight, ChevronLeft, MapPin, Award, BookOpen, Globe, Download } from 'lucide-react';
import { Section } from './components/Section';

type Language = 'zh' | 'en';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lang, setLang] = useState<Language>('zh');

  const nextPage = () => setCurrentPage(1);
  const prevPage = () => setCurrentPage(0);
  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en');
  const handlePrint = () => window.print();

  return (
    <>
      {/* === SCREEN VIEW === */}
      <div className="min-h-screen flowing-bg flex items-center justify-center p-2 sm:p-8 overflow-hidden relative no-print">
        
        {/* Mobile Notice */}
        <div className="lg:hidden absolute top-4 left-4 right-4 bg-white/90 p-3 rounded shadow text-[10px] text-center z-40 backdrop-blur-sm">
          {lang === 'en' ? 'Swipe or scroll to view full resume.' : '建议在桌面端浏览获得翻页体验，手机端可直接下滑。'}
        </div>

        {/* Top Controls: Language & Print */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 flex gap-2 sm:gap-3">
           <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg hover:scale-105 transition-transform font-bold text-xs sm:text-sm"
            title="Export PDF"
          >
            <Download size={14} className="sm:w-4 sm:h-4" />
            {lang === 'en' ? 'PDF' : '导出'}
          </button>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg hover:scale-105 transition-transform font-bold text-xs sm:text-sm"
          >
            <Globe size={14} className="sm:w-4 sm:h-4" />
            {lang === 'en' ? 'CN' : 'EN'}
          </button>
        </div>

        {/* Book Container */}
        {/* Changed bg-neutral-900 to bg-zinc-800 to match the lighter theme */}
        <div className="book-perspective book-container-wrapper relative w-full max-w-6xl h-[90vh] sm:h-[85vh] flex shadow-2xl rounded-lg overflow-hidden bg-zinc-800 transition-all duration-500">
          
          {/* === LEFT SIDE (Desktop) === */}
          <div className="w-1/2 h-full bg-zinc-800 text-white relative z-0 hidden lg:block border-r border-zinc-700">
             {currentPage === 0 ? <LeftPageContent1 lang={lang} /> : <LeftPageContent2 lang={lang} />}
          </div>

          {/* === RIGHT SIDE (Desktop) === */}
          <div className="w-1/2 h-full bg-white text-neutral-900 relative z-0 hidden lg:block">
             {currentPage === 0 ? <RightPageContent1 lang={lang} /> : <RightPageContent2 lang={lang} />}
          </div>

          {/* === MOBILE VIEW === */}
          <div className="lg:hidden w-full h-full bg-white overflow-y-auto scroll-smooth">
            <div className="min-h-[90vh] flex flex-col">
              <LeftPageContent1 mobile lang={lang} />
            </div>
            <div className="p-4"><RightPageContent1 lang={lang} /></div>
            <div className="p-0 bg-neutral-50"><LeftPageContent2 lightMode lang={lang} mobile /></div>
            <div className="p-4"><RightPageContent2 lang={lang} /></div>
          </div>

          {/* Navigation Controls */}
          <div className="hidden lg:flex absolute bottom-8 left-0 right-0 justify-center gap-8 z-50 pointer-events-none">
            <button 
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-md transition-all ${
                currentPage === 0 
                  ? 'bg-white/10 text-white/20 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105 shadow-lg'
              }`}
            >
              <ChevronLeft size={20} /> {lang === 'en' ? 'Previous' : '上一页'}
            </button>
            <span className="text-white/40 font-mono text-sm self-center">
              {currentPage + 1} / 2
            </span>
            <button 
              onClick={nextPage}
              disabled={currentPage === 1}
              className={`pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-md transition-all ${
                currentPage === 1 
                  ? 'bg-black/10 text-black/20 cursor-not-allowed' 
                  : 'bg-zinc-800/10 text-zinc-900 hover:bg-zinc-800/20 hover:scale-105 shadow-lg border border-neutral-200'
              }`}
            >
              {lang === 'en' ? 'Next' : '下一页'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* === PRINT VIEW (Hidden by default, shows on print) === */}
      <div className="print-only max-w-[21cm] mx-auto p-8">
        <div className="grid grid-cols-2 gap-8 border-b border-neutral-200 pb-8 mb-8">
          <LeftPageContent1 lang={lang} print />
          <div className="pt-12"><RightPageContent1 lang={lang} print /></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <LeftPageContent2 lang={lang} print />
          <RightPageContent2 lang={lang} print />
        </div>
      </div>
    </>
  );
};

// --- CONTENT COMPONENTS ---

interface PageProps {
  mobile?: boolean;
  lightMode?: boolean;
  print?: boolean;
  lang: Language;
}

// Helper to determine text colors based on mode
const getTheme = (isDark: boolean) => ({
  // Updated to Lighter Gray (Zinc 800) with transparency for better visuals
  bg: isDark ? 'bg-zinc-800/95 backdrop-blur-sm' : '', 
  text: isDark ? 'text-white' : 'text-neutral-900',
  subtext: isDark ? 'text-zinc-400' : 'text-neutral-500',
  border: isDark ? 'border-zinc-700' : 'border-neutral-200',
  tagBg: isDark ? 'bg-zinc-700' : 'bg-neutral-100',
});

// Reusable Header Component
const ProfileHeader: React.FC<{ lang: Language; theme: any; isDark: boolean; pX: string; pTop: string }> = ({ lang, theme, isDark, pX, pTop }) => (
  <div className={`sticky top-0 z-20 ${pX} ${pTop} pb-6 border-b transition-colors duration-300 ${isDark ? 'bg-zinc-800/95 border-zinc-700' : 'bg-white/95 border-neutral-100'} backdrop-blur-md`}>
    <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-wider">{lang === 'en' ? 'Sheng Chenliang' : '盛宸亮'}</h1>
    <p className={`${theme.subtext} text-xs sm:text-sm uppercase tracking-widest mb-6`}>Sheng Chenliang</p>
    
    <div className={`space-y-3 text-xs sm:text-sm ${isDark ? 'text-zinc-300' : 'text-neutral-700'}`}>
      <div className="flex items-center gap-3">
        <User size={14} className="shrink-0" />
        <span>{lang === 'en' ? '2004-04 / Male / Han' : '2004-04 / 男 / 汉族'}</span>
      </div>
      <div className="flex items-center gap-3">
        <Phone size={14} className="shrink-0" />
        <span>17602199148</span>
      </div>
      <div className="flex items-center gap-3">
        <Mail size={14} className="shrink-0" />
        <a href="mailto:2023212716@mail.hfut.edu.cn" className="hover:underline transition-colors break-all">
          2023212716@mail.hfut.edu.cn
        </a>
      </div>
      <div className="flex items-center gap-3">
        <MapPin size={14} className="shrink-0" />
        <span>{lang === 'en' ? 'Hefei University of Technology' : '合肥工业大学'}</span>
      </div>
    </div>
  </div>
);

// SPREAD 1 LEFT: Profile
const LeftPageContent1: React.FC<PageProps> = ({ mobile, print, lang }) => {
  const isDark = (mobile || !print) && !print; 
  const theme = getTheme(isDark);
  
  // Padding Logic: Standard for desktop, tighter for mobile
  const pX = mobile ? 'px-5' : 'px-10';
  const pTop = mobile ? 'pt-16' : 'pt-10'; // Extra top padding on mobile for "Best viewed" banner
  
  return (
    <div className={`h-full relative overflow-y-auto no-scrollbar ${theme.bg} ${theme.text}`}>
      
      {/* --- Sticky Header Section --- */}
      <ProfileHeader lang={lang} theme={theme} isDark={isDark} pX={pX} pTop={pTop} />

      {/* --- Scrollable Content Section --- */}
      <div className={`${pX} py-8`}>
        <div className="mb-10">
          <h3 className={`text-lg font-semibold uppercase border-b pb-2 mb-4 ${theme.border}`}>
            {lang === 'en' ? 'Education' : '教育经历'}
          </h3>
          <div className="mb-4">
            <div className="font-bold text-lg">{lang === 'en' ? 'Hefei University of Technology (211)' : '合肥工业大学 (211)'}</div>
            <div className={`${theme.subtext} italic mb-2 text-xs`}>{lang === 'en' ? '2023-09 - Present' : '2023-09 - 至今'}</div>
            <div>{lang === 'en' ? 'International Economics and Trade' : '国际经济与贸易 (本科)'}</div>
          </div>
          
          <div className={`text-xs ${theme.subtext} space-y-3 leading-relaxed`}>
            <p>
              <strong>{lang === 'en' ? 'Core Courses:' : '核心课程：'}</strong> 
              {lang === 'en' 
                ? ' Money & Banking (98.5), Linear Algebra (95), Political Economy (92), Economic Law, Accounting, Data Mining & MATLAB.'
                : ' 货币银行学 (98.5)、线性代数 (95)、政治经济学 (92)、经济法、会计学、数据挖掘与MATLAB应用。'}
            </p>
            
            <div className={`p-3 rounded border ${theme.border} ${isDark ? 'bg-zinc-700/30' : 'bg-neutral-50'}`}>
              <strong className="block mb-2 flex items-center gap-2">
                 <Award size={14} /> {lang === 'en' ? 'Coursera Certifications' : 'Coursera 认证'}
              </strong>
              <ul className="space-y-2">
                <li className="flex justify-between items-start">
                  <span>Python Basics (Univ. of Michigan)</span>
                  <a 
                    href="https://coursera.org/verify/WJCC5KX00QO3" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-1 opacity-80 hover:opacity-100"
                  >
                    <ExternalLink size={10} />
                  </a>
                </li>
                <li className="flex justify-between items-start">
                  <span>Data Analysis with R</span>
                  <a 
                    href="https://coursera.org/verify/E1X2QWXKPNAF" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-1 opacity-80 hover:opacity-100"
                  >
                    <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold uppercase border-b pb-2 mb-4 ${theme.border}`}>
            {lang === 'en' ? 'Skills' : '相关技能'}
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <strong className={`block mb-2 ${isDark ? 'text-zinc-300' : 'text-neutral-800'}`}>{lang === 'en' ? 'Software' : '软件技能'}</strong>
              <div className="flex flex-wrap gap-2">
                {['R', 'Python', 'MATLAB', 'PPT', 'Excel'].map(skill => (
                  <span key={skill} className={`px-2 py-1 rounded text-xs border ${theme.border} ${theme.tagBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <strong className={`block mb-1 ${isDark ? 'text-zinc-300' : 'text-neutral-800'}`}>{lang === 'en' ? 'Interests' : '兴趣爱好'}</strong>
              <p className={`text-xs ${theme.subtext}`}>{lang === 'en' ? 'Long-distance running, Photography, Debate' : '长跑、摄影、辩论'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SPREAD 1 RIGHT: Research
const RightPageContent1: React.FC<PageProps> = ({ print, lang }) => (
  <div className={`h-full ${!print ? 'p-5 sm:p-10 overflow-y-auto no-scrollbar' : ''}`}>
    <Section title={lang === 'en' ? 'Research Experience' : '科研经历'}>
      {/* Research Item 1 */}
      <div className="relative border-l-2 border-neutral-200 pl-6 pb-8 last:pb-0 group hover:bg-neutral-50/50 transition-colors rounded-r-lg p-2 -ml-2">
        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-200 border-2 border-white group-hover:bg-zinc-800 transition-colors"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
          <h3 className="font-bold text-lg leading-tight w-full sm:w-3/4 text-neutral-900">
            Contract Design for Repurchasing Computational Power
          </h3>
          <span className="text-xs font-mono text-neutral-500 mt-1 sm:mt-0 bg-neutral-100 px-2 py-1 rounded">
            2024.03 - 2025.05
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-neutral-900 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">{lang === 'en' ? '2nd Author' : '第二作者'}</span>
          <span className="text-xs text-neutral-600 italic">{lang === 'en' ? 'Published in IJTCS-FALL 2025' : '已发表于 IJTCS-FALL 2025'}</span>
        </div>
        
        <div className="text-sm text-neutral-600 space-y-2 mb-3 leading-relaxed">
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Optimization Model:' : '模型优化：'}</strong>
            {lang === 'en' 
              ? ' Designed a repurchase mechanism based on contract theory to address low GPU utilization (10-15%) in cloud computing, incentivizing the release of idle power.'
              : ' 针对云计算行业 GPU 利用率仅 10-15% 的痛点，构建基于契约理论的回购机制，激励现有客户释放闲置算力并再分配给新需求。'}
          </p>
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Contribution:' : '主要贡献：'}</strong>
            {lang === 'en' 
              ? ' Authored the Introduction and conducted code reproduction/verification.'
              : ' 负责引言撰写与代码复现/验证。'}
          </p>
        </div>

        <a 
          href="https://arxiv.org/abs/2504.14823" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
        >
          {lang === 'en' ? 'View Paper' : '查看论文'} <ExternalLink size={12} />
        </a>
      </div>

      {/* Research Item 2 */}
      <div className="relative border-l-2 border-neutral-200 pl-6 group hover:bg-neutral-50/50 transition-colors rounded-r-lg p-2 -ml-2">
         <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-200 border-2 border-white group-hover:bg-zinc-800 transition-colors"></div>
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
          <h3 className="font-bold text-lg leading-tight w-full sm:w-3/4 text-neutral-900">
             {lang === 'en' ? 'Economic Analysis of Antibiotic Treatment Regimens' : '基于两阶段博弈DEA模型的抗生素治疗方案经济效益分析'}
          </h3>
          <span className="text-xs font-mono text-neutral-500 mt-1 sm:mt-0 bg-neutral-100 px-2 py-1 rounded">
            2025.06 - {lang === 'en' ? 'Present' : '至今'}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-neutral-900 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">{lang === 'en' ? '1st Author' : '第一作者'}</span>
          <span className="text-xs text-neutral-600 italic">{lang === 'en' ? 'Two-stage Game DEA Model' : '两阶段BCC博弈DEA模型'}</span>
        </div>
        
        <div className="text-sm text-neutral-600 space-y-2 leading-relaxed">
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Framework:' : '框架设计：'}</strong> 
            {lang === 'en' 
              ? ' Integrated 7 key indicators (clinical cure rate, length of stay, adverse reaction costs) into a two-stage BCC game DEA model to evaluate 10 antibiotic regimens.'
              : ' 将临床治愈率、住院天数、不良反应成本等 7 项关键指标纳入两阶段 BCC 博弈 DEA 模型，把 10 种抗生素方案转化为可比较的效率前沿。'}
          </p>
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Data Insight:' : '数据洞察：'}</strong> 
            {lang === 'en' 
              ? ' Performed 1,000 Monte Carlo simulations using MATLAB to quantify parameter uncertainty. Identified 3 robust "high-efficacy, low-cost" regimens.'
              : ' 用 MATLAB 完成 1,000 次蒙特卡洛模拟，量化参数不确定性，锁定达托霉素等 3 个“高疗效-低成本”稳健方案，为剩余 19 种方案给出 ROI 排序。'}
          </p>
        </div>
      </div>
    </Section>
  </div>
);

// SPREAD 2 LEFT: Internship
const LeftPageContent2: React.FC<PageProps> = ({ lightMode, print, lang, mobile }) => {
  const isDark = (!lightMode && !print);
  const theme = getTheme(isDark);
  const pX = mobile ? 'px-5' : 'px-10';
  const pTop = mobile ? 'pt-16' : 'pt-10'; // Keep top padding consistent with Page 1 for header

  return (
    <div className={`h-full relative overflow-y-auto no-scrollbar ${theme.bg} ${theme.text}`}>
       
       {/* --- Sticky Header Section (Reused here) --- */}
      <ProfileHeader lang={lang} theme={theme} isDark={isDark} pX={pX} pTop={pTop} />

      <div className={`${pX} py-8`}>
        <h2 className={`text-xl font-bold tracking-tight uppercase border-b-2 pb-2 mb-6 ${theme.border}`}>
          {lang === 'en' ? 'Internship Experience' : '实习经历'}
        </h2>

        <div className="space-y-8">
          {/* Internship 1 */}
          <div className="relative">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className={`font-bold text-lg`}>
                {lang === 'en' ? 'Shanghai Univ. of TCM' : '上海中医药大学'}
              </h3>
              <span className={`text-xs font-mono opacity-60`}>2025.01 - 2025.02</span>
            </div>
            <div className="mb-3 text-sm font-medium text-blue-400">
              {lang === 'en' ? 'Center for Quantitative Pharmacology | Research Assistant' : '药物临床研究中心 | 研究助理'}
            </div>
            <div className={`text-sm space-y-2 opacity-80 leading-relaxed text-justify`}>
              <p>
                {lang === 'en' 
                  ? 'Actively participated in center research activities. Mainly responsible for in-depth review and analysis of pharmacoeconomics literature, refinement of key research methods.'
                  : '参与中心研究活动。主要负责药物经济学文献的深度综述与分析，关键研究方法的提炼及准确报告。'}
              </p>
              <p>
                {lang === 'en' 
                  ? 'Demonstrated solid professional knowledge in applying experimental techniques and data analysis methods. Deepened understanding of pharmacoeconomics theoretical knowledge.'
                  : '在应用实验技术和数据分析方法方面表现出扎实的专业知识。加深了对药物经济学理论知识的理解，积累了宝贵的实践经验。'}
              </p>
            </div>
            <div className="mt-4">
              <button className={`text-xs flex items-center gap-1 border px-2 py-1 rounded transition-colors ${isDark ? 'border-zinc-600 hover:bg-white hover:text-black' : 'border-neutral-300 hover:bg-black hover:text-white'}`}>
                <FileText size={12} /> {lang === 'en' ? 'View Proof of Internship' : '查看实习证明'}
              </button>
            </div>
          </div>

          {/* Internship 2 */}
          <div className={`relative border-t pt-6 ${theme.border}`}>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className={`font-bold text-lg`}>
                {lang === 'en' ? 'NetEase News' : '网易新闻'}
              </h3>
              <span className={`text-xs font-mono opacity-60`}>2025.09 - 2025.10</span>
            </div>
            <div className="mb-3 text-sm font-medium text-red-400">
              {lang === 'en' ? 'Content Operations | Project Lead' : '内容运营 | 校园创作者负责人'}
            </div>
            <div className={`text-sm space-y-2 opacity-80 leading-relaxed text-justify`}>
              <p>
                {lang === 'en' 
                  ? 'Participated in the "School Creator" activity organized by NetEase News. Responsible for planning and external dissemination of "NetEase Little Bee" characteristic content.'
                  : '参与网易新闻举办的“校园创作者”活动。负责“网易小蜜蜂”特色内容的策划与对外传播。'}
              </p>
              <p>
                {lang === 'en' 
                  ? <span><strong>Achievement:</strong> Independently created multiple high-quality original contents (130k+ total reads, 50k+ single post peak). Awarded "Project Practice Excellence Certificate".</span>
                  : <span><strong>成果：</strong> 独立创作多条优质原创内容（累计阅读 13w+，单条最高 5w+）。荣获“项目实践优秀证明”。</span>}
              </p>
            </div>
            <div className="mt-4">
              <button className={`text-xs flex items-center gap-1 border px-2 py-1 rounded transition-colors ${isDark ? 'border-zinc-600 hover:bg-white hover:text-black' : 'border-neutral-300 hover:bg-black hover:text-white'}`}>
                <Award size={12} /> {lang === 'en' ? 'View Excellence Certificate' : '查看优秀证书'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SPREAD 2 RIGHT: Campus & Awards
const RightPageContent2: React.FC<PageProps> = ({ print, lang }) => (
  <div className={`h-full ${!print ? 'p-5 sm:p-10 overflow-y-auto no-scrollbar' : ''}`}>
    <Section title={lang === 'en' ? 'Campus Experience' : '校园经历'}>
      <div className="space-y-6">
        <div className="group">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
              {lang === 'en' ? 'School New Media Center' : '经济学院新媒体中心运营部'}
            </h3>
            <span className="text-sm text-neutral-500">{lang === 'en' ? 'Director' : '负责人'}</span>
          </div>
          <div className="text-sm text-neutral-600 space-y-1">
            <p>• <strong>{lang === 'en' ? 'Operations:' : '平台运营：'}</strong> {lang === 'en' ? 'Managed official accounts. Published 100+ posts with 100k+ total reads.' : '运营学院官方公众号/视频号。累计发布推文 100+，阅读量 10万+。'}</p>
            <p>• <strong>{lang === 'en' ? 'Impact:' : '内容策划：'}</strong> {lang === 'en' ? 'Led the center to rank 1st in the university\'s online political education assessment.' : '助力中心获全校网络思政教育考核第一。'}</p>
          </div>
        </div>

        <div className="group">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
              {lang === 'en' ? 'Speech & Debate Association' : '演讲与口才协会辩论队'}
            </h3>
            <span className="text-sm text-neutral-500">{lang === 'en' ? 'Team Leader' : '负责人'}</span>
          </div>
          <div className="text-sm text-neutral-600 space-y-1">
             <p>• <strong>{lang === 'en' ? 'Honors:' : '荣誉：'}</strong> {lang === 'en' ? 'University Debate Champion (vs 20 teams), "Capybara Cup" Online Debate Champion & Best Debater (vs 48 teams).' : '合肥工业大学校辩论赛冠军（20队）、卡皮巴拉杯网络辩论赛冠军暨单场最佳辩手（48队）。'}</p>
             <p>• <strong>{lang === 'en' ? 'Leadership:' : '队伍建设：'}</strong> {lang === 'en' ? 'Trained 100+ members in argumentation and research skills.' : '负责技能培训，指导立论与资料搜索，培训人数 100+。'}</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title={lang === 'en' ? 'Certificates & Awards' : '荣誉证书'} className="mb-0">
      <div className="grid grid-cols-1 gap-4">
        {/* Awards */}
        <div className="border border-neutral-200 rounded p-3 bg-white hover:border-black transition-colors">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm leading-tight">
              {lang === 'en' 
                ? 'Anhui College Students Int\'l Trade Comprehensive Skills Competition - First Prize' 
                : '安徽省大学生国际贸易综合技能大赛 - 一等奖'}
            </h4>
            <div className="flex justify-between items-end mt-1 text-xs text-neutral-500">
               <span>
                 {lang === 'en' ? 'Dept. of Education of Anhui' : '安徽省教育厅'} • Feb 2025
               </span>
               <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
                 {lang === 'en' ? 'Team Member (2nd)' : '团队成员 (第二顺位)'}
               </span>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded p-3 bg-white hover:border-black transition-colors">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm leading-tight">
              {lang === 'en' 
                ? 'The 8th Anhui College Students Int\'l Business Simulated Negotiation Competition - First Prize' 
                : '第八届安徽省大学生国际商务模拟谈判大赛 - 一等奖'}
            </h4>
            <div className="flex justify-between items-end mt-1 text-xs text-neutral-500">
               <span>
                 {lang === 'en' ? 'Dept. of Education of Anhui' : '安徽省教育厅'} • Dec 2025
               </span>
               <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded">
                 {lang === 'en' ? 'Team Member (2nd)' : '团队成员 (第二顺位)'}
               </span>
            </div>
          </div>
        </div>

        {/* IELTS Card */}
        <div className="border border-neutral-200 rounded p-4 bg-neutral-50 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-neutral-900">IELTS Academic</h4>
              <span className="text-xs text-neutral-500">Dec 21, 2025</span>
            </div>
            <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
              7.0
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs text-neutral-600 mt-2 border-t border-neutral-200 pt-2">
            <div><span className="block font-bold">8.0</span>R</div>
            <div><span className="block font-bold">7.0</span>L</div>
            <div><span className="block font-bold">6.5</span>S</div>
            <div><span className="block font-bold">6.5</span>W</div>
          </div>
        </div>

        {/* Other Awards List */}
        <div className="border border-neutral-200 rounded p-4">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Award size={16} className="mt-0.5 text-yellow-600 shrink-0" />
              <span>
                <strong className="block text-neutral-900">{lang === 'en' ? 'Project Practice Excellence Award' : '项目实践优秀证明'}</strong>
                <span className="text-neutral-500 text-xs">{lang === 'en' ? 'NetEase News • Oct 2025' : '网易新闻 • 2025.10'}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  </div>
);

export default App;