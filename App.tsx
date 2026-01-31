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
      <div className="min-h-screen flowing-bg flex items-center justify-center p-4 sm:p-8 overflow-hidden relative no-print">
        
        {/* Mobile Notice */}
        <div className="lg:hidden absolute top-4 left-4 right-4 bg-white/90 p-4 rounded shadow text-xs text-center z-40">
          {lang === 'en' ? 'Best viewed on desktop for book experience.' : '建议在桌面端浏览以获得最佳阅读体验。'}
        </div>

        {/* Top Controls: Language & Print */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 flex gap-3">
           <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform font-bold text-sm"
            title="Export PDF"
          >
            <Download size={16} />
            {lang === 'en' ? 'PDF' : '导出'}
          </button>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform font-bold text-sm"
          >
            <Globe size={16} />
            {lang === 'en' ? 'CN' : 'EN'}
          </button>
        </div>

        <div className="book-perspective book-container-wrapper relative w-full max-w-6xl h-[85vh] flex shadow-2xl rounded-lg overflow-hidden bg-neutral-900 transition-all duration-500">
          
          {/* === LEFT SIDE (Desktop) === */}
          <div className="w-1/2 h-full bg-neutral-900 text-white relative z-0 hidden lg:block border-r border-neutral-800">
             {currentPage === 0 ? <LeftPageContent1 lang={lang} /> : <LeftPageContent2 lang={lang} />}
          </div>

          {/* === RIGHT SIDE (Desktop) === */}
          <div className="w-1/2 h-full bg-white text-neutral-900 relative z-0 hidden lg:block">
             {currentPage === 0 ? <RightPageContent1 lang={lang} /> : <RightPageContent2 lang={lang} />}
          </div>

          {/* === MOBILE VIEW === */}
          <div className="lg:hidden w-full h-full bg-white overflow-y-auto">
            <LeftPageContent1 mobile lang={lang} />
            <div className="p-6"><RightPageContent1 lang={lang} /></div>
            <div className="p-6 bg-neutral-50"><LeftPageContent2 lightMode lang={lang} /></div>
            <div className="p-6"><RightPageContent2 lang={lang} /></div>
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
                  : 'bg-neutral-900/10 text-neutral-900 hover:bg-neutral-900/20 hover:scale-105 shadow-lg border border-neutral-200'
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
  bg: isDark ? 'bg-neutral-900' : '',
  text: isDark ? 'text-white' : 'text-neutral-900',
  subtext: isDark ? 'text-neutral-400' : 'text-neutral-500',
  border: isDark ? 'border-neutral-700' : 'border-neutral-200',
});

