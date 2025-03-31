import { createContext, useCallback, useContext, useState } from "react";
import { ToggleModalValue } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToggleModal = createContext<ToggleModalValue<any>>({
  isOpen: false,
  open: () => {},
  entity: null,
  updateEntity: () => {},
});

export const useToggleModal = <T extends object,>(): ToggleModalValue<T> => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [entity, setEntity] = useState<any | null>(null);

  const open = useCallback((value: boolean) => setOpen(value), [setOpen]);
  const updateEntity = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any | null) => setEntity(value),
    [setEntity]
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
