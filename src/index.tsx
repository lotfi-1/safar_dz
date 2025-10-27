import React from 'react';
import { useTheme } from './contexts/ThemeProvider';
import { useAuth } from './contexts/AuthProvider';
import './i18n';
import {
  View, StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';

const Root: React.FC = () => {
  const { isDark, colors } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  if (isLoading) {
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: colors.background }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[{ flex: 1 }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: colors.background }} />
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </View>
  );
};

export default Root;