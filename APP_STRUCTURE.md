# Safar DZ - Algeria Trip Sharing App

A React Native app for Algeria that helps people without cars to share trips and transportation. Users can create trips, join existing trips, and manage their transportation needs.

## Features

### Authentication
- **Login Screen**: Users can sign in with email and password
- **Register Screen**: New users can create accounts with full name, email, phone, and password
- **Authentication Context**: Manages user state and authentication flow

### Main App Screens
- **Home Screen**: Browse available trips with search and filtering
- **My Trips Screen**: View upcoming and past trips (as driver or passenger)
- **Create Trip Screen**: Drivers can create new trips with destination, date, time, seats, and price
- **Profile Screen**: Manage user profile, settings, and logout

### Key Features
- **Bilingual Support**: Arabic and English with RTL support
- **Theme Support**: Light and dark mode
- **Trip Management**: Create, join, and manage trips
- **User Roles**: Support for both drivers and passengers
- **Real-time Updates**: Trip availability and status updates

## App Architecture

### Contexts
- `ThemeProvider`: Manages light/dark theme and colors
- `LanguageProvider`: Handles Arabic/English language switching
- `AuthProvider`: Manages user authentication and state

### Navigation
- `AuthNavigator`: Handles authentication flow (login/register)
- `MainTabNavigator`: Bottom tab navigation for main app screens

### Screens Structure
```
src/
├── contexts/
│   ├── AuthProvider.tsx
│   ├── LanguageProvider.tsx
│   └── ThemeProvider.tsx
├── screens/
│   ├── auth/
│   │   ├── AuthScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── main/
│       ├── HomeScreen.tsx
│       ├── TripsScreen.tsx
│       ├── CreateTripScreen.tsx
│       └── ProfileScreen.tsx
├── navigation/
│   ├── AuthNavigator.tsx
│   └── MainTabNavigator.tsx
└── components/
    ├── PrimaryButton.tsx
    └── TextFeild.tsx
```

## Usage

### Authentication
- Use `test@example.com` and `password` for testing login
- Register new accounts with valid information

### Creating Trips
- Drivers can create trips with destination, pickup location, date, time, number of seats, and price
- Popular destinations include Tipaza, Oran, Constantine, Annaba, Bejaia, and Tlemcen

### Joining Trips
- Passengers can browse available trips and see available seats
- Trip cards show driver information, rating, pickup/dropoff locations, and price

## Technical Details

- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage for user data persistence
- **Styling**: StyleSheet with theme-based colors
- **Icons**: Emoji-based icons for simplicity

## Getting Started

1. Install dependencies: `npm install`
2. Run on Android: `npm run android`
3. Run on iOS: `npm run ios`

## Mock Data

The app includes mock trip data for demonstration:
- Trip to Tipaza (2 seats available, 500 DA)
- Trip to Oran (1 seat available, 800 DA)  
- Trip to Constantine (3 seats available, 600 DA)

Users can test the full flow from authentication to trip management with this mock data.
