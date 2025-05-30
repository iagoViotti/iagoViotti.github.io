interface IProject {
  name: string;
  type: string;
  description: string;
  year: number;
  image: string;
  externalLink: string;
}

interface IFolder {
  name: string;
  Files: IProject[];
}

type Window = IFolder | IProject

export type { IProject, Window, IFolder };
