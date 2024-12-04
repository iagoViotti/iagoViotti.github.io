import { useState } from 'react';
import { Project } from '../types/Index';
import { mockProjects } from '../assets/mocks';
import './Portfolio.css';

const ProjectList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="container">
      <div className="visualization">
        {selectedProject ? (
          <ProjectVisualization project={selectedProject} />
        ) : (
          <div className="placeholder">Passe o mouse sobre um projeto para ver os detalhes</div>
        )}
      </div>
      <div className="list">
        {mockProjects.map((project, index) => (
          <div
            key={project.name}
            className={`list-item ${hoveredIndex === index ? 'hovered' : 'not-hovered'}`}
            onMouseEnter={() => {
              setSelectedProject(project);
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <small className="project-meta">{project.year} | {project.type}</small>
            <h2 className="project-name">{project.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectVisualization: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="project-details">
      <div className="info-div">
        <div className="header">
          <h2>{project.name}</h2>
          <p className="project-type">{project.type}</p>
        </div>
        <p>{project.description}</p>
        <div className="footer">
          <p>Year: {project.year}</p>
          <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="project-link">
            View Project
          </a>
        </div>
      </div>
      <img src={project.image} alt={project.name} className="project-image" />
    </div>
  );
};

export default ProjectList;
