import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SiteSettingsProvider } from './src/contexts/SiteSettingsContext';
import AppNavigator from './src/navigation/AppNavigator';

import { useFonts, Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold, Cairo_800ExtraBold } from '@expo-google-fonts/cairo';

// RTL handled via textAlign:'right' in styles
// I18nManager.forceRTL causes crash on some Android Expo Go versions
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_800ExtraBold,
  });

  if (fontsLoaded) {
    (Text as any).defaultProps = (Text as any).defaultProps || {};
    (Text as any).defaultProps.style = [{ fontFamily: 'Cairo_400Regular' }, (Text as any).defaultProps.style];

    (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
    (TextInput as any).defaultProps.style = [{ fontFamily: 'Cairo_400Regular' }, (TextInput as any).defaultProps.style];
  }

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <SiteSettingsProvider>
            <AuthProvider>
              <NavigationContainer>
                <AppNavigator />
                <StatusBar style="light" />
              </NavigationContainer>
            </AuthProvider>
          </SiteSettingsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
