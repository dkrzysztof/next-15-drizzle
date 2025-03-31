export type ToggleModalValue<T extends object> = {
  isOpen: boolean;
  open: (value: boolean) => void;
  entity: T | null;
  updateEntity: (value: any | null) => void;
};
