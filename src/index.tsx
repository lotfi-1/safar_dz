import React from 'react';
import { useTheme } from './contexts/ThemeProvider';
import './i18n';
// import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/TestScreen';
import {
  View, StatusBar,
  Platform,
} from 'react-native';

const Root: React.FC = () => {
  const { isDark, colors } = useTheme();
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <View style={[{ "flex": 1 }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: colors.background }} />
      <HomeScreen />
    </View>
  );
};

export default Root;