import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const chartAnimation = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 2px #00d4ff);
  }
  50% {
    filter: drop-shadow(0 0 8px #00d4ff);
  }
`;

const dataPointAppear = keyframes`
  0% {
    r: 0;
    opacity: 0;
  }
  100% {
    r: 4;
    opacity: 1;
  }
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
`;

const Path = styled(motion.path)`
  stroke: #00d4ff;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${chartAnimation} 2s ease-out forwards;
`;

const DataPoint = styled.circle`
  fill: #00d4ff;
  animation: ${dataPointAppear} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
`;

const Gradient = styled.linearGradient`
  stop {
    animation: ${glowPulse} 2s ease-in-out infinite;
  }
`;

const AnimatedLineChart = ({ data, height = 100 }) => {
  const [pathLength, setPathLength] = useState(0);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Generate points for the chart
    const newPoints = [];
    const step = 100 / (data.length - 1);
    
    data.forEach((value, index) => {
      newPoints.push({
        x: index * step,
        y: 100 - (value * 80), // Scale to 80% of height to leave margin
      });
    });
    
    setPoints(newPoints);
  }, [data]);

  const generatePath = () => {
    if (points.length < 2) return '';
    
    const pathCommands = points.map((point, i) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      
      const prevPoint = points[i - 1];
      const controlX = (prevPoint.x + point.x) / 2;
      
      return `C ${controlX},${prevPoint.y} ${controlX},${point.y} ${point.x},${point.y}`;
    });
    
    return pathCommands.join(' ');
  };

  return (
    <ChartContainer>
      <SVGContainer viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <Gradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </Gradient>
        </defs>
        
        <Path
          d={generatePath()}
          stroke="url(#lineGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {points.map((point, index) => (
          <DataPoint
            key={index}
            cx={point.x}
            cy={point.y}
            r="0"
            delay={1 + (index * 0.1)}
          />
        ))}
      </SVGContainer>
    </ChartContainer>
  );
};

export default AnimatedLineChart; 