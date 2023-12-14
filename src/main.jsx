import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import NavbarX from './components/NavbarX';
import { useState, useEffect } from 'react';
import Start from './components/start';

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);


  if (loading) {
    return(
      <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <div className={"p-4 flex justify-center mt-16 mb-20 transition-all duration-300 "}>
              
            <Start/>
          
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
    )
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavbarX />
        <ThemeProvider>
          <div className={"p-4 md:ml-60 mt-16 mb-20 transition-all duration-300 "}>
            <App />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Root />
);
