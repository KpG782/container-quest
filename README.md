# ContainerQuest: Interactive Learning Quiz

An engaging, educational Next.js quiz application that teaches containerization concepts through interactive questions based on real academic research.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

## 🎓 Project Purpose

This project was created as **Assignment 4** for Mr. Nino Narido's class by **Ken Patrick Garcia** to demonstrate understanding of virtualization vs. containerization concepts in edge computing.

### Why This Project Exists

After studying the research paper by **Sturley et al. (2024)** titled *"Virtualization vs. Containerization, a Comparative Approach for Application Deployment in the Computing Continuum Focused on the Edge"*, I wanted to create an interactive way to share what I learned about:

- **Speed differences** between containers and VMs (Docker starts 18x faster)
- **Energy efficiency** on ARM processors (containers use 85% less power)
- **Real-world applications** like Agriculture 5.0 drone image processing
- **When to use each technology** based on specific requirements

Instead of just writing a traditional report, I built this **interactive quiz** to make the concepts more engaging and memorable for anyone learning about containerization.

### Academic Foundation

This entire quiz is based on verified research from:

**Sturley, H., Fournier, A., Salcedo-Navarro, A., Garcia-Pineda, M., & Segura-Garcia, J. (2024).** *Virtualization vs. Containerization, a Comparative Approach for Application Deployment in the Computing Continuum Focused on the Edge.* Future Internet, 16(11), 427. https://doi.org/10.3390/fi16110427

All questions, metrics, and explanations are derived from their experiments using Raspberry Pi 4B+ (ARM) and x86 systems, measuring:
- Startup time
- Memory usage
- CPU overhead
- Energy consumption
- Real-world use cases (Agriculture 5.0)

## ✨ Features

### Educational Design
- **10 Questions**: 4 easy, 4 intermediate, 2 hard (beginner-friendly progression)
- **Randomized Order**: Questions shuffle each time for variety
- **Instant Feedback**: Learn immediately with detailed explanations
- **Progress Tracking**: Visual progress bar and score counter
- **Research Citations**: Full academic source included in the app
- **Documentation Links**: Resources for continued learning

### Interactive Experience
- **Welcome Screen**: Introduction with difficulty breakdown
- **Background Section**: Educational context before quiz starts
- **Loading Animations**: Professional feedback during answer checking
- **Results Screen**: Comprehensive summary with key takeaways
- **Auto-Progression**: Smooth flow between questions (4-second delay)

### Modern Tech Stack
- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Beautiful gradient backgrounds and glassmorphism
- **Lucide Icons**: Professional iconography throughout
- **Docker Ready**: Includes optimized Dockerfile for deployment

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Docker Deployment

```bash
# Build Docker image
docker build -t container-quiz:latest .

# Run container
docker run -p 3000:3000 container-quiz:latest

# Access quiz
http://localhost:3000
```

See [DOCKER_BUILD.md](DOCKER_BUILD.md) for detailed Docker instructions.

## 📚 What You'll Learn

By completing this quiz, you'll understand:

### Key Concepts

1. **Container Advantages**
   - 18x faster startup (2.5s vs 45s for VMs)
   - 80% less memory usage (100MB vs 500MB)
   - 85% less energy on ARM devices (0.3Wh vs 4.5Wh)

2. **When to Use Docker Compose**
   - Quick tasks and development
   - Single-server deployments
   - Low-power devices (Raspberry Pi)
   - Simple multi-container apps

3. **When to Use Kubernetes**
   - Production at scale (24/7 services)
   - Multi-server clusters
   - Auto-scaling requirements
   - Complex orchestration needs

4. **When to Use Virtual Machines**
   - Strong isolation requirements
   - Legacy applications
   - Security-critical workloads
   - Different OS needed

5. **Architecture Compatibility**
   - Why x86 VMs on ARM hardware fail (35% CPU overhead, 8.5Wh energy)
   - Importance of matching architectures

### Real-World Applications

The quiz includes practical scenarios from the research:
- **Agriculture 5.0**: Drone image processing for smart farming
- **Smart Cities**: IoT device management at the edge
- **Industry 4.0**: Manufacturing automation systems

## 🎯 Quiz Structure

### Difficulty Levels

- **Easy (4 questions)**: Basic concepts like startup time, memory usage
- **Intermediate (4 questions)**: Kernel sharing, energy efficiency, real scenarios
- **Hard (2 questions)**: Production orchestration, architecture compatibility

### Question Format

Each question includes:
- **5 multiple choice options** (randomized position of correct answer)
- **Clear explanations** in everyday language
- **Research-backed answers** from Sturley et al. study
- **Visual difficulty indicators** (✓ Easy, ◆ Intermediate, 🔥 Hard)

## 📁 Project Structure

```
container-vm-dashboard/
├── app/
│   ├── page.tsx              # Main quiz component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Styles and animations
├── public/                   # Static assets
├── Dockerfile                # Production Docker build
├── .dockerignore            # Docker build optimization
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── README.md                # This file
└── DOCKER_BUILD.md          # Docker deployment guide
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Docker**: node:20-alpine (multi-stage build)
- **Deployment**: Standalone Next.js output

## 🎨 Design Features

- **Glassmorphism Effects**: Modern backdrop blur with transparency
- **Gradient Backgrounds**: Dynamic colors that change based on state
- **Smooth Animations**: Fade-ins, scale transforms, progress bars
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with high contrast text
- **Accessibility**: Large click targets, clear typography

## 📖 Usage Tips

### For Students
- Take the quiz multiple times to reinforce learning
- Read all explanations carefully (they're based on real research)
- Use the documentation links at the end for deeper study
- Share with classmates learning about containerization

### For Educators
- Use as an interactive teaching tool in class
- Assign as homework to reinforce lectures
- Discuss the research paper after students complete the quiz
- Encourage students to build similar educational tools

### For Developers
- Fork and customize with your own questions
- Deploy to show understanding of containerization
- Use in portfolio to demonstrate full-stack skills
- Extend with additional features (user accounts, leaderboards)

## 🔧 Development

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 🐳 Docker Notes

The Dockerfile uses:
- **Multi-stage build**: Optimized for production (3 stages)
- **node:20-alpine**: Minimal base image
- **Standalone output**: Self-contained Next.js app
- **Non-root user**: Security best practice

## 📚 Academic Context

### Research Summary

From my study of Sturley et al. (2024), I learned:

1. **Containerization performs better** for short workloads on edge devices
2. **Kubernetes excels** at long-term, distributed operations
3. **Energy efficiency** is nearly equal on ARM between containers and VMs
4. **Architecture compatibility** is critical (don't use x86 VMs on ARM)
5. **Real-world testing** used Agriculture 5.0 drone image processing

### Key Findings Applied

- Docker Compose: 2.5s startup for quick tasks
- Kubernetes: Best for 24/7 services with auto-scaling
- VMs: High overhead but strong isolation
- ARM native containers: 0.3Wh vs 8.5Wh for x86 VMs

## 🎓 Educational Outcomes

After completing this quiz, users will:
- ✅ Understand when to use containers vs VMs
- ✅ Know the performance differences (speed, memory, energy)
- ✅ Recognize real-world applications
- ✅ Make informed deployment decisions
- ✅ Have access to research citations for further study

## 🙏 Acknowledgments

- **Mr. Nino Narido**: For the assignment that inspired this project
- **Sturley et al. (2024)**: For the comprehensive research paper
- **University of Makati**: For fostering innovative learning approaches

## 👤 Creator

**Ken Patrick Garcia**
- Full-Stack Developer | AI/ML Practitioner | Cloud Computing Enthusiast
- Computer Science @ University of Makati
- Portfolio: [kengarciaportfolio-kpg782s-projects.vercel.app](https://kengarciaportfolio-kpg782s-projects.vercel.app)
- LinkedIn: [ken-patrick-garcia-ba5430285](https://www.linkedin.com/in/ken-patrick-garcia-ba5430285)
- Email: kenpatrickgarcia123@gmail.com
- GitHub: [KpG782](https://github.com/KpG782)

*"Building meaningful solutions, one commit at a time"*

## 📄 License

MIT License - Feel free to use this project for educational purposes.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Original Research Paper](https://doi.org/10.3390/fi16110427)

---

**Built with Next.js 14, TypeScript, and Real Academic Research**

🎮 Ready to test your knowledge? Run `npm run dev` and visit http://localhost:3000

---

**Built with Next.js 14, TypeScript, and Real Academic Research**

🎮 Ready to test your knowledge? Run `npm run dev` and visit http://localhost:3000
