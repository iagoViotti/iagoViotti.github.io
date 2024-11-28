interface SphereType {
  position: [number, number, number];
  args: [number, number, number];
  color: string;
}

interface Project {
  name: string;
  type: string;
  description: string;
  year: number;
  image: string;
  externalLink: string;
}


export type { SphereType, Project };
