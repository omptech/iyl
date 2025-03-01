import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const THEME = {
  primary: '#6C63FF', // Modern purple
  secondary: '#FF6B6B', // Coral
  accent: '#4ECDC4', // Turquoise
  background: '#F7F7FF', // Light purple tint
  text: '#2D3436', // Dark gray
  gradient: ['#6C63FF', '#4ECDC4'],
};

export default function HomeScreen() {
  // Mock data - will be replaced with real data later
  const userName = "Omprakash Lodhi";
  const quote = "Success is not for th_";
  const onlineUsers = 1051;
  const streakMinutes = 0;
  const dailyGoal = 5;

  const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
  const weeklyStreak = 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: THEME.background }]}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={28} color={THEME.text} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>IYL</Text>
          </View>
          <View style={styles.streakPoints}>
            <FontAwesome5 name="fire" size={24} color={THEME.secondary} />
            <Text style={styles.streakCount}>0</Text>
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello, {userName}!</Text>
          <Text style={styles.quote}>{quote}</Text>
        </View>

        {/* Filter Section */}
        <View style={styles.filterCard}>
          <View style={styles.filterHeader}>
            <View style={styles.onlineCount}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>{onlineUsers} online</Text>
            </View>
            <View style={styles.filterIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="chatbubble-outline" size={24} color={THEME.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="time-outline" size={24} color={THEME.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filters}>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
              <Text style={[styles.filterText, styles.activeFilterText]}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Male</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.connectButton}>
            <FontAwesome5 name="phone-alt" size={16} color="#fff" style={styles.connectIcon} />
            <Text style={styles.connectButtonText}>Connect with Co-learners</Text>
          </TouchableOpacity>
        </View>

        {/* Streak Progress */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <FontAwesome5 name="fire" size={24} color={THEME.secondary} />
            <Text style={styles.streakTitle}>Streak Progress</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <Text style={styles.progressText}>{streakMinutes}m / {dailyGoal}m</Text>
          </View>
        </View>

        {/* Weekly Streak */}
        <View style={styles.weeklyStreakCard}>
          <Text style={styles.weeklyTitle}>
            <FontAwesome5 name="calendar" size={16} color={THEME.primary} /> This Week's Streak - {weeklyStreak}/7
          </Text>
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <View key={day} style={styles.dayItem}>
                <View style={[styles.dayDot, index < weeklyStreak && styles.dayDotActive]} />
                <Text style={[styles.dayText, day === 'Mon' && styles.currentDay]}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Motivation Section */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>
            <FontAwesome5 name="fire" size={16} color={THEME.secondary} /> Keep Your Streak Alive!
          </Text>
          <Text style={styles.motivationText}>✨ Practice daily for fluency gains! 📈</Text>
          <Text style={styles.motivationText}>💬 One chat a day can change everything.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 10 : 15,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.primary,
  },
  menuButton: {
    padding: 10,
    marginLeft: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.secondary,
  },
  greetingSection: {
    marginBottom: 25,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    color: THEME.text,
  },
  quote: {
    fontSize: 18,
    color: '#64748B',
    fontStyle: 'italic',
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  onlineCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  onlineText: {
    fontSize: 16,
    color: THEME.text,
    fontWeight: '500',
  },
  onlineDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    marginRight: 8,
  },
  filterIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filters: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilter: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  filterText: {
    color: THEME.text,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
  connectButton: {
    backgroundColor: THEME.primary,
    padding: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  connectIcon: {
    marginRight: 10,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME.text,
  },
  progressBar: {
    height: 45,
    backgroundColor: '#F1F5F9',
    borderRadius: 22.5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '20%',
    backgroundColor: THEME.accent,
    borderRadius: 22.5,
    opacity: 0.2,
  },
  progressText: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '500',
    zIndex: 1,
  },
  weeklyStreakCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME.primary,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dayItem: {
    alignItems: 'center',
    gap: 8,
  },
  dayDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  dayDotActive: {
    backgroundColor: THEME.accent,
    borderColor: THEME.accent,
  },
  dayText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  currentDay: {
    color: THEME.primary,
    fontWeight: '600',
  },
  motivationCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: THEME.text,
  },
  motivationText: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 22,
  },
});
