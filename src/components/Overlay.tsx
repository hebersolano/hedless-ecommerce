import { MouseEvent, ReactNode } from "react";
// import styled, { css } from "styled-components";

// const background = {
//   none: css``,
//   blur: css`
//     background-color: var(--backdrop-color);
//     backdrop-filter: blur(4px);
//     transition: all 0.5s;
//   `,
// };

// const StyledOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   z-index: 1;
//   ${(props) => background[props.background]}
// `;

type OverlayT = {
  id: string;
  children: ReactNode;
  background?: string;
  onClick: Function;
};

function Overlay({
  id = "overlay",
  children,
  background = "blur",
  onClick,
}: OverlayT) {
  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.id === id) onClick();
  }

  return (
    <div
      className="fixed inset-x-0 inset-y-0 h-screen w-full bg-background/30"
      id={id}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}

export default Overlay;
