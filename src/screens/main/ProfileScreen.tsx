import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeProvider';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useAuth } from '../../contexts/AuthProvider';
import PrimaryButton from '../../components/PrimaryButton';

interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  tripDestination: string;
}

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const { language, fontFamily, toggleLanguage } = useLanguage();
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [showReviews, setShowReviews] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const mockReviews: Review[] = [
    {
      id: '1',
      reviewerName: 'سارة أحمد',
      reviewerAvatar: '👩‍💼',
      rating: 5,
      comment: language === 'ar' ? 'رحلة ممتازة وسائق مهذب جداً. أنصح به بشدة!' : 'Excellent trip and very polite driver. Highly recommended!',
      date: '2024-01-10',
      tripDestination: language === 'ar' ? 'تيبازة' : 'Tipaza',
    },
    {
      id: '2',
      reviewerName: 'محمد علي',
      reviewerAvatar: '👨‍🎓',
      rating: 4,
      comment: language === 'ar' ? 'رحلة جيدة، السائق كان في الوقت المحدد' : 'Good trip, driver was on time',
      date: '2024-01-08',
      tripDestination: language === 'ar' ? 'وهران' : 'Oran',
    },
    {
      id: '3',
      reviewerName: 'فاطمة يوسف',
      reviewerAvatar: '👩‍⚕️',
      rating: 5,
      comment: language === 'ar' ? 'أفضل سائق في التطبيق! آمن ومريح' : 'Best driver on the app! Safe and comfortable',
      date: '2024-01-05',
      tripDestination: language === 'ar' ? 'قسنطينة' : 'Constantine',
    },
  ];

  const userStats = {
    totalTrips: 23,
    rating: 4.8,
    reviewsCount: 18,
    joinedDate: '2023-06-15',
    preferredLanguage: language === 'ar' ? 'العربية' : 'English',
  };

  const handleLogout = () => {
    Alert.alert(
      language === 'ar' ? 'تسجيل الخروج' : 'Logout',
      language === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to logout?',
      [
        {
          text: language === 'ar' ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language === 'ar' ? 'تسجيل الخروج' : 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleSaveProfile = async () => {
    if (editedName.trim()) {
      await updateUser({ name: editedName.trim() });
      setIsEditing(false);
      Alert.alert(
        language === 'ar' ? 'تم الحفظ' : 'Saved',
        language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully'
      );
    }
  };

  const renderStars = (rating: number, size: number = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text
        key={index}
        style={{
          fontSize: size,
          color: index < rating ? colors.warning : colors.border,
          marginRight: 2,
        }}
      >
        ⭐
      </Text>
    ));
  };

  const renderRatingModal = () => (
    <Modal
      visible={showRatingModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowRatingModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <Text style={[styles.modalTitle, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'تقييم الرحلة' : 'Rate Trip'}
          </Text>

          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedRating(index + 1)}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: index < selectedRating ? colors.warning : colors.border,
                    marginHorizontal: 8,
                  }}
                >
                  ⭐
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.modalActions}>
            <PrimaryButton
              type="secondary"
              text={language === 'ar' ? 'إلغاء' : 'Cancel'}
              props={{
                onPress: () => setShowRatingModal(false),
                style: { flex: 1, marginRight: 8 },
              }}
            />
            <PrimaryButton
              type="primary"
              text={language === 'ar' ? 'إرسال' : 'Submit'}
              props={{
                onPress: () => {
                  setShowRatingModal(false);
                  Alert.alert(
                    language === 'ar' ? 'شكراً لك!' : 'Thank you!',
                    language === 'ar' ? 'تم إرسال تقييمك بنجاح' : 'Your rating has been submitted successfully'
                  );
                },
                style: { flex: 1 },
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const profileOptions = [
    {
      id: 'language',
      title: language === 'ar' ? 'اللغة' : 'Language',
      subtitle: language === 'ar' ? 'العربية / English' : 'العربية / English',
      onPress: toggleLanguage,
    },
    {
      id: 'notifications',
      title: language === 'ar' ? 'الإشعارات' : 'Notifications',
      subtitle: language === 'ar' ? 'إدارة الإشعارات' : 'Manage notifications',
      onPress: () => { },
    },
    {
      id: 'privacy',
      title: language === 'ar' ? 'الخصوصية' : 'Privacy',
      subtitle: language === 'ar' ? 'إعدادات الخصوصية' : 'Privacy settings',
      onPress: () => { },
    },
    {
      id: 'help',
      title: language === 'ar' ? 'المساعدة' : 'Help',
      subtitle: language === 'ar' ? 'الدعم والمساعدة' : 'Support & help',
      onPress: () => { },
    },
    {
      id: 'about',
      title: language === 'ar' ? 'حول التطبيق' : 'About',
      subtitle: language === 'ar' ? 'معلومات التطبيق' : 'App information',
      onPress: () => { },
    },
  ];

  const renderProfileOption = (option: typeof profileOptions[0]) => (
    <TouchableOpacity
      key={option.id}
      style={[styles.optionItem, { backgroundColor: colors.surface }]}
      onPress={option.onPress}
    >
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: colors.text.primary, fontFamily }]}>
          {option.title}
        </Text>
        <Text style={[styles.optionSubtitle, { color: colors.text.secondary, fontFamily }]}>
          {option.subtitle}
        </Text>
      </View>
      <Text style={[styles.arrow, { color: colors.text.muted }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </Text>
        </View>

        <View style={[styles.profileSection, { backgroundColor: colors.surface }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.white, fontFamily }]}>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <Text style={[styles.editLabel, { color: colors.text.secondary, fontFamily }]}>
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </Text>
                <View style={styles.editActions}>
                  <PrimaryButton
                    type="secondary"
                    text={language === 'ar' ? 'إلغاء' : 'Cancel'}
                    props={{
                      onPress: () => {
                        setIsEditing(false);
                        setEditedName(user?.name || '');
                      },
                      style: { flex: 1, marginRight: 8 },
                    }}
                  />
                  <PrimaryButton
                    type="primary"
                    text={language === 'ar' ? 'حفظ' : 'Save'}
                    props={{
                      onPress: handleSaveProfile,
                      style: { flex: 1 },
                    }}
                  />
                </View>
              </View>
            ) : (
              <>
                <Text style={[styles.userName, { color: colors.text.primary, fontFamily }]}>
                  {user?.name}
                </Text>
                <Text style={[styles.userEmail, { color: colors.text.secondary, fontFamily }]}>
                  {user?.email}
                </Text>
                <Text style={[styles.userPhone, { color: colors.text.secondary, fontFamily }]}>
                  {user?.phone}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={[styles.editButtonText, { color: colors.primary, fontFamily }]}>
                    {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'إحصائياتك' : 'Your Stats'}
          </Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statNumber, { color: colors.primary, fontFamily }]}>
                {userStats.totalTrips}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary, fontFamily }]}>
                {language === 'ar' ? 'إجمالي الرحلات' : 'Total Trips'}
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <View style={styles.ratingContainer}>
                {renderStars(Math.floor(userStats.rating), 14)}
              </View>
              <Text style={[styles.statLabel, { color: colors.text.secondary, fontFamily }]}>
                {userStats.rating} ({userStats.reviewsCount} {language === 'ar' ? 'تقييم' : 'reviews'})
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.reviewsButton, { backgroundColor: colors.surface }]}
            onPress={() => setShowReviews(true)}
          >
            <Text style={[styles.reviewsButtonText, { color: colors.primary, fontFamily }]}>
              {language === 'ar' ? 'عرض التقييمات' : 'View Reviews'}
            </Text>
            <Text style={[styles.arrow, { color: colors.text.muted }]}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily }]}>
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </Text>

          {profileOptions.map(renderProfileOption)}
        </View>

        <View style={styles.logoutSection}>
          <PrimaryButton
            type="primary"
            text={language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            props={{
              onPress: handleLogout,
              style: { backgroundColor: colors.error },
            }}
          />
        </View>
      </ScrollView>

      {renderRatingModal()}

      <Modal
        visible={showReviews}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReviews(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.reviewsModal, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text.primary, fontFamily }]}>
                {language === 'ar' ? 'تقييماتك' : 'Your Reviews'}
              </Text>
              <TouchableOpacity onPress={() => setShowReviews(false)}>
                <Text style={[styles.closeButton, { color: colors.text.muted }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.reviewsList}>
              {mockReviews.map((review) => (
                <View key={review.id} style={[styles.reviewCard, { backgroundColor: colors.background }]}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerAvatar}>{review.reviewerAvatar}</Text>
                      <View>
                        <Text style={[styles.reviewerName, { color: colors.text.primary, fontFamily }]}>
                          {review.reviewerName}
                        </Text>
                        <Text style={[styles.reviewDate, { color: colors.text.muted, fontFamily }]}>
                          {review.date} - {review.tripDestination}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.reviewRating}>
                      {renderStars(review.rating, 12)}
                    </View>
                  </View>
                  <Text style={[styles.reviewComment, { color: colors.text.secondary, fontFamily }]}>
                    {review.comment}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  editContainer: {
    width: '100%',
  },
  editLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  editActions: {
    flexDirection: 'row',
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  reviewsButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutSection: {
    paddingBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
  },
  reviewsModal: {
    borderRadius: 16,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reviewsList: {
    padding: 20,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewerAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ProfileScreen;