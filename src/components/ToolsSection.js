import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const scan = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const ToolsContainer = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.darkGray} 0%,
    ${props => props.theme.colors.black} 50%,
    ${props => props.theme.colors.darkGray} 100%
  );
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #8b5cf6;
  text-align: center;
  margin-bottom: 4rem;
  text-shadow: 0 0 20px #8b5cf6;
  
  &::before {
    content: '[';
    color: #00d4ff;
  }
  
  &::after {
    content: ']';
    color: #00d4ff;
  }
`;

const ToolsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ToolCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
    animation: ${scan} 3s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: #8b5cf6;
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.1);
  }
`;

const ToolIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8b5cf6, #00d4ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
`;

const ToolTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  color: #00d4ff;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  text-shadow: 0 0 10px #00d4ff;
`;

const ToolDescription = styled.p`
  color: ${props => props.theme.colors.textDim};
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ToolFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: ${props => props.theme.colors.textDim};
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '▶';
      color: #f0f022;
      position: absolute;
      left: 0;
      font-size: 0.8rem;
    }
  }
`;

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const PopupContent = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid #8b5cf6;
  border-radius: 16px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #8b5cf6;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: rotate(90deg);
  }
`;

const PopupTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  color: #00d4ff;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-shadow: 0 0 15px #00d4ff;
`;

const PopupDescription = styled.p`
  color: ${props => props.theme.colors.textDim};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const DemoVideo = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #1a1a1a, #333);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  font-family: ${props => props.theme.fonts.primary};
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(0, 212, 255, 0.1) 50%, 
      transparent 70%
    );
    transform: translateX(-100%);
    animation: ${scan} 2s ease-in-out infinite;
  }
`;

const ToolsSection = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    {
      icon: "🕵️",
      title: "Spy Tools",
      description: "Advanced competitive intelligence and market analysis",
      features: [
        "Real-time ad monitoring",
        "Competitor tracking",
        "Market trend analysis",
        "Creative intelligence"
      ],
      details: "Our proprietary spy tools give you unprecedented insight into competitor strategies, allowing you to stay ahead of market trends and optimize your campaigns with data-driven intelligence."
    },
    {
      icon: "📊",
      title: "Custom Trackers",
      description: "Precision tracking for maximum campaign optimization",
      features: [
        "Multi-touchpoint attribution",
        "Real-time analytics",
        "Custom conversion funnels",
        "Advanced segmentation"
      ],
      details: "Built from the ground up for affiliate marketers, our tracking system provides granular insights into user behavior and campaign performance with military-grade precision."
    },
    {
      icon: "🛡️",
      title: "Cloaking Engines",
      description: "Stealth technology for traffic protection and compliance",
      features: [
        "Intelligent traffic filtering",
        "Geographic targeting",
        "Device fingerprinting",
        "Bot detection"
      ],
      details: "Our next-generation cloaking technology ensures your campaigns stay protected while maintaining compliance across all major traffic sources and platforms."
    },
    {
      icon: "🎨",
      title: "Anti-Ban Creatives",
      description: "Creative assets designed to bypass platform restrictions",
      features: [
        "Algorithm-resistant designs",
        "Dynamic content generation",
        "A/B testing automation",
        "Compliance optimization"
      ],
      details: "Creative assets engineered with deep understanding of platform algorithms, designed to maximize approval rates while maintaining high conversion potential."
    },
    {
      icon: "🤖",
      title: "AI Traffic Router",
      description: "Smart traffic distribution and optimization system",
      features: [
        "Real-time traffic scoring",
        "Dynamic path optimization",
        "ML-powered decisioning",
        "Automated scaling"
      ],
      details: "Advanced AI system that automatically routes and optimizes traffic flow based on real-time performance data, maximizing ROI across all campaigns."
    },
    {
      icon: "🔐",
      title: "Quantum Shield",
      description: "Next-gen security and anonymization protocol",
      features: [
        "Traffic encryption",
        "Identity masking",
        "Proxy rotation",
        "Risk assessment"
      ],
      details: "State-of-the-art protection system that ensures complete anonymity and security for your traffic operations using quantum-inspired encryption algorithms."
    }
  ];

  return (
    <ToolsContainer id="tools">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        TOOLS & TECH STACK
      </SectionTitle>

      <ToolsGrid>
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.title}
            delay={index * 0.5}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedTool(tool)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ToolIcon index={index}>
              {tool.icon}
            </ToolIcon>
            
            <ToolTitle>{tool.title}</ToolTitle>
            
            <ToolDescription>
              {tool.description}
            </ToolDescription>
            
            <ToolFeatures>
              {tool.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ToolFeatures>
          </ToolCard>
        ))}
      </ToolsGrid>

      <AnimatePresence>
        {selectedTool && (
          <PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTool(null)}
          >
            <PopupContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedTool(null)}>
                ×
              </CloseButton>
              
              <PopupTitle>
                {selectedTool.icon} {selectedTool.title}
              </PopupTitle>
              
              <PopupDescription>
                {selectedTool.details}
              </PopupDescription>
              
              <DemoVideo>
                <span>📹 Demo Video Loading...</span>
              </DemoVideo>
            </PopupContent>
          </PopupOverlay>
        )}
      </AnimatePresence>
    </ToolsContainer>
  );
};

export default ToolsSection; 