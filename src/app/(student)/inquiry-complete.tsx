import InquiryCompleteScreen from "@/src/shared/screens/inquiry/InquiryCompleteScreen";
import { useRouter } from "expo-router";

export default function InquiryCompleteRoute() {
  const router = useRouter();

  const navigation = {
    replace: (screen: string, params?: Record<string, string>) => {
      if (screen === "Inquiry") {
        router.replace({
          pathname: "/inquiry",
          params,
        });
      }
    },
  };

  return <InquiryCompleteScreen navigation={navigation} />;
}
