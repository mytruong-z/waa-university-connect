
# WAA University Connect UI

This is the frontend user interface for the WAA University Connect application, built with React, Material-UI, and TailwindCSS.

## Project Setup

### Prerequisites

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6 or higher) - npm is installed with Node.js

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd waa-university-connect-ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm start
```

This will start the application on `http://localhost:3000`.

### Building the Application

To create a production build of the application, run:

```bash
npm run build
```

This will generate a `build` directory containing the production build of the application.

### Testing the Application

To run tests, use the following command:

```bash
npm test
```

### Project Structure

- `src/` - The source code of the application.
- `public/` - The public directory contains the HTML file so you can tweak it, but you mostly don’t need to touch this file.
- `src/components/` - Contains React components.
- `src/index.js` - The entry point of the application.
- `src/App.js` - The root component of the application.

### Configuration

- **TailwindCSS**: Configuration is located in `tailwind.config.js`.
- **PostCSS**: Configuration is located in `postcss.config.js`.

### Dependencies

- **React** (version 18.3.1): A JavaScript library for building user interfaces.
- **Material-UI** (version 5.16.0): React components for faster and easier web development.
- **TailwindCSS** (version 3.4.4): A utility-first CSS framework.
- **React Router DOM** (version 6.24.1): Declarative routing for React applications.

### Development Scripts

- **`npm start`**: Starts the development server.
- **`npm run build`**: Bundles the app into static files for production.
- **`npm test`**: Starts the test runner.
- **`npm run eject`**: Removes this tool and copies build dependencies, configuration files, and scripts into the app directory. If you do this, you can’t go back!
