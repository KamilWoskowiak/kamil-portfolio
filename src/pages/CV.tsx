// src/pages/CV.tsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const CV: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="cv-container">
        <h2>Curriculum Vitae</h2>
        <a href="/assets/KamilWoskowiak_CV.pdf" download>Download my CV</a>
      </div>
      <Footer />
    </>
  );
};
