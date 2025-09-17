// components/animation/sliderAnimation.tsx
"use client";

import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

type ImageGridProps = {
  images: string[];        // e.g. ['/home/a.png', '/home/b.png', ...]
  durationMs?: number;     // optional: how fast to move
  skewDeg?: number;        // optional: tilt
  itemSize?: number;       // optional: square size in px
};

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  durationMs = 5000,
  skewDeg = -10,
  itemSize = 200,
}) => {
  // one spring reused for all tiles
  const springProps = useSpring({
    loop: true,
    from: { transform: `translateX(0%) skewX(${skewDeg}deg)` },
    to:   { transform: `translateX(100%) skewX(${skewDeg}deg)` },
    config: { duration: durationMs },
  });

  return (
    <Container>
      <Row>
        {images.slice(0, 4).map((src, index) => (
          <ImageWrapper key={index} style={springProps} $size={itemSize}>
            <img src={src} alt={`Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </Row>
      <Row>
        {images.slice(4, 8).map((src, index) => (
          <ImageWrapper key={index + 4} style={springProps} $size={itemSize}>
            <img src={src} alt={`Image ${index + 5}`} />
          </ImageWrapper>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;

/* ---------- styled ---------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* prevent overflow */
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const ImageWrapper = styled(animated.div)<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    display: block;
  }
`;
