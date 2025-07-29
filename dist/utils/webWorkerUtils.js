export const createWorker = delimiter => {
  const workerScript = `
      self.onmessage = async (event) => {
        const { data } = event;
  
        if (data.filePath) {
          try {
            const lines = await readLargeTextFile(data.filePath);
            self.postMessage(lines);
          } catch (error) {
            console.error('Error reading file:', error);
          }
        }
      };
  
      const readLargeTextFile = (filePath) => {
        const absoluteURL = new URL(filePath).href;
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = () => {
            const fileContent = reader.result;
            const lines = fileContent.split('${delimiter}');
            resolve(lines);
          };
  
          reader.onerror = () => {
            reject(new Error('Failed to read the file'));
          };
  
          fetch(absoluteURL)
            .then((response) => response.blob())
            .then((blob) => {
              reader.readAsText(blob);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
    `;
  const blob = new Blob([workerScript], {
    type: "text/javascript"
  });
  const worker = new Worker(URL.createObjectURL(blob));
  return worker;
};