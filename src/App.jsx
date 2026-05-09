import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'expertise', 'skills', 'projects', 'contact'];
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

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.nav-arcade')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

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
      title: "PneumoScan AI",
      tech: "PyTorch · ResNet-18 · Grad-CAM · Flask · LLaMA 3.3 · Groq API",
      description: "Application médicale de détection de pneumonie par radiographie thoracique. Un modèle ResNet-18 analyse la radio et génère une carte thermique Grad-CAM pour localiser les zones atteintes. Le dossier patient (PDF/JSON/TXT) est extrait via pdfplumber et transmis au LLM LLaMA 3.3 70B (Groq) pour produire un plan de traitement personnalisé tenant compte des allergies et antécédents.",
      color: "#A78BFA",
      year: "2025",
      badge: "AI · Medical"
    },
    {
      title: "Assistant Virtuel Hôtelier",
      tech: "Vue.js · Flask · MongoDB · REST API",
      description: "Application web Full Stack avec logique métier complexe (statuts, conditions, scénarios conversationnels), gestion des utilisateurs et réservations via API REST sécurisée.",
      color: "#FF6B9D",
      year: "2025",
      badge: null
    },
    {
      title: "Automatisation & APIs",
      tech: "Webhooks · REST APIs · Logique conditionnelle",
      description: "Workflows backend basés sur des webhooks et API REST : traitement, validation et normalisation de données, automatisation de processus métier, intégration avec bases de données et services externes.",
      color: "#4ECDC4",
      year: "2024–2025",
      badge: null
    },
    {
      title: "Système de Gestion d'Inventaire",
      tech: "PHP · MySQL · Docker",
      description: "Développement et maintenance d'un système de gestion d'inventaire pour Tunisie Booking. Implémentation backend en PHP et MySQL, documentation technique et compréhension des besoins métier.",
      color: "#FFE66D",
      year: "2024",
      badge: null
    }
  ];

  const skills = [
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "React.js", level: 90, color: "#61DAFB" },
    { name: "Vue.js", level: 85, color: "#42B883" },
    { name: "Node.js / Express.js", level: 80, color: "#68A063" },
    { name: "Python / Flask / FastAPI", level: 85, color: "#3776AB" },
    { name: "REST APIs & Webhooks", level: 90, color: "#FF6B9D" },
    { name: "MongoDB", level: 80, color: "#47A248" },
    { name: "PostgreSQL / MySQL", level: 85, color: "#336791" },
    { name: "Docker & Git", level: 75, color: "#2496ED" },
    { name: "PHP", level: 75, color: "#777BB4" }
  ];

  const expertiseAreas = [
    {
      name: "Frontend",
      description: "Interfaces modernes avec React.js et Vue.js, HTML/CSS soigné",
      icon: "🖥️"
    },
    {
      name: "Backend & APIs",
      description: "API REST robustes avec Node.js, Express, Flask et FastAPI",
      icon: "⚙️"
    },
    {
      name: "Bases de données",
      description: "SQL (PostgreSQL, MySQL) et NoSQL (MongoDB) selon les besoins",
      icon: "🗄️"
    },
    {
      name: "Automatisation",
      description: "Webhooks, logique conditionnelle, workflows backend automatisés",
      icon: "🔄"
    }
  ];

  const navItems = ['Home', 'About', 'Expertise', 'Skills', 'Projects', 'Contact'];

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

          {/* Bouton hamburger — visible uniquement sur mobile via CSS */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Liens de navigation */}
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
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
              Développeuse Full Stack & Automation · APIs REST
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
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Voir mes projets
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
  role: "Full Stack Developer",
  stack: ["React", "Vue", "Flask"],
  apis: ["REST", "Webhooks"],
  databases: ["MongoDB", "PostgreSQL"],
  languages: ["AR","FR","EN","DE"],
  status: "Open to opportunities 🚀"
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
                  Développeuse Full Stack spécialisée en JavaScript et React.js, avec une solide expérience
                  en développement d'interfaces web modernes et en conception d'API REST.
                </p>
                <p>
                  À l'aise avec les architectures frontend/backend, les bases de données SQL et NoSQL,
                  et l'intégration de services backend en Python. Intéressée par les applications
                  à fort impact dans les domaines de la finance, sécurité et conformité.
                </p>
                <p>
                  Actuellement en Master de recherche en Sciences Informatiques à l'ISI El Manar (Ariana),
                  après une Licence en Sciences Informatiques à l'Université de Sousse (2022–2025).
                </p>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">4+</div>
                    <div className="stat-label">Projets réalisés</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">4</div>
                    <div className="stat-label">Langues parlées</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Curiosité technique</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Expertise */}
      <section id="expertise" className="automation-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="title-bracket">{'<'}</span>
            Expertise
            <span className="title-bracket">{'/>'}</span>
          </motion.h2>

          <div className="automation-grid">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.name}
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
                <div className="automation-icon">{area.icon}</div>
                <h3 className="automation-title">{area.name}</h3>
                <p className="automation-description">{area.description}</p>
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
            <h3 className="highlight-title">🎯 Ce que je construis</h3>
            <div className="highlight-content">
              {[
                "Interfaces web modernes et responsive avec React.js et Vue.js",
                "API REST robustes avec Node.js, Express, Flask ou FastAPI",
                "Authentification sécurisée (JWT) et bonnes pratiques API",
                "Workflows automatisés via webhooks et logique conditionnelle"
              ].map((item, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>{item}</span>
                </div>
              ))}
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    {project.badge && (
                      <span className="project-badge" style={{ borderColor: project.color, color: project.color }}>
                        {project.badge}
                      </span>
                    )}
                    <span className="project-year">{project.year}</span>
                  </div>
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
              Une opportunité, un projet, une collaboration ?
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

      {/* Modal Formulaire de Contact */}
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
          <p className="pixel-text">Made with ❤️ by Fadwa Ben Moussa</p>
          <p>© 2025 Fadwa Ben Moussa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;