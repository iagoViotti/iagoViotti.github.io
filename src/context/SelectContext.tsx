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
  handleDoubleClick: (window: Window) => void
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

  const handleClick = (window: Window) => {
    setSelected(window.name);
  }

  const handleDoubleClick = (window: Window) => {
    if (window.name && 'Files' in window) {
      setDoubleClicked({ folder: window as IFolder, file: null })
    }
    else {
      setDoubleClicked(prevstate => ({ ...prevstate, file: window as IProject }))
    }
  }

  return (
    <SelectContext.Provider
      value={{ selected, setSelected, lastTimeClicked, setLastTimeClicked, handleClick, doubleClicked, setDoubleClicked, handleDoubleClick }}
    >
      {children}
    </SelectContext.Provider>
  );
};
