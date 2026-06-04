import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Layers, Globe, Database, Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        id: 1,
        title: "PROJECT_BETA: COMING_SOON",
        category: "REDACTED",
        description: "Archive record [RESTRICTED]. New neural-interface project under active development. Connection expected soon.",
        tech: ["???", "???", "???"],
        link: "#",
    },
    {
        id: 2,
        title: "PROJECT_ALPHA: COMING_SOON",
        category: "REDACTED",
        description: "Archive record [RESTRICTED]. Core module documentation cleared. Connection expected soon.",
        tech: ["???", "???", "???"],
        link: "#",
    },
    {
        id: 3,
        title: "PROJECT_GAMMA: COMING_SOON",
        category: "REDACTED",
        description: "Archive record [RESTRICTED]. Neural-link data-sets initializing. Connection expected soon.",
        tech: ["???", "???", "???"],
        link: "#",
    },
];

const ICONS = [Globe, Database, Layers];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 160 : -160,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? 160 : -160,
        opacity: 0,
        scale: 0.96,
        transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1]
        }
    })
};

const ProjectCard = ({ project, index, custom }) => {
    const cardRef = useRef(null);
    const glareRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const glare = glareRef.current;
        if (!card) return;

        if (window.matchMedia('(hover: none)').matches) return;

        let rafId = null;
        let isLoopRunning = false;
        const rot = { x: 0, y: 0, tx: 0, ty: 0 };

        const tick = () => {
            rot.x += (rot.tx - rot.x) * 0.1;
            rot.y += (rot.ty - rot.y) * 0.1;
            card.style.transform =
                `perspective(900px) rotateX(${rot.x.toFixed(3)}deg) rotateY(${rot.y.toFixed(3)}deg)`;

            if (rot.tx === 0 && rot.ty === 0 && Math.abs(rot.x) < 0.01 && Math.abs(rot.y) < 0.01) {
                rot.x = 0;
                rot.y = 0;
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
                rafId = null;
                isLoopRunning = false;
                return;
            }

            rafId = requestAnimationFrame(tick);
        };

        const onMove = (e) => {
            const r = card.getBoundingClientRect();
            const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
            rot.tx = -dy * 10;
            rot.ty = dx * 10;

            const gx = ((e.clientX - r.left) / r.width) * 100;
            const gy = ((e.clientY - r.top) / r.height) * 100;

            card.style.setProperty('--mx', `${gx}%`);
            card.style.setProperty('--my', `${gy}%`);

            if (glare) {
                glare.style.background =
                    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 55%)`;
                glare.style.opacity = '1';
            }

            if (!isLoopRunning) {
                isLoopRunning = true;
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(tick);
            }
        };

        const onLeave = () => {
            rot.tx = 0;
            rot.ty = 0;
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
            if (glare) glare.style.opacity = '0';

            if (!isLoopRunning) {
                isLoopRunning = true;
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(tick);
            }
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
        };
    }, [project.id]);

    const Icon = ICONS[index % ICONS.length];

    return (
        <motion.div
            className="project-card-motion"
            custom={custom}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
        >
            <div ref={cardRef} className="project-card">
                <div ref={glareRef} className="card-glare" />

                <div className="card-header">
                    <div className="header-left">
                        <motion.div
                            className="desktop-icon"
                            animate={{ rotateY: [0, 180, 360] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                        >
                            <Icon size={18} className="card-icon" />
                        </motion.div>
                        <span className="mono category">{project.category}</span>
                    </div>
                    <span className="mono id">ID:00{project.id}</span>
                </div>

                <h3 className="mono">{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                    {project.tech.map((t, i) => (
                        <span key={`${project.id}-${i}`} className="tech-tag mono">{t}</span>
                    ))}
                </div>

                <a href={project.link} className="cyber-btn sm mono">ACCESS_DATA {'>'}</a>
                <div className="card-glitch" />
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const activeIndex = ((page % projects.length) + projects.length) % projects.length;
    const project = projects[activeIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    const jumpTo = (idx) => {
        const newDirection = idx > activeIndex ? 1 : -1;
        setPage([idx, newDirection]);
    };

    return (
        <PageTransition className="page-container projects-page">
            <header className="page-header" data-section="REPOS">
                <div className="header-title-flex">
                    <motion.div
                        className="desktop-icon title-icon"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Archive size={32} className="card-icon" />
                    </motion.div>
                    <h1 className="mono border-title">REPOSITORIES_</h1>
                </div>
                <p className="mono opacity-50">ARCHIVE DATA RETRIEVED: 2026-02-06</p>
            </header>

            <div className="carousel-container" data-section="PROJECTS">
                <button
                    className="carousel-control prev"
                    onClick={() => paginate(-1)}
                    aria-label="Previous Project"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="carousel-card-wrap">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <ProjectCard
                            key={page}
                            project={project}
                            index={activeIndex}
                            custom={direction}
                        />
                    </AnimatePresence>
                </div>

                <button
                    className="carousel-control next"
                    onClick={() => paginate(1)}
                    aria-label="Next Project"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="carousel-indicators">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot${activeIndex === i ? ' active' : ''}`}
                        onClick={() => jumpTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </PageTransition>
    );
};

export default Projects;
