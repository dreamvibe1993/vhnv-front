import React from "react";
import styled from "styled-components/macro";
import { FadeIn } from "../../../configs/css/animations";
import { Button } from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export const Gallery = ({ src, onClose = () => {} }) => {
  const picRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(40);
  const [scale, setScale] = React.useState(1);
  const [isControlsHidden, setControllsHidden] = React.useState(false);

  const [isMouseKeyPressed, setMouseKeyPressed] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const TouchStartCoordsX = React.useRef(null);
  const TouchStartCoordsY = React.useRef(null);

  React.useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  });

  const endLoading = () => {
    setLoading(false);
  };

  const handleStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    TouchStartCoordsX.current = e.clientX - x || e?.touches[0]?.clientX - x;
    TouchStartCoordsY.current = e.clientY - y || e?.touches[0]?.clientY - y;
    setMouseKeyPressed(true);
  };

  const handleMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!picRef.current) return;
    if (!isMouseKeyPressed) return;
    const clientX = e.clientX || e?.touches[0]?.clientX;
    const clientY = e.clientY || e?.touches[0]?.clientY;
    const touchPositionCoordX = clientX - TouchStartCoordsX.current; // Getting coords of the place where elem was touched.
    const touchPositionCoordY = clientY - TouchStartCoordsY.current; // Getting coords of the place where elem was touched.
    setX(touchPositionCoordX);
    setY(touchPositionCoordY);
  };

  const handleEnd = () => {
    setMouseKeyPressed(false);
  };

  const zoomIn = () => {
    setScale((prev) => prev + 0.1);
  };

  const zoomOut = () => {
    setScale((prev) => prev - 0.1);
  };

  const toggleControls = () => {
    setControllsHidden((prev) => !prev);
  };

  return (
    <PictureGallery fixedHeight={window.innerHeight} onClick={(e) => e.preventDefault()}>
      <TopPanel>{!isControlsHidden && <Button onClick={onClose}>CLOSE</Button>}</TopPanel>
      <PreloaderContainer style={{ visibility: isLoading ? "visible" : "hidden" }}>
        {/* <Preloader /> */}
      </PreloaderContainer>
      <PicContainer
        draggable="false"
        onTouchMove={(e) => handleMove(e)}
        onTouchStart={(e) => handleStart(e)}
        onMouseDown={(e) => handleStart(e)}
        onMouseMove={(e) => handleMove(e)}
        onMouseUp={(e) => handleEnd(e)}
        onMouseLeave={(e) => handleEnd(e)}
        ref={picRef}
        style={{
          transform: `translate(${x + "px"}, ${y + "px"}) scale(${scale})`, //x y
        }}
      >
        <Pic src={src} onLoad={endLoading} style={{ visibility: !isLoading ? "visible" : "hidden" }} />
      </PicContainer>
      {!isControlsHidden && (
        <ButtonsPanel>
          <Button w={20}>
            <FaPlusCircle onClick={zoomIn} />
          </Button>
          <Button w={20}>
            <FaMinusCircle onClick={zoomOut} />
          </Button>
        </ButtonsPanel>
      )}
      <BottomPanel>
        <Button onClick={toggleControls}>{isControlsHidden ? "SHOW" : "HIDE"} CONTROLS</Button>
      </BottomPanel>
    </PictureGallery>
  );
};

const PreloaderContainer = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const PicContainer = styled.div`
  transition: transform 0.05s linear;
  cursor: grab;
  height: 100%;
  &:active {
    cursor: grabbing;
  }
`;

const TopPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  align-items: center;
  z-index: 99999999999;
  padding: 20px 20px;
  svg {
    cursor: pointer;
    background-color: ${(p) => p.theme.lightest};
    box-shadow: 0px 0px 20px 20px ${(p) => p.theme.lightest};
  }
  & > * {
    &:not(:first-child) {
      margin-right: 1rem;
    }
  }
`;

const BottomPanel = styled(TopPanel)`
  top: unset;
  bottom: 0;
  left: 0;
`;

const ButtonsPanel = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  border-radius: 35px;
  background-color: ${(p) => p.theme.darkest};
  padding: 5px 5px;
`;

const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

const PictureGallery = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1001;
  backdrop-filter: blur(15px);
  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: rgba(0, 0, 0, 0.8);
  }
  animation: ${FadeIn} 0.2s linear forwards;
`;