// SPREAD 1 LEFT: Profile
const LeftPageContent1: React.FC<PageProps> = ({ mobile, print, lang }) => {
  const isDark = (mobile || !print) && !print; // Dark only on mobile or Desktop Screen view
  const theme = getTheme(isDark);
  
  return (
    <div className={`h-full ${!print ? 'p-8 sm:p-12 overflow-y-auto no-scrollbar' : ''} ${theme.bg} ${theme.text}`}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-wider">{lang === 'en' ? 'Sheng Chenliang' : '盛宸亮'}</h1>
        <p className={`${theme.subtext} text-sm uppercase tracking-widest mb-8`}>Sheng Chenliang</p>
        
        <div className={`space-y-4 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
          <div className="flex items-center gap-3">
            <User size={16} />
            <span>{lang === 'en' ? '2004-04 / Male / Han' : '2004-04 / 男 / 汉族'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} />
            <span>17602199148</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} />
            <span>2023212716@mail.hfut.edu.cn</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} />
            <span>{lang === 'en' ? 'Hefei University of Technology' : '合肥工业大学'}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
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
          
          <div className={`p-3 rounded border ${theme.border} ${isDark ? 'bg-neutral-800/50' : 'bg-neutral-50'}`}>
            <strong className="block mb-2 flex items-center gap-2">
               <Award size={14} /> {lang === 'en' ? 'Coursera Certifications' : 'Coursera 认证'}
            </strong>
            <ul className="space-y-2">
              <li className="flex justify-between items-start">
                <span>Python Basics (Univ. of Michigan)</span>
              </li>
              <li className="flex justify-between items-start">
                <span>Data Analysis with R</span>
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
            <strong className={`block mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>{lang === 'en' ? 'Software' : '软件技能'}</strong>
            <div className="flex flex-wrap gap-2">
              {['R', 'Python', 'MATLAB', 'PPT', 'Excel'].map(skill => (
                <span key={skill} className={`px-2 py-1 rounded text-xs border ${theme.border} ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <strong className={`block mb-1 ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>{lang === 'en' ? 'Interests' : '兴趣爱好'}</strong>
            <p className={`text-xs ${theme.subtext}`}>{lang === 'en' ? 'Long-distance running, Photography, Debate' : '长跑、摄影、辩论'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SPREAD 1 RIGHT: Research
const RightPageContent1: React.FC<PageProps> = ({ print, lang }) => (
  <div className={`h-full ${!print ? 'p-8 sm:p-12 overflow-y-auto no-scrollbar' : ''}`}>
    <Section title={lang === 'en' ? 'Research Experience' : '科研经历'}>
      {/* Research Item 1 */}
      <div className="relative border-l-2 border-neutral-200 pl-6 pb-8 last:pb-0 group">
        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-200 border-2 border-white"></div>
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
              ? ' Designed a repurchase mechanism based on contract theory to address low GPU utilization (10-15%) in cloud computing.'
              : ' 针对云计算行业 GPU 利用率仅 10-15% 的痛点，构建基于契约理论的回购机制。'}
          </p>
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Contribution:' : '主要贡献：'}</strong>
            {lang === 'en' 
              ? ' Authored the Introduction and conducted code reproduction/verification.'
              : ' 负责引言撰写与代码复现/验证。'}
          </p>
        </div>
      </div>

      {/* Research Item 2 */}
      <div className="relative border-l-2 border-neutral-200 pl-6">
         <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-200 border-2 border-white"></div>
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
          <h3 className="font-bold text-lg leading-tight w-full sm:w-3/4 text-neutral-900">
             {lang === 'en' ? 'Economic Analysis of Antibiotic Treatment Regimens' : '抗生素治疗方案经济效益分析'}
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
              ? ' Integrated 7 key indicators into a two-stage BCC game DEA model to evaluate 10 antibiotic regimens.'
              : ' 将临床治愈率、住院天数等 7 项指标纳入两阶段 BCC 博弈 DEA 模型。'}
          </p>
          <p>
            <strong className="text-neutral-900">{lang === 'en' ? 'Data Insight:' : '数据洞察：'}</strong> 
            {lang === 'en' 
              ? ' Performed 1,000 Monte Carlo simulations using MATLAB to quantify parameter uncertainty.'
              : ' 用 MATLAB 完成 1,000 次蒙特卡洛模拟，量化参数不确定性，锁定 3 个稳健方案。'}
          </p>
        </div>
      </div>
    </Section>
  </div>
);

// SPREAD 2 LEFT: Internship
const LeftPageContent2: React.FC<PageProps> = ({ lightMode, print, lang }) => {
  const isDark = (!lightMode && !print);
  const theme = getTheme(isDark);

  return (
    <div className={`h-full ${!print ? 'p-8 sm:p-12 overflow-y-auto no-scrollbar' : ''} ${theme.bg} ${theme.text}`}>
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
                ? 'Actively participated in center research activities. Mainly responsible for in-depth review and analysis of pharmacoeconomics literature.'
                : '参与中心研究活动。主要负责药物经济学文献的深度综述与分析，关键研究方法的提炼。'}
            </p>
          </div>
        </div>

        {/* Internship 2 */}
        <div className={`relative border-t pt-6 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
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
                ? 'Participated in the "School Creator" activity. Responsible for planning and external dissemination.'
                : '参与“校园创作者”活动。负责“网易小蜜蜂”特色内容的策划与对外传播。'}
            </p>
            <p>
              {lang === 'en' 
                ? <span><strong>Achievement:</strong> Created original contents (130k+ reads). Awarded "Project Practice Excellence".</span>
                : <span><strong>成果：</strong> 独立创作优质内容（累计阅读 13w+）。荣获“项目实践优秀证明”。</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SPREAD 2 RIGHT: Campus & Awards
const RightPageContent2: React.FC<PageProps> = ({ print, lang }) => (
  <div className={`h-full ${!print ? 'p-8 sm:p-12 overflow-y-auto no-scrollbar' : ''}`}>
    <Section title={lang === 'en' ? 'Campus Experience' : '校园经历'}>
      <div className="space-y-6">
        <div className="group">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg">
              {lang === 'en' ? 'School New Media Center' : '新媒体中心运营部'}
            </h3>
            <span className="text-sm text-neutral-500">{lang === 'en' ? 'Director' : '负责人'}</span>
          </div>
          <div className="text-sm text-neutral-600 space-y-1">
            <p>• {lang === 'en' ? 'Managed official accounts (100k+ reads).' : '运营学院官方账号，累计阅读量 10万+。'}</p>
          </div>
        </div>

        <div className="group">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg">
              {lang === 'en' ? 'Debate Team' : '辩论队'}
            </h3>
            <span className="text-sm text-neutral-500">{lang === 'en' ? 'Team Leader' : '负责人'}</span>
          </div>
          <div className="text-sm text-neutral-600 space-y-1">
             <p>• {lang === 'en' ? 'University Debate Champion.' : '合肥工业大学校辩论赛冠军。'}</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title={lang === 'en' ? 'Certificates & Awards' : '荣誉证书'} className="mb-0">
      <div className="grid grid-cols-1 gap-4">
        {/* Awards */}
        <div className="border border-neutral-200 rounded p-3 bg-white">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm leading-tight">
              {lang === 'en' ? 'Int\'l Trade Skills Competition - First Prize' : '国贸综合技能大赛 - 一等奖'}
            </h4>
          </div>
        </div>

        <div className="border border-neutral-200 rounded p-3 bg-white">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm leading-tight">
              {lang === 'en' ? 'Business Negotiation Competition - First Prize' : '商务模拟谈判大赛 - 一等奖'}
            </h4>
          </div>
        </div>

        {/* IELTS Card */}
        <div className="border border-neutral-200 rounded p-4 bg-neutral-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-neutral-900">IELTS Academic</h4>
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
      </div>
    </Section>
  </div>
);

export default App;
