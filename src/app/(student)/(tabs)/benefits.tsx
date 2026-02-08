import { useGetMyCoupons } from "@/src/api/coupon";
import type { IssueCouponResponse } from "@/src/api/generated.schemas";
import { ArrowLeft } from "@/src/shared/common/arrow-left";
import { ThemedText } from "@/src/shared/common/themed-text";
import { rs } from "@/src/shared/theme/scale";
import {
  Coupon as CouponColor,
  Fonts,
  Gray,
  Primary,
  Text as TextColor,
} from "@/src/shared/theme/theme";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CouponFilter = "all" | "FIXED_DISCOUNT" | "PERCENTAGE_DISCOUNT" | "SERVICE_GIFT";
type TabType = "owned" | "expiring" | "used";

const FILTER_BUTTONS: { type: CouponFilter; label: string }[] = [
  { type: "all", label: "전체" },
  { type: "FIXED_DISCOUNT", label: "금액 할인" },
  { type: "PERCENTAGE_DISCOUNT", label: "퍼센트 할인" },
  { type: "SERVICE_GIFT", label: "서비스 증정" },
];

const TABS: { type: TabType; label: string }[] = [
  { type: "owned", label: "보유" },
  { type: "expiring", label: "곧 만료" },
  { type: "used", label: "사용 완료" },
];

const BENEFIT_ICON_BG: Record<string, string> = {
  PERCENTAGE_DISCOUNT: CouponColor.red,
  FIXED_DISCOUNT: CouponColor.green,
  SERVICE_GIFT: CouponColor.yellow,
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}까지`;
};

const isExpiringSoon = (expiresAt?: string) => {
  if (!expiresAt) return false;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffDays = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
};

const formatDiscount = (benefitType?: string, benefitValue?: string) => {
  if (!benefitValue) return "";
  switch (benefitType) {
    case "PERCENTAGE_DISCOUNT":
      return `${benefitValue}%`;
    case "FIXED_DISCOUNT":
      return `${Number(benefitValue).toLocaleString()}원`;
    case "SERVICE_GIFT":
      return "서비스";
    default:
      return benefitValue;
  }
};

export default function BenefitsTab() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<CouponFilter>("all");
  const [selectedTab, setSelectedTab] = useState<TabType>("owned");

  // API 호출
  const { data: myCouponsRes, isLoading } = useGetMyCoupons();
  const rawCoupons = (myCouponsRes as any)?.data?.data;
  const coupons = (Array.isArray(rawCoupons) ? rawCoupons : []) as IssueCouponResponse[];

  // 탭별 필터링
  const tabFilteredCoupons = useMemo(() => {
    switch (selectedTab) {
      case "owned":
        return coupons.filter((c) => c.status === "UNUSED");
      case "expiring":
        return coupons.filter(
          (c) => c.status === "UNUSED" && isExpiringSoon(c.expiresAt),
        );
      case "used":
        return coupons.filter(
          (c) =>
            c.status === "USED" ||
            c.status === "ACTIVATED" ||
            c.status === "EXPIRED",
        );
      default:
        return coupons;
    }
  }, [coupons, selectedTab]);

  // 혜택 타입별 필터링
  const filteredCoupons = useMemo(() => {
    if (selectedFilter === "all") return tabFilteredCoupons;
    return tabFilteredCoupons.filter((c) => c.benefitType === selectedFilter);
  }, [tabFilteredCoupons, selectedFilter]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={rs(24)} />
        <ThemedText style={styles.headerTitle}>쿠폰함</ThemedText>
        <View style={styles.headerRight} />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.type}
              style={styles.tabButton}
              onPress={() => setSelectedTab(tab.type)}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  selectedTab === tab.type && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabDivider} />

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {FILTER_BUTTONS.map((btn) => (
              <TouchableOpacity
                key={btn.type}
                style={[
                  styles.filterButton,
                  selectedFilter === btn.type && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(btn.type)}
              >
                <ThemedText
                  style={[
                    styles.filterButtonText,
                    selectedFilter === btn.type &&
                      styles.filterButtonTextActive,
                  ]}
                >
                  {btn.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Coupon Count */}
        <View style={styles.couponCountContainer}>
          <ThemedText style={styles.couponCountText}>
            쿠폰 {filteredCoupons.length}개
          </ThemedText>
        </View>

        <View
          style={[
            styles.tabIndicator,
            {
              left:
                selectedTab === "owned"
                  ? rs(20)
                  : selectedTab === "expiring"
                    ? rs(20) + rs(60) + rs(60)
                    : rs(20) + rs(60) * 2 + rs(60) * 2,
            },
          ]}
        />
      </View>

      {/* Coupon List */}
      <ScrollView
        style={styles.couponListContainer}
        contentContainerStyle={styles.couponListContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Primary["500"]} />
          </View>
        ) : filteredCoupons.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {selectedTab === "owned"
                ? "보유한 쿠폰이 없습니다"
                : selectedTab === "expiring"
                  ? "곧 만료되는 쿠폰이 없습니다"
                  : "사용 완료된 쿠폰이 없습니다"}
            </ThemedText>
          </View>
        ) : (
          filteredCoupons.map((coupon) => (
            <View key={coupon.studentCouponId} style={styles.couponCard}>
              <View
                style={[
                  styles.couponIconContainer,
                  {
                    backgroundColor:
                      BENEFIT_ICON_BG[coupon.benefitType ?? ""] ??
                      CouponColor.yellow,
                  },
                ]}
              >
                <View style={styles.couponIconPlaceholder} />
              </View>
              <View style={styles.couponTextContainer}>
                <View style={styles.couponTitleContainer}>
                  <ThemedText style={styles.couponTitle}>
                    {coupon.title ?? `쿠폰 #${coupon.studentCouponId}`}
                  </ThemedText>
                  <ThemedText style={styles.couponDescription}>
                    {coupon.description ?? ""}
                  </ThemedText>
                </View>
                <View style={styles.couponFooter}>
                  <ThemedText style={styles.couponExpireDate}>
                    {formatDate(coupon.expiresAt)}
                  </ThemedText>
                  <ThemedText style={styles.couponDiscount}>
                    {formatDiscount(coupon.benefitType, coupon.benefitValue)}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primary["300"],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rs(16),
    height: rs(44),
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: rs(18),
    color: TextColor.primary,
  },
  headerRight: {
    width: rs(24),
  },
  tabContainer: {
    backgroundColor: Gray.white,
    paddingTop: rs(8),
    paddingBottom: rs(8),
  },
  tabRow: {
    flexDirection: "row",
    gap: rs(60),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: rs(20),
  },
  tabButton: {
    width: rs(60),
    height: rs(24),
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: Fonts.regular,
    fontSize: rs(16),
    color: TextColor.placeholder,
  },
  tabTextActive: {
    fontFamily: Fonts.semiBold,
    color: TextColor.primary,
  },
  tabDivider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: rs(2),
    backgroundColor: Gray.gray2,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: rs(95),
    height: rs(2),
    backgroundColor: Gray.black,
  },
  filterContainer: {
    height: rs(44),
  },
  filterScrollContent: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(8),
    gap: rs(8),
    flexDirection: "row",
  },
  filterButton: {
    height: rs(28),
    borderRadius: rs(20),
    paddingHorizontal: rs(12),
    paddingVertical: rs(4),
    backgroundColor: Gray.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Gray.gray3,
  },
  filterButtonActive: {
    backgroundColor: Gray.black,
    borderColor: Gray.black,
  },
  filterButtonText: {
    fontFamily: Fonts.bold,
    fontSize: rs(12),
    color: TextColor.primary,
  },
  filterButtonTextActive: {
    color: Gray.white,
  },
  couponCountContainer: {
    paddingHorizontal: rs(20),
    height: rs(20),
    justifyContent: "center",
  },
  couponCountText: {
    fontFamily: Fonts.medium,
    fontSize: rs(12),
    color: TextColor.primary,
  },
  couponListContainer: {
    flex: 1,
    backgroundColor: Primary["textBg"],
  },
  couponListContent: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(12),
    gap: rs(12),
  },
  couponCard: {
    backgroundColor: Gray.gray1,
    borderRadius: rs(16),
    paddingHorizontal: rs(12),
    paddingVertical: rs(16),
    flexDirection: "row",
    alignItems: "center",
    gap: rs(16),
  },
  couponIconContainer: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(12),
    alignItems: "center",
    justifyContent: "center",
    padding: rs(12),
  },
  couponIconPlaceholder: {
    width: rs(44),
    height: rs(44),
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: rs(8),
  },
  couponTextContainer: {
    flex: 1,
    height: rs(72),
    justifyContent: "space-between",
  },
  couponTitleContainer: {
    gap: rs(0),
  },
  couponTitle: {
    fontFamily: Fonts.medium,
    fontSize: rs(14),
    color: TextColor.primary,
    height: rs(20),
  },
  couponDescription: {
    fontFamily: Fonts.regular,
    fontSize: rs(12),
    color: TextColor.placeholder,
    height: rs(16),
  },
  couponFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponExpireDate: {
    fontFamily: Fonts.medium,
    fontSize: rs(10),
    color: TextColor.secondary,
  },
  couponDiscount: {
    fontFamily: Fonts.medium,
    fontSize: rs(14),
    color: TextColor.primary,
  },
  loadingContainer: {
    paddingVertical: rs(40),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    paddingVertical: rs(40),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: rs(14),
    color: TextColor.tertiary,
  },
});
