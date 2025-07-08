import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CaseStudies from './components/CaseStudies';
import ToolsSection from './components/ToolsSection';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import GlitchEffect from './components/GlitchEffect';
import ParticleBackground from './components/ParticleBackground';
import BackgroundSound from './components/BackgroundSound';

// Theme
const cyberpunkTheme = {
  colors: {
    primary: '#8b5cf6', // Purple
    neonBlue: '#00d4ff',
    black: '#0a0a0a',
    acidYellow: '#f0f022',
    darkGray: '#1a1a1a',
    lightGray: '#333333',
    text: '#ffffff',
    textDim: '#cccccc'
  },
  fonts: {
    primary: "'Orbitron', monospace",
    secondary: "'Saira', sans-serif"
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Saira:wght@300;400;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.fonts.secondary};
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.darkGray};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
    box-shadow: 0 0 10px ${props => props.theme.colors.primary};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.neonBlue};
    box-shadow: 0 0 15px ${props => props.theme.colors.neonBlue};
  }
`;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(45deg, 
    ${props => props.theme.colors.black} 0%,
    ${props => props.theme.colors.darkGray} 25%,
    ${props => props.theme.colors.black} 50%,
    ${props => props.theme.colors.darkGray} 75%,
    ${props => props.theme.colors.black} 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  text-shadow: 0 0 20px ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const LoadingBar = styled(motion.div)`
  width: 300px;
  height: 4px;
  background: ${props => props.theme.colors.darkGray};
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent,
      ${props => props.theme.colors.neonBlue},
      transparent
    );
    transform: translateX(-100%);
    animation: loading 2s ease-in-out infinite;
  }
  
  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const SoundToggle = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.black};
    box-shadow: 0 0 20px ${props => props.theme.colors.primary};
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <GlobalStyle />
      <AppContainer>
        <BackgroundSound playing={soundEnabled} />
        <AnimatePresence>
          {loading && (
            <LoadingScreen
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <LoadingText
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                NEONTRAF.UA
              </LoadingText>
              <LoadingBar
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                style={{ marginTop: '1rem', color: '#cccccc' }}
              >
                Initializing traffic control systems...
              </motion.p>
            </LoadingScreen>
          )}
        </AnimatePresence>

        {!loading && (
          <>
            <ParticleBackground />
            <GlitchEffect />
            
            <SoundToggle
              onClick={toggleSound}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </SoundToggle>

            <HeroSection soundEnabled={soundEnabled} />
            <AboutSection />
            <CaseStudies />
            <ToolsSection />
            <ApplicationForm />
            <Footer />
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
