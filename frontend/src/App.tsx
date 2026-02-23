import React from 'react';
import Nav from './Nav';
import Hero from './Hero';
import {useEffect} from 'react';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Chat from './Chat';
import Footer from './Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Force scroll to top on every refresh/mount
    window.scrollTo(0, 0);
    // Also disable browser scroll restoration to be 100% sure
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Chat />
      </main>
      <Footer />
    </div>
  );
}

export default App;
