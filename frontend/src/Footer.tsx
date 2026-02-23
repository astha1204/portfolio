import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__logo">AA</span>
          <span className="footer__copy">
            © {new Date().getFullYear()} Aastha Arora · Built with React + FastAPI
          </span>
        </div>
        <div className="footer__right">
          <a href="https://github.com/astha1204/" target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
          <a href="https://www.linkedin.com/in/aastha-arora-909b5726b/" target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
          <a href="mailto:asthaarora1204@gmail.com" className="footer__link">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;