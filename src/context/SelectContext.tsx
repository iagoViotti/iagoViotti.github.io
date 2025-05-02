import { createContext, useContext, useState } from "react";

interface SelectContextType {
  selected: React.ReactNode | null
  setSelected: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  lastTimeClicked: number;
  setLastTimeClicked: (lastTimeClicked: number) => void;
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

  return (
    <SelectContext.Provider
      value={{ selected, setSelected, lastTimeClicked, setLastTimeClicked }}
    >
      {children}
    </SelectContext.Provider>
  );
};
