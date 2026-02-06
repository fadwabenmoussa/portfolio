import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -50]);

  // Gestion du curseur personnalisé
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Détection de la section active au scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'automation', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soumission du formulaire vers n8n
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/portfolio-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowContactForm(false);
          setFormStatus('');
        }, 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const projects = [
    {
      title: "Assistant Virtuel Hôtelier",
      tech: "Vue.js · Flask · MongoDB · APIs",
      description: "Chatbot intelligent avec workflows conversationnels et logique conditionnelle (if/else) pour recommandations personnalisées et réservations automatisées",
      color: "#FF6B9D",
      year: "2025"
    },
    {
      title: "Automation Facebook & Messageries",
      tech: "n8n · Webhooks · Google Sheets · APIs",
      description: "Workflows automatisés pour gestion des messages et commentaires Facebook avec traitement conditionnel et synchronisation de données",
      color: "#4ECDC4",
      year: "2024-2025"
    },
    {
      title: "Système de Gestion d'Inventaire",
      tech: "PHP · MySQL · Docker",
      description: "Plateforme complète pour Tunisie Booking avec optimisation des processus internes et documentation technique",
      color: "#FFE66D",
      year: "2024"
    },
    {
      title: "Application de Gestion Multi-Modules",
      tech: "Vue.js · Python · PostgreSQL · Scraping",
      description: "Dashboard analytique, scraping de données web et gestion complète des utilisateurs avec authentification sécurisée",
      color: "#95E1D3",
      year: "2024"
    }
  ];

  const skills = [
    { name: "n8n & Automation", level: 95, color: "#FF6B9D" },
    { name: "Webhooks & Triggers", level: 90, color: "#4ECDC4" },
    { name: "Vue.js", level: 85, color: "#42B883" },
    { name: "Python & Flask", level: 85, color: "#3776AB" },
    { name: "JavaScript", level: 80, color: "#F7DF1E" },
    { name: "MongoDB", level: 80, color: "#47A248" },
    { name: "MySQL & PostgreSQL", level: 85, color: "#336791" },
    { name: "Docker & DevOps", level: 75, color: "#2496ED" },
    { name: "PHP", level: 75, color: "#777BB4" },
    { name: "Git & APIs", level: 90, color: "#F05032" }
  ];

  const automationTools = [
    {
      name: "n8n",
      description: "Workflows automatisés, intégrations multi-services",
      icon: "🔄"
    },
    {
      name: "Webhooks",
      description: "Événements en temps réel, déclencheurs automatiques",
      icon: "🔗"
    },
    {
      name: "Logique Conditionnelle",
      description: "If/else, switch cases, routing intelligent",
      icon: "⚡"
    },
    {
      name: "API Integration",
      description: "REST APIs, synchronisation de données",
      icon: "🔌"
    }
  ];

  return (
    <div className="app">
      {/* Curseur personnalisé */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Fond animé avec parallaxe */}
      <div className="bg-layer">
        <motion.div className="stars-layer layer-1" style={{ y: parallaxY1 }} />
        <motion.div className="stars-layer layer-2" style={{ y: parallaxY2 }} />
        <motion.div className="stars-layer layer-3" style={{ y: parallaxY3 }} />
        <div className="grid-overlay" />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="nav-arcade"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="nav-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="pixel-text">{"<FBM/>"}</span>
          </motion.div>
          
          <div className="nav-links">
            {['Home', 'About', 'Automation', 'Skills', 'Projects', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Section Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="glitch-text" data-text="FADWA BEN MOUSSA">FADWA BEN MOUSSA</h1>
            <motion.h2 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Automation Developer · n8n Specialist · Full Stack
            </motion.h2>
            
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="btn-arcade btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 157, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('automation').scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Voir mes automations
              </motion.button>
              
              <motion.button
                className="btn-arcade btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(78, 205, 196, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactForm(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Me contacter
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="arcade-frame">
              <div className="screen-glow" />
              <div className="code-display">
                <pre className="code-snippet">
{`const developer = {
  name: "Fadwa Ben Moussa",
  role: "Automation Dev",
  speciality: "n8n & Workflows",
  passion: "Eliminate manual tasks",
  languages: ["AR", "FR", "EN", "DE"],
  status: "Ready to automate 🚀"
};`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section About */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="title-bracket">{'<'}</span>
              À propos
              <span className="title-bracket">{'/>'}</span>
            </h2>
            
            <div className="about-content">
              <motion.div 
                className="about-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-glow">
                  Développeuse logicielle polyvalente, rigoureuse et orientée automation & workflows. 
                  Spécialisée dans la création de solutions intelligentes qui réduisent les tâches manuelles 
                  et les erreurs humaines.
                </p>
                <p>
                  Forte compréhension des processus automatisés, des webhooks et de la logique conditionnelle. 
                  Expérimentée en développement web full-stack et en intégration de solutions d'automation 
                  avec n8n, APIs et workflows intelligents.
                </p>
                <p>
                  Actuellement en Master de recherche en Sciences Informatiques à l'ISI El Manar, 
                  je transforme des processus complexes en systèmes automatisés efficaces.
                </p>
                
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Workflows créés</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">4</div>
                    <div className="stat-label">Langues parlées</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Tâches automatisées</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Automation (NOUVELLE) */}
      <section id="automation" className="automation-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="title-bracket">{'<'}</span>
            Expertise Automation
            <span className="title-bracket">{'/>'}</span>
          </motion.h2>
          
          <div className="automation-grid">
            {automationTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="automation-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(255, 107, 157, 0.3)"
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="automation-icon">{tool.icon}</div>
                <h3 className="automation-title">{tool.name}</h3>
                <p className="automation-description">{tool.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="automation-highlight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="highlight-title">🎯 Ce que j'automatise</h3>
            <div className="highlight-content">
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>Gestion des messages et notifications multi-canaux</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>Synchronisation de données entre applications (Sheets, DB, CRM)</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>Workflows conditionnels avec triggers et webhooks</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>Intégration d'APIs tierces et traitement automatique</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Skills */}
      <section id="skills" className="skills-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="title-bracket">{'<'}</span>
            Compétences Techniques
            <span className="title-bracket">{'/>'}</span>
          </motion.h2>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <motion.div 
                    className="skill-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="title-bracket">{'<'}</span>
            Projets & Réalisations
            <span className="title-bracket">{'/>'}</span>
          </motion.h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: `0 20px 40px ${project.color}40`
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="project-header" style={{ borderColor: project.color }}>
                  <div className="project-icon" style={{ backgroundColor: project.color }}>
                    {'</>'}
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tech">{project.tech}</p>
                  <p className="project-description">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="title-bracket">{'<'}</span>
            Contact
            <span className="title-bracket">{'/>'}</span>
          </motion.h2>
          
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="contact-text">
              Un projet d'automation ? Une opportunité de collaboration ? 
              N'hésitez pas à me contacter !
            </p>
            
            <motion.button
              className="btn-arcade btn-primary"
              onClick={() => setShowContactForm(true)}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Envoyer un message
            </motion.button>
            
            <div className="social-links">
              <motion.a 
                href="https://github.com/fadwabenmoussa" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/fadwa-ben-moussa" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </motion.a>
              <motion.a 
                href="mailto:fadwabenmoussa2003@gmail.com" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Email
              </motion.a>
            </div>

            <div className="contact-info">
              <p>📧 fadwabenmoussa2003@gmail.com</p>
              <p>📱 +216 24 281 846</p>
              <p>📍 Ariana, Tunisie</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Formulaire de Contact - CORRIGÉ */}
      <AnimatePresence>
        {showContactForm && (
          <>
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactForm(false)}
            />
            <motion.div
              className="contact-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
            >
              <button 
                className="modal-close"
                onClick={() => setShowContactForm(false)}
              >
                ✕
              </button>
              
              <h3 className="modal-title">Envoyez-moi un message</h3>
              
              {formStatus === 'success' ? (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">✓</div>
                  <p>Message envoyé avec succès !</p>
                  <p className="success-subtext">Je vous répondrai dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="form-input"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="form-input"
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows="5"
                      className="form-input"
                      placeholder="Votre message..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-arcade btn-primary btn-submit"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'Envoi en cours...' : 
                     formStatus === 'error' ? 'Erreur, réessayez' : 
                     'Envoyer le message'}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="pixel-text">Made with ❤️ and automation 🤖</p>
          <p>© 2025 Fadwa Ben Moussa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
