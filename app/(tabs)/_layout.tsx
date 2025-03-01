import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';

const THEME = {
  primary: '#6C63FF', // Modern purple
  secondary: '#FF6B6B', // Coral
  accent: '#4ECDC4', // Turquoise
  background: '#F7F7FF', // Light purple tint
  text: '#2D3436', // Dark gray
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 25 : 12,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 85 : 65,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 0,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={22} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={20} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="trophy" size={20} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: 'Premium',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="crown" size={18} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          href: '/feed',
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="newspaper" size={20} color={color} solid />
          ),
        }}
      />
    </Tabs>
  );
}
