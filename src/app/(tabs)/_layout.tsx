import { HomeIcons } from "@/assets/images/icons/home";
import { useTabBar } from "@/src/contexts/tab-bar-context";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { isTabBarVisible } = useTabBar();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#34b262",
        tabBarInactiveTintColor: "#1d1b20",
        tabBarStyle: isTabBarVisible
          ? {
              backgroundColor: "#ffffff",
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              height: 56 + insets.bottom,
              paddingBottom: insets.bottom,
              paddingTop: 8,
            }
          : { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.home width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.location width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.gift width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <HomeIcons.person width={size} height={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
