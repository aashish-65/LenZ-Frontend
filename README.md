# LenZ Frontend Documentation

## Project Overview
LenZ is a frontend application designed to provide a seamless user experience for managing and viewing various types of eyewear. This documentation outlines the project's structure, technologies used, setup instructions, and best practices.

## Project Structure
The project follows a well-organized directory structure:

```
.gitignore
netlify.toml
package.json
README.md

public/
    apple-touch-icon.png
    favicon-96x96.png
    favicon.ico
    favicon.svg
    index.html
    manifest.json
    robots.txt
    site.webmanifest
    web-app-manifest-192x192.png
    web-app-manifest-512x512.png
    images/
        full-frame.png
        rimless.png
        supra.png

src/
    App.css
    App.js
    App.test.js
    AuthContext.js
    index.css
    index.js
    logo.svg
    reportWebVitals.js
    setupTests.js
    theme.js
    
    assets/
        images/
        styles/
    
    components/
        Bill.js
        ...
    
    pages/
    routes/
    utils/
```

### Key Directories and Files
- **`public/`**: Contains static assets such as icons, the main HTML file, and manifest files.
- **`src/`**: Houses the main source code for the application.
- **`App.js`**: The main component responsible for initializing the application.
- **`AuthContext.js`**: Manages authentication state across the application using React Context API.
- **`index.js`**: The entry point for the React application.
- **`components/`**: Contains reusable UI components.
- **`pages/`**: Holds individual page components corresponding to different routes.
- **`routes/`**: Defines and manages the application's routing configuration.
- **`utils/`**: Includes utility functions and helper methods.
- **`assets/`**: Stores images and styles used within the application.

---

## Technologies Used
### **Frontend Framework: React**
- **Why?** React is a widely-used JavaScript library for building user interfaces. It enables component-based architecture, improving modularity and maintainability.

### **State Management: Context API**
- **Why?** The Context API allows efficient global state management without excessive prop drilling, making it ideal for handling authentication and shared data.

### **Styling: CSS Modules**
- **Why?** CSS Modules provide scoped styles, preventing CSS conflicts and ensuring modularity in styling components.

### **Deployment: Netlify**
- **Why?** Netlify offers seamless deployment with features like continuous integration, custom domain management, and serverless functions support.

### **Testing: Jest**
- **Why?** Jest is a robust testing framework that supports snapshot testing, coverage reporting, and provides a simple API for unit testing.

---

## Getting Started
### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

### **Installation**
Clone the repository:
```sh
git clone https://github.com/yourusername/lenz-frontend.git
```
Navigate to the project directory:
```sh
cd lenz-frontend
```
Install dependencies:
```sh
npm install
```

### **Running the Application**
To start the development server:
```sh
npm start
```
This will start the application on `http://localhost:3000`.

### **Running Tests**
To execute tests:
```sh
npm test
```

---

## Conclusion
This documentation provides an overview of the LenZ frontend application, including its structure, technology choices, and setup instructions. For more detailed insights, refer to individual files and inline comments within the codebase.

For any issues or contributions, please check the repository and open a pull request or issue.


