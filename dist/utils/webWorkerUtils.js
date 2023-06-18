"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorker = void 0;
var createWorker = function createWorker() {
  var workerScript = "\n      self.onmessage = async (event) => {\n        const { data } = event;\n  \n        if (data.filePath) {\n          try {\n            const lines = await readLargeTextFile(data.filePath);\n            self.postMessage(lines);\n          } catch (error) {\n            console.error('Error reading file:', error);\n          }\n        }\n      };\n  \n      const readLargeTextFile = (filePath) => {\n        const absoluteURL = new URL(filePath).href;\n        return new Promise((resolve, reject) => {\n          const reader = new FileReader();\n  \n          reader.onload = () => {\n            const fileContent = reader.result;\n            const lines = fileContent.split('\\n');\n            resolve(lines);\n          };\n  \n          reader.onerror = () => {\n            reject(new Error('Failed to read the file'));\n          };\n  \n          fetch(absoluteURL)\n            .then((response) => response.blob())\n            .then((blob) => {\n              reader.readAsText(blob);\n            })\n            .catch((error) => {\n              reject(error);\n            });\n        });\n      };\n    ";
  var blob = new Blob([workerScript], {
    type: 'text/javascript'
  });
  var worker = new Worker(URL.createObjectURL(blob));
  return worker;
};
exports.createWorker = createWorker;