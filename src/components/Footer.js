import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor;
  }
  50% {
    text-shadow: 
      0 0 2px currentColor,
      0 0 5px currentColor,
      0 0 8px currentColor,
      0 0 12px currentColor;
  }
`;

const glitchShake = keyframes`
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-1px, 1px); }
  20% { transform: translate(1px, -1px); }
  30% { transform: translate(-1px, -1px); }
  40% { transform: translate(1px, 1px); }
  50% { transform: translate(-1px, 1px); }
  60% { transform: translate(1px, -1px); }
  70% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
  90% { transform: translate(-1px, 1px); }
`;

const dataFlow = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.black} 0%,
    ${props => props.theme.colors.darkGray} 50%,
    ${props => props.theme.colors.black} 100%
  );
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #333;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 10;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const LogoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 968px) {
    align-items: center;
  }
`;

const Logo = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: #8b5cf6;
  animation: ${neonPulse} 3s ease-in-out infinite;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    animation: ${glitchShake} 0.5s ease-in-out;
    color: #00d4ff;
  }
`;

const LogoSubtext = styled.p`
  color: ${props => props.theme.colors.textDim};
  font-size: 1rem;
  max-width: 300px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ContactSection = styled(motion.div)`
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    color: #00d4ff;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    text-shadow: 0 0 10px #00d4ff;
    
    &::before {
      content: '// ';
      color: #f0f022;
    }
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactLink = styled(motion.a)`
  color: ${props => props.theme.colors.textDim};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  
  &:hover {
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    transform: translateX(10px);
  }
  
  .icon {
    font-size: 1.2rem;
    width: 30px;
    text-align: center;
  }
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const AdminSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 968px) {
    align-items: center;
  }
`;

const SystemStatus = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
  min-width: 200px;
  
  h4 {
    font-family: ${props => props.theme.fonts.primary};
    color: #f0f022;
    margin-bottom: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
  }
  
  .status-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    
    .label {
      color: ${props => props.theme.colors.textDim};
    }
    
    .value {
      color: #27ca3f;
      
      &.warning {
        color: #f0f022;
      }
      
      &.error {
        color: #ff5f56;
      }
    }
  }
`;

const HiddenAdminLink = styled(motion.a)`
  color: transparent;
  text-decoration: none;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  opacity: 0;
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    color: #8b5cf6;
    opacity: 1;
    text-shadow: 0 0 10px #8b5cf6;
    cursor: pointer;
  }
`;

const Copyright = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #333;
  margin-top: 2rem;
  color: ${props => props.theme.colors.textDim};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  
  .year {
    color: #8b5cf6;
    font-weight: bold;
  }
`;

const DataFlowLine = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}%;
  left: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent,
    #00d4ff,
    transparent
  );
  animation: ${dataFlow} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.6;
`;

const EasterEggModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const EasterEggContent = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid #8b5cf6;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.5);
  
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    color: #f0f022;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px #f0f022;
  }
  
  p {
    color: ${props => props.theme.colors.textDim};
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  button {
    background: linear-gradient(45deg, #8b5cf6, #00d4ff);
    border: none;
    border-radius: 4px;
    color: white;
    padding: 1rem 2rem;
    font-family: ${props => props.theme.fonts.primary};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setShowEasterEgg(true);
      setClickCount(0);
    }
  };

  const dataFlowLines = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    delay: Math.random() * 4
  }));

  return (
    <FooterContainer>
      {/* Data flow lines */}
      {dataFlowLines.map((line) => (
        <DataFlowLine
          key={line.id}
          top={line.top}
          delay={line.delay}
        />
      ))}

      <FooterContent>
        <LogoSection
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Logo onClick={handleLogoClick}>
            NEONTRAF.UA
          </Logo>
          <LogoSubtext>
            Weaponizing traffic through the digital underground. 
            Ukrainian ingenuity meets cyberpunk efficiency.
          </LogoSubtext>
        </LogoSection>

        <ContactSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Main Core Contact</h3>
          <ContactLinks>
            <ContactLink
              href="https://t.me/neontraf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">💬</span>
              <span>Telegram: @neontraf</span>
            </ContactLink>
            
            <ContactLink
              href="https://discord.gg/neontraf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">🎮</span>
              <span>Discord: /neontraf</span>
            </ContactLink>
            
            <ContactLink
              href="#"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">🔒</span>
              <span>Matrix: coming soon</span>
            </ContactLink>
            
            <ContactLink
              href="mailto:contact@neontraf.ua"
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">📧</span>
              <span>contact@neontraf.ua</span>
            </ContactLink>
          </ContactLinks>
        </ContactSection>

        <AdminSection
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SystemStatus>
            <h4>System Status</h4>
            <div className="status-item">
              <span className="label">Traffic Flow:</span>
              <span className="value">ACTIVE</span>
            </div>
            <div className="status-item">
              <span className="label">AI Systems:</span>
              <span className="value">ONLINE</span>
            </div>
            <div className="status-item">
              <span className="label">Cloaking:</span>
              <span className="value">ENABLED</span>
            </div>
            <div className="status-item">
              <span className="label">Security:</span>
              <span className="value warning">PARANOID</span>
            </div>
          </SystemStatus>
          
          <HiddenAdminLink 
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              setShowEasterEgg(true);
            }}
          >
            /admin
          </HiddenAdminLink>
        </AdminSection>

        <Copyright>
          <span className="year">2077</span> NEONTRAF.UA - All rights reserved in the cybernet
          <br />
          Powered by Ukrainian hackers & neon dreams
        </Copyright>
      </FooterContent>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <EasterEggModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowEasterEgg(false)}
        >
          <EasterEggContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>🎯 ADMIN ACCESS</h3>
            <p>
              Congratulations, you found the secret admin portal! 
              <br /><br />
              Unfortunately, this is just an easter egg. The real admin panel 
              is protected by quantum encryption and requires neural implant authentication.
              <br /><br />
              Nice try though, cyber-warrior! 🤖
            </p>
            <button onClick={() => setShowEasterEgg(false)}>
              DISCONNECT
            </button>
          </EasterEggContent>
        </EasterEggModal>
      )}
    </FooterContainer>
  );
};

export default Footer; 