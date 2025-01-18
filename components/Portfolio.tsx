"use client"

// components/Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Download, ChevronDown } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import portfolioData from '@/data/portfolio.json';
// import { Badge } from "@/components/ui/badge";

// Types definitions
interface SkillGroup {
    category: string;
    icon: string;
    items: string[];
    color: string;
}

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    category: string;
    color: string;
}

interface Experience {
    date: string;
    title: string;
    company: string;
    description: string;
}

interface Education {
    degree: string;
    school: string;
    date: string;
    description: string;
}

interface PersonalInfo {
    name: string;
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    socials: {
        [key: string]: string;
    };
}

interface PortfolioData {
    personal: PersonalInfo;
    skills: SkillGroup[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
}

const Portfolio = () => {
    // State declarations
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

// Scroll handler effect
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(progress);

            const sections = ['hero', 'skills', 'projects', 'experience', 'education'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Data fetching effect
    useEffect(() => {
        const loadPortfolioData = async () => {
            try {
                // Dans un environnement réel, vous feriez un appel API ici
                // const response = await fetch('/api/portfolio-data');
                const data: PortfolioData = {
                    personal: {
                        name: "Moussa THIOR",
                        title: "Développeur Full Stack & Data Scientist",
                        description: "Passionné par la création d'expériences numériques innovantes",
                        address: "Pikine Guinaw Rails Nord, Dakar – Sénégal",
                        phone: "+221 77 680 42 21",
                        email: "moussa3.thior@ucad.edu.sn",
                        socials: {
                            github: "LordPhenixDeNetra",
                            linkedin: "moussa-thior-699500195",
                            twitter: "N_THIOR",
                            instagram: "n_thior_n"
                        }
                    },
                    skills: [
                        {
                            category: "Développement",
                            icon: "🚀",
                            items: ["Python", "Java", "C/C++", "JavaScript", "Dart", "C#"],
                            color: "from-purple-500 to-blue-500"
                        },
                        {
                            category: "Data Science",
                            icon: "🤖",
                            items: ["Machine Learning", "TensorFlow", "PyTorch", "Power BI", "Tableau"],
                            color: "from-green-500 to-teal-500"
                        },
                        {
                            category: "Web & Mobile",
                            icon: "📱",
                            items: ["React", "Angular", "Flutter", "Spring Boot", "ASP.NET"],
                            color: "from-orange-500 to-red-500"
                        },


                    ],
                    projects: [
                        {
                            title: "ProjetAPIsAndWS2023",
                            description: "Architecture moderne et évolutive pour API backend",
                            image: "/api/placeholder/600/400",
                            tech: ["Java", "Spring Boot", "C#", "ASP.NET"],
                            category: "Web Development",
                            color: "from-blue-600 to-indigo-600"
                        },
                        {
                            title: "Fooocus AI",
                            description: "Système d'optimisation IA innovant",
                            image: "/api/placeholder/600/400",
                            tech: ["Python", "TensorFlow", "PyTorch"],
                            category: "Intelligence Artificielle",
                            color: "from-purple-600 to-pink-600"
                        },
                        {
                            title: "Hacker News Mobile",
                            description: "Application mobile moderne et performante",
                            image: "/api/placeholder/600/400",
                            tech: ["Flutter", "Dart", "Firebase"],
                            category: "Mobile",
                            color: "from-green-600 to-teal-600"
                        }
                    ],
                    experience: [/* ... données d'expérience ... */],
                    education: [/* ... données d'éducation ... */]
                };

                setPortfolioData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading portfolio data:', error);
                setIsLoading(false);
            }
        };

        loadPortfolioData();
    }, []);

    // Theme toggle handler
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Loading state
    if (isLoading || !portfolioData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                        MT
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Navigation */}
            <nav className="fixed top-4 right-4 z-50 flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                    {['hero', 'skills', 'projects', 'experience', 'education'].map((section) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={`px-3 py-1 rounded-full transition-colors ${
                                activeSection === section
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </a>
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-900/40 dark:to-purple-900/40">
                    <div className="absolute inset-0 backdrop-blur-3xl">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full mix-blend-multiply filter blur-xl animate-float"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${Math.random() * 200 + 50}px`,
                                    height: `${Math.random() * 200 + 50}px`,
                                    background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${Math.random() * 10 + 10}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    {/* Avatar */}
                    <div className="mb-8 relative">
                        <div className="w-40 h-40 mx-auto relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-spin-slow"></div>
                            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
                            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl font-bold">
                                {portfolioData.personal.name.charAt(0)}
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                        {portfolioData.personal.name}
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
                        {portfolioData.personal.title}
                    </p>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        {portfolioData.personal.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-12">
                        {Object.entries(portfolioData.personal.socials).map(([platform, username]) => {
                            const Icon = {
                                github: Github,
                                linkedin: Linkedin,
                                twitter: Twitter,
                                instagram: Instagram
                            }[platform];

                            return Icon ? (
                                <a
                                    key={platform}
                                    href={`https://${platform}.com/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transform hover:scale-110 transition-transform"
                                >
                                    <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
                                </a>
                            ) : null;
                        })}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-6 h-6" />
                            <span>{portfolioData.personal.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-6 h-6" />
                            <span>{portfolioData.personal.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-6 h-6" />
                            <span>{portfolioData.personal.phone}</span>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <ChevronDown className="w-8 h-8 text-gray-400" />
                    </div>
                </div>
            </section>

            {/* Autres sections (Skills, Projects, etc.) à ajouter ici... */}

            {/* Skills Section */}
            <section id="skills" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Compétences
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                category: "Développement",
                                icon: "🚀",
                                items: ["Python", "Java", "C/C++", "JavaScript", "Dart", "C#"],
                                color: "from-blue-500 to-indigo-500"
                            },
                            {
                                category: "Data Science",
                                icon: "🤖",
                                items: ["Machine Learning", "TensorFlow", "PyTorch", "Power BI", "Tableau"],
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                category: "Web & Mobile",
                                icon: "📱",
                                items: ["React", "Angular", "Flutter", "Spring Boot", "ASP.NET"],
                                color: "from-green-500 to-teal-500"
                            },

                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{skill.icon}</div>
                                <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${skill.color} text-white opacity-90 hover:opacity-100 transition-opacity`}
                                        >
                {item}
              </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-screen py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Projets
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "ProjetAPIsAndWS2023",
                                description: "Architecture moderne et évolutive pour API backend",
                                tech: ["Java", "Spring Boot", "C#", "ASP.NET"],
                                color: "from-blue-500 to-indigo-500"
                            },
                            {
                                title: "AgriBrainSN",
                                description: "Plateforme de resilience agricole basé sur l'IA",
                                tech: ["Python", "TensorFlow", "PyTorch", "Streamlit"],
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                title: "Hacker News Mobile",
                                description: "Application mobile moderne et performante",
                                tech: ["Flutter", "Dart", "Firebase"],
                                color: "from-green-500 to-teal-500"
                            }
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`h-48 bg-gradient-to-r ${project.color}`} />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium"
                                            >
                  {tech}
                </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Expérience
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                            {[
                                {
                                    date: "Janvier 2024 - Présent",
                                    title: "Stagiaire développeur",
                                    company: "Caisse de Sécurité Sociale",
                                    description: "Développement d'applications et intégration de solutions"
                                },
                                {
                                    date: "Juin 2024 - Présent",
                                    title: "Data Scientist",
                                    company: "CURI",
                                    description: "Recherche et développement en Data Sciences"
                                }
                            ].map((exp, index) => (
                                <div key={index} className="relative mb-12">
                                    <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-1/2" />
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                                                <div className="text-sm text-blue-500 font-semibold mb-2">{exp.date}</div>
                                                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                                                <div className="text-purple-600 dark:text-purple-400 mb-2">{exp.company}</div>
                                                <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="min-h-screen py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Formation
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            {
                                degree: "Master en Informatique",
                                school: "Université Cheikh Anta Diop de Dakar",
                                date: "2022 - Présent",
                                description: "Spécialisation en Système d'informations réparties  et data science"
                            },
                            {
                                degree: "Licence en Informatique",
                                school: "Université Cheikh Anta Diop de Dakar",
                                date: "2019 - 2022",
                                description: "Formation fondamentale en informatique et mathématiques"
                            }
                        ].map((edu, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{edu.degree}</h3>
                                        <div className="text-purple-600 dark:text-purple-400 mt-1">{edu.school}</div>
                                    </div>
                                    <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm">
              {edu.date}
            </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Portfolio;