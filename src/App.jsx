import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Cpu, 
  Sparkles, 
  Award, 
  BookOpen, 
  Terminal, 
  Code,
  ArrowRight,
  TrendingUp,
  Bot,
  Zap,
  Cloud
} from 'lucide-react';
import ParticleCanvas from './components/ParticleCanvas';
import ExperienceFlipCard from './components/ExperienceFlipCard';

const resumeData = {
  name: "Arun Pandiyan K",
  title: "Delivery Project Lead & Technical Architect",
  contact: {
    phones: ["+91 86106 92917", "+91 95514 47024"],
    email: "formsarun@gmail.com",
    linkedin: "https://www.linkedin.com/in/arun-pandiyan-k"
  },
  objective: "A collaborative software architect and delivery lead with 13+ years of experience spearheading high-velocity engineering squads. Driven by a passion for leveraging emerging technologies, from real-time streaming architectures to LLM workflows. Translates strategic foresight and competitive gaming tactics into elegant software designs and highly optimized delivery cycles.",
  skills: [
    "Java", "Kotlin", "Apache Flink", "Kafka", "SpringBoot", "Microservices", 
    "GCP", "Dynatrace", "Splunk", "Amplitude", "KTor", "Github Actions", 
    "Node.js", "AWS", "Postgres", "MySQL", "Firebase", "Dart", "Flutter", 
    "JIRA", "Terraform", "Javascript"
  ],
  experience: [
    {
      company: "Mphasis – Fiserv",
      role: "Delivery Project Lead",
      duration: "Apr 2025 - Present",
      project: "Optis Transformation",
      summary: "Leading the core architectural transformation of legacy card processing systems handling several billion transactions a day to a BIAN-inspired modern pipeline.",
      skills: ["Java", "Gen-AI", "Agentic AI", "Kotlin", "SpringBoot", "Apache Flink", "Kafka", "Dynatrace", "Splunk", "OpenShift", "Kubernetes", "MongoDB", "Redis"],
      details: [
        "Revamped Legacy Mainframe to a new card processing system inspired by BIAN standards using Agentic AI & Custom Markup for trans-compiling legacy code to Flink.",
        "Created data-ingestion models into AI pipelines for deterministic code generation and built knowledge graphs with RDF4J & TTL files.",
        "Set up Orchestrator flow between modern distributed microservices using Kafka and Apache Flink streams.",
        "Successfully modularized key business domains like Cycling, Fees, Charges, and Interest Calculation modules.",
        "Organized code review panels and groomed a core technical team to set development standards across codebases.",
        "Honored with an Award for Dedication and Excellence by the APAC Delivery President."
      ]
    },
    {
      company: "Ford Motor Company",
      role: "Technology Lead",
      duration: "Oct 2021 – Feb 2025",
      project: "FordPass xAPI",
      summary: "Architected high-scale Experience APIs for vehicle control screen of FordPass iOS & Android mobile apps catering to millions of active vehicles globally.",
      skills: ["Java", "Kotlin", "SpringBoot", "Amplitude", "Dynatrace", "Splunk", "GCP", "Github Actions", "Postgres", "KTor"],
      details: [
        "Implemented secure Federated Credentials for automated service-to-service calls, replacing static credentials.",
        "Designed GCP Secret Manager key rotation pipelines with fully automated deployment scripts using GitHub Actions.",
        "Created comprehensive SRE performance and health dashboards using Dynatrace and Grafana.",
        "Migrated key vehicle commands infrastructure into an Event-Driven architecture.",
        "Tracked A/B testing and user flow analysis using Amplitude dashboards to drive features.",
        "Led the xAPI core squad delivering vehicle controls with high SLA availability."
      ]
    },
    {
      company: "Ford Motor Company (via STG InfoTech)",
      role: "Senior Software Engineer / Team Lead",
      duration: "Dec 2018 – Oct 2021",
      project: "FordPass Dashboard & Cloud Migration",
      summary: "Facilitated major cloud migrations and API modularization projects targeting user remote actions and dashboard configurations.",
      skills: ["Azure", "GCP", "PCF", "Terraform", "Tekton", "Java", "Kotlin", "Microservices"],
      details: [
        "Developed and managed scalable Dashboard and widgets API for FordPass.",
        "Migrated enterprise workloads from legacy PCF / Azure infrastructure to Google Cloud Platform.",
        "Created CI/CD orchestrations using modern GitOps practices with Terraform and Tekton.",
        "Refactored Remote Start & login architectures, delivering a 12% improvement in command success rate.",
        "Recognized by IMG Head for delivering Vehicle Details and Service modules with zero production anomalies."
      ]
    },
    {
      company: "Technobees Solutions India",
      role: "Senior Software Engineer",
      duration: "Mar 2016 – Dec 2018",
      project: "FollowApp & NalamRX Projects",
      summary: "Developed telemedicine platforms and digital pharmacy ecosystems from inception to production deployment.",
      skills: ["Java", "Kotlin", "Android", "Node.js", "GCP", "MySQL", "AWS", "WebRTC", "Javascript"],
      details: [
        "Architected 'FollowApp' healthcare system, enabling remote post-consultation follow-ups to eliminate repeated visits.",
        "Integrated secure WebRTC video calls, dynamic e-prescriptions, and home lab test requests.",
        "Built 'NalamRX', an IMA-approved healthcare add-on promoting complete paperless workflows for clinics.",
        "Honored in 'Nalam-100' for rapid development and launch of NalamDot web and mobile offerings."
      ]
    },
    {
      company: "Technibits Solutions",
      role: "Mobile Application Developer",
      duration: "May 2015 – Mar 2016",
      project: "PMP® Exam Prep (PMBOK 5)",
      summary: "Designed and developed cross-platform educational tools and interactive learning systems.",
      skills: ["Java", "Kotlin", "Android", "Mobile Architecture"],
      details: [
        "Engineered PMP® certification prep platform with video coaching modules.",
        "Implemented offline exam simulations, analytics trackers, and customized review plans."
      ]
    },
    {
      company: "Squaresoft Technologies",
      role: "Java Developer",
      duration: "Aug 2013 – May 2015",
      project: "PoS (Point of Sale) Enterprise",
      summary: "Implemented core transaction logic and backend updates for POS systems.",
      skills: ["Java", "JSP", "SQL", "HTML/CSS", "Inventory Management"],
      details: [
        "Developed and optimized JSP-based retail POS software.",
        "Refactored database queries, improving invoice generation speed by optimizing SQL schemas.",
        "Integrated inventory control loops for automated stock updates."
      ]
    }
  ],
  accomplishments: [
    "Awarded Dedication & Excellence recognition by Mphasis APAC Delivery President for Card processing modernization.",
    "Recognized for successfully delivering ACCOUNT and VEHICLE DETAILS features in FordPass, ensuring a seamless user experience.",
    "Awarded for independently gathering requirements and integration of LiveAssist feature in FordPass Guides, enhancing customer support.",
    "Appreciated for cross-functional collaboration, working with global teams to optimize performance, reliability, and feature enhancements.",
    "Acknowledged for significant contributions to launching FordPass across 40 EU countries, ensuring compliance and scalability.",
    "Recognized in Nalam-100 for the swift and efficient delivery of the NalamDot web and mobile application, driving digital transformation."
  ],
  education: {
    degree: "B.E. in Computer Science & Engineering",
    school: "Dhaanish Ahmed College of Engineering, Anna University",
    duration: "2008 – 2012"
  }
};

