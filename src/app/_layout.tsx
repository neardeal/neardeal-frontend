import { TabBarProvider } from "@/src/shared/contexts/tab-bar-context";
import { AuthProvider } from "@/src/shared/lib/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "react-native-reanimated";
import { useAuth } from "../shared/lib/auth";

// 점주용 앱 import
import ShopOwnerApp from "@/src/shopowner/ShopOwnerNavigator";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();


// 👇 새로운 컴포넌트: userType 체크
function AppContent() {
  const { userType, isLoading: authLoading } = useAuth();
  
  // 학생용 폰트 (Pretendard)
  const [studentFonts] = useFonts({
    "Pretendard-Regular": require("@/assets/font/pretendard/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("@/assets/font/pretendard/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("@/assets/font/pretendard/Pretendard-SemiBold.ttf"),
    "Pretendard-Bold": require("@/assets/font/pretendard/Pretendard-Bold.ttf"),
  });

  // 점주용 폰트 (Inter) - 파일 추가 필요
  const [ownerFonts] = useFonts({
    "Inter-Regular": require("@/assets/font/inter/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/font/inter/Inter-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/font/inter/Inter-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/font/inter/Inter-Bold.ttf"),
  });

  const fontsLoaded = userType === 'ROLE_OWNER' ? ownerFonts : studentFonts;

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoading]);

  if (!fontsLoaded || authLoading) return null;

  // 👇 점주 로그인 시 점주용 앱
  if (userType === 'ROLE_OWNER') {
    return <ShopOwnerApp />;
  }

  // 👇 학생 또는 미로그인 시 기존 Expo Router 흐름
  return (
    <TabBarProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="landing" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </TabBarProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}