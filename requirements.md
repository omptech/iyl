**React Native Android App UI Requirements**

**Overview:**
Develop a React Native Android application with a user interface similar to the provided screenshot. The app should facilitate real-time audio call-based English learning and include features such as user authentication, streak tracking, and co-learner connectivity.

---

### **1. General Layout & Design**
- **Home Screen:**
  - Greeting message with user's name
  - Inspirational quote (dynamic, truncated if necessary)
  - Online user count display
  - Filter options for selecting co-learners (Free, Female, Male)
  - "Connect with Co-learners" button
  - Streak progress bar (shows minutes practiced out of daily goal)
  - Weekly streak tracking section (0/7 days completed indicator)
  - Section for motivation and practice reminders

- **Bottom Navigation Bar:**
  - Home
  - Profile
  - Leaderboard
  - Premium
  - Feed

---

### **2. Features & Functionality**
#### **2.1 User Authentication**
- Firebase authentication integration
- Login via email/Google/Facebook
- User profile with editable name

#### **2.2 Matching & Calls**
- WebRTC-based audio calling
- Peer-to-peer matching based on filters (Free, Female, Male)
- Indicate online users count dynamically
- "Connect with Co-learners" button to initiate a call

#### **2.3 Streak & Progress Tracking**
- Display streak progress (e.g., minutes practiced out of daily target)
- Weekly streak tracking (7-day indicator with filled circles)
- Motivational messages based on streak status
- Daily reminders for practice

#### **2.4 Leaderboard & Gamification**
- Points system for participation
- Leaderboard ranking
- Streak rewards system

#### **2.5 Premium Features**
- Locked UI elements for premium users
- Upgrade to premium button
- Subscription management

---

### **3. UI Components**
#### **3.1 Typography & Colors**
- Bold headers for user greeting
- Dynamic truncated text for motivational quote
- Clear CTA buttons with contrast
- Color theme inspired by the provided screenshot (teal buttons, white background, gray text)

#### **3.2 Buttons & Controls**
- Filter selection buttons (toggle-style for Free, Female, Male)
- Primary CTA button for connecting with co-learners
- Streak progress bar with gradient fill
- Bottom navigation with icons and labels

---

### **4. Technical Requirements**
- **Framework:** React Native
- **UI Library:** React Native Paper (Material Design-based UI components)
- **State Management:** Context API or Redux
- **Backend Services:** Firebase for authentication, Firestore for user data
- **WebRTC:** Peer.js for handling audio calls
- **Database:** Firestore for storing user streaks, match history
- **Navigation:** React Navigation for screen transitions
- **Push Notifications:** Firebase Cloud Messaging (FCM) for reminders

---

### **5. API Integrations**
- **Firebase Authentication** (Sign in, Sign up, Logout)
- **Firestore Database** (Store user profiles, streak data, and match history)
- **WebRTC (Peer.js)** for real-time calling
- **FCM** for push notifications

---

### **6. Additional Notes**
- Ensure responsiveness for various Android screen sizes
- Keep UI smooth and optimized for performance
- Implement error handling for network and authentication failures

This document serves as a UI and functionality reference for the development of the React Native app, ensuring alignment with the provided screenshot.

