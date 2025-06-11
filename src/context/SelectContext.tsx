import { createContext, useContext, useState } from "react";
import { Window, IFolder, IProject } from "../types/Index";
// import Folder from "../components/Folder";

interface SelectContextType {
  selected: React.ReactNode | null
  setSelected: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  lastTimeClicked: number;
  setLastTimeClicked: (lastTimeClicked: number) => void;
  handleClick: (window: Window) => void;
  doubleClicked: { folder: IFolder | null; file: IProject | null }
  setDoubleClicked: React.Dispatch<React.SetStateAction<{ folder: IFolder | null; file: IProject | null }>>
  handleDoubleClick: (window: Window) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  handlePrevFile: () => void;
  handleNextFile: () => void;
  prevFileIndex: number | null;
  nextFileIndex: number | null;
}

const SelectContext = createContext<SelectContextType>(
  {} as SelectContextType
);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a SelectProvider");
  }
  return context;
};

export const SelectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<React.ReactNode | null>(null);
  const [lastTimeClicked, setLastTimeClicked] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState<{ folder: IFolder | null; file: IProject | null }>({ folder: null, file: null })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filesInFolder = doubleClicked.folder?.Files || [];

  const currentIndex = filesInFolder.findIndex((file) => file.name === doubleClicked?.file?.name);

  const prevFileIndex = (currentIndex - 1) >= 0 ? (currentIndex - 1) : null;
  const nextFileIndex = (currentIndex + 1) < filesInFolder.length ? (currentIndex + 1) : null;

  const handlePrevFile = () => {
    if (prevFileIndex !== null) {
      const prevFile = filesInFolder[prevFileIndex];
      setDoubleClicked({ folder: doubleClicked.folder, file: prevFile });
    }
  };

  const handleNextFile = () => {
    if (nextFileIndex !== null) {
      const nextFile = filesInFolder[nextFileIndex];
      setDoubleClicked({ folder: doubleClicked.folder, file: nextFile });
    }
  };

  // const handlePrevFile = () => {
  //   if (currentIndex > 0) {
  //     const prevFile = filesInFolder[currentIndex - 1];
  //     setDoubleClicked({ folder: doubleClicked.folder, file: prevFile });
  //   }
  // };

  // const handleNextFile = () => {
  //   if (currentIndex < filesInFolder.length - 1) {
  //     const nextFile = filesInFolder[currentIndex + 1];
  //     setDoubleClicked({ folder: doubleClicked.folder, file: nextFile });
  //   }
  // };

  const handleClick = (window: Window) => {
    setSelected(window.name);
  }

  const handleDoubleClick = (window: Window) => {
    if (window.name && 'Files' in window) {
      setDoubleClicked(prevstate => ({ ...prevstate, folder: window as IFolder }))
    } else {
      setDoubleClicked(prevstate => ({ ...prevstate, file: window as IProject }))
    }
  }

  return (
    <SelectContext.Provider
      value={{ selected, setSelected, lastTimeClicked, setLastTimeClicked, handleClick, doubleClicked, setDoubleClicked, handleDoubleClick, mousePosition, setMousePosition, handlePrevFile, handleNextFile, prevFileIndex, nextFileIndex }}
    >
      {children}
    </SelectContext.Provider>
  );
};
