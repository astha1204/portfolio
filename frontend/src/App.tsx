import React from 'react';
import Nav from './Nav';
import Hero from './Hero';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Chat from './Chat';
import Footer from './Footer';
import './App.css';

function App() {
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
