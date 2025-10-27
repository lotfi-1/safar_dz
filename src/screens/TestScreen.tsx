import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Button,
  ScrollView,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageProvider';
import { useTheme } from '../contexts/ThemeProvider';


import { SearchIcon } from '../assets';
import { TextField } from '../components/TextFeild';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const { language, fontFamily, toggleLanguage } = useLanguage();
  const { colors, isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Text style={[styles.title, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar'
              ? 'مرحباً بك في تطبيق السفر'
              : 'Welcome to the Travel App'}
          </Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: colors.text.secondary, fontFamily }]}>
            {language === 'ar'
              ? 'اكتشف وجهات جديدة واستمتع برحلتك القادمة'
              : 'Discover new destinations and enjoy your next trip'}
          </Text>

          {/* Text Field */}
          <View style={{ width: '100%' }}>
            <TextField
              textInputProps={{
                value: query,
                onChangeText: setQuery,
                placeholder:
                  language === 'ar'
                    ? 'ابحث عن وجهة...'
                    : 'Search for a destination...',
              }}
              prefixIcon={{
                element: <SearchIcon width={20} height={20} />,
                rotateInRTL: false,
              }}
            // suffixIcon={{
            //   element: <SendIcon width={20} height={20} />,
            //   rotateInRTL: true,
            // }}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              title={language === 'ar' ? 'تغيير اللغة' : 'Change Language'}
              onPress={toggleLanguage}
              color={colors.primary}
            />

            <Button
              title={language === 'ar' ? 'تبديل النمط' : 'Toggle Theme'}
              onPress={toggleTheme}
              color={colors.accent}
            />
          </View>

          {/* Status */}
          <Text style={[styles.status, { color: colors.text.muted, fontFamily }]}>
            {language === 'ar'
              ? isDark
                ? 'الوضع الداكن مفعل'
                : 'الوضع الفاتح مفعل'
              : isDark
                ? 'Dark Mode Enabled'
                : 'Light Mode Enabled'}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  status: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
