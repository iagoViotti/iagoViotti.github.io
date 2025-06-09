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
      value={{ selected, setSelected, lastTimeClicked, setLastTimeClicked, handleClick, doubleClicked, setDoubleClicked, handleDoubleClick, mousePosition, setMousePosition }}
    >
      {children}
    </SelectContext.Provider>
  );
};
