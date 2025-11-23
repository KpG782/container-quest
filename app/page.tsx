"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Server,
  Trophy,
  ArrowRight,
  Battery,
  Loader2,
  BookOpen,
  Cloud,
  HardDrive,
  Rocket,
  Box,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";

// Question bank with 4 easy, 4 intermediate, 2 hard
const questionBank = [
  // EASY QUESTIONS (4 total)
  {
    id: 1,
    difficulty: "easy",
    question: "Which technology starts faster?",
    options: [
      "Virtual Machine (30-60 seconds)",
      "Container (2-5 seconds)",
      "Both take the same time",
      "Physical server deployment",
      "Cloud-based platform",
    ],
    correctAnswer: "Container (2-5 seconds)",
    explanation:
      "Containers start much faster because they share the host operating system kernel, while virtual machines need to boot up an entire guest operating system.",
    icon: Zap,
  },
  {
    id: 2,
    difficulty: "easy",
    question: "What is the main advantage of using containers?",
    options: [
      "Requires more memory than VMs",
      "Only works on one computer",
      "Lightweight and portable",
      "Needs separate operating system",
      "Cannot be moved between environments",
    ],
    correctAnswer: "Lightweight and portable",
    explanation:
      "Containers package your application with its dependencies, making it easy to move between different environments while using fewer resources.",
    icon: Box,
  },
  {
    id: 3,
    difficulty: "easy",
    question: "Which uses less memory on average?",
    options: [
      "Virtual Machine (500MB)",
      "They use exactly the same amount",
      "Docker container (100MB)",
      "Bare metal server (1GB)",
      "Hypervisor instance (750MB)",
    ],
    correctAnswer: "Docker container (100MB)",
    explanation:
      "Containers share the host OS kernel, so they need much less memory. VMs include a full operating system copy, which takes more space.",
    icon: Server,
  },
  {
    id: 4,
    difficulty: "easy",
    question: "For a quick 5-minute task, which is better?",
    options: [
      "Kubernetes cluster",
      "Virtual Machine",
      "Docker Compose",
      "Full cloud deployment",
      "Dedicated server setup",
    ],
    correctAnswer: "Docker Compose",
    explanation:
      "Docker Compose is perfect for short tasks because it starts instantly (2.5 seconds) with minimal setup, while the others take longer to initialize.",
    icon: Rocket,
  },

  // INTERMEDIATE QUESTIONS (4 total)
  {
    id: 5,
    difficulty: "intermediate",
    question: "What do containers share with the host computer?",
    options: [
      "Nothing at all",
      "Only the network connection",
      "The entire file system",
      "The operating system kernel",
      "Just the graphics card",
    ],
    correctAnswer: "The operating system kernel",
    explanation:
      "Containers share the host OS kernel, which makes them lightweight. This is different from VMs, which each have their own complete operating system.",
    icon: Cloud,
  },
  {
    id: 6,
    difficulty: "intermediate",
    question: "Which is better for battery-powered devices like Raspberry Pi?",
    options: [
      "Heavy virtual machine",
      "They use the same energy",
      "Lightweight Docker container",
      "Multiple VM instances",
      "Hypervisor with full OS",
    ],
    correctAnswer: "Lightweight Docker container",
    explanation:
      "Research shows containers use 85% less energy than VMs on ARM devices. Containers consume 0.3Wh while VMs use 4.5Wh for the same task.",
    icon: Battery,
  },
  {
    id: 7,
    difficulty: "intermediate",
    question: "When processing 100 drone images quickly, what matters most?",
    options: [
      "Advanced orchestration",
      "Large memory capacity",
      "Expensive GPU hardware",
      "Fast startup time",
      "Multiple data centers",
    ],
    correctAnswer: "Fast startup time",
    explanation:
      "For short workloads like image processing, quick startup is critical. Docker starts in 2.5 seconds, completing the task before other solutions even finish starting.",
    icon: CheckCircle,
  },
  {
    id: 8,
    difficulty: "intermediate",
    question: "What is virtualization?",
    options: [
      "Just copying files between computers",
      "Connecting to the internet",
      "Installing software updates",
      "Creating a complete virtual computer with its own OS",
      "Sharing documents in the cloud",
    ],
    correctAnswer: "Creating a complete virtual computer with its own OS",
    explanation:
      "Virtualization creates a full virtual machine with its own operating system, providing strong isolation but requiring more resources than containers.",
    icon: HardDrive,
  },

  // HARD QUESTIONS (2 total)
  {
    id: 9,
    difficulty: "hard",
    question:
      "For a 24/7 website with automatic traffic scaling, what should you use?",
    options: [
      "Single Docker container",
      "One virtual machine",
      "Static web hosting",
      "Kubernetes with orchestration",
      "Simple FTP server",
    ],
    correctAnswer: "Kubernetes with orchestration",
    explanation:
      "Kubernetes is designed for production workloads. It automatically scales your application up when traffic increases and down when it decreases, managing multiple containers across servers for high availability.",
    icon: Server,
  },
  {
    id: 10,
    difficulty: "hard",
    question:
      "What happens when running x86 virtual machines on ARM hardware like Raspberry Pi?",
    options: [
      "Works perfectly with no issues",
      "Only affects network speed",
      "Improves battery life significantly",
      "Severe performance drop and high energy use",
      "Makes the system faster",
    ],
    correctAnswer: "Severe performance drop and high energy use",
    explanation:
      "Architecture mismatch causes major problems. The Sturley et al. study found x86 VMs on ARM consume 8.5Wh (vs 0.3Wh for native containers) and have 35% CPU overhead, making them impractical for edge computing.",
    icon: Cloud,
  },
];

