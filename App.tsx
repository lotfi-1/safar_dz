import React from 'react';
import Root from './src';
import { ThemeProvider } from './src/contexts/ThemeProvider';
import { LanguageProvider } from './src/contexts/LanguageProvider';
import { AuthProvider } from './src/contexts/AuthProvider';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
