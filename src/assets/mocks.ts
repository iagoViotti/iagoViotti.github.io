import { IProject, IFolder } from '../types/Index';

const projects: IProject[] = [
  {
    name: "Rubber Duck Debugger",
    type: "Web Application",
    description: "Debug your code by explaining it to a rubber duck",
    year: 2024,
    image: "./rubberduck.png",
    externalLink: "https://rubberduckdebugging.vercel.app/"
  },
  {
    name: "HandCamera Py App",
    type: "Digital Art Installation",
    description: "A Python application for hand gesture recognition and snapping photos",
    year: 2025,
    image: "./handsnap.png",
    externalLink: "https://github.com/iagoViotti/handCameraPy"
  },
  {
    name: "NoWaste App",
    type: "Mobile App",
    description: "Track and reduce food waste in your kitchen",
    year: 2023,
    image: "./nowasteapp.png",
    externalLink: "https://github.com/iagoViotti/noWasteApp"
  },
  {
    name: "Grupo Vitor",
    type: "Landing Page",
    description: "A Landing page for a paid advertising agency",
    year: 2025,
    image: "./grupovitor.png",
    externalLink: "https://grupovitor.com.br/"
  },
  {
    name: "Javascript Creative Coder",
    type: "Digital Art Installation",
    description: "A web application to showcase a collection of study purpose canvas artworks",
    year: 2024,
    image: "./creativecoder.png",
    externalLink: "https://github.com/iagoViotti/creative-coder-domestika-course"
  },
  {
    name: "Vekotec",
    type: "Web Application",
    description: "A web application for an environmental solutions company",
    year: 2022,
    image: "./vekotec.png",
    externalLink: "https://vekotec.com.br/"
  },
  {
    name: "My Portfolio",
    type: "Web Application",
    description: "My personal portfolio to showcase my work",
    year: 2025,
    image: "./portfolio.png",
    externalLink: ""
  }
];

export const portfolio: IFolder = {
  name: "portfolio",
  Files: projects,
}