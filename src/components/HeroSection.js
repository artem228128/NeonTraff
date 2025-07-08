import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const pulseNeon = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px #8b5cf6,
      0 0 35px #8b5cf6,
      0 0 40px #8b5cf6;
  }
  50% {
    text-shadow: 
      0 0 2px currentColor,
      0 0 5px currentColor,
      0 0 8px currentColor,
      0 0 12px #8b5cf6,
      0 0 18px #8b5cf6,
      0 0 25px #8b5cf6;
  }
`;

const signalPulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const matrixRain = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(
    ellipse at center,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(0, 0, 0, 0.8) 70%,
    #0a0a0a 100%
  );
`;

const WorldMapSVG = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 1200px;
  opacity: 0.3;
  z-index: 1;
  
  path {
    stroke: #8b5cf6;
    stroke-width: 0.5;
    fill: none;
    filter: drop-shadow(0 0 5px #8b5cf6);
  }
`;

const SignalDot = styled(motion.circle)`
  fill: #00d4ff;
  filter: drop-shadow(0 0 10px #00d4ff);
  animation: ${signalPulse} 2s ease-in-out infinite;
`;

const SignalPath = styled(motion.path)`
  stroke: #00d4ff;
  stroke-width: 1;
  fill: none;
  stroke-dasharray: 5, 5;
  stroke-dashoffset: 0;
  filter: drop-shadow(0 0 5px #00d4ff);
  animation: dash 3s linear infinite;
  
  @keyframes dash {
    to {
      stroke-dashoffset: -20;
    }
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  padding: 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  color: #8b5cf6;
  margin-bottom: 1rem;
  animation: ${pulseNeon} 3s ease-in-out infinite;
  letter-spacing: 0.1em;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 4rem);
  }
`;

const Subtitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #00d4ff;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #00d4ff;
  letter-spacing: 0.05em;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: ${props => props.theme.colors.textDim};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CyberButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: ${props => props.primary ? 
    'linear-gradient(45deg, #8b5cf6, #a855f7)' : 
    'transparent'
  };
  color: ${props => props.primary ? '#ffffff' : '#8b5cf6'};
  border: 2px solid #8b5cf6;
  border-radius: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 200px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    color: #ffffff;
    box-shadow: 0 0 20px #8b5cf6;
    transform: translateY(-2px);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MatrixColumn = styled.div`
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    #00d4ff,
    transparent
  );
  animation: ${matrixRain} 4s linear infinite;
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  opacity: 0.6;
`;

const GlitchText = styled.span`
  display: inline-block;
  position: relative;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  &::before {
    animation: glitch-1 0.3s ease-in-out infinite alternate-reverse;
    color: #ff0000;
    z-index: -1;
  }
  
  &::after {
    animation: glitch-2 0.3s ease-in-out infinite alternate-reverse;
    color: #00ffff;
    z-index: -2;
  }
  
  @keyframes glitch-1 {
    0% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
  
  @keyframes glitch-2 {
    0% { transform: translate(0); }
    20% { transform: translate(1px, -1px); }
    40% { transform: translate(1px, 1px); }
    60% { transform: translate(-1px, -1px); }
    80% { transform: translate(-1px, 1px); }
    100% { transform: translate(0); }
  }
`;

const HeroSection = ({ soundEnabled }) => {
  const [matrixColumns, setMatrixColumns] = useState([]);

  useEffect(() => {
    // Generate matrix rain columns
    const columns = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setMatrixColumns(columns);
  }, []);

  const handlePartnershipClick = () => {
    // Scroll to application form
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCaseStudiesClick = () => {
    // Scroll to case studies
    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer>
      {/* Matrix Rain Effect */}
      {matrixColumns.map((column) => (
        <MatrixColumn
          key={column.id}
          left={column.left}
          delay={column.delay}
        />
      ))}

      {/* World Map SVG */}
      <WorldMapSVG viewBox="0 0 1000 500">
        {/* Simplified world map paths */}
        <path d="M 100 200 Q 200 150 300 200 T 500 180 T 700 200 T 900 190" />
        <path d="M 150 250 Q 250 200 350 250 T 550 230 T 750 250 T 850 240" />
        <path d="M 120 300 Q 220 280 320 300 T 520 290 T 720 300 T 880 295" />
        
        {/* Signal dots */}
        <SignalDot cx="200" cy="200" r="3" />
        <SignalDot cx="400" cy="180" r="3" />
        <SignalDot cx="600" cy="210" r="3" />
        <SignalDot cx="800" cy="190" r="3" />
        
        {/* Signal paths */}
        <SignalPath d="M 200 200 L 400 180 L 600 210 L 800 190" />
      </WorldMapSVG>

      <ContentContainer>
        <MainTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <GlitchText data-text="NEONTRAF.UA">
            NEONTRAF.UA
          </GlitchText>
        </MainTitle>

        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          We weaponize traffic.
        </Subtitle>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Meta. TikTok. Cloaking. AI optimization.
          <br />
          Ukrainian Traffic. Reimagined.
        </Description>

        <ButtonContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <CyberButton
            primary
            onClick={handlePartnershipClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Partnership
          </CyberButton>
          <CyberButton
            onClick={handleCaseStudiesClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Case Studies
          </CyberButton>
        </ButtonContainer>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection; 