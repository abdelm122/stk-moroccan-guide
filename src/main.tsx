
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Function to initialize the React application with comprehensive error handling
const initializeApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Root element not found! Cannot mount React application.");
      // Create a fallback element to show error
      const errorElement = document.createElement('div');
      errorElement.innerHTML = '<div style="padding: 20px; color: red; text-align: center;">Application failed to load. Please refresh the page or contact support.</div>';
      document.body.appendChild(errorElement);
      return;
    }
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    console.log("React application mounted successfully");
  } catch (error) {
    console.error("Fatal error during application initialization:", error);
    // Show user-friendly error
    document.body.innerHTML = '<div style="padding: 20px; color: red; text-align: center;">Application encountered an error. Please refresh the page or contact support.</div>';
  }
};

// Wait for full DOM load to prevent race conditions
if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded, initialize immediately
  initializeApp();
}
