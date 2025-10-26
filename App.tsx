import React from 'react';
import MainPage from './MainPage';

function App() {
  // FIX: Removed `key` props from `MainPage` components below to resolve TypeScript errors.
  // The state reset logic has been moved into the `MainPage` component itself.
  const path = window.location.pathname;

  // Handle the case where the file is accessed directly
  if (path.endsWith('index.html')) {
    return <MainPage lang="nl" />;
  }

  switch (path) {
    case '/eng':
      return <MainPage lang="en" />;
    case '/de':
      return <MainPage lang="de" />;
    case '/fr':
      return <MainPage lang="fr" />;
    case '/sp':
      return <MainPage lang="es" />;
    case '/':
    default:
      // Default to Dutch for the root path or any unknown path
      return <MainPage lang="nl" />;
  }
}

export default App;