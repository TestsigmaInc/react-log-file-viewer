import React, { useEffect, useRef, useState } from "react";
import { createWorker } from "../utils/webWorkerUtils";

const ReactLogFileViewer = ({
  filePath,
  itemSize = 40,
  lineHeight = 20,
  width = "800px",
  delimiter = "\\n",
  LoadingComponent = () => <div>Loading...</div>,
  EmptyComponent = () => <div>No Logs Found</div>
}) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemSize);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!filePath) {
      setLines([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const workerInstance = createWorker(delimiter);
    workerInstance.onmessage = (event) => {
      const { data } = event;
      setLines(data);
    };
    workerInstance.postMessage({ filePath });
    return () => {
      workerInstance.terminate();
      setLines([]);
    };
  }, [filePath]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const currentStartIndex = Math.floor(scrollTop / lineHeight);
      const currentEndIndex = Math.ceil(
        (scrollTop + clientHeight) / lineHeight
      );
      if (currentStartIndex !== startIndex || currentEndIndex !== endIndex) {
        setStartIndex(currentStartIndex);
        setEndIndex(currentEndIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
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
        overflow: "auto",
        padding: "10px 20px",
        border: "1px solid rgba(99, 99, 99, 0.2)",
        margin: "20px auto",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "6px",
        fontSize: "13px",
        color: "rgb(75 87 104)"
      }}
    >
      {isLoading ? (
        <LoadingComponent />
      ) : lines.length > 0 ? (
        <>
          <div style={{ height: `${startIndex * lineHeight}px` }} />
          {visibleLines.map((line, index) => (
            <pre key={startIndex + index}>{line}</pre>
          ))}
          <div
            style={{ height: `${(lines.length - endIndex) * lineHeight}px` }}
          />
        </>
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
};

export default ReactLogFileViewer;
