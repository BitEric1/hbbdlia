import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
    Shield,
    FileText,
    Users,
    Gift,
    Play,
    Pause,
    Volume2,
    VolumeX,
    ChevronsDown,
    Camera,
    AlertTriangle,
    CheckCircle,
    X,
} from "lucide-react"; // Đã bỏ Maximize2
import Confetti from "react-confetti";

const spyMusicURL = "/sound/happy.mp4";
("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
const partyMusicURL =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

const FRIEND_NAME = "Giàng Mí Lía";
const YOUR_NAME = "Bit Eric";
const ACTIVATION_MODAL_IMAGE_URL = "/assets/liag.jpg";
// "https://placehold.co/500x350/8338EC/FFFFFF?text=CHÚC+MỪNG+SINH+NHẬT!";
const ACTIVATION_MODAL_MESSAGE = `Gửi Mật vụ ${FRIEND_NAME} siêu cấp đẹp trai và tài năng! Chúc mừng sinh nhật đồng chí! Hôm nay là ngày để đồng chí 'xõa' hết mình, 'phá án' mọi cuộc vui và 'bắt giữ' thật nhiều khoảnh khắc đáng nhớ. Tổng Chỉ Huy và toàn thể anh em luôn tự hào về đồng chí! Happy Birthday!`;

const profileData = {
    name: FRIEND_NAME,
    codename: "Đại Bàng Thép",
    rank: "Mật Vụ Cấp Cao",
    department: "Cục Tình Báo Sinh Nhật (CBSN)",
    distinguishingFeatures: [
        "Nụ cười tỏa nắng hơn đèn pha xe cảnh sát",
        "Trái tim ấm áp hơn cả lò sưởi mùa đông",
        "Chuyên gia phá án... đồ ăn vặt trong tủ lạnh",
        "Luôn sẵn sàng 'chi viện' khi đồng đội cần",
    ],
    charges: [
        {
            icon: <Gift className="w-5 h-5 text-pink-400 mr-2" />,
            text: "Đánh cắp trái tim của mọi người bằng sự tốt bụng.",
        },
        {
            icon: <Users className="w-5 h-5 text-blue-400 mr-2" />,
            text: "Tạo ra quá nhiều kỷ niệm vui vẻ không thể đếm xuể.",
        },
        {
            icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />,
            text: "Hoàn thành xuất sắc nhiệm vụ làm một người bạn tuyệt vời.",
        },
    ],
};

const evidencePhotos = [
    {
        id: 1,
        src: `/assets/liag.jpg`,
        caption: "Đặc vụ siêu cấp đẹp trai'",
    },
    {
        id: 2,
        src: `/assets/pic2.jpg`,
        caption: "Hiện trường vụ 'Cười Bể Bụng'",
    },
    {
        id: 3,
        src: `/assets/pic3.jpg`,
        caption: "Tang vật: Nụ cười rạng rỡ",
    },
];

const witnessTestimonies = [
    {
        agent: "Đặc Vụ Mèo Con",
        message: `Chúc mừng sinh nhật ${FRIEND_NAME}! Chúc đồng chí luôn mạnh khỏe, vui vẻ và sớm tìm được 'đối tượng' để 'điều tra' dài hạn nhé! ;)`,
    },
    {
        agent: "Điệp Viên 00Thấy",
        message: `Happy Birthday to ${FRIEND_NAME}! Mong đồng chí tuổi mới nhiều thành công mới, tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.`,
    },
    {
        agent: "Tình Báo Viên Hóm Hỉnh",
        message: `Chúc ${FRIEND_NAME} sinh nhật siêu to khổng lồ! Mong đồng chí luôn giữ vững tinh thần 'thép' và nụ cười 'vàng' nhé!`,
    },
];

const Typewriter = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setDisplayedText(""); // Reset khi text thay đổi
        setCurrentIndex(0);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, speed);
            return () => clearTimeout(timeoutId);
        }
    }, [currentIndex, text, speed]);

    return (
        <p className="text-slate-200 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {displayedText}
        </p>
    );
};

const ActivationModal = ({ isOpen, onClose, imageSrc, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[5000] p-4 animate-fadeInUp">
            <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-2xl w-full relative border-2 border-sky-500">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-sky-400 transition-colors z-10"
                    aria-label="Đóng modal"
                >
                    <X size={28} />
                </button>
                <img
                    src={imageSrc}
                    alt="Chúc mừng kích hoạt"
                    className="w-full h-auto max-h-[300px] object-contain rounded-lg mb-6 shadow-lg"
                    onError={(e) =>
                        (e.target.src =
                            "https://placehold.co/500x350/1E293B/94A3B8?text=Lỗi+Tải+Ảnh")
                    }
                />
                <Typewriter text={message} speed={30} />
                <button
                    onClick={onClose}
                    className="mt-8 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full md:w-auto"
                >
                    Tuyệt vời!
                </button>
            </div>
        </div>
    );
};

const Section = ({ title, icon, children, className }) => (
    <section
        className={`bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl mb-8 animate-fadeInUp ${className}`}
    >
        <h2 className="text-3xl font-bold text-sky-400 mb-6 flex items-center border-b-2 border-sky-500/30 pb-3">
            {icon}
            <span className="ml-3">{title}</span>
        </h2>
        {children}
    </section>
);

const SplashScreen = ({ onLoaded }) => {
    const [loadingStep, setLoadingStep] = useState(0);
    const messages = [
        "ĐANG KHỞI TẠO HỆ THỐNG...",
        "TRUY CẬP HỒ SƠ MẬT...",
        "GIẢI MÃ DỮ LIỆU SINH NHẬT...",
        "XÁC THỰC DANH TÍNH MẬT VỤ...",
        "HỆ THỐNG SẴN SÀNG!",
    ];

    useEffect(() => {
        if (loadingStep < messages.length - 1) {
            const timer = setTimeout(() => {
                setLoadingStep((prev) => prev + 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            const finalTimer = setTimeout(onLoaded, 1200);
            return () => clearTimeout(finalTimer);
        }
    }, [loadingStep, onLoaded, messages.length]);

    return (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center text-green-400 font-mono z-[6000]">
            <Shield className="w-24 h-24 text-green-500 mb-8 animate-pulse" />
            <p className="text-2xl mb-4">{messages[loadingStep]}</p>
            <div className="w-1/2 bg-slate-700 rounded-full h-4 mt-4">
                <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${
                            ((loadingStep + 1) / messages.length) * 100
                        }%`,
                    }}
                ></div>
            </div>
            {loadingStep === messages.length - 1 && (
                <p className="mt-6 text-xl text-yellow-400 animate-bounce">
                    CHUẨN BỊ NHẬN NHIỆM VỤ!
                </p>
            )}
        </div>
    );
};

const MissionHeader = () => (
    <header className="py-8 text-center bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-b-xl sticky top-0 z-[1000] animate-fadeInDown">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-sky-400">
                <Shield className="inline-block w-10 h-10 mr-3 mb-1 text-sky-300" />
                CHIẾN DỊCH SINH NHẬT TỐI MẬT
            </h1>
            <p className="text-xl text-slate-300 mt-2">
                Mật Vụ:{" "}
                <span className="font-semibold text-yellow-400">
                    {FRIEND_NAME}
                </span>
            </p>
        </div>
    </header>
);

const AgentProfile = () => (
    <Section title="Hồ Sơ Mật Vụ" icon={<FileText className="w-8 h-8" />}>
        <div className="grid md:grid-cols-2 gap-6 text-slate-200">
            <div>
                <p className="mb-2">
                    <strong className="text-sky-300">Tên Đầy Đủ:</strong>{" "}
                    {profileData.name}
                </p>
                <p className="mb-2">
                    <strong className="text-sky-300">Bí Danh:</strong>{" "}
                    {profileData.codename}
                </p>
                <p className="mb-2">
                    <strong className="text-sky-300">Cấp Bậc:</strong>{" "}
                    {profileData.rank}
                </p>
                <p className="mb-4">
                    <strong className="text-sky-300">Đơn Vị:</strong>{" "}
                    {profileData.department}
                </p>

                <h3 className="text-xl font-semibold text-sky-300 mt-6 mb-3">
                    Đặc Điểm Nhận Dạng:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                    {profileData.distinguishingFeatures.map(
                        (feature, index) => (
                            <li key={index} className="italic">
                                {feature}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div>
                <img
                    src={`https://placehold.co/300x300/7F1D1D/FFFFFF?text=${FRIEND_NAME.substring(
                        0,
                        1
                    )}&font=roboto`}
                    alt="Ảnh đại diện Mật vụ"
                    className="rounded-full shadow-lg mx-auto border-4 border-sky-500 object-cover w-48 h-48 md:w-60 md:h-60"
                    onError={(e) =>
                        (e.target.src =
                            "https://placehold.co/300x300/7F1D1D/FFFFFF?text=Error&font=roboto")
                    }
                />
                <h3 className="text-xl font-semibold text-sky-300 mt-6 mb-3 text-center md:text-left">
                    Các "Tội Danh" Đặc Biệt:
                </h3>
                <ul className="space-y-2">
                    {profileData.charges.map((charge, index) => (
                        <li
                            key={index}
                            className="flex items-center bg-slate-600/50 p-3 rounded-md shadow"
                        >
                            {charge.icon} {charge.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Section>
);

const EvidenceGallery = () => {
    const [currentPhoto, setCurrentPhoto] = useState(0);

    const nextPhoto = () =>
        setCurrentPhoto((prev) => (prev + 1) % evidencePhotos.length);
    const prevPhoto = () =>
        setCurrentPhoto(
            (prev) => (prev - 1 + evidencePhotos.length) % evidencePhotos.length
        );

    return (
        <Section
            title="Kho Lưu Trữ Bằng Chứng"
            icon={<Camera className="w-8 h-8" />}
        >
            <div className="relative">
                <img
                    src={evidencePhotos[currentPhoto].src}
                    alt={evidencePhotos[currentPhoto].caption}
                    className="w-full max-h-[500px] object-contain rounded-lg shadow-lg transition-transform duration-300" // Bỏ class fullscreen
                    onError={(e) => {
                        e.target.src = `https://placehold.co/600x400/1E293B/94A3B8?text=Lỗi+Tải+Ảnh`;
                        e.target.alt = "Lỗi tải ảnh";
                    }}
                />
                <button
                    onClick={prevPhoto}
                    className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-sky-500 transition-colors"
                >
                    ‹
                </button>
                <button
                    onClick={nextPhoto}
                    className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-sky-500 transition-colors"
                >
                    ›
                </button>
                <p className="text-center mt-3 text-slate-300 italic text-lg bg-slate-800/70 py-2 px-4 rounded-md">
                    {evidencePhotos[currentPhoto].caption} ({currentPhoto + 1}/
                    {evidencePhotos.length})
                </p>
            </div>
        </Section>
    );
};

const WitnessReports = () => (
    <Section
        title="Báo Cáo Từ Các Đặc Vụ Khác"
        icon={<Users className="w-8 h-8" />}
    >
        <div className="space-y-6">
            {witnessTestimonies.map((testimony, index) => (
                <div
                    key={index}
                    className="bg-slate-600/60 p-5 rounded-lg shadow-lg border-l-4 border-sky-500"
                >
                    <p className="text-slate-200 text-lg mb-1">
                        "<span className="italic">{testimony.message}</span>"
                    </p>
                    <p className="text-right text-sky-400 font-semibold">
                        - Đặc Vụ {testimony.agent} -
                    </p>
                </div>
            ))}
        </div>
    </Section>
);

const SpecialDirective = ({ onActivateMission }) => {
    const [showScrollHint, setShowScrollHint] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollHint(false);
            } else if (window.scrollY === 0) {
                setShowScrollHint(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Section
            title="Chỉ Thị Đặc Biệt Từ Tổng Chỉ Huy"
            icon={<AlertTriangle className="w-8 h-8 text-yellow-400" />}
            className="relative"
        >
            {showScrollHint && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-sky-400 animate-bounce z-10">
                    <span className="text-sm">Kéo xuống!</span>
                    <ChevronsDown size={28} />
                </div>
            )}
            <div className="text-slate-200 text-lg space-y-4 leading-relaxed">
                <p>
                    Gửi Mật vụ{" "}
                    <span className="font-bold text-yellow-400">
                        {FRIEND_NAME}
                    </span>
                    ,
                </p>
                <p>
                    Nhân dịp đặc biệt này, Tổng Chỉ Huy (
                    <span className="text-sky-300">{YOUR_NAME}</span>) xin gửi
                    lời chúc mừng sinh nhật chân thành và nồng nhiệt nhất đến
                    đồng chí!
                </p>
                <p>
                    Chúc đồng chí một tuổi mới với những nhiệm vụ "khó khăn"
                    nhưng đầy "phần thưởng" như: luôn giữ vững tinh thần lạc
                    quan, hoàn thành xuất sắc mục tiêu hạnh phúc, và "triệt phá"
                    mọi nỗi buồn.
                </p>
                <p>
                    Hãy nhớ rằng, dù "chiến trường" cuộc sống có cam go đến đâu,
                    đồng chí luôn có những "đồng đội" trung thành và một "hậu
                    phương" vững chắc là chúng tôi đây.
                </p>
                <p className="font-semibold text-sky-300">
                    Nhiệm vụ hôm nay của đồng chí rất đơn giản: Hãy tận hưởng
                    ngày sinh nhật thật trọn vẹn, vui vẻ và đáng nhớ!
                </p>
            </div>
            <div className="mt-10 text-center">
                <button
                    onClick={onActivateMission}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-lg shadow-xl text-2xl 
                     transform hover:scale-105 transition-all duration-200 ease-in-out animate-pulse focus:outline-none focus:ring-4 focus:ring-red-400/50"
                >
                    <Gift className="inline-block w-8 h-8 mr-3 mb-1" />
                    KÍCH HOẠT CHIẾN DỊCH "XÕA"!
                </button>
            </div>
        </Section>
    );
};

const MissionSoundtrack = ({ playPartyMusic }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            const newSrc = playPartyMusic ? partyMusicURL : spyMusicURL;
            if (audioRef.current.src !== newSrc) {
                audioRef.current.src = newSrc;
            }
            if (isPlaying && audioRef.current.paused) {
                audioRef.current.play().catch((e) => {
                    console.warn("Phát nhạc bị chặn:", e);
                    setIsPlaying(false);
                });
            } else if (!isPlaying && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        }
    }, [playPartyMusic, isPlaying]);

    useEffect(() => {
        if (!playPartyMusic && audioRef.current) {
            if (!audioRef.current.src) {
                audioRef.current.src = spyMusicURL;
            }
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.warn("Tự động phát nhạc nền bị chặn:", error);
                        setIsPlaying(false);
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                if (!audioRef.current.src) {
                    audioRef.current.src = playPartyMusic
                        ? partyMusicURL
                        : spyMusicURL;
                }
                audioRef.current
                    .play()
                    .catch((e) => console.error("Lỗi phát nhạc:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 bg-slate-800/80 backdrop-blur-md p-3 rounded-lg shadow-xl flex items-center space-x-3 z-[1000]">
            <audio
                ref={audioRef}
                loop
                onError={(e) =>
                    console.error(
                        "Lỗi tải audio: ",
                        e.target.error && e.target.error.message
                            ? e.target.error.message
                            : e.target.error
                    )
                }
            />
            <button
                onClick={togglePlayPause}
                className="text-sky-400 hover:text-sky-300 transition-colors p-2 rounded-full bg-slate-700 hover:bg-slate-600"
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
                onClick={toggleMute}
                className="text-sky-400 hover:text-sky-300 transition-colors p-2 rounded-full bg-slate-700 hover:bg-slate-600"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="text-xs text-slate-400 w-20 truncate">
                {playPartyMusic ? "Chế độ Xõa Mode" : "Nhạc Nền Mật Vụ"}
            </div>
        </div>
    );
};

const MissionFooter = () => (
    <footer className="py-8 text-center text-slate-400 bg-slate-900/80 mt-12">
        <p>
            &copy; {new Date().getFullYear()} - Chiến dịch thực hiện bởi{" "}
            <span className="font-semibold text-sky-500">{YOUR_NAME}</span>.
        </p>
        <p>
            Hồ sơ tuyệt mật - Chỉ dành cho Mật vụ{" "}
            <span className="font-semibold text-yellow-500">{FRIEND_NAME}</span>
            .
        </p>
    </footer>
);

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [missionActivated, setMissionActivated] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showActivationModal, setShowActivationModal] = useState(false);
    const [missionJustActivated, setMissionJustActivated] = useState(false);

    const handleMissionLoaded = () => {
        setIsLoading(false);
    };

    const handleActivateMission = () => {
        setMissionActivated(true); // Để đổi nhạc và background
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 8000);

        if (window.scrollY === 0) {
            setShowActivationModal(true);
        } else {
            setMissionJustActivated(true);
        }
    };

    const closeActivationModal = () => {
        setShowActivationModal(false);
    };

    useEffect(() => {
        if (!missionJustActivated) return;

        const handleScrollToTop = () => {
            if (window.scrollY === 0) {
                setShowActivationModal(true);
                setMissionJustActivated(false);
                window.removeEventListener("scroll", handleScrollToTop);
            }
        };
        window.addEventListener("scroll", handleScrollToTop);
        return () => {
            window.removeEventListener("scroll", handleScrollToTop);
        };
    }, [missionJustActivated]);

    useEffect(() => {
        document.body.className =
            "bg-slate-900 transition-all duration-1000 ease-in-out";
        if (missionActivated) {
            document.body.classList.add("party-mode-bg");
        } else {
            document.body.classList.remove("party-mode-bg");
        }
    }, [missionActivated]);

    if (isLoading) {
        return <SplashScreen onLoaded={handleMissionLoaded} />;
    }

    return (
        <div className="min-h-screen flex flex-col text-slate-100 selection:bg-sky-500 selection:text-white">
            {showConfetti && (
                <Confetti
                    recycle={false}
                    numberOfPieces={missionActivated ? 500 : 250}
                    className="w-full h-full z-[3000]"
                />
            )}
            <MissionHeader />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <AgentProfile />
                <EvidenceGallery />
                <WitnessReports />
                <SpecialDirective onActivateMission={handleActivateMission} />
            </main>
            <MissionSoundtrack playPartyMusic={missionActivated} />
            <MissionFooter />
            <ActivationModal
                isOpen={showActivationModal}
                onClose={closeActivationModal}
                imageSrc={ACTIVATION_MODAL_IMAGE_URL}
                message={ACTIVATION_MODAL_MESSAGE}
            />

            <style jsx global>{`
                body.party-mode-bg {
                    background: linear-gradient(
                        45deg,
                        #ff006e,
                        #ffbe0b,
                        #fb5607,
                        #8338ec,
                        #3a86ff
                    );
                    background-size: 400% 400%;
                    animation: partyBackgroundAnimation 15s ease infinite;
                }

                @keyframes partyBackgroundAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInDown {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
