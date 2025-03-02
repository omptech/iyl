import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, ScrollView, Modal, Animated, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

const THEME = {
  primary: '#6C63FF', // Modern purple
  secondary: '#FF6B6B', // Coral
  accent: '#4ECDC4', // Turquoise
  background: '#F7F7FF', // Light purple tint
  text: '#2D3436', // Dark gray
};

export default function ProfileScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  const toggleMenu = (show: boolean) => {
    setIsMenuVisible(show);
    Animated.timing(slideAnim, {
      toValue: show ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (err) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const navigateAndCloseMenu = (route: '/' | '/profile' | '/leaderboard' | '/premium' | '/feed') => {
    toggleMenu(false);
    setTimeout(() => router.push(route), 300);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => toggleMenu(true)}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase() || 'U'}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <FontAwesome5 name="pencil-alt" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{user?.displayName || 'User'}</Text>
            <Text style={styles.email}>{user?.email || 'No email'}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color="#666" />
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
              <Text style={styles.menuItemText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="language-outline" size={24} color="#666" />
              <Text style={styles.menuItemText}>Language</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="help-circle-outline" size={24} color="#666" />
              <Text style={styles.menuItemText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Add Sign Out Button */}
          <TouchableOpacity 
            style={[styles.signOutButton, loading && styles.disabledButton]} 
            onPress={handleSignOut}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={24} color="#fff" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Side Menu Modal */}
        <Modal
          visible={isMenuVisible}
          animationType="none"
          transparent={true}
          onRequestClose={() => toggleMenu(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackground} 
              activeOpacity={1} 
              onPress={() => toggleMenu(false)}
            />
            <Animated.View 
              style={[
                styles.sideMenu,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <View style={styles.menuHeader}>
                <View style={styles.menuAvatar}>
                  <Text style={styles.menuAvatarText}>{user?.email?.[0].toUpperCase() || 'U'}</Text>
                </View>
                <Text style={styles.menuName}>{user?.displayName || 'User'}</Text>
                <Text style={styles.menuEmail}>{user?.email || 'No email'}</Text>
              </View>
              
              <ScrollView style={styles.menuList}>
                <TouchableOpacity 
                  style={styles.menuListItem}
                  onPress={() => navigateAndCloseMenu('/')}
                >
                  <FontAwesome5 name="home" size={20} color="#333" solid />
                  <Text style={styles.menuListText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuListItem}
                  onPress={() => navigateAndCloseMenu('/profile')}
                >
                  <FontAwesome5 name="user-alt" size={20} color="#333" solid />
                  <Text style={styles.menuListText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuListItem}
                  onPress={() => navigateAndCloseMenu('/leaderboard')}
                >
                  <FontAwesome5 name="trophy" size={20} color="#333" solid />
                  <Text style={styles.menuListText}>Leaderboard</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuListItem}
                  onPress={() => navigateAndCloseMenu('/premium')}
                >
                  <FontAwesome5 name="crown" size={20} color="#333" solid />
                  <Text style={styles.menuListText}>Premium</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuListItem}
                  onPress={() => navigateAndCloseMenu('/feed')}
                >
                  <FontAwesome5 name="newspaper" size={20} color="#333" solid />
                  <Text style={styles.menuListText}>Feed</Text>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity style={styles.menuListItem}>
                  <Ionicons name="settings-outline" size={22} color="#333" />
                  <Text style={styles.menuListText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuListItem}>
                  <Ionicons name="help-circle-outline" size={22} color="#333" />
                  <Text style={styles.menuListText}>Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuListItem, styles.logoutItem]}>
                  <Ionicons name="log-out-outline" size={22} color="#ff4444" />
                  <Text style={[styles.menuListText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 10 : 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuButton: {
    padding: 10,
    marginLeft: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: THEME.primary,
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: THEME.text,
  },
  email: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  menuItems: {
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: THEME.text,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  menuHeader: {
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  menuAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: THEME.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  menuAvatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  menuName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: THEME.text,
  },
  menuEmail: {
    fontSize: 14,
    color: '#64748B',
  },
  menuList: {
    flex: 1,
  },
  menuListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    paddingHorizontal: 25,
  },
  menuListText: {
    fontSize: 16,
    marginLeft: 20,
    color: THEME.text,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
    marginHorizontal: 25,
  },
  logoutItem: {
    marginTop: 20,
  },
  logoutText: {
    color: THEME.secondary,
  },
  signOutButton: {
    backgroundColor: THEME.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    gap: 10,
    shadowColor: THEME.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 