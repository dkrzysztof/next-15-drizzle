import { Dropdown, MenuProps } from "antd";
import {
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

export type ContextMenuValue<T = any> = {
  openContextMenu: (
    event: Pick<MouseEvent, "preventDefault" | "clientX" | "clientY">,
    data: T | null
  ) => void;
  data: T | null;
};

const ContextMenuContext = createContext<ContextMenuValue<any>>({
  openContextMenu: () => {},
  data: null,
});

export const useContextMenu = () => {
  return useContext(ContextMenuContext);
};

type Props = {
  items: MenuProps["items"];
};

export const ContextMenuProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ items, children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const openContextMenu = useCallback(
    (
      event: Pick<MouseEvent, "preventDefault" | "clientX" | "clientY">,
      data: any
    ) => {
      event.preventDefault();
      if (!open) {
        document.addEventListener(`click`, function onClickOutside() {
          setData(null);
          setOpen(false);
          document.removeEventListener(`click`, onClickOutside);
        });
      }
      setData(data);
      setOpen(true);
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [open, setOpen, setMousePosition]
  );

  return (
    <ContextMenuContext.Provider
      value={{
        data,
        openContextMenu,
      }}
    >
      <Dropdown
        menu={{ items: items }}
        open={open}
        overlayStyle={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      >
        <div className="absolute" />
      </Dropdown>
      {children}
    </ContextMenuContext.Provider>
  );
};