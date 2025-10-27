import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeProvider';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useAuth } from '../../contexts/AuthProvider';
import { TextField } from '../../components/TextFeild';
import PrimaryButton from '../../components/PrimaryButton';

interface LoginScreenProps {
  onNavigateToRegister?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateToRegister }) => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(email.trim(), password);
      if (!success) {
        Alert.alert(
          language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login Error',
          language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password'
        );
      }
    } catch (error) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return language === 'ar' ? 'صباح الخير' : 'Good Morning';
    } else if (hour < 18) {
      return language === 'ar' ? 'مساء الخير' : 'Good Afternoon';
    } else {
      return language === 'ar' ? 'مساء الخير' : 'Good Evening';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={[styles.greeting, { color: colors.primary, fontFamily }]}>
              {getGreeting()}
            </Text>
            <Text style={[styles.title, { color: colors.text.primary, fontFamily }]}>
              {language === 'ar' ? 'مرحباً بك في سفار' : 'Welcome to Safar'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontFamily }]}>
              {language === 'ar' ? 'سجل دخولك للاستمتاع برحلاتك' : 'Sign in to enjoy your trips'}
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.form,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: email,
                  onChangeText: setEmail,
                  placeholder: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  autoCorrect: false,
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: password,
                  onChangeText: setPassword,
                  placeholder: language === 'ar' ? 'كلمة المرور' : 'Password',
                  secureTextEntry: true,
                }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton
                type="priamry"
                text={isSubmitting ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...') : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
                props={{
                  onPress: handleLogin,
                  disabled: isSubmitting || isLoading,
                }}
              />
              {isSubmitting && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text.secondary, fontFamily }]}>
                {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
              </Text>
              <PrimaryButton
                type="secondary"
                text={language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
                props={{
                  onPress: onNavigateToRegister || (() => {}),
                }}
              />
            </View>

            <View style={styles.demoCredentials}>
              <Text style={[styles.demoText, { color: colors.text.muted, fontFamily }]}>
                {language === 'ar' ? 'للاختبار: test@example.com / password' : 'For testing: test@example.com / password'}
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 24,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  demoCredentials: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  demoText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen;