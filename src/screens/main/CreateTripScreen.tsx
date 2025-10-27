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
import { TextField } from '../../components/TextFeild';
import PrimaryButton from '../../components/PrimaryButton';

interface CreateTripData {
  destination: string;
  pickupLocation: string;
  date: string;
  time: string;
  totalSeats: string;
  price: string;
  description: string;
}

const CreateTripScreen: React.FC = () => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  
  const [formData, setFormData] = useState<CreateTripData>({
    destination: '',
    pickupLocation: '',
    date: '',
    time: '',
    totalSeats: '',
    price: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof CreateTripData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { destination, pickupLocation, date, time, totalSeats, price } = formData;
    
    // Check required fields
    if (!destination.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في الوجهة' : 'Destination Error',
        language === 'ar' ? 'يرجى تحديد وجهة الرحلة' : 'Please specify the trip destination'
      );
      return false;
    }

    if (!pickupLocation.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في نقطة الانطلاق' : 'Pickup Location Error',
        language === 'ar' ? 'يرجى تحديد نقطة الانطلاق' : 'Please specify the pickup location'
      );
      return false;
    }

    if (!date.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في التاريخ' : 'Date Error',
        language === 'ar' ? 'يرجى تحديد تاريخ الرحلة' : 'Please specify the trip date'
      );
      return false;
    }

    if (!time.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في الوقت' : 'Time Error',
        language === 'ar' ? 'يرجى تحديد وقت الرحلة' : 'Please specify the trip time'
      );
      return false;
    }

    if (!totalSeats.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في عدد المقاعد' : 'Seats Error',
        language === 'ar' ? 'يرجى تحديد عدد المقاعد المتاحة' : 'Please specify the number of available seats'
      );
      return false;
    }

    if (!price.trim()) {
      Alert.alert(
        language === 'ar' ? 'خطأ في السعر' : 'Price Error',
        language === 'ar' ? 'يرجى تحديد سعر الرحلة' : 'Please specify the trip price'
      );
      return false;
    }

    // Validate seats
    const seats = parseInt(totalSeats);
    if (isNaN(seats)) {
      Alert.alert(
        language === 'ar' ? 'خطأ في عدد المقاعد' : 'Invalid Seats',
        language === 'ar' ? 'عدد المقاعد يجب أن يكون رقماً صحيحاً' : 'Number of seats must be a valid number'
      );
      return false;
    }

    if (seats < 1) {
      Alert.alert(
        language === 'ar' ? 'خطأ في عدد المقاعد' : 'Invalid Seats',
        language === 'ar' ? 'يجب أن يكون هناك مقعد واحد على الأقل' : 'There must be at least one seat available'
      );
      return false;
    }

    if (seats > 8) {
      Alert.alert(
        language === 'ar' ? 'خطأ في عدد المقاعد' : 'Invalid Seats',
        language === 'ar' ? 'الحد الأقصى للمقاعد هو 8 مقاعد' : 'Maximum number of seats is 8'
      );
      return false;
    }

    // Validate price
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      Alert.alert(
        language === 'ar' ? 'خطأ في السعر' : 'Invalid Price',
        language === 'ar' ? 'السعر يجب أن يكون رقماً صحيحاً' : 'Price must be a valid number'
      );
      return false;
    }

    if (priceValue < 100) {
      Alert.alert(
        language === 'ar' ? 'خطأ في السعر' : 'Price Too Low',
        language === 'ar' ? 'السعر يجب أن يكون 100 دج على الأقل' : 'Price must be at least 100 DA'
      );
      return false;
    }

    if (priceValue > 5000) {
      Alert.alert(
        language === 'ar' ? 'خطأ في السعر' : 'Price Too High',
        language === 'ar' ? 'السعر يجب أن يكون أقل من 5000 دج' : 'Price must be less than 5000 DA'
      );
      return false;
    }

    // Validate date
    const tripDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (tripDate < today) {
      Alert.alert(
        language === 'ar' ? 'خطأ في التاريخ' : 'Invalid Date',
        language === 'ar' ? 'لا يمكن إنشاء رحلة في تاريخ سابق' : 'Cannot create a trip for a past date'
      );
      return false;
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    if (tripDate > maxDate) {
      Alert.alert(
        language === 'ar' ? 'خطأ في التاريخ' : 'Invalid Date',
        language === 'ar' ? 'لا يمكن إنشاء رحلة لأكثر من 30 يوماً قادماً' : 'Cannot create a trip more than 30 days in advance'
      );
      return false;
    }

    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      Alert.alert(
        language === 'ar' ? 'خطأ في الوقت' : 'Invalid Time',
        language === 'ar' ? 'يرجى إدخال الوقت بالتنسيق الصحيح (مثال: 14:30)' : 'Please enter time in correct format (e.g., 14:30)'
      );
      return false;
    }

    return true;
  };

  const handleCreateTrip = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      
      Alert.alert(
        language === 'ar' ? '🎉 تم إنشاء الرحلة بنجاح!' : '🎉 Trip Created Successfully!',
        language === 'ar' 
          ? `رحلة إلى ${formData.destination} في ${formData.date} الساعة ${formData.time}\n\nسيتم إشعار الركاب المهتمين برحلتك!`
          : `Trip to ${formData.destination} on ${formData.date} at ${formData.time}\n\nInterested passengers will be notified about your trip!`,
        [
          {
            text: language === 'ar' ? 'ممتاز!' : 'Great!',
            onPress: () => {
              // Reset form
              setFormData({
                destination: '',
                pickupLocation: '',
                date: '',
                time: '',
                totalSeats: '',
                price: '',
                description: '',
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ أثناء إنشاء الرحلة' : 'An error occurred while creating the trip'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const popularDestinations = [
    language === 'ar' ? 'تيبازة' : 'Tipaza',
    language === 'ar' ? 'وهران' : 'Oran',
    language === 'ar' ? 'قسنطينة' : 'Constantine',
    language === 'ar' ? 'عنابة' : 'Annaba',
    language === 'ar' ? 'بجاية' : 'Bejaia',
    language === 'ar' ? 'تلمسان' : 'Tlemcen',
  ];

  const renderDestinationChip = (destination: string) => (
    <PrimaryButton
      key={destination}
      type="secondary"
      text={destination}
      props={{
        onPress: () => updateField('destination', destination),
        style: { marginRight: 8, marginBottom: 8 },
      }}
    />
  );

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
              {language === 'ar' ? 'إنشاء رحلة جديدة' : 'Create New Trip'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontFamily }]}>
              {language === 'ar' ? 'شارك رحلتك مع الآخرين' : 'Share your journey with others'}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily }]}>
                {language === 'ar' ? 'وجهة الرحلة' : 'Trip Destination'}
              </Text>
              
              <View style={styles.inputContainer}>
                <TextField
                  textInputProps={{
                    value: formData.destination,
                    onChangeText: (value) => updateField('destination', value),
                    placeholder: language === 'ar' ? 'الوجهة' : 'Destination',
                  }}
                />
              </View>

              <View style={styles.chipsContainer}>
                <Text style={[styles.chipsLabel, { color: colors.text.secondary, fontFamily }]}>
                  {language === 'ar' ? 'وجهات شائعة' : 'Popular destinations'}
                </Text>
                <View style={styles.chips}>
                  {popularDestinations.map(renderDestinationChip)}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily }]}>
                {language === 'ar' ? 'تفاصيل الرحلة' : 'Trip Details'}
              </Text>
              
              <View style={styles.inputContainer}>
                <TextField
                  textInputProps={{
                    value: formData.pickupLocation,
                    onChangeText: (value) => updateField('pickupLocation', value),
                    placeholder: language === 'ar' ? 'نقطة الانطلاق' : 'Pickup Location',
                  }}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <TextField
                    textInputProps={{
                      value: formData.date,
                      onChangeText: (value) => updateField('date', value),
                      placeholder: language === 'ar' ? 'التاريخ' : 'Date',
                    }}
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <TextField
                    textInputProps={{
                      value: formData.time,
                      onChangeText: (value) => updateField('time', value),
                      placeholder: language === 'ar' ? 'الوقت' : 'Time',
                    }}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <TextField
                    textInputProps={{
                      value: formData.totalSeats,
                      onChangeText: (value) => updateField('totalSeats', value),
                      placeholder: language === 'ar' ? 'عدد المقاعد' : 'Seats',
                      keyboardType: 'numeric',
                    }}
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <TextField
                    textInputProps={{
                      value: formData.price,
                      onChangeText: (value) => updateField('price', value),
                      placeholder: language === 'ar' ? 'السعر (دج)' : 'Price (DA)',
                      keyboardType: 'numeric',
                    }}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextField
                  textInputProps={{
                    value: formData.description,
                    onChangeText: (value) => updateField('description', value),
                    placeholder: language === 'ar' ? 'وصف الرحلة (اختياري)' : 'Trip Description (Optional)',
                    multiline: true,
                    numberOfLines: 3,
                  }}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton
                type="primary"
                text={language === 'ar' ? 'إنشاء الرحلة' : 'Create Trip'}
                props={{
                  onPress: handleCreateTrip,
                  disabled: isSubmitting,
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chipsContainer: {
    marginTop: 8,
  },
  chipsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 32,
  },
  inputHint: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default CreateTripScreen;
