import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const terminalBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const AboutContainer = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.black} 0%,
    ${props => props.theme.colors.darkGray} 50%,
    ${props => props.theme.colors.black} 100%
  );
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #00d4ff;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px #00d4ff;
  
  &::after {
    content: '_';
    animation: ${terminalBlink} 1s infinite;
    color: #f0f022;
  }
`;

const ContentGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutText = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.8rem;
    color: #8b5cf6;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px #8b5cf6;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.textDim};
    margin-bottom: 2rem;
  }
`;

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FocusCard = styled(motion.div)`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #8b5cf6;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  h4 {
    font-family: ${props => props.theme.fonts.primary};
    color: #00d4ff;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textDim};
    font-size: 0.9rem;
    margin: 0;
  }
`;

const TeamSection = styled.div``;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const TeamCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #333;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(139, 92, 246, 0.1) 50%, 
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  &:hover {
    border-color: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #00d4ff);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #8b5cf6, #00d4ff, #f0f022, #8b5cf6);
    z-index: -1;
    animation: rotate 3s linear infinite;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TeamName = styled.h4`
  font-family: ${props => props.theme.fonts.primary};
  color: #00d4ff;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const TeamRole = styled.p`
  color: ${props => props.theme.colors.textDim};
  font-size: 0.9rem;
  margin: 0;
`;

const TerminalWindow = styled(motion.div)`
  background: #000;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 2rem;
`;

const TerminalHeader = styled.div`
  background: #1a1a1a;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    
    &:nth-child(1) { background: #ff5f56; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #27ca3f; }
  }
`;

const TerminalContent = styled.div`
  padding: 1rem;
  font-family: 'Courier New', monospace;
  color: #00d4ff;
  font-size: 0.9rem;
  line-height: 1.6;
  
  .prompt {
    color: #f0f022;
  }
  
  .command {
    color: #8b5cf6;
  }
  
  .output {
    color: #00d4ff;
    margin-left: 2rem;
  }
`;

const AboutSection = () => {
  const focuses = [
    {
      title: "Full-stack traffic",
      description: "End-to-end campaign management and optimization"
    },
    {
      title: "Cloaking systems",
      description: "Advanced stealth technology for traffic protection"
    },
    {
      title: "AI analytics",
      description: "Machine learning powered performance analysis"
    },
    {
      title: "Private campaign drops",
      description: "Exclusive access to high-converting offers"
    }
  ];

  const teamMembers = [
    { name: "Alex", role: "Traffic Director", initial: "A" },
    { name: "Maria", role: "AI Specialist", initial: "M" },
    { name: "Viktor", role: "Cloaking Engineer", initial: "V" },
    { name: "Anya", role: "Data Analyst", initial: "A" }
  ];

  return (
    <AboutContainer id="about">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        WHO WE ARE
      </SectionTitle>

      <ContentGrid>
        <AboutText>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Top-tier Ukrainian affiliate team
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We're not just another affiliate network. We're cyber-warriors in the traffic game, 
            combining cutting-edge technology with ruthless efficiency to deliver results that 
            others can only dream of.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our mission: to revolutionize how traffic flows through the digital underground, 
            using AI, cloaking, and pure Ukrainian ingenuity.
          </motion.p>

          <FocusGrid>
            {focuses.map((focus, index) => (
              <FocusCard
                key={focus.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4>{focus.title}</h4>
                <p>{focus.description}</p>
              </FocusCard>
            ))}
          </FocusGrid>
        </AboutText>

        <TeamSection>
          <TerminalWindow
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerminalHeader>
              <span></span>
              <span></span>
              <span></span>
            </TerminalHeader>
            <TerminalContent>
              <div><span className="prompt">neo@traf:~$</span> <span className="command">cat team_status.txt</span></div>
              <div className="output">█ All systems operational</div>
              <div className="output">█ Team assembled and ready</div>
              <div className="output">█ Next-gen tools initialized</div>
              <div className="output">█ Traffic weaponized successfully</div>
            </TerminalContent>
          </TerminalWindow>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Avatar>{member.initial}</Avatar>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSection>
      </ContentGrid>
    </AboutContainer>
  );
};

export default AboutSection; 