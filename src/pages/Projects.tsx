import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DataVisualization } from '../components/DataVisualization';

export const Projects: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="projects-container">
        <h2>Projects</h2>
        <ProjectCard title="Project 1" description="Description of project 1" link="#" />
        <ProjectCard title="Project 2" description="Description of project 2" link="#" />
        {/* Add more ProjectCards as needed */}
        <h2>Data Visualization</h2>
        <DataVisualization />
      </div>
      <Footer />
    </>
  );
};