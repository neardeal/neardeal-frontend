import { ThemedText } from "@/src/shared/common/themed-text";
import { ThemedView } from "@/src/shared/common/themed-view";
import { AppButton } from "@/src/shared/common/app-button";
import { rs } from "@/src/shared/theme/scale";
import { Gray, Owner, Text as TextColors } from "@/src/shared/theme/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// 대기 중 아이콘
function PendingIcon() {
  return (
    <Svg width={rs(80)} height={rs(80)} viewBox="0 0 80 80" fill="none">
      <Circle cx="40" cy="40" r="38" stroke={Owner.primary} strokeWidth="4" />
      <Path
        d="M40 20v20l14 14"
        stroke={Owner.primary}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function PendingApprovalScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* 아이콘 */}
      <View style={styles.iconContainer}>
        <PendingIcon />
      </View>

      {/* 메시지 */}
      <View style={styles.messageContainer}>
        <ThemedText type="subtitle" style={styles.title}>
          승인 대기 중입니다
        </ThemedText>
        <ThemedText style={styles.description}>
          관리자 승인 후 서비스를 이용하실 수 있습니다.
        </ThemedText>
        <ThemedText style={styles.description}>
          일반적으로 1-2 영업일이 소요됩니다.
        </ThemedText>
      </View>

      {/* 안내 카드 */}
      <View style={styles.infoCard}>
        <ThemedText style={styles.infoTitle}>📌 안내사항</ThemedText>
        <ThemedText style={styles.infoText}>
          • 승인 완료 시 알림을 보내드립니다
        </ThemedText>
        <ThemedText style={styles.infoText}>
          • 문의사항은 고객센터로 연락해주세요
        </ThemedText>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottomContent}>
        <AppButton
          label="상태 새로고침"
          backgroundColor={Owner.primary}
          onPress={() => {
            // TODO: 승인 상태 확인 API 호출
            alert("아직 승인 대기 중입니다.");
          }}
        />
        <AppButton
          label="로그아웃"
          backgroundColor={Gray.gray4}
          textColor={TextColors.primary}
          onPress={() => {
            // TODO: 로그아웃 처리
            router.replace("/");
          }}
          style={{ marginTop: rs(12) }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray.white,
    padding: rs(20),
  },
  iconContainer: {
    alignItems: "center",
    marginTop: rs(60),
    marginBottom: rs(32),
  },
  messageContainer: {
    gap: rs(12),
    alignItems: "center",
    marginBottom: rs(40),
  },
  title: {
    fontSize: rs(24),
    fontWeight: "800",
    color: TextColors.primary,
    textAlign: "center",
  },
  description: {
    fontSize: rs(14),
    color: TextColors.secondary,
    textAlign: "center",
    lineHeight: rs(20),
  },
  infoCard: {
    backgroundColor: Gray.gray1,
    borderRadius: rs(12),
    padding: rs(20),
    gap: rs(8),
    marginBottom: rs(32),
  },
  infoTitle: {
    fontSize: rs(14),
    fontWeight: "700",
    color: TextColors.primary,
    marginBottom: rs(4),
  },
  infoText: {
    fontSize: rs(13),
    color: TextColors.secondary,
    lineHeight: rs(18),
  },
  bottomContent: {
    marginTop: "auto",
  },
});
