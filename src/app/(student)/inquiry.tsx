import InquiryScreen from "@/src/shared/screens/inquiry/InquiryScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function InquiryRoute() {
  const router = useRouter();
  const params = useLocalSearchParams<{ initialTab?: string }>();

  const navigation = {
    goBack: () => router.back(),
    navigate: (screen: string) => {
      if (screen === "InquiryComplete") {
        router.push("/inquiry-complete");
      }
    },
  };

  const route = {
    params: {
      initialTab: params.initialTab,
    },
  };

  return <InquiryScreen navigation={navigation} route={route} />;
}
