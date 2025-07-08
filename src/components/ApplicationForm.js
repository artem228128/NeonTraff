import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const scannerMove = keyframes`
  0% { transform: translateY(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(500px); opacity: 0; }
`;

const dataUpload = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const matrixCode = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

const FormContainer = styled.section`
  padding: 8rem 2rem;
  background: ${props => props.theme.colors.black};
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #f0f022;
  text-align: center;
  margin-bottom: 4rem;
  text-shadow: 0 0 20px #f0f022;
  
  &::before {
    content: '< ';
    color: #8b5cf6;
  }
  
  &::after {
    content: ' />';
    color: #8b5cf6;
  }
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const TerminalForm = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.2);
`;

const TerminalHeader = styled.div`
  background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    color: #00d4ff;
    margin: 0;
    font-size: 1.5rem;
  }
  
  .terminal-controls {
    display: flex;
    gap: 0.5rem;
    
    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      
      &:nth-child(1) { background: #ff5f56; }
      &:nth-child(2) { background: #ffbd2e; }
      &:nth-child(3) { background: #27ca3f; }
    }
  }
`;

const FormContent = styled.div`
  padding: 2rem;
  position: relative;
`;

const FormField = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fonts.primary};
  color: #8b5cf6;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  &::before {
    content: '> ';
    color: #00d4ff;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.2);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.2);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.2);
  }
  
  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(45deg, #8b5cf6, #00d4ff);
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Scanner = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    #00d4ff, 
    #00d4ff, 
    transparent
  );
  animation: ${scannerMove} 3s ease-in-out infinite;
  z-index: 10;
`;

const ProcessingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ProcessingText = styled(motion.div)`
  font-family: ${props => props.theme.fonts.primary};
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6, #00d4ff);
    animation: ${dataUpload} 3s ease-in-out forwards;
  }
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const MatrixChar = styled(motion.span)`
  position: absolute;
  font-family: 'Courier New', monospace;
  color: #00d4ff;
  font-size: 12px;
  opacity: 0.3;
  animation: ${matrixCode} 2s ease-in-out infinite;
`;

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    experience: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        telegram: '',
        experience: '',
        interest: ''
      });
    }, 3000);
  };

  const generateMatrixChars = () => {
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const elements = [];
    
    for (let i = 0; i < 50; i++) {
      elements.push(
        <MatrixChar
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </MatrixChar>
      );
    }
    
    return elements;
  };

  return (
    <FormContainer id="application-form">
      <MatrixBackground>
        {generateMatrixChars()}
      </MatrixBackground>
      
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        JOIN THE SQUAD
      </SectionTitle>

      <FormWrapper>
        <TerminalForm
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Scanner />
          
          <TerminalHeader>
            <h3>ACCESS NODE TERMINAL</h3>
            <div className="terminal-controls">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </TerminalHeader>

          <FormContent>
            <AnimatePresence>
              {!submitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FormField
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your codename..."
                      required
                    />
                  </FormField>

                  <FormField
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      type="text"
                      id="telegram"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      placeholder="@yourusername"
                      required
                    />
                  </FormField>

                  <FormField
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="experience">Your Experience</Label>
                    <TextArea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Tell us about your traffic experience, previous campaigns, skills..."
                      required
                    />
                  </FormField>

                  <FormField
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="interest">Area of Interest</Label>
                    <Select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your focus area...</option>
                      <option value="gambling">Gambling & Casino</option>
                      <option value="nutra">Nutra & Health</option>
                      <option value="crypto">Crypto & Finance</option>
                      <option value="dating">Dating & Adult</option>
                      <option value="sweepstakes">Sweepstakes & Offers</option>
                      <option value="other">Other Verticals</option>
                    </Select>
                  </FormField>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Scanning Credentials...' : 'Access Node'}
                    </SubmitButton>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '4rem 2rem' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 style={{ 
                      fontFamily: 'Orbitron, monospace', 
                      color: '#27ca3f', 
                      fontSize: '2rem',
                      marginBottom: '1rem',
                      textShadow: '0 0 20px #27ca3f'
                    }}>
                      ACCESS GRANTED
                    </h3>
                    <p style={{ 
                      color: '#cccccc', 
                      fontSize: '1.2rem',
                      lineHeight: '1.6'
                    }}>
                      Your application has been submitted to the NEONTRAF neural network.<br/>
                      Our AI will analyze your profile and contact you via Telegram within 24 hours.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isSubmitting && (
                <ProcessingOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProcessingText
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Analyzing Neural Patterns...
                  </ProcessingText>
                  <ProgressBar />
                </ProcessingOverlay>
              )}
            </AnimatePresence>
          </FormContent>
        </TerminalForm>
      </FormWrapper>
    </FormContainer>
  );
};

export default ApplicationForm; 