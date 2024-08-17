import { cloneElement, createContext, useContext, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { HiXMark } from "react-icons/hi2";
import Overlay from "./Overlay";
// import styled from "styled-components";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;

type ModalContextT = {
  openModalName: string;
  setOpenModalName: Dispatch<SetStateAction<string>>;
  onCloseModal: () => void;
};

const ModalContext = createContext<ModalContextT | null>(null);

function Modal({ children }: { children: JSX.Element[] }) {
  const [openModalName, setOpenModalName] = useState("");

  const onCloseModal = () => setOpenModalName("");

  return (
    <ModalContext.Provider
      value={{ openModalName, setOpenModalName, onCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactElement; opens: string }) {
  const { setOpenModalName } = useContext(ModalContext) as ModalContextT;
  return cloneElement(children, { onClick: () => setOpenModalName(opens) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const { openModalName, onCloseModal } = useContext(
    ModalContext,
  ) as ModalContextT;

  if (name !== openModalName) return null;

  return createPortal(
    <Overlay id="overlay-modal" onClick={onCloseModal}>
      <div className="">
        <button onClick={onCloseModal}>
          <HiXMark />
        </button>

        <div>{cloneElement(children, { onClose: onCloseModal })}</div>
      </div>
    </Overlay>,
    document.body, // createPortal lets you render some children into a different part of the DOM
    // document.querySelector('')
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
