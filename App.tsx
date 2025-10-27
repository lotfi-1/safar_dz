import React from 'react';
import Root from './src';
import { ThemeProvider } from './src/contexts/ThemeProvider';
import { LanguageProvider } from './src/contexts/LanguageProvider';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
