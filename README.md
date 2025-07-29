# React Log File Viewer

A React component for viewing large text files efficiently with virtual scrolling and customizable styling.

## Features

- 🚀 **Virtual Scrolling**: Efficiently renders large files with minimal memory usage
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Customizable**: Configurable line height, width, and item size
- ⚡ **Performance Optimized**: Uses web workers for file processing
- 🔧 **Easy Integration**: Simple props-based configuration

## Installation

You can install the React Log File Viewer package using npm or yarn.

```bash
npm install react-log-file-viewer
```

or

```bash
yarn add react-log-file-viewer
```

## Usage

Import the `ReactLogFileViewer` component and use it in your React application.

```jsx
import ReactLogFileViewer from 'react-log-file-viewer';

function App() {
  return (
    <div>
      <ReactLogFileViewer filePath="path/to/your/file.txt" />
    </div>
  );
}
```

### Props

The `ReactLogFileViewer` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filePath` | string | **required** | The path to the text file you want to view |
| `itemSize` | number | `40` | Number of lines visible in the view without scrolling |
| `lineHeight` | number | `20` | Height of each line in pixels |
| `width` | string | `'800px'` | Width of the viewer container |

## Examples

### Basic Usage

```jsx
import ReactLogFileViewer from 'react-log-file-viewer';

function App() {
  return (
    <div>
      <h1>Log File Viewer</h1>
      <ReactLogFileViewer filePath="/var/log/application.log" />
    </div>
  );
}
```

### Custom Configuration

```jsx
import ReactLogFileViewer from 'react-log-file-viewer';

function App() {
  return (
    <div>
      <ReactLogFileViewer 
        filePath="path/to/file.txt" 
        itemSize={30} 
        lineHeight={25} 
        width="1000px" 
      />
    </div>
  );
}
```

### Full Width Container

```jsx
import ReactLogFileViewer from 'react-log-file-viewer';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactLogFileViewer 
        filePath="large-file.txt" 
        itemSize={50} 
        lineHeight={18} 
        width="100%" 
      />
    </div>
  );
}
```

## Browser Support

This component supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/react-log-file-viewer.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Build the project: `npm run build`
6. Test your changes
7. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

The source code for the React Log File Viewer component is hosted on GitHub: [https://github.com/TestsigmaInc/react-log-file-viewer](https://github.com/TestsigmaInc/react-log-file-viewer)

## Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/TestsigmaInc/react-log-file-viewer/issues).

## Changelog

### v1.1.0
- Added virtual scrolling for better performance
- Improved file processing with web workers
- Enhanced customization options
- Better responsive design

### v1.0.0
- Initial release
- Basic file viewing functionality
- Configurable props
