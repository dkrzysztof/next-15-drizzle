export type ToggleModalValue<T> = {
  isOpen: boolean;
  open: (value: boolean) => void;
  entity: T | null;
  updateEntity: (value: T | null) => void;
};
