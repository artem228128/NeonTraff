import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const glitchBefore = keyframes`
  0% {
    clip-path: inset(40% 0 61% 0);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
  }
`;

const glitchAfter = keyframes`
  0% {
    clip-path: inset(25% 0 24% 0);
  }
  20% {
    clip-path: inset(6% 0 99% 0);
  }
  40% {
    clip-path: inset(71% 0 6% 0);
  }
  60% {
    clip-path: inset(95% 0 2% 0);
  }
  80% {
    clip-path: inset(40% 0 37% 0);
  }
  100% {
    clip-path: inset(82% 0 5% 0);
  }
`;

const GlitchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const GlitchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.03) 50%,
    transparent 100%
  );
  animation: ${glitch} 0.3s ease-in-out infinite alternate-reverse;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  &::before {
    animation: ${glitchBefore} 0.4s ease-in-out infinite alternate-reverse;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 212, 255, 0.05) 50%,
      transparent 100%
    );
  }
  
  &::after {
    animation: ${glitchAfter} 0.3s ease-in-out infinite alternate-reverse;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(240, 240, 34, 0.03) 50%,
      transparent 100%
    );
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: ${props => props.position}%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #00d4ff 50%,
    transparent 100%
  );
  opacity: 0.6;
  animation: scanMove 3s ease-in-out infinite;
  
  @keyframes scanMove {
    0% { transform: translateY(-100vh); opacity: 0; }
    50% { opacity: 0.6; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: noiseMove 20s linear infinite;
  opacity: 0.1;
  
  @keyframes noiseMove {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-50px, -50px); }
    50% { transform: translate(-100px, 0); }
    75% { transform: translate(-50px, 50px); }
    100% { transform: translate(0, 0); }
  }
`;

const GlitchEffect = () => {
  const [active, setActive] = useState(false);
  const [scanLines, setScanLines] = useState([]);

  useEffect(() => {
    // Randomly activate glitch effect
    const glitchInterval = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    // Generate random scan lines
    const lines = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      position: Math.random() * 100,
      delay: Math.random() * 3000
    }));
    setScanLines(lines);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <GlitchContainer active={active}>
      <GlitchOverlay />
      <NoiseOverlay />
      {scanLines.map((line) => (
        <ScanLine
          key={line.id}
          position={line.position}
          style={{ animationDelay: `${line.delay}ms` }}
        />
      ))}
    </GlitchContainer>
  );
};

export default GlitchEffect; 