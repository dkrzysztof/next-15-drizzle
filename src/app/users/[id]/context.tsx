import { createContext, useCallback, useContext, useState } from "react";

type EditModalContextValue<T extends object> = {
  isOpen: boolean;
  open: (value: boolean) => void;
  entity: T | null;
  updateEntity: (value: any | null) => void;
};

const EditModalContext = createContext<EditModalContextValue<any>>({
  isOpen: false,
  open: () => {},
  entity: null,
  updateEntity: () => {},
});

export const useEditModalContext = <
  T extends object
>(): EditModalContextValue<T> => {
  const context = useContext(EditModalContext);
  if (!context) {
    throw new Error("EditModalContext was not found");
  }

  return context;
};

export const EditModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [entity, setEntity] = useState<any | null>(null);

  const open = useCallback((value: boolean) => setOpen(value), [setOpen]);
  const updateEntity = useCallback(
    (value: any | null) => setEntity(value),
    [setEntity]
  );

  return (
    <EditModalContext.Provider
      value={{
        isOpen,
        open,
        entity,
        updateEntity,
      }}
    >
      {children}
    </EditModalContext.Provider>
  );
};
