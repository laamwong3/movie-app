import React, { createContext, useContext, useState } from "react";

interface ModalContextProps {
  children: React.ReactNode;
}

interface StatesTypes {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContextStore = createContext({} as StatesTypes);

const ModalContext = ({ children }: ModalContextProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ModalContextStore.Provider value={{ open, setOpen }}>
      {children}
    </ModalContextStore.Provider>
  );
};

export default ModalContext;
export const useModalContext = () => useContext(ModalContextStore);
