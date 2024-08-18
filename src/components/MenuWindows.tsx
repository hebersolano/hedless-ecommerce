// https://blog.logrocket.com/detect-click-outside-react-component-how-to/

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
} from "react";

type MenuContextT = {
  openMenuName: string;
  setOpenMenuName: Dispatch<SetStateAction<string>>;
  onCloseMenu: () => void;
};

const MenuContext = createContext<MenuContextT | null>(null);

function MenuBox({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [openMenuName, setOpenMenuName] = useState("");

  const onCloseMenu = () => setOpenMenuName("");

  return (
    <MenuContext.Provider
      value={{ openMenuName, setOpenMenuName, onCloseMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Trigger({
  children,
  opens,
}: {
  children: ReactElement;
  opens: string;
}) {
  const { openMenuName, setOpenMenuName } = useContext(
    MenuContext,
  ) as MenuContextT;

  return cloneElement(children, {
    onClick: () => setOpenMenuName(opens),
    id: opens,
  });
}

function Content({ children, name }: { children: ReactElement; name: string }) {
  const { openMenuName, onCloseMenu } = useContext(MenuContext) as MenuContextT;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      const trigger = document.getElementById(openMenuName);
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onCloseMenu && onCloseMenu();
        }
      }
      document.addEventListener("click", handleClickOutside, true);
      if (trigger) {
        console.log("trigger button");
        trigger.onclick = () => console.log("new event");
        console.dir(trigger);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [onCloseMenu, openMenuName],
  );
  if (name !== openMenuName) return null;

  return (
    <div ref={ref}>{cloneElement(children, { onClose: onCloseMenu })}</div>
  );
}

MenuBox.Trigger = Trigger;
MenuBox.Content = Content;

export default MenuBox;
