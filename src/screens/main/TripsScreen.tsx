import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import { FlatList,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

interface MyTrip {
  id: string;
  title: string;
  destination: string;
  date: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  role: 'driver' | 'passenger';
  passengers?: number;
  totalSeats?: number;
  pickupLocation: string;
  dropoffLocation: string;
}

const TripsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { language, fontFamily } = useLanguage();
  
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  const mockTrips: MyTrip[] = [
    {
      id: '1',
      title: language === 'ar' ? 'رحلة إلى تيبازة' : 'Trip to Tipaza',
      destination: language === 'ar' ? 'تيبازة' : 'Tipaza',
      date: '2024-01-15',
      time: '08:00',
      status: 'upcoming',
      role: 'passenger',
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة' : 'Algiers',
      dropoffLocation: language === 'ar' ? 'تيبازة' : 'Tipaza',
    },
    {
      id: '2',
      title: language === 'ar' ? 'رحلة إلى وهران' : 'Trip to Oran',
      destination: language === 'ar' ? 'وهران' : 'Oran',
      date: '2024-01-10',
      time: '14:30',
      status: 'completed',
      role: 'driver',
      passengers: 2,
      totalSeats: 4,
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة' : 'Algiers',
      dropoffLocation: language === 'ar' ? 'وهران' : 'Oran',
    },
    {
      id: '3',
      title: language === 'ar' ? 'رحلة إلى قسنطينة' : 'Trip to Constantine',
      destination: language === 'ar' ? 'قسنطينة' : 'Constantine',
      date: '2024-01-20',
      time: '06:00',
      status: 'upcoming',
      role: 'driver',
      passengers: 1,
      totalSeats: 3,
      pickupLocation: language === 'ar' ? 'الجزائر العاصمة' : 'Algiers',
      dropoffLocation: language === 'ar' ? 'قسنطينة' : 'Constantine',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return colors.accent;
      case 'ongoing':
        return colors.success;
      case 'completed':
        return colors.text.muted;
      case 'cancelled':
        return colors.error;
      default:
        return colors.text.muted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return language === 'ar' ? 'قادمة' : 'Upcoming';
      case 'ongoing':
        return language === 'ar' ? 'جارية' : 'Ongoing';
      case 'completed':
        return language === 'ar' ? 'مكتملة' : 'Completed';
      case 'cancelled':
        return language === 'ar' ? 'ملغية' : 'Cancelled';
      default:
        return status;
    }
  };

  const getRoleText = (role: string) => {
    return role === 'driver' 
      ? (language === 'ar' ? 'سائق' : 'Driver')
      : (language === 'ar' ? 'راكب' : 'Passenger');
  };

  const filteredTrips = mockTrips.filter(trip => {
    if (selectedTab === 'upcoming') {
      return trip.status === 'upcoming' || trip.status === 'ongoing';
    } else {
      return trip.status === 'completed' || trip.status === 'cancelled';
    }
  });

  const renderTripCard = ({ item }: { item: MyTrip }) => (
    <TouchableOpacity style={[styles.tripCard, { backgroundColor: colors.surface }]}>
      <View style={styles.tripHeader}>
        <View style={styles.tripInfo}>
          <Text style={[styles.tripTitle, { color: colors.text.primary, fontFamily }]}>
            {item.title}
          </Text>
          <Text style={[styles.tripDestination, { color: colors.text.secondary, fontFamily }]}>
            {item.destination}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={[styles.statusText, { color: colors.white, fontFamily }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.tripDetails}>
        <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
          {language === 'ar' ? 'من' : 'From'}: {item.pickupLocation}
        </Text>
        <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
          {language === 'ar' ? 'إلى' : 'To'}: {item.dropoffLocation}
        </Text>
        <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
          {item.date} - {item.time}
        </Text>
        <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
          {language === 'ar' ? 'الدور' : 'Role'}: {getRoleText(item.role)}
        </Text>
        {item.role === 'driver' && item.passengers !== undefined && (
          <Text style={[styles.detailText, { color: colors.text.secondary, fontFamily }]}>
            {language === 'ar' ? 'الركاب' : 'Passengers'}: {item.passengers}/{item.totalSeats}
          </Text>
        )}
      </View>
      
      <View style={styles.tripActions}>
        {item.status === 'upcoming' && (
          <>
            <PrimaryButton
              type="primary"
              text={language === 'ar' ? 'تفاصيل' : 'Details'}
              props={{
                onPress: () => {},
                style: { flex: 1, marginRight: 8 },
              }}
            />
            <PrimaryButton
              type="primary"
              text={language === 'ar' ? 'إلغاء' : 'Cancel'}
              props={{
                onPress: () => {},
                style: { flex: 1 },
              }}
            />
          </>
        )}
        {item.status === 'completed' && (
          <PrimaryButton
            type="primary"
            text={language === 'ar' ? 'تقييم' : 'Rate'}
            props={{
              onPress: () => {},
              style: { width: '100%' },
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary, fontFamily }]}>
          {language === 'ar' ? 'رحلاتي' : 'My Trips'}
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: selectedTab === 'upcoming' ? colors.primary : colors.surface,
            },
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: selectedTab === 'upcoming' ? colors.white : colors.text.primary,
                fontFamily,
              },
            ]}
          >
            {language === 'ar' ? 'القادمة' : 'Upcoming'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: selectedTab === 'past' ? colors.primary : colors.surface,
            },
          ]}
          onPress={() => setSelectedTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: selectedTab === 'past' ? colors.white : colors.text.primary,
                fontFamily,
              },
            ]}
          >
            {language === 'ar' ? 'السابقة' : 'Past'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  tripCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripDetails: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
  },
  tripActions: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default TripsScreen;
