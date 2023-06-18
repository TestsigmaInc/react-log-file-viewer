import React, { useEffect, useRef, useState } from 'react';
import { createWorker } from '../utils/webWorkerUtils';

const ReactLogFileViewer = ({ filePath, itemSize = 40, lineHeight = 20, width = '800px' }) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemSize);

  useEffect(() => {
    const workerInstance = createWorker();
    workerInstance.onmessage = (event) => {
      const { data } = event;
      setLines(data);
    };
    workerInstance.postMessage({ filePath });
    return () => {
      workerInstance.terminate();
    };
  }, [filePath]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const currentStartIndex = Math.floor(scrollTop / lineHeight);
      const currentEndIndex = Math.ceil((scrollTop + clientHeight) / lineHeight);
      if (currentStartIndex !== startIndex || currentEndIndex !== endIndex) {
        setStartIndex(currentStartIndex);
        setEndIndex(currentEndIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex, endIndex, lineHeight]);

  const visibleLines = lines.slice(startIndex, endIndex);

  const calculateContainerHeight = () => {
    const visibleLinesCount = Math.min(visibleLines.length, itemSize);
    const minHeight = itemSize * lineHeight;
    return `${Math.max(visibleLinesCount * lineHeight, minHeight)}px`;
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: calculateContainerHeight(),
        width: width,
        overflow: 'auto',
        padding: '10px 20px',
        border: '1px solid gray',
        margin: '20px auto',
      }}
    >
      {lines.length > 0 ? (
        <>
          <div style={{ height: `${startIndex * lineHeight}px` }} />
          {visibleLines.map((line, index) => (
            <div key={startIndex + index} style={{ height: `${lineHeight}px` }}>
              {line}
            </div>
          ))}
          <div style={{ height: `${(lines.length - endIndex) * lineHeight}px` }} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ReactLogFileViewer;
