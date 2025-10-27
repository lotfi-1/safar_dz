import React from 'react';
import { LanguageProvider } from './contexts/LanguageProvider';
import { ThemeProvider } from './contexts/ThemeProvider';
import './i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/TestScreen';

const Root: React.FC = () => {

  return (
    <SafeAreaView style={[{ "flex": 1 }, { backgroundColor: "#FFFFFF" }]}>
      <LanguageProvider>
        <ThemeProvider>
          <HomeScreen />
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaView>
  );
};

export default Root;