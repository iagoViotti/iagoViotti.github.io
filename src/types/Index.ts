type FileType = 'project' | 'bio' | 'contact';

type MainStack = 'React' | 'Python' | 'Wordpress' | 'Javascript';

interface IExperience {
  name: string;
  period: Date[];
  attribution: string;
}

interface IBaseFile {
  name: string;
  type: FileType;
}

interface IProject extends IBaseFile {
  type: 'project';
  name: string;
  category: string;
  description: string;
  year: number;
  image: string;
  externalLink: string;
  mainStack: string;
}

interface IBio extends IBaseFile {
  type: 'bio';
  bio: string;
  status: string;
  techStack: string[];
  socialLinks?: string[];
  professionalExperience: IExperience[];
  educationalExperience: IExperience[];
  additionalContent?: string[];
}

interface IconProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

interface IFolder {
  name: string;
  Files: IFile[];
}

type IFile = IProject | IBio

type Window = IFolder | IFile

export type { IProject, IBio, IFile, Window, IFolder, MainStack, IconProps };
