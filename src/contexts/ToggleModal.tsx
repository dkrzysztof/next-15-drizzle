/* eslint @typescript-eslint/no-explicit-any: "warn" */
import { createContext, useCallback, useContext, useState } from "react";
import { ToggleModalValue } from "./types";

const ToggleModal = createContext<ToggleModalValue<any>>({
  isOpen: false,
  open: () => {},
  entity: null,
  updateEntity: () => {},
});

export const useToggleModal = <T extends object>(): ToggleModalValue<T> => {
  const context = useContext(ToggleModal);
  if (!context) {
    throw new Error("ToggleModal was not found");
  }

  return context;
};

export const ToggleModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [entity, setEntity] = useState<any | null>(null);

  const open = useCallback((value: boolean) => setOpen(value), [setOpen]);
  const updateEntity = useCallback(
    (value: any | null) => setEntity(value),
    [setEntity],
  );

  return (
    <ToggleModal.Provider
      value={{
        isOpen,
        open,
        entity,
        updateEntity,
      }}
    >
      {children}
    </ToggleModal.Provider>
  );
};
