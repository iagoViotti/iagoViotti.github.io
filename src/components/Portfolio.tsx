import { useState } from 'react';
import { Project } from '../types/Index';
import { mockProjects } from '../assets/mocks';
import styles from './Portfoilio.module.css';

const ProjectList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {mockProjects.map((project, index) => (
          <div
            key={project.name}
            className={`${styles.listItem} ${hoveredIndex === index ? styles.hovered : styles.notHovered}`}
            onMouseEnter={() => {
              setSelectedProject(project);
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <small className={styles.projectMeta}>{project.year} | {project.type}</small>
            <h2 className={styles.projectName}>{project.name}</h2>
          </div>
        ))}
      </div>

      <div className={styles.visualization}>
        {selectedProject ? (
          <ProjectVisualization project={selectedProject} />
        ) : (
          <div className={styles.placeholder}>Hover over a project to view details</div>
        )}
      </div>
    </div>
  );
};

const ProjectVisualization: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className={styles.projectDetails}>
      <div className={styles.infoDiv}>
        <div className={styles.header}>
          <h2>{project.name}</h2>
          <p className={styles.projectType}>{project.type}</p>
        </div>
        <p>{project.description}</p>
        <p>Year: {project.year}</p>
        <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
          View Project
        </a>
      </div>
      <img src={project.image} alt={project.name} className={styles.projectImage} />
    </div>
  );
};

export default ProjectList;

