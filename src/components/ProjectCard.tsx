// src/components/ProjectCard.tsx
import React from 'react';

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
  );
};
