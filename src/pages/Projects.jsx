import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Layers, Globe, Database, Terminal, Box, Archive } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: "PROJECT_BETA: COMING_SOON",
    category: "REDACTED",
    description: "Archive record [RESTRICTED]. New neural-interface project under active development. Connection expected soon.",
    tech: ["???", "???", "???"],
    link: "#"
  },
  {
    id: 2,
    title: "PROJECT_ALPHA: COMING_SOON",
    category: "REDACTED",
    description: "Archive record [RESTRICTED]. Core module documentation cleared. Connection expected soon.",
    tech: ["???", "???", "???"],
    link: "#"
  },
  {
    id: 3,
    title: "PROJECT_GAMMA: COMING_SOON",
    category: "REDACTED",
    description: "Archive record [RESTRICTED]. Neural-link data-sets initializing. Connection expected soon.",
    tech: ["???", "???", "???"],
    link: "#"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="card-header">
        <div className="header-left">
          <motion.div
            className="desktop-icon"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          >
            {project.id === 1 ? <Globe size={18} className="card-icon" /> :
              project.id === 2 ? <Database size={18} className="card-icon" /> :
                <Layers size={18} className="card-icon" />}
          </motion.div>
          <span className="mono category">{project.category}</span>
        </div>
        <span className="mono id">ID:00{project.id}</span>
      </div>
      <h3 className="mono">{project.title}</h3>
      <p>{project.description}</p>
      <div className="tech-stack">
        {project.tech.map((t, i) => <span key={`${project.id}-${i}`} className="tech-tag mono">{t}</span>)}
      </div>
      <a href={project.link} className="cyber-btn sm mono">ACCESS_DATA ={'>'}</a>

      <div className="card-glitch"></div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <PageTransition className="page-container projects-page">
      <header className="page-header">
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

      <div className="projects-grid">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </PageTransition>
  );
};

export default Projects;