export default function App() {
  const highlightCards = [
    {
      title: "AI & Agentic Architect",
      text: "Designing autonomous LLM agents to transpile legacy mainframes into Flink & Kafka stream topologies.",
      Icon: Bot,
      color: "from-indigo-500 to-emerald-500"
    },
    {
      title: "High-Throughput Stream Specialist",
      text: "Orchestrating distributed event streams processing billions of daily transactions with Flink & Kafka.",
      Icon: Zap,
      color: "from-indigo-500 to-sky-500"
    },
    {
      title: "Cloud Native & GitOps Leader",
      text: "Automating secure cloud migrations (GCP) and key rotations with zero-downtime GitOps pipelines.",
      Icon: Cloud,
      color: "from-emerald-500 to-indigo-500"
    }
  ];

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCardVisible(false);
      setTimeout(() => {
        setActiveCardIndex((prev) => (prev + 1) % highlightCards.length);
        setCardVisible(true);
      }, 300); // Wait for transition out
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer Fallback setup for Reveal Scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once animated, no need to track again
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const targets = document.querySelectorAll('.reveal-card');
    
    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const CurrentIcon = highlightCards[activeCardIndex].Icon;

  return (
    <div className="relative min-h-screen z-10 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Dynamic Cursor Interactive Particles */}
      <ParticleCanvas />

      {/* Navigation Backdrop bar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="font-bold text-slate-200 tracking-wider">AP.DEV</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#accomplishments" className="hover:text-indigo-400 transition-colors">Accomplishments</a>
            <a href="#education" className="hover:text-indigo-400 transition-colors">Education</a>
          </nav>
          <div>
            <a 
              href={`mailto:${resumeData.contact.email}`} 
              className="text-xs md:text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              Contact Me <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24 relative">
        
        {/* HERO SECTION */}
        <section id="about" className="reveal-card py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} /> Available for Leadership & Architect Roles
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-indigo-400 bg-clip-text text-transparent py-2 leading-tight">
              {resumeData.name}
            </h1>
            
            <h2 className="text-lg sm:text-2xl text-slate-400 font-medium tracking-wide">
              {resumeData.title}
            </h2>
            
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl">
              {resumeData.objective}
            </p>

            {/* Quick Contacts */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-sm text-slate-300">
              <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-lg">
                <Mail size={16} className="text-indigo-400" />
                <span>{resumeData.contact.email}</span>
              </a>
              <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-lg">
                <Linkedin size={16} className="text-indigo-400" />
                <span>LinkedIn Profile</span>
              </a>
              <div className="flex items-center gap-2 py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                <Phone size={16} className="text-indigo-400" />
                <span>{resumeData.contact.phones[0]}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Decorative dynamic glow backdrop */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${highlightCards[activeCardIndex].color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-all duration-700`}></div>
              
              <div className={`relative w-64 h-64 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-2xl transition-all duration-300 transform ${
                cardVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                {/* Active Card Icon */}
                <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-400 mt-2 animate-bounce">
                  <CurrentIcon size={40} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-200 text-sm">{highlightCards[activeCardIndex].title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-[200px] leading-relaxed">
                    {highlightCards[activeCardIndex].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="reveal-card space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Cpu size={20} />
            </span>
            <h2 className="text-2xl font-bold text-slate-200 tracking-tight">Core Competencies & Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900/40 border border-slate-900 p-8 rounded-2xl backdrop-blur-sm">
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-semibold text-slate-300 flex items-center gap-2">
                <Terminal size={16} className="text-indigo-400" /> Technology Landscape
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A robust history of designing microservices, configuring high-throughput event processing pipelines, and deploying to cloud infrastructure.
              </p>
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-300 text-xs font-semibold rounded-lg border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE FLIP CARD SECTION */}
        <section id="experience" className="reveal-card space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Code size={20} />
              </span>
              <h2 className="text-2xl font-bold text-slate-200 tracking-tight">Professional History</h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500">
              Click cards to reveal project contributions <TrendingUp size={12} />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.experience.map((exp, index) => (
              <ExperienceFlipCard key={index} experience={exp} />
            ))}
          </div>
        </section>

        {/* ACCOMPLISHMENTS SECTION */}
        <section id="accomplishments" className="reveal-card space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Award size={20} />
            </span>
            <h2 className="text-2xl font-bold text-slate-200 tracking-tight">Key Accomplishments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.accomplishments.map((acc, index) => (
              <div 
                key={index}
                className="p-5 bg-slate-900/50 hover:bg-slate-900 border border-slate-900 hover:border-indigo-500/20 rounded-xl transition-all duration-300 flex items-start gap-4"
              >
                <span className="mt-1 inline-flex p-1.5 bg-indigo-500/10 text-indigo-400 rounded">
                  <Sparkles size={14} />
                </span>
                <p className="text-sm text-slate-400 leading-relaxed">{acc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="reveal-card space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <BookOpen size={20} />
            </span>
            <h2 className="text-2xl font-bold text-slate-200 tracking-tight">Education</h2>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-200">{resumeData.education.degree}</h3>
              <p className="text-sm text-slate-400 mt-1">{resumeData.education.school}</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700/50">
              {resumeData.education.duration}
            </span>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 mt-16 text-center text-xs text-slate-500 relative z-25">
        <p>© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
        <p className="mt-1">Crafted with React, Tailwind CSS, & Custom Canvas Particles.</p>
      </footer>
    </div>
  );
}
