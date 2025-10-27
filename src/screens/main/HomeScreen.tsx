import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeProvider';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useAuth } from '../../contexts/AuthProvider';
import { TextField } from '../../components/TextFeild';
import PrimaryButton from '../../components/PrimaryButton';

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
  driver: {
    name: string;
    rating: number;
    avatar: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
}

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNotification, setShowNotification] = useState(true);

  const notifications = [
    {
      id: '1',
      type: 'success',
      title: language === 'ar' ? '🎉 تم تأكيد رحلتك!' : '🎉 Your trip is confirmed!',
      message: language === 'ar' ? 'رحلة إلى تيبازة يوم الجمعة الساعة 8:00 صباحاً' : 'Trip to Tipaza on Friday at 8:00 AM',
      time: '2 min ago',
    },
    {
      id: '2',
      type: 'info',
      title: language === 'ar' ? '📢 رحلة جديدة متاحة!' : '📢 New trip available!',
      message: language === 'ar' ? 'رحلة إلى وهران مع سائق موثوق' : 'Trip to Oran with trusted driver',
      time: '15 min ago',
    },
  ];

  const mockTrips: Trip[] = [
    {
      id: '1',
      title: language === 'ar' ? 'رحلة إلى تيبازة' : 'Trip to Tipaza',
      destination: language === 'ar' ? 'تيبازة' : 'Tipaza',
      date: '2024-01-15',
      time: '08:00',
      availableSeats: 2,
      totalSeats: 4,
      price: 450,
      driver: {
        name: 'أحمد محمد',
        rating: 4.8,
        avatar: '👨‍💼',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - باب الزوار' : 'Algiers - Bab Ezzouar',
      dropoffLocation: language === 'ar' ? 'تيبازة - وسط المدينة' : 'Tipaza - City Center',
    },
    {
      id: '2',
      title: language === 'ar' ? 'رحلة إلى وهران' : 'Trip to Oran',
      destination: language === 'ar' ? 'وهران' : 'Oran',
      date: '2024-01-16',
      time: '14:30',
      availableSeats: 1,
      totalSeats: 3,
      price: 750,
      driver: {
        name: 'فاطمة علي',
        rating: 4.9,
        avatar: '👩‍💻',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - الحراش' : 'Algiers - El Harrach',
      dropoffLocation: language === 'ar' ? 'وهران - الميناء' : 'Oran - Port',
    },
    {
      id: '3',
      title: language === 'ar' ? 'رحلة إلى قسنطينة' : 'Trip to Constantine',
      destination: language === 'ar' ? 'قسنطينة' : 'Constantine',
      date: '2024-01-17',
      time: '06:00',
      availableSeats: 3,
      totalSeats: 5,
      price: 650,
      driver: {
        name: 'محمد يوسف',
        rating: 4.7,
        avatar: '👨‍🎓',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - القبة' : 'Algiers - Kouba',
      dropoffLocation: language === 'ar' ? 'قسنطينة - الجامعة' : 'Constantine - University',
    },
    {
      id: '4',
      title: language === 'ar' ? 'رحلة إلى بجاية' : 'Trip to Bejaia',
      destination: language === 'ar' ? 'بجاية' : 'Bejaia',
      date: '2024-01-18',
      time: '09:30',
      availableSeats: 2,
      totalSeats: 4,
      price: 550,
      driver: {
        name: 'سارة بن علي',
        rating: 4.6,
        avatar: '👩‍⚕️',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - بئر مراد رايس' : 'Algiers - Bir Mourad Rais',
      dropoffLocation: language === 'ar' ? 'بجاية - الميناء' : 'Bejaia - Port',
    },
    {
      id: '5',
      title: language === 'ar' ? 'رحلة إلى عنابة' : 'Trip to Annaba',
      destination: language === 'ar' ? 'عنابة' : 'Annaba',
      date: '2024-01-19',
      time: '07:00',
      availableSeats: 1,
      totalSeats: 3,
      price: 850,
      driver: {
        name: 'يوسف أحمد',
        rating: 4.9,
        avatar: '👨',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - الدار البيضاء' : 'Algiers - Dar El Beida',
      dropoffLocation: language === 'ar' ? 'عنابة - وسط المدينة' : 'Annaba - City Center',
    },
    {
      id: '6',
      title: language === 'ar' ? 'رحلة إلى تلمسان' : 'Trip to Tlemcen',
      destination: language === 'ar' ? 'تلمسان' : 'Tlemcen',
      date: '2024-01-20',
      time: '11:00',
      availableSeats: 4,
      totalSeats: 6,
      price: 700,
      driver: {
        name: 'نور الدين',
        rating: 4.5,
        avatar: '👨‍🏫',
      },
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة - حسين داي' : 'Algiers - Hussein Dey',
      dropoffLocation: language === 'ar' ? 'تلمسان - الجامعة' : 'Tlemcen - University',
    },
  ];

  const filters = [
    { key: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { key: 'today', label: language === 'ar' ? 'اليوم' : 'Today' },
    { key: 'tomorrow', label: language === 'ar' ? 'غداً' : 'Tomorrow' },
    { key: 'weekend', label: language === 'ar' ? 'نهاية الأسبوع' : 'Weekend' },
  ];

  const getSeatsColor = (availableSeats: number, totalSeats: number) => {
    const ratio = availableSeats / totalSeats;
    if (ratio <= 0.25) return colors.error;
    if (ratio <= 0.5) return colors.warning;
    return colors.success;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return language === 'ar' ? 'اليوم' : 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return language === 'ar' ? 'غداً' : 'Tomorrow';
    } else {
      return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const renderTripCard = ({ item }: { item: Trip }) => (
    <TouchableOpacity style={[styles.tripCard, { backgroundColor: colors.surface }]}>
      <View style={styles.tripHeader}>
        <View style={styles.tripTitleContainer}>
          <Text style={[styles.tripTitle, { color: colors.text.primary, fontFamily }]}>
            {item.title}
          </Text>
          <Text style={[styles.tripDestination, { color: colors.text.secondary, fontFamily }]}>
            {item.destination}
          </Text>
        </View>
        <View style={[styles.seatsBadge, { backgroundColor: getSeatsColor(item.availableSeats, item.totalSeats) }]}>
          <Text style={[styles.seatsText, { color: colors.white, fontFamily }]}>
            {item.availableSeats}/{item.totalSeats}
          </Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.locationRow}>
          <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
            {item.pickupLocation}
          </Text>
        </View>
        <View style={styles.locationRow}>
          <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
            {item.dropoffLocation}
          </Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
            {formatDate(item.date)} - {item.time}
          </Text>
        </View>
      </View>

      <View style={styles.tripFooter}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.avatarText}>{item.driver.avatar}</Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={[styles.driverName, { color: colors.text.primary, fontFamily }]}>
              {item.driver.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.driverRating, { color: colors.warning, fontFamily }]}>
                ⭐ {item.driver.rating}
              </Text>
              <Text style={[styles.ratingText, { color: colors.text.muted, fontFamily }]}>
                ({language === 'ar' ? 'سائق موثوق' : 'Trusted Driver'})
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary, fontFamily }]}>
            {item.price} {language === 'ar' ? 'دج' : 'DA'}
          </Text>
          <Text style={[styles.pricePerSeat, { color: colors.text.muted, fontFamily }]}>
            {language === 'ar' ? 'للمقعد' : 'per seat'}
          </Text>
        </View>
      </View>

      <View style={styles.tripActions}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={[styles.socialText, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={[styles.socialText, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'انضم للرحلة' : 'Join Trip'}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.socialActions}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={[styles.socialText, { color: colors.text.muted, fontFamily }]}>
            {language === 'ar' ? 'مشاركة' : 'Share'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={[styles.socialText, { color: colors.text.muted, fontFamily }]}>
            {language === 'ar' ? 'تحدث مع السائق' : 'Chat'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={[styles.socialText, { color: colors.text.muted, fontFamily }]}>
            {language === 'ar' ? 'حفظ' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? `مرحباً ${user?.name}` : `Hello ${user?.name}`}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary, fontFamily }]}>
            {language === 'ar' ? 'اكتشف رحلات جديدة' : 'Discover new trips'}
          </Text>
        </View>

        {showNotification && notifications.length > 0 && (
          <View style={[styles.notificationBanner, { backgroundColor: colors.accent }]}>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.white, fontFamily }]}>
                {notifications[0].title}
              </Text>
              <Text style={[styles.notificationMessage, { color: colors.white, fontFamily }]}>
                {notifications[0].message}
              </Text>
              <Text style={[styles.notificationTime, { color: colors.white, fontFamily }]}>
                {notifications[0].time}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeNotification}
              onPress={() => setShowNotification(false)}
            >
              <Text style={[styles.closeIcon, { color: colors.white }]}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.searchContainer}>
          <TextField
            textInputProps={{
              value: searchQuery,
              onChangeText: setSearchQuery,
              placeholder: language === 'ar' ? 'ابحث عن رحلة...' : 'Search for a trip...',
            }}
          />
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: selectedFilter === filter.key ? colors.primary : colors.surface,
                  },
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: selectedFilter === filter.key ? colors.white : colors.text.primary,
                      fontFamily,
                    },
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.tripsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'الرحلات المتاحة' : 'Available Trips'}
          </Text>

          <FlatList
            data={mockTrips}
            renderItem={renderTripCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tripsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tripCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tripTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 14,
    fontWeight: '500',
  },
  seatsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  seatsText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripDetails: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  timeIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRating: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pricePerSeat: {
    fontSize: 12,
    marginTop: 2,
  },
  tripActions: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    gap: 8,
  },
  socialActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  socialButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  socialIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '500',
  },
  notificationBanner: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    opacity: 0.8,
  },
  closeNotification: {
    padding: 8,
    marginLeft: 12,
  },
  closeIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
