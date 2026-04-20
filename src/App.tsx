/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCcw, 
  Cpu, 
  Globe, 
  GraduationCap, 
  Factory, 
  Binary, 
  ChevronRight,
  Info,
  Layers,
  Terminal
} from "lucide-react";

// --- Types ---
type Page = "hero" | "instructions" | "round1" | "round2" | "round3" | "round4" | "round5" | "loading" | "result" | "conclusion";

interface Impact {
  growth: number;
  autonomy: number;
  value: number;
  risk: number;
}

interface Option {
  id: string;
  label: string;
  description: string;
  impact: Impact;
  icon: ReactNode;
}

interface RoundContent {
  id: Page;
  title: string;
  subtitle: string;
  description: string;
  options: Option[];
}

// --- Constants ---
const INITIAL_STATS: Impact = { growth: 30, autonomy: 30, value: 30, risk: 0 };

const ROUNDS_CONTENT: RoundContent[] = [
  {
    id: "round1",
    title: "Vòng 1: Chiến lược Phát triển",
    subtitle: "Xác định kim chỉ nam",
    description: "Ưu tiên thu hút nguồn vốn nào cho giai đoạn khởi đầu?",
    options: [
      {
        id: "r1_a",
        label: "Tận dụng FDI đại trà",
        description: "Thu hút các tập đoàn sản xuất lớn bằng ưu đãi thuế và nhân công rẻ. Tăng trưởng nhanh nhưng phụ thuộc.",
        impact: { growth: 20, autonomy: -10, value: -5, risk: 5 },
        icon: <Rocket className="w-6 h-6" />
      },
      {
        id: "r1_b",
        label: "Nuôi dưỡng Nội lực",
        description: "Hỗ trợ các tập đoàn trong nước làm chủ chuỗi cung ứng. Bền vững và tự chủ cao.",
        impact: { growth: 5, autonomy: 20, value: 15, risk: 10 },
        icon: <ShieldCheck className="w-6 h-6" />
      },
      {
        id: "r1_c",
        label: "Phát triển xanh",
        description: "Chỉ thu hút các dự án công nghệ cao và thân thiện môi trường.",
        impact: { growth: 10, autonomy: 10, value: 10, risk: -5 },
        icon: <RefreshCcw className="w-6 h-6" />
      }
    ]
  },
  {
    id: "round2",
    title: "Vòng 2: Chính sách Kinh tế",
    subtitle: "Hạ tầng tương lai",
    description: "Bạn sẽ hướng đầu tư mũi nhọn vào đâu?",
    options: [
      {
        id: "r2_a",
        label: "Hạ tầng Giao thông",
        description: "Xây dựng cao tốc, cảng biển để trở thành cửa ngõ logistics của khu vực.",
        impact: { growth: 25, autonomy: -5, value: 5, risk: 0 },
        icon: <Factory className="w-6 h-6" />
      },
      {
        id: "r2_b",
        label: "Hạ tầng Số & R&D",
        description: "Đầu tư mạnh vào mạng 6G, trí tuệ nhân tạo và trung tâm nghiên cứu quốc gia.",
        impact: { growth: 10, autonomy: 15, value: 25, risk: 5 },
        icon: <Binary className="w-6 h-6" />
      },
      {
        id: "r2_c",
        label: "Giáo dục & STEM",
        description: "Đào tạo nguồn nhân lực chất lượng cao phục vụ kỷ nguyên số.",
        impact: { growth: 5, autonomy: 20, value: 15, risk: -5 },
        icon: <GraduationCap className="w-6 h-6" />
      }
    ]
  },
  {
    id: "round3",
    title: "Vòng 3: Ngành Công nghiệp",
    subtitle: "Lựa chọn thế mạnh",
    description: "Ngành công nghiệp nào sẽ là 'xương sống' của quốc gia?",
    options: [
      {
        id: "r3_a",
        label: "Lắp ráp Điện tử",
        description: "Trở thành công xưởng lắp ráp smartphone và laptop lớn nhất thế giới.",
        impact: { growth: 15, autonomy: -10, value: 0, risk: 5 },
        icon: <Cpu className="w-6 h-6" />
      },
      {
        id: "r3_b",
        label: "Thiết kế Bán dẫn",
        description: "Tập trung đào tạo kỹ sư thiết kế chip, tham gia khâu cao nhất của công nghệ.",
        impact: { growth: 5, autonomy: 15, value: 30, risk: 15 },
        icon: <Binary className="w-6 h-6" />
      },
      {
        id: "r3_c",
        label: "Năng lượng tái tạo",
        description: "Sản xuất pin xe điện và các giải pháp năng lượng sạch xanh.",
        impact: { growth: 10, autonomy: 10, value: 15, risk: 5 },
        icon: <Layers className="w-6 h-6" />
      }
    ]
  },
  {
    id: "round4",
    title: "Vòng 4: Đối tác Quốc tế",
    subtitle: "Vị thế toàn cầu",
    description: "Định vị Việt Nam trên bản đồ liên minh kinh tế thế giới.",
    options: [
      {
        id: "r4_a",
        label: "Liên minh Gia công",
        description: "Tham gia các hiệp định thương mại tập trung vào xuất khẩu hàng thô và lắp ráp.",
        impact: { growth: 10, autonomy: -15, value: 10, risk: 20 },
        icon: <Globe className="w-6 h-6" />
      },
      {
        id: "r4_b",
        label: "Đối tác Công nghệ",
        description: "Hợp tác trao đổi công nghệ lõi với các quốc gia sáng tạo hàng đầu.",
        impact: { growth: 5, autonomy: 15, value: 20, risk: 5 },
        icon: <Rocket className="w-6 h-6" />
      },
      {
        id: "r4_c",
        label: "Liên minh Khu vực",
        description: "Tăng cường kết nối chuỗi cung ứng trong khối ASEAN.",
        impact: { growth: 10, autonomy: 10, value: 5, risk: 0 },
        icon: <Layers className="w-6 h-6" />
      }
    ]
  },
  {
    id: "round5",
    title: "Vòng 5: Tầm nhìn Dài hạn",
    subtitle: "Di sản mai sau",
    description: "Chốt lại tầm nhìn tương lai cho thế hệ kế cận.",
    options: [
      {
        id: "r5_a",
        label: "Tối ưu hóa Chi phí",
        description: "Duy trì vị thế giá rẻ để thu hút đầu tư không ngừng.",
        impact: { growth: 15, autonomy: -5, value: 5, risk: 10 },
        icon: <TrendingUp className="w-6 h-6" />
      },
      {
        id: "r5_b",
        label: "Kinh tế Tri thức",
        description: "Chấp nhận tăng trưởng chậm để chuyển đổi hoàn toàn sang sáng tạo.",
        impact: { growth: 0, autonomy: 25, value: 30, risk: 0 },
        icon: <Cpu className="w-6 h-6" />
      },
      {
        id: "r5_c",
        label: "Phát triển Toàn diện",
        description: "Kết hợp giữa sản xuất quy mô và đổi mới công nghệ.",
        impact: { growth: 10, autonomy: 10, value: 10, risk: -5 },
        icon: <ShieldCheck className="w-6 h-6" />
      }
    ]
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("hero");
  const [stats, setStats] = useState<Impact>(INITIAL_STATS);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // --- Handlers ---
  const startGame = () => setCurrentPage("instructions");

  const startPlaying = () => {
    setCurrentPage("round1");
    setRoundIndex(0);
    setStats(INITIAL_STATS);
    setSelectedOptionId(null);
  };

  const handleSelectOption = (optionId: string) => setSelectedOptionId(optionId);

  const proceedToNextRound = () => {
    if (!selectedOptionId) return;

    const currentRound = ROUNDS_CONTENT[roundIndex];
    const option = currentRound.options.find(o => o.id === selectedOptionId);
    
    if (option) {
      setStats(prev => ({
        growth: Math.max(0, Math.min(100, prev.growth + option.impact.growth)),
        autonomy: Math.max(0, Math.min(100, prev.autonomy + option.impact.autonomy)),
        value: Math.max(0, Math.min(100, prev.value + option.impact.value)),
        risk: Math.max(0, Math.min(100, prev.risk + option.impact.risk)),
      }));
    }

    setSelectedOptionId(null);

    if (roundIndex < 4) {
      setRoundIndex(prev => prev + 1);
      setCurrentPage(`round${roundIndex + 2}` as Page);
    } else {
      setCurrentPage("loading");
    }
  };

  useEffect(() => {
    if (currentPage === "loading") {
      const timer = setTimeout(() => {
        setCurrentPage("result");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const resetGame = () => {
    setCurrentPage("hero");
    setStats(INITIAL_STATS);
    setRoundIndex(0);
    setSelectedOptionId(null);
  };

  const getResult = () => {
    if (stats.risk > 50) return {
      title: "Khủng hoảng Chiến lược",
      desc: "Các quyết định mâu thuẫn khiến nền kinh tế bất ổn, nợ công tăng cao và mất phương hướng phát triển."
    };
    if (stats.value > 85) return {
      title: "Bứt phá Công nghệ",
      desc: "Việt Nam trở thành \"con rồng\" mới của Châu Á, dẫn đầu trong các lĩnh vực công nghệ mới nổi."
    };
    if (stats.autonomy > 65 && stats.value > 60) return {
      title: "Trung tâm Sáng tạo",
      desc: "Làm chủ chuỗi giá trị, Việt Nam không còn là nơi gia công mà là nơi khởi nguồn của những ý tưởng."
    };
    if (stats.growth > 70 && stats.autonomy < 40) return {
      title: "Công xưởng Toàn cầu",
      desc: "Tăng trưởng mạnh mẽ nhưng phụ thuộc hoàn toàn vào vốn ngoại. Giá trị thặng dư để lại trong nước rất thấp."
    };
    if (stats.growth > 60 && stats.value < 40) return {
      title: "Tăng trưởng Lệ thuộc",
      desc: "Quy mô kinh tế lớn nhưng thiếu chiều sâu, dễ bị tổn thương trước các biến động địa chính trị."
    };
    return {
      title: "Mắc kẹt Trung gian",
      desc: "Nền kinh tế ổn định nhưng không có đột phá, dần mất lợi thế nhân công rẻ nhưng chưa kịp đạt ngưỡng sáng tạo."
    };
  };

  const finalResult = getResult();

  // --- UI Components ---
  const HUD = () => (
    <div className="w-full bg-hud text-white px-8 py-5 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <span className="font-extrabold tracking-tighter text-2xl">VIETNAM 2030</span>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col gap-1 w-32">
          <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Tăng trưởng</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.growth}%` }}
              className="h-full bg-secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-32">
          <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Tự chủ</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.autonomy}%` }}
              className="h-full bg-secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-32">
          <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Giá trị</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.value}%` }}
              className="h-full bg-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      {currentPage !== "hero" && currentPage !== "loading" && currentPage !== "result" && currentPage !== "conclusion" && <HUD />}

      <main className="flex-grow flex items-center justify-center p-6 relative overflow-y-auto">
        <div className="w-full h-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col relative z-10 transition-all">
          <AnimatePresence mode="wait">
            {currentPage === "hero" && (
              <motion.section 
                key="hero"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold text-hud mb-6 leading-tight">
                  Build Vietnam 2030:<br/>
                  <span className="text-primary">Công xưởng hay Sáng tạo?</span>
                </h1>
                <p className="text-xl text-text-muted max-w-2xl mb-12">
                  Bạn nắm quyền quyết định vận mệnh kinh tế của một quốc gia. Liệu Việt Nam sẽ là mắt xích gia công hay trung tâm đổi mới toàn cầu?
                </p>
                <button 
                  onClick={startGame}
                  className="btn-primary"
                >
                  Bắt đầu hoạch định
                </button>
              </motion.section>
            )}

            {currentPage === "instructions" && (
              <motion.section 
                key="guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <h2 className="text-4xl font-extrabold text-hud mb-10">Hướng dẫn chơi</h2>
                <div className="text-left max-w-3xl space-y-8 text-lg text-text-muted mb-12">
                  <p>Bạn sẽ trải qua 5 vòng quyết định chiến lược. Mỗi lựa chọn ảnh hưởng đến các chỉ số quản trị:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-background rounded-2xl border border-card-border">
                      <div className="w-3 h-3 rounded-full bg-primary mb-3" />
                      <h4 className="font-bold text-hud mb-2">Tăng trưởng</h4>
                      <p className="text-sm">Tốc độ mở rộng tổng sản phẩm quốc nội (GDP).</p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl border border-card-border">
                      <div className="w-3 h-3 rounded-full bg-secondary mb-3" />
                      <h4 className="font-bold text-hud mb-2">Tự chủ</h4>
                      <p className="text-sm">Khả năng làm chủ tri thức và thị trường.</p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl border border-card-border">
                      <div className="w-3 h-3 rounded-full bg-accent mb-3" />
                      <h4 className="font-bold text-hud mb-2">Giá trị</h4>
                      <p className="text-sm">Hàm lượng chất xám và lợi nhuận thặng dư.</p>
                    </div>
                  </div>
                  <p className="italic font-semibold text-primary">Mục tiêu: Đưa Việt Nam vượt bẫy thu nhập trung bình.</p>
                </div>
                <button onClick={startPlaying} className="btn-primary">Chơi ngay</button>
              </motion.section>
            )}

            {currentPage.startsWith("round") && (
              <motion.section 
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col items-center justify-center p-12 w-full"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  Round {roundIndex + 1}: {ROUNDS_CONTENT[roundIndex].subtitle}
                </div>
                <h2 className="text-3xl font-extrabold text-hud mb-12 text-center max-w-3xl">
                  {ROUNDS_CONTENT[roundIndex].description}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                  {ROUNDS_CONTENT[roundIndex].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`
                        card-choice text-left group relative flex flex-col
                        ${selectedOptionId === option.id ? 'border-primary bg-[#F0F7FF] ring-2 ring-primary/20' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${selectedOptionId === option.id ? 'bg-primary text-white' : 'bg-background text-primary'}`}>
                          {option.icon}
                        </div>
                        <h3 className="text-lg font-bold text-hud leading-tight">{option.label}</h3>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed mb-4 flex-grow">
                        {option.description}
                      </p>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Object.entries(option.impact).map(([key, val]) => (
                          val !== 0 && (
                            <span key={key} className={`text-[9px] font-extrabold uppercase ${val > 0 ? 'text-secondary' : 'text-danger'}`}>
                              {val > 0 ? '+' : ''}{key}
                            </span>
                          )
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                <button 
                  disabled={!selectedOptionId}
                  onClick={proceedToNextRound}
                  className={`btn-primary ${!selectedOptionId ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  Xác nhận quyết định
                </button>
              </motion.section>
            )}

            {currentPage === "loading" && (
              <motion.section 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-16 h-16 border-4 border-card-border border-t-primary rounded-full animate-spin mb-8" />
                <p className="text-xl text-text-muted font-medium">Đang mô phỏng tương lai kinh tế 2030...</p>
              </motion.section>
            )}

            {currentPage === "result" && (
              <motion.section 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="bg-background rounded-[40px] p-12 border border-card-border max-w-3xl w-full">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted mb-4 block">KẾT QUẢ CUỐI CÙNG</span>
                  <h2 className="text-4xl font-extrabold text-primary mb-6">{finalResult.title}</h2>
                  <p className="text-lg text-text-muted mb-8 leading-relaxed">
                    {finalResult.desc}
                  </p>
                  
                  <div className="pt-8 border-t border-card-border text-left">
                    <p className="text-hud font-bold mb-2">Ý nghĩa kinh tế:</p>
                    <p className="text-sm text-text-muted leading-relaxed italic">
                      "Tăng trưởng không đồng nghĩa với phát triển nếu không làm chủ công nghệ. Chiều sâu của nền kinh tế nằm ở sự tự chủ và giá trị thặng dư quốc gia."
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setCurrentPage("conclusion")}
                  className="btn-primary mt-12"
                >
                  Kết luận chiến dịch
                </button>
              </motion.section>
            )}

            {currentPage === "conclusion" && (
              <motion.section 
                key="conclusion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="max-w-4xl space-y-12">
                  <h2 className="text-5xl md:text-6xl font-extrabold text-hud leading-tight">
                    Lượng đổi <ArrowRight className="inline-block mx-4 text-primary" /> Có dẫn tới <span className="text-primary italic">chất</span>?
                  </h2>
                  
                  <div className="p-12 bg-background rounded-[40px] border border-card-border shadow-sm">
                    <p className="text-xl text-text-muted font-medium leading-relaxed max-w-2xl mx-auto">
                      Hành trình 2030 cho thấy rằng con số tăng trưởng chỉ là bề nổi. Năng lực sáng tạo và trí tuệ mới là chìa khóa để Việt Nam cất cánh thật sự.
                    </p>
                  </div>
   
                  <button 
                    onClick={resetGame}
                    className="btn-primary"
                  >
                    <RefreshCcw className="w-5 h-5 inline-block mr-2" />
                    Bắt đầu lại chiến dịch
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
