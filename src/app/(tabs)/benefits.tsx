import { ThemedText } from "@/src/components/themed-text";
import { rs } from "@/src/theme/scale";
import { Primary } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CouponType = "all" | "amount" | "percent" | "service";
type TabType = "owned" | "expiring" | "used";

interface Coupon {
  id: string;
  title: string;
  description: string;
  expireDate: string;
  discount: string;
  type: CouponType;
  iconBgColor: string;
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: "1",
    title: "첫 방문 10% 할인",
    description: "새해 이벤트로 커피 할인해드려용",
    expireDate: "2026.01.10까지",
    discount: "10%",
    type: "percent",
    iconBgColor: "#FFDDDE",
  },
  {
    id: "2",
    title: "음료 메뉴 할인쿠폰",
    description: "새해 이벤트로 커피 할인해드려용",
    expireDate: "2026.01.10까지",
    discount: "1,000원",
    type: "amount",
    iconBgColor: "#BEFFD1",
  },
  {
    id: "3",
    title: "미니 붕어빵 증정",
    description: "새해 이벤트로 커피 할인해드려용",
    expireDate: "2026.01.10까지",
    discount: "1,000원",
    type: "service",
    iconBgColor: "#FFEABC",
  },
];

const FILTER_BUTTONS: { type: CouponType; label: string }[] = [
  { type: "all", label: "전체" },
  { type: "amount", label: "금액 할인" },
  { type: "percent", label: "퍼센트 할인" },
  { type: "service", label: "서비스 증정" },
];

const TABS: { type: TabType; label: string }[] = [
  { type: "owned", label: "보유" },
  { type: "expiring", label: "곧 만료" },
  { type: "used", label: "사용 완료" },
];

export default function BenefitsTab() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<CouponType>("all");
  const [selectedTab, setSelectedTab] = useState<TabType>("owned");

  const filteredCoupons =
    selectedFilter === "all"
      ? MOCK_COUPONS
      : MOCK_COUPONS.filter((c) => c.type === selectedFilter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={rs(24)} color="#1B1D1F" />
        </TouchableOpacity>
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
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.type && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
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
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === btn.type &&
                      styles.filterButtonTextActive,
                  ]}
                >
                  {btn.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Coupon Count */}
        <View style={styles.couponCountContainer}>
          <Text style={styles.couponCountText}>
            쿠폰 {filteredCoupons.length}개
          </Text>
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
        {filteredCoupons.map((coupon) => (
          <View key={coupon.id} style={styles.couponCard}>
            <View
              style={[
                styles.couponIconContainer,
                { backgroundColor: coupon.iconBgColor },
              ]}
            >
              <View style={styles.couponIconPlaceholder} />
            </View>
            <View style={styles.couponTextContainer}>
              <View style={styles.couponTitleContainer}>
                <Text style={styles.couponTitle}>{coupon.title}</Text>
                <Text style={styles.couponDescription}>
                  {coupon.description}
                </Text>
              </View>
              <View style={styles.couponFooter}>
                <Text style={styles.couponExpireDate}>{coupon.expireDate}</Text>
                <Text style={styles.couponDiscount}>{coupon.discount}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primary['300'],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rs(16),
    height: rs(44),
  },
  backButton: {
    width: rs(24),
    height: rs(24),
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Pretendard",
    fontSize: rs(18),
    fontWeight: "700",
    color: "#000000",
  },
  headerRight: {
    width: rs(24),
  },
  filterContainer: {
    height: rs(45),
  },
  filterScrollContent: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(10),
    gap: rs(8),
    flexDirection: "row",
  },
  filterButton: {
    height: rs(25),
    borderRadius: rs(20),
    paddingHorizontal: rs(10),
    paddingVertical: rs(5),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: "#000000",
  },
  filterButtonText: {
    fontFamily: "Pretendard",
    fontSize: rs(12),
    fontWeight: "700",
    color: "#000000",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  couponCountContainer: {
    paddingHorizontal: rs(20),
    height: rs(17),
    justifyContent: "center",
  },
  couponCountText: {
    fontFamily: "Pretendard",
    fontSize: rs(12),
    fontWeight: "500",
    color: "#000000",
  },
  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: rs(9),
    paddingBottom: rs(9),
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
    height: rs(22),
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: "Pretendard",
    fontSize: rs(16),
    fontWeight: "400",
    color: "#828282",
  },
  tabTextActive: {
    fontWeight: "600",
    color: "#000000",
  },
  tabDivider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: rs(2),
    backgroundColor: "#F5F5F5",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: rs(95),
    height: rs(2),
    backgroundColor: "#000000",
  },
  couponListContainer: {
    flex: 1,
    backgroundColor: Primary['textBg']
  },
  couponListContent: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(10),
    gap: rs(10),
  },
  couponCard: {
    backgroundColor: "#FBFBFB",
    borderRadius: rs(15),
    paddingHorizontal: rs(10),
    paddingVertical: rs(17.5),
    flexDirection: "row",
    alignItems: "center",
    gap: rs(15),
  },
  couponIconContainer: {
    width: rs(65),
    height: rs(65),
    borderRadius: rs(12),
    alignItems: "center",
    justifyContent: "center",
    padding: rs(12),
  },
  couponIconPlaceholder: {
    width: rs(45),
    height: rs(45),
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: rs(8),
  },
  couponTextContainer: {
    flex: 1,
    height: rs(74),
    justifyContent: "space-between",
  },
  couponTitleContainer: {
    gap: rs(0),
  },
  couponTitle: {
    fontFamily: "Pretendard",
    fontSize: rs(14),
    fontWeight: "500",
    color: "#000000",
    height: rs(20),
  },
  couponDescription: {
    fontFamily: "Pretendard",
    fontSize: rs(12),
    fontWeight: "400",
    color: "#828282",
    height: rs(17),
  },
  couponFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponExpireDate: {
    fontFamily: "Pretendard",
    fontSize: rs(10),
    fontWeight: "500",
    color: "#757575",
  },
  couponDiscount: {
    fontFamily: "Pretendard",
    fontSize: rs(14),
    fontWeight: "500",
    color: "#000000",
  },
});
