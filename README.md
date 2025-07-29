# React Log File Viewer

A React component for viewing large text files.

## Installation

You can install the React Log File Viewer package from GitHub Package Registry using npm or yarn.

### From GitHub Package Registry (Recommended)

```bash
npm install @testsigmainc/react-log-file-viewer
```

or

```bash
yarn add @testsigmainc/react-log-file-viewer
```

**Note:** If you haven't configured npm to use GitHub Package Registry for the `@testsigmainc` scope, you may need to create a `.npmrc` file in your project with:

```
@testsigmainc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

You'll need to set the `GITHUB_TOKEN` environment variable with a GitHub Personal Access Token that has `read:packages` permission.

## Usage

Import the `ReactLogFileViewer` component and use it in your React application.

```jsx
import ReactLogFileViewer from '@testsigmainc/react-log-file-viewer';

function App() {
  return (
    <div>
      <ReactLogFileViewer filePath="path/file.txt" />
    </div>
  );
}
```

### Props

The `ReactLogFileViewer` component accepts the following props:

- `filePath` (string, required): The path to the text file you want to view.
- `itemSize` (number, default: 40): Determines the number of lines visible in the view without scrolling.
- `lineHeight` (number, default: 20): Specifies the height of each line in pixels.
- `width` (string, default: '800px'): Sets the width of the viewer container.

## Examples

Here's an example of using the React Log File Viewer component:

```jsx
import ReactLogFileViewer from '@testsigmainc/react-log-file-viewer';

function App() {
  return (
    <div>
      <ReactLogFileViewer filePath="path/file.txt" itemSize={30} lineHeight={25} width="1000px" />
    </div>
  );
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

The source code for the React Log File Viewer component is hosted on GitHub: [https://github.com/TestsigmaInc/react-log-file-viewer](https://github.com/TestsigmaInc/react-log-file-viewer)

## Issues

If you encounter any issues or have any suggestions for improvements, please open an issue on the GitHub repository.
```
