import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLineChart from './AnimatedLineChart';

const dataStream = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
`;

const numberTick = keyframes`
  0% { transform: translateY(10px); opacity: 0; }
  50% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-10px); opacity: 0; }
`;

const CaseStudiesContainer = styled.section`
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
    content: '> ';
    color: #8b5cf6;
  }
`;

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.2);
`;

const DashboardHeader = styled.div`
  background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: between;
  align-items: center;
  
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    color: #00d4ff;
    margin: 0;
    font-size: 1.5rem;
  }
  
  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #27ca3f;
    font-family: 'Courier New', monospace;
    
    &::before {
      content: '●';
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const TabNavigation = styled.div`
  display: flex;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
`;

const Tab = styled.button`
  background: ${props => props.active ? '#333' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#00d4ff' : '#888'};
  padding: 1rem 2rem;
  font-family: ${props => props.theme.fonts.primary};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#00d4ff' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
    color: #00d4ff;
  }
`;

const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const CaseCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #8b5cf6;
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
    transform: translateY(-5px);
  }
`;

const CaseHeader = styled.div`
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  padding: 1.5rem;
  color: white;
  
  h4 {
    font-family: ${props => props.theme.fonts.primary};
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }
  
  .vertical {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
`;

const Metric = styled.div`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #8b5cf6;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  
  .label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.5rem;
    color: #00d4ff;
    font-weight: bold;
    text-shadow: 0 0 10px #00d4ff;
  }
`;

const Chart = styled.div`
  height: 100px;
  background: rgba(0, 0, 0, 0.3);
  margin: 1rem 1.5rem;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;
  
  .chart-line {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    height: 80%;
    
    svg {
      width: 100%;
      height: 100%;
    }
    
    path {
      stroke: #00d4ff;
      stroke-width: 2;
      fill: none;
      filter: drop-shadow(0 0 5px #00d4ff);
    }
  }
`;

const DataStream = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    #00d4ff, 
    transparent
  );
  animation: ${dataStream} 3s linear infinite;
`;

const LiveCounter = styled(motion.span)`
  display: inline-block;
  font-family: ${props => props.theme.fonts.primary};
  color: #f0f022;
  text-shadow: 0 0 10px #f0f022;
`;

const MetricValue = styled(motion.div)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.5rem;
  color: #00d4ff;
  font-weight: bold;
  text-shadow: 0 0 10px #00d4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MetricIcon = styled(motion.span)`
  font-size: 1.2rem;
`;

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState('gambling');
  const [counters, setCounters] = useState({});

  const caseStudiesData = {
    gambling: [
      {
        title: "Casino Blitz Campaign",
        vertical: "Gambling",
        metrics: {
          roas: "340",
          profit: "45280",
          impressions: "2100000",
          ctr: "8.4"
        },
        chartData: [0.2, 0.5, 0.3, 0.8, 0.6, 0.9, 0.7]
      },
      {
        title: "Sports Betting Rush",
        vertical: "Sports",
        metrics: {
          roas: "280",
          profit: "32150",
          impressions: "1800000",
          ctr: "6.2"
        },
        chartData: [0.3, 0.4, 0.6, 0.5, 0.7, 0.6, 0.8]
      }
    ],
    nutra: [
      {
        title: "Weight Loss Revolution",
        vertical: "Health",
        metrics: {
          roas: "420",
          profit: "67890",
          impressions: "3200000",
          ctr: "12.1"
        },
        chartData: [0.4, 0.6, 0.8, 0.7, 0.9, 0.8, 0.95]
      },
      {
        title: "Muscle Builder Pro",
        vertical: "Fitness",
        metrics: {
          roas: "310",
          profit: "38670",
          impressions: "2500000",
          ctr: "9.3"
        },
        chartData: [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.75]
      }
    ],
    crypto: [
      {
        title: "DeFi Token Launch",
        vertical: "Cryptocurrency",
        metrics: {
          roas: "580",
          profit: "92340",
          impressions: "4100000",
          ctr: "15.7"
        },
        chartData: [0.5, 0.7, 0.6, 0.9, 0.8, 0.95, 0.9]
      },
      {
        title: "NFT Marketplace Boost",
        vertical: "Digital Assets",
        metrics: {
          roas: "390",
          profit: "54210",
          impressions: "2800000",
          ctr: "11.4"
        },
        chartData: [0.4, 0.5, 0.7, 0.6, 0.8, 0.75, 0.85]
      }
    ]
  };

  useEffect(() => {
    // Animate counters
    const interval = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        live: (prev.live || 1247) + Math.floor(Math.random() * 50)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatMetric = (value, type) => {
    const num = parseFloat(value);
    switch(type) {
      case 'roas':
        return `${num}%`;
      case 'profit':
        return `$${num.toLocaleString()}`;
      case 'impressions':
        return `${(num / 1000000).toFixed(1)}M`;
      case 'ctr':
        return `${num}%`;
      default:
        return value;
    }
  };

  const getMetricIcon = (type) => {
    switch(type) {
      case 'roas':
        return '📈';
      case 'profit':
        return '💰';
      case 'impressions':
        return '👁️';
      case 'ctr':
        return '🎯';
      default:
        return '📊';
    }
  };

  return (
    <CaseStudiesContainer id="case-studies">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        REAL NUMBERS
      </SectionTitle>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <DashboardContainer>
          <DashboardHeader>
            <h3>TRAFFIC CONTROL DASHBOARD</h3>
            <div className="status">
              LIVE: <motion.span
                key={counters.live}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {counters.live || 1247}
              </motion.span> active campaigns
            </div>
          </DashboardHeader>

          <TabNavigation>
            {Object.keys(caseStudiesData).map((vertical) => (
              <Tab
                key={vertical}
                active={activeTab === vertical}
                onClick={() => setActiveTab(vertical)}
              >
                {vertical.toUpperCase()}
              </Tab>
            ))}
          </TabNavigation>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CaseGrid>
                {caseStudiesData[activeTab].map((caseStudy, index) => (
                  <CaseCard
                    key={caseStudy.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <DataStream />
                    
                    <CaseHeader>
                      <h4>{caseStudy.title}</h4>
                      <div className="vertical">{caseStudy.vertical}</div>
                    </CaseHeader>

                    <Chart>
                      <AnimatedLineChart data={caseStudy.chartData} />
                    </Chart>

                    <MetricsGrid>
                      {Object.entries(caseStudy.metrics).map(([key, value], idx) => (
                        <Metric key={key}>
                          <div className="label">{key.toUpperCase()}</div>
                          <MetricValue
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.3 + (idx * 0.1),
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            <MetricIcon
                              initial={{ rotate: -20 }}
                              animate={{ rotate: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + (idx * 0.1) }}
                            >
                              {getMetricIcon(key)}
                            </MetricIcon>
                            {formatMetric(value, key)}
                          </MetricValue>
                        </Metric>
                      ))}
                    </MetricsGrid>
                  </CaseCard>
                ))}
              </CaseGrid>
            </motion.div>
          </AnimatePresence>
        </DashboardContainer>
      </motion.div>
    </CaseStudiesContainer>
  );
};

export default CaseStudies; 