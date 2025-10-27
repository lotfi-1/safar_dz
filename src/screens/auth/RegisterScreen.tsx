import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeProvider';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useAuth, RegisterData } from '../../contexts/AuthProvider';
import { TextField } from '../../components/TextFeild';
import PrimaryButton from '../../components/PrimaryButton';

interface RegisterScreenProps {
  onNavigateToLogin?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin }) => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { name, email, phone, password, confirmPassword } = formData;
    
    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields'
      );
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters'
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const success = await register(formData);
      if (!success) {
        Alert.alert(
          language === 'ar' ? 'خطأ في التسجيل' : 'Registration Error',
          language === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب' : 'An error occurred during registration'
        );
      }
    } catch (error) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during registration'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRTL = language === 'ar';

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
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary, fontFamily }]}>
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontFamily }]}>
              {language === 'ar' ? 'انضم إلينا وابدأ رحلاتك' : 'Join us and start your journeys'}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: formData.name,
                  onChangeText: (value) => updateField('name', value),
                  placeholder: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
                  autoCapitalize: 'words',
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: formData.email,
                  onChangeText: (value) => updateField('email', value),
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
                  value: formData.phone,
                  onChangeText: (value) => updateField('phone', value),
                  placeholder: language === 'ar' ? 'رقم الهاتف' : 'Phone Number',
                  keyboardType: 'phone-pad',
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: formData.password,
                  onChangeText: (value) => updateField('password', value),
                  placeholder: language === 'ar' ? 'كلمة المرور' : 'Password',
                  secureTextEntry: true,
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextField
                textInputProps={{
                  value: formData.confirmPassword,
                  onChangeText: (value) => updateField('confirmPassword', value),
                  placeholder: language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password',
                  secureTextEntry: true,
                }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton
                type="priamry"
                text={language === 'ar' ? 'إنشاء الحساب' : 'Create Account'}
                props={{
                  onPress: handleRegister,
                  disabled: isSubmitting || isLoading,
                }}
              />
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text.secondary, fontFamily }]}>
                {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
              </Text>
              <PrimaryButton
                type="secondary"
                text={language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                props={{
                  onPress: onNavigateToLogin || (() => {}),
                }}
              />
            </View>
          </View>
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
    marginBottom: 32,
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
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
