// src/pages/Home.tsx
import React from 'react';
import { TopologyAnimation } from '../components/TopologyAnimation';
import { ParticleSystem } from '../components/ParticleSystem';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <ParticleSystem />
        <h1>Kamil Woskowiak</h1>
        <p>Software Engineer | Backend Logic | Topology & Mathematical Analysis in Finance</p>
        <TopologyAnimation />
      </div>
      <Footer />
    </>
  );
};
