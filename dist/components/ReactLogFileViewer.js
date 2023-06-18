import React, { useEffect, useRef, useState } from 'react';
import { createWorker } from '../utils/webWorkerUtils';
const ReactLogFileViewer = ({
  filePath,
  itemSize = 40,
  lineHeight = 20,
  width = '800px'
}) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemSize);
  useEffect(() => {
    const workerInstance = createWorker();
    workerInstance.onmessage = event => {
      const {
        data
      } = event;
      setLines(data);
    };
    workerInstance.postMessage({
      filePath
    });
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
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      height: calculateContainerHeight(),
      width: width,
      overflow: 'auto',
      padding: '10px 20px',
      border: '1px solid rgba(99, 99, 99, 0.2)',
      margin: '20px auto',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      borderRadius: '6px',
      fontSize: '13px',
      color: 'rgb(75 87 104)'
    }
  }, lines.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${startIndex * lineHeight}px`
    }
  }), visibleLines.map((line, index) => /*#__PURE__*/React.createElement("div", {
    key: startIndex + index,
    style: {
      height: `${lineHeight}px`
    }
  }, line)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${(lines.length - endIndex) * lineHeight}px`
    }
  })) : /*#__PURE__*/React.createElement("div", null, "Loading..."));
};
export default ReactLogFileViewer;