interface IProject {
  name: string;
  type: string;
  description: string;
  year: number;
  image: string;
  externalLink: string;
  mainStack: MainStack;
}

interface IFolder {
  name: string;
  Files: IProject[];
}

type MainStack = 'React' | 'Python' | 'Wordpress' | 'Javascript';

type Window = IFolder | IProject

export type { IProject, Window, IFolder, MainStack };