// Helper function to get performance message
const getPerformanceMessage = (percentage: number): string => {
  if (percentage === 100)
    return "🏆 Perfect Score! You are a container expert!";
  if (percentage >= 80)
    return "⭐ Excellent! Great understanding of the concepts!";
  if (percentage >= 60) return "👍 Good job! You are learning well!";
  if (percentage >= 40) return "📚 Keep practicing! You are getting there!";
  return "💪 Try again to improve your knowledge!";
};

// Helper function to get background color
const getBackgroundColor = (
  showResult: boolean,
  isCorrect: boolean
): string => {
  if (!showResult) return "from-slate-900 via-indigo-900 to-slate-900";
  return isCorrect
    ? "from-green-900 via-blue-900 to-slate-900"
    : "from-red-900 via-purple-900 to-slate-900";
};

// Helper function to get difficulty badge class
const getDifficultyBadgeClass = (difficulty: string): string => {
  if (difficulty === "easy") return "bg-green-500/20 text-green-300";
  if (difficulty === "intermediate") return "bg-blue-500/20 text-blue-300";
  return "bg-orange-500/20 text-orange-300";
};

// Helper function to get difficulty label
const getDifficultyLabel = (difficulty: string): string => {
  if (difficulty === "easy") return "✓ Easy";
  if (difficulty === "intermediate") return "◆ Intermediate";
  return "🔥 Hard";
};

export default function ContainerQuizGame() {
  const [gameState, setGameState] = useState<
    "welcome" | "background" | "playing" | "gameover"
  >("welcome");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [mouseLeaveCount, setMouseLeaveCount] = useState(0);
  const [currentSongUrl, setCurrentSongUrl] = useState("");

  // Song options for random selection
  const songs = [
    "https://www.youtube.com/embed/u5CVsCnxyXg?autoplay=1&start=0", // No Surprises - Radiohead
    "https://www.youtube.com/embed/ZVgHPSyEIqk?autoplay=1&start=0"  // Let Down - Radiohead
  ];

  // Tab visibility and mouse detection
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left - show warning with random song
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        setCurrentSongUrl(randomSong);
        setShowTabWarning(true);
        setTabSwitchCount((prev) => prev + 1);
      } else {
        // User returned - close warning
        setShowTabWarning(false);
      }
    };

    const handleBlur = () => {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSongUrl(randomSong);
      setShowTabWarning(true);
      setTabSwitchCount((prev) => prev + 1);
    };

    const handleFocus = () => {
      // User returned to window - close warning
      setShowTabWarning(false);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        setCurrentSongUrl(randomSong);
        setShowTabWarning(true);
        setMouseLeaveCount((prev) => prev + 1);
      }
    };

    const handleMouseEnter = () => {
      // Mouse returned to page - close warning
      setShowTabWarning(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [gameState]);

  // Shuffle questions: 4 easy + 4 intermediate + 2 hard
  const initializeQuestions = () => {
    const easyQuestions = questionBank.filter((q) => q.difficulty === "easy");
    const intermediateQuestions = questionBank.filter(
      (q) => q.difficulty === "intermediate"
    );
    const hardQuestions = questionBank.filter((q) => q.difficulty === "hard");

    const shuffledEasy = easyQuestions.toSorted(() => Math.random() - 0.5);
    const shuffledIntermediate = intermediateQuestions.toSorted(
      () => Math.random() - 0.5
    );
    const shuffledHard = hardQuestions.toSorted(() => Math.random() - 0.5);

    const selectedQuestions = [
      ...shuffledEasy,
      ...shuffledIntermediate,
      ...shuffledHard,
    ].toSorted(() => Math.random() - 0.5);

    setQuestions(selectedQuestions);
  };

  const handleStartGame = () => {
    setGameState("background");
  };

  const handleStartQuiz = () => {
    initializeQuestions();
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);

      const isCorrect = answer === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }

      setAnsweredQuestions([
        ...answeredQuestions,
        {
          question: questions[currentQuestion].question,
          userAnswer: answer,
          correctAnswer: questions[currentQuestion].correctAnswer,
          isCorrect,
          difficulty: questions[currentQuestion].difficulty,
        },
      ]);

      // Auto-advance after 4 seconds
      setTimeout(() => {
        if (currentQuestion < 9) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setGameState("gameover");
        }
      }, 4000);
    }, 1000);
  };

  const resetGame = () => {
    setGameState("welcome");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions([]);
    setTabSwitchCount(0);
    setMouseLeaveCount(0);
  };

  const handleDismissWarning = () => {
    setShowTabWarning(false);
  };

  // Welcome Screen
  if (gameState === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        {/* Tab/Mouse Warning Dialog with YouTube Video */}
        {showTabWarning && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-orange-900/95 to-red-900/95 backdrop-blur-lg rounded-2xl p-8 max-w-3xl w-full border-2 border-orange-500 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mt-4 mb-2">
                    👀 Hey! Stay Focused!
                  </h3>
                  <p className="text-orange-200 text-lg">
                    Your mouse left the page or you switched tabs. Stay here to learn better!
                  </p>
                </div>

                {/* YouTube Video Embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
                    src={currentSongUrl}
                    title="Radiohead - Educational Focus Reminder"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-black/30 rounded-lg p-4 space-y-2">
                  <p className="text-white font-semibold text-lg">
                    Distractions:{" "}
                    <span className="text-orange-400">
                      {tabSwitchCount + mouseLeaveCount}
                    </span>
                  </p>
                  <div className="text-sm text-orange-200 space-y-1">
                    <p>
                      🖱️ Mouse left page:{" "}
                      <span className="font-semibold">{mouseLeaveCount}x</span>
                    </p>
                    <p>
                      🔄 Tab switches:{" "}
                      <span className="font-semibold">{tabSwitchCount}x</span>
                    </p>
                  </div>
                  <p className="text-orange-300 text-xs mt-2 italic">
                    💡 Staying focused helps you learn better!
                  </p>
                  <p className="text-orange-200/70 text-xs mt-3 border-t border-orange-400/30 pt-2">
                    🎵 Music: Radiohead ("No Surprises" or "Let Down") • For educational purposes only
                  </p>
                </div>

                <button
                  onClick={handleDismissWarning}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  ✓ Got it! Back to Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
            <h1 className="text-5xl font-bold text-white">
              Container Tech Quiz
            </h1>
            <p className="text-xl text-blue-200">
              Learn Docker, Kubernetes, and VMs through 10 questions!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              What You Will Learn
            </h2>
            <div className="grid gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-white font-semibold">Easy Questions</p>
                  <p className="text-blue-200 text-sm">
                    Basic concepts everyone can understand
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-white font-semibold">
                    Intermediate Questions
                  </p>
                  <p className="text-blue-200 text-sm">
                    Build on the basics with real scenarios
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-white font-semibold">Hard Questions</p>
                  <p className="text-blue-200 text-sm">
                    Test your deeper understanding
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Start Learning <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>

          {/* Creator Footer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-white font-bold text-lg">
                  Created by Ken Patrick Garcia
                </p>
                <p className="text-blue-300 text-sm">
                  Full-Stack Developer | AI/ML Practitioner | Cloud Computing
                  Enthusiast
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  Computer Science @ University of Makati
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://kengarciaportfolio-kpg782s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Portfolio
                </a>
                <a
                  href="https://www.linkedin.com/in/ken-patrick-garcia-ba5430285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Server className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:kenpatrickgarcia123@gmail.com"
                  className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Email
                </a>
                <a
                  href="https://github.com/KpG782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  GitHub
                </a>
              </div>
              <p className="text-blue-200/60 text-xs text-center">
                "Building meaningful solutions, one commit at a time"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Background Education Screen
  if (gameState === "background") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8 py-8">
          <div className="text-center space-y-4">
            <BookOpen className="w-16 h-16 text-purple-300 mx-auto" />
            <h1 className="text-4xl font-bold text-white">Quick Background</h1>
            <p className="text-xl text-purple-200">
              Understanding the basics before we begin
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Box className="w-6 h-6 text-blue-400" />
                What is Virtualization?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                <strong>Virtualization</strong> creates a complete virtual
                computer inside your real computer. Each{" "}
                <strong>Virtual Machine (VM)</strong> has its own operating
                system, like having multiple computers in one box. This provides{" "}
                <strong>strong isolation</strong> but uses more resources like
                memory, CPU, and energy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Server className="w-6 h-6 text-green-400" />
                What is Containerization?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                <strong>Containerization</strong> packages applications with
                their dependencies but shares the host OS kernel. This makes
                containers <strong>lighter, faster, and more flexible</strong>{" "}
                than VMs. Popular tools include <strong>Docker Compose</strong>{" "}
                (simple, fast) and <strong>Kubernetes</strong> (orchestration,
                scalability).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cloud className="w-6 h-6 text-yellow-400" />
                Why Does This Matter?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                In modern computing like Smart Cities, Agriculture 5.0, and IoT
                devices, choosing the right deployment method affects:{" "}
                <strong>speed, cost, energy use, and scalability</strong>. This
                quiz helps you understand when to use each technology!
              </p>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-400/30">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Based on Real Research
              </h3>
              <p className="text-blue-200 text-sm mb-2">
                <strong>
                  Sturley, H., Fournier, A., Salcedo-Navarro, A., Garcia-Pineda,
                  M., & Segura-Garcia, J. (2024).
                </strong>{" "}
                Virtualization vs. Containerization, a Comparative Approach for
                Application Deployment in the Computing Continuum Focused on the
                Edge. <em>Future Internet</em>, 16(11), 427.{" "}
                <a
                  href="https://doi.org/10.3390/fi16110427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline"
                >
                  https://doi.org/10.3390/fi16110427
                </a>
              </p>
              <p className="text-blue-300 text-xs italic">
                All questions are based on findings from this peer-reviewed
                study using Raspberry Pi 4B+ and x86 systems.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleStartQuiz}
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
            >
              I am Ready! Start Quiz{" "}
              <ArrowRight className="inline ml-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === "playing" && questions.length > 0) {
    const question = questions[currentQuestion];
    const Icon = question.icon;
    const isCorrect = selectedAnswer === question.correctAnswer;
    const progress = ((currentQuestion + 1) / 10) * 100;
    const bgColor = getBackgroundColor(showResult, isCorrect);

    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${bgColor} p-4 md:p-8 transition-colors duration-500`}
      >
        {/* Tab/Mouse Warning Dialog with YouTube Video */}
        {showTabWarning && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-orange-900/95 to-red-900/95 backdrop-blur-lg rounded-2xl p-8 max-w-3xl w-full border-2 border-orange-500 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mt-4 mb-2">
                    👀 Hey! Stay Focused!
                  </h3>
                  <p className="text-orange-200 text-lg">
                    Your mouse left the page or you switched tabs. Stay here to learn better!
                  </p>
                </div>

                {/* YouTube Video Embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
                    src={currentSongUrl}
                    title="Radiohead - Educational Focus Reminder"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-black/30 rounded-lg p-4 space-y-2">
                  <p className="text-white font-semibold text-lg">
                    Distractions:{" "}
                    <span className="text-orange-400">
                      {tabSwitchCount + mouseLeaveCount}
                    </span>
                  </p>
                  <div className="text-sm text-orange-200 space-y-1">
                    <p>
                      🖱️ Mouse left page:{" "}
                      <span className="font-semibold">{mouseLeaveCount}x</span>
                    </p>
                    <p>
                      🔄 Tab switches:{" "}
                      <span className="font-semibold">{tabSwitchCount}x</span>
                    </p>
                  </div>
                  <p className="text-orange-300 text-xs mt-2 italic">
                    💡 Staying focused helps you learn better!
                  </p>
                  <p className="text-orange-200/70 text-xs mt-3 border-t border-orange-400/30 pt-2">
                    🎵 Music: Radiohead ("No Surprises" or "Let Down") • For educational purposes only
                  </p>
                </div>

                <button
                  onClick={handleDismissWarning}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  ✓ Got it! Back to Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">
                Question {currentQuestion + 1} / 10
              </span>
              <span className="text-yellow-400 font-bold">Score: {score}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${getDifficultyBadgeClass(
                  question.difficulty
                )}`}
              >
                {getDifficultyLabel(question.difficulty)}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
            <div className="flex items-start gap-4">
              <Icon className="w-12 h-12 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {question.question}
                </h2>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center gap-3 py-8">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <p className="text-white text-lg">Checking your answer...</p>
              </div>
            )}

            {/* Answer Options */}
            {!isLoading && !showResult && (
              <div className="space-y-4">
                {question.options.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full p-5 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-blue-400 rounded-xl text-left transition-all hover:scale-102 group"
                  >
                    <span className="text-white text-lg font-medium">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className="space-y-4 animate-fade-in">
                <div
                  className={`${
                    isCorrect
                      ? "bg-green-600/20 border-green-400"
                      : "bg-red-600/20 border-red-400"
                  } border-2 rounded-xl p-6`}
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">
                      {isCorrect ? "🎉" : "💡"}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {isCorrect ? "Correct!" : "Not quite!"}
                    </h3>
                  </div>
                  <p className="text-white text-lg leading-relaxed">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                  {!isCorrect && (
                    <p className="text-blue-200 text-md mt-3">
                      ✓ Correct answer:{" "}
                      <strong>{question.correctAnswer}</strong>
                    </p>
                  )}
                </div>
                <p className="text-center text-blue-200 text-sm">
                  Moving to next question in a moment...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === "gameover") {
    const percentage = (score / 10) * 100;
    const easyCorrect = answeredQuestions.filter(
      (q) => q.isCorrect && q.difficulty === "easy"
    ).length;
    const intermediateCorrect = answeredQuestions.filter(
      (q) => q.isCorrect && q.difficulty === "intermediate"
    ).length;
    const hardCorrect = answeredQuestions.filter(
      (q) => q.isCorrect && q.difficulty === "hard"
    ).length;
    const performanceMsg = getPerformanceMessage(percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8 py-8">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-bounce" />
          <h1 className="text-5xl font-bold text-white">Quiz Complete!</h1>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
            <div className="text-7xl font-bold text-white">{score} / 10</div>
            <p className="text-3xl text-blue-200">{performanceMsg}</p>

            <div className="grid grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              <div className="bg-green-900/30 rounded-lg p-4 text-center">
                <p className="text-green-300 text-sm font-semibold">Easy</p>
                <p className="text-3xl font-bold text-white">{easyCorrect}/4</p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                <p className="text-blue-300 text-sm font-semibold">
                  Intermediate
                </p>
                <p className="text-3xl font-bold text-white">
                  {intermediateCorrect}/4
                </p>
              </div>
              <div className="bg-orange-900/30 rounded-lg p-4 text-center">
                <p className="text-orange-300 text-sm font-semibold">Hard</p>
                <p className="text-3xl font-bold text-white">{hardCorrect}/2</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Key Takeaways
              </h3>
              <div className="bg-blue-900/30 rounded-lg p-4 text-blue-100">
                <p className="font-semibold">🐳 Docker Compose:</p>
                <p className="text-sm">
                  Perfect for quick tasks and development. Starts in 2.5
                  seconds, uses only 100MB memory, ideal for edge devices like
                  Raspberry Pi.
                </p>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4 text-purple-100">
                <p className="font-semibold">☸️ Kubernetes:</p>
                <p className="text-sm">
                  Production powerhouse for 24/7 services. Handles automatic
                  scaling, load balancing, and distributed workloads across
                  multiple servers.
                </p>
              </div>
              <div className="bg-red-900/30 rounded-lg p-4 text-red-100">
                <p className="font-semibold">🖥️ Virtual Machines:</p>
                <p className="text-sm">
                  Strong isolation for legacy apps and security-critical
                  workloads. Use matching architectures (avoid x86 VMs on ARM
                  hardware).
                </p>
              </div>
            </div>

            <div className="bg-indigo-900/30 rounded-lg p-5 text-left border border-indigo-400/30">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Learn More - Research Source
              </h4>
              <div className="text-sm text-blue-200 space-y-2">
                <p>
                  <strong>Study:</strong> Virtualization vs. Containerization in
                  Edge Computing
                </p>
                <p>
                  <strong>Authors:</strong> Sturley, H., Fournier, A.,
                  Salcedo-Navarro, A., Garcia-Pineda, M., & Segura-Garcia, J.
                  (2024)
                </p>
                <p>
                  <strong>Published:</strong> <em>Future Internet</em>
                  {", "}16(11), 427
                </p>
                <p>
                  <strong>DOI:</strong>{" "}
                  <a
                    href="https://doi.org/10.3390/fi16110427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-100 underline font-semibold"
                  >
                    https://doi.org/10.3390/fi16110427
                  </a>
                </p>
                <p className="text-xs text-blue-300 italic mt-2">
                  💡 This quiz is based on real experiments using Raspberry Pi
                  4B+ (ARM) and x86 systems, measuring startup time, memory,
                  CPU, and energy consumption.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="px-10 py-5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
          >
            Take Quiz Again 🔄
          </button>

          {/* Creator Footer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-white font-bold text-lg">
                  Created by Ken Patrick Garcia
                </p>
                <p className="text-blue-300 text-sm">
                  Full-Stack Developer | AI/ML Practitioner | Cloud Computing
                  Enthusiast
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  Computer Science @ University of Makati
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://kengarciaportfolio-kpg782s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Portfolio
                </a>
                <a
                  href="https://www.linkedin.com/in/ken-patrick-garcia-ba5430285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Server className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:kenpatrickgarcia123@gmail.com"
                  className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Email
                </a>
                <a
                  href="https://github.com/KpG782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  GitHub
                </a>
              </div>
              <p className="text-blue-200/60 text-xs text-center">
                "Building meaningful solutions, one commit at a time"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
