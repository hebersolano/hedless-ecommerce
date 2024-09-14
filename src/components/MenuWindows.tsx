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

  function onClick() {
    setOpenMenuName((prev) => (prev === opens ? "" : opens));
  }

  return cloneElement(children, {
    onClick,
    id: opens + "-trigger",
  });
}

function Content({ children, name }: { children: ReactElement; name: string }) {
  const { openMenuName, onCloseMenu } = useContext(MenuContext) as MenuContextT;
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClickOutside(event: Event) {
        if (name !== openMenuName) return;
        const target = event.target as Node;
        const trigger = document.getElementById(name + "-trigger");
        if (refContent.current?.contains(target) || trigger?.contains(target))
          return;

        onCloseMenu?.();
      }
      document.addEventListener("click", handleClickOutside, true);

      return () => {
        console.log("removing outside event");
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [name, openMenuName],
  );

  if (name !== openMenuName) return <div ref={refContent} id={name}></div>;

  return (
    <div ref={refContent} id={name}>
      {children}
    </div>
  );
}

MenuBox.Trigger = Trigger;
MenuBox.Content = Content;

export default MenuBox;
