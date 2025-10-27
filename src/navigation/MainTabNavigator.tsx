import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeIcon } from '../assets';

import HomeScreen from '../screens/main/HomeScreen';
import TripsScreen from '../screens/main/TripsScreen';
import CreateTripScreen from '../screens/main/CreateTripScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { useTheme } from '../contexts/ThemeProvider';
import { useLanguage } from '../contexts/LanguageProvider';

type TabName = 'home' | 'trips' | 'create' | 'profile';

const MainTabNavigator: React.FC = () => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const tabs = [
    {
      id: 'home' as TabName,
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      icon: HomeIcon,
    },
    {
      id: 'trips' as TabName,
      label: language === 'ar' ? 'رحلاتي' : 'My Trips',
      icon: '🚗',
    },
    {
      id: 'create' as TabName,
      label: language === 'ar' ? 'إنشاء رحلة' : 'Create Trip',
      icon: '➕',
    },
    {
      id: 'profile' as TabName,
      label: language === 'ar' ? 'ملفي' : 'Profile',
      icon: '👤',
    },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'trips':
        return <TripsScreen />;
      case 'create':
        return <CreateTripScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <SafeAreaView style={[styles.tabBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => setActiveTab(tab.id)}
            >

              <Text style={[
                styles.tabLabel,
                {
                  color: activeTab === tab.id ? colors.primary : colors.text.muted,
                  fontFamily,
                }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default MainTabNavigator;
