import React from 'react';
import MainPage from './MainPage';

function App() {
  // Simple router logic based on the browser's path
  const path = window.location.pathname;

  // Handle the case where the file is accessed directly
  if (path.endsWith('index.html')) {
    return <MainPage key="nl" lang="nl" />;
  }

  switch (path) {
    case '/en':
      return <MainPage key="en" lang="en" />;
    case '/de':
      return <MainPage key="de" lang="de" />;
    case '/fr':
      return <MainPage key="fr" lang="fr" />;
    case '/es':
      return <MainPage key="es" lang="es" />;
    case '/':
    default:
      // Default to Dutch for the root path or any unknown path
      return <MainPage key="nl" lang="nl" />;
  }
}

export default App;
