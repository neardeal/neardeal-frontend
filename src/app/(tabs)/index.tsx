import { rs } from "@/src/theme/scale";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NearDealLogo from "@/assets/images/logo/neardeal-logo.svg";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo and Icons */}
        <View style={styles.header}>
          <NearDealLogo width={rs(92)} height={rs(28)} />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🔍</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🔔</Text>
              </View>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileGradient}>
            <View style={styles.profileContent}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greetingSubtext}>
                  시험 기간 힘내세요! 💪
                </Text>
                <Text style={styles.greetingText}>니어딜님, 반가워요!</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View style={styles.statHeader}>
                    <View style={styles.pointIcon}>
                      <Text style={styles.pointIconText}>🪙</Text>
                    </View>
                    <Text style={styles.statLabel}>포인트</Text>
                  </View>
                  <Text style={styles.statValue}>3,500 P</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statHeader}>
                    <View style={styles.couponIcon}>
                      <Text style={styles.couponIconText}>🎟️</Text>
                    </View>
                    <Text style={styles.statLabel}>쿠폰</Text>
                  </View>
                  <Text style={styles.statValue}>3장</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Event Banner */}
        <View style={styles.eventBanner}>
          <View style={styles.eventBannerGradient}>
            <Text style={styles.eventEmoji}>☕</Text>
            <View style={styles.eventTextContainer}>
              <Text style={styles.eventTitle}>니어딜 독점!</Text>
              <Text style={styles.eventDescription}>
                학교 앞 '00 카페' 아메리카노 1,000원!
              </Text>
            </View>
            <View style={styles.bannerIndicator}>
              <View style={styles.indicatorDotActive} />
              <View style={styles.indicatorDot} />
              <View style={styles.indicatorDot} />
            </View>
          </View>
        </View>

        {/* Category Grid - Row 1 */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryRow}>
            <CategoryItem icon="📋" label="전체" color="#6c7993" />
            <CategoryItem icon="🍽️" label="식당" color="#ef6939" />
            <CategoryItem icon="🍺" label="주점" color="#d98026" />
            <CategoryItem icon="☕" label="카페" color="#19a2e6" />
          </View>
          <View style={styles.categoryRow}>
            <CategoryItem icon="🎮" label="놀거리" color="#7547d1" />
            <CategoryItem icon="💆" label="뷰티•헬스" color="#dd3c71" />
            <CategoryItem icon="···" label="ETC" color="#e052b1" />
            <CategoryItem icon="🎁" label="이벤트" color="#2eb85c" />
          </View>
        </View>

        {/* 지금 아니면 못 받아요! Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>⚡</Text>
            <Text style={styles.sectionTitle}>지금 아니면 못 받아요!</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>더 보기</Text>
            <Text style={styles.moreArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 사용 임박 쿠폰 모음 Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.couponScrollView}
          contentContainerStyle={styles.couponScrollContent}
        >
          <ExpiringCouponCard
            emoji="🥐"
            storeName="파리바게트"
            productName="마감 빵 세트"
            discount="4,000원 할인"
            timeLeft="00:28:40"
          />
          <ExpiringCouponCard
            emoji="☕"
            storeName="카페 디딤"
            productName="아메리카노"
            discount="1,500원 쿠폰"
            timeLeft="00:52:13"
          />
          <ExpiringCouponCard
            emoji="🍔"
            storeName="롯데리아"
            productName="치즈볼 3구"
            discount="치즈볼 증정 쿠폰"
            timeLeft="01:34:58"
          />
        </ScrollView>

        {/* 지금 인기있는 곳 Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>🔥</Text>
            <Text style={styles.sectionTitle}>지금 인기있는 곳</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>더 보기</Text>
            <Text style={styles.moreArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Places Ranking */}
        <View style={styles.rankingContainer}>
          <RankingItem
            rank={1}
            name="000 돈까스"
            category="식당"
            benefit="1,000원 할인"
            discount="15%"
          />
          <RankingItem
            rank={2}
            name="카페 00"
            category="카페"
            benefit="음료 1+1"
            discount="12%"
          />
          <RankingItem
            rank={3}
            name="00 헬스"
            category="뷰티•헬스"
            benefit="피티 3회 무료"
            discount="8%"
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Category Item Component
interface CategoryItemProps {
  icon: string;
  label: string;
  color: string;
}

function CategoryItem({ icon, label, color }: CategoryItemProps) {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[styles.categoryIconCircle, { backgroundColor: color }]}>
        <Text style={styles.categoryIconText}>{icon}</Text>
      </View>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Ranking Item Component
interface RankingItemProps {
  rank: number;
  name: string;
  category: string;
  benefit: string;
  discount: string;
}

function RankingItem({
  rank,
  name,
  category,
  benefit,
  discount,
}: RankingItemProps) {
  const rankColors = ["#34b262", "#4a90d9", "#f5a623"];

  return (
    <View style={styles.rankingItem}>
      <View
        style={[
          styles.rankCircle,
          { backgroundColor: rankColors[rank - 1] || "#888" },
        ]}
      >
        <Text style={styles.rankNumber}>{rank}</Text>
      </View>
      <View style={styles.rankingInfo}>
        <View style={styles.rankingNameRow}>
          <Text style={styles.rankingName}>{name}</Text>
          <Text style={styles.rankingCategory}>{category}</Text>
        </View>
        <Text style={styles.rankingBenefit}>{benefit}</Text>
      </View>
      <View style={styles.discountBadge}>
        <Text style={styles.discountArrow}>↗</Text>
        <Text style={styles.discountText}>{discount}</Text>
      </View>
    </View>
  );
}

// Expiring Coupon Card Component
interface ExpiringCouponCardProps {
  emoji: string;
  storeName: string;
  productName: string;
  discount: string;
  timeLeft: string;
}

function ExpiringCouponCard({
  emoji,
  storeName,
  productName,
  discount,
  timeLeft,
}: ExpiringCouponCardProps) {
  return (
    <View style={styles.couponCard}>
      <View style={styles.couponTopSection}>
        <Text style={styles.couponEmoji}>{emoji}</Text>
      </View>
      <View style={styles.couponBottomSection}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏰</Text>
          <Text style={styles.timerText}>{timeLeft}</Text>
        </View>
        <Text style={styles.couponStoreName}>{storeName}</Text>
        <Text style={styles.couponProductName}>{productName}</Text>
        <Text style={styles.couponDiscount}>{discount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: rs(22),
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: rs(10),
    paddingBottom: rs(16),
  },
  headerIcons: {
    flexDirection: "row",
    gap: rs(11),
  },
  iconButton: {
    position: "relative",
  },
  iconCircle: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: rs(14),
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: rs(7),
    height: rs(7),
    borderRadius: rs(3.5),
    backgroundColor: "#ff3e41",
  },

  // Profile Section
  profileSection: {
    width: "100%",
  },
  profileGradient: {
    backgroundColor: "#34b262",
    borderRadius: rs(16),
    padding: rs(20),
  },
  profileContent: {
    gap: rs(20),
  },
  greetingContainer: {
    gap: rs(4),
  },
  greetingSubtext: {
    fontSize: rs(12),
    fontWeight: "500",
    color: "#ffffff",
    opacity: 0.9,
  },
  greetingText: {
    fontSize: rs(18),
    fontWeight: "700",
    color: "#ffffff",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: rs(12),
    padding: rs(16),
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: rs(8),
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(4),
  },
  pointIcon: {
    width: rs(12),
    height: rs(12),
    justifyContent: "center",
    alignItems: "center",
  },
  pointIconText: {
    fontSize: rs(10),
  },
  couponIcon: {
    width: rs(12),
    height: rs(12),
    justifyContent: "center",
    alignItems: "center",
  },
  couponIconText: {
    fontSize: rs(10),
  },
  statLabel: {
    fontSize: rs(12),
    fontWeight: "500",
    color: "#ffffff",
  },
  statValue: {
    fontSize: rs(18),
    fontWeight: "700",
    color: "#ffffff",
  },
  statDivider: {
    width: rs(1),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  // Event Banner
  eventBanner: {
    marginTop: rs(16),
  },
  eventBannerGradient: {
    backgroundColor: "#ff8c42",
    borderRadius: rs(16),
    padding: rs(16),
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eventEmoji: {
    fontSize: rs(32),
  },
  eventTextContainer: {
    flex: 1,
    paddingLeft: rs(12),
  },
  eventTitle: {
    fontSize: rs(12),
    fontWeight: "600",
    color: "#ffffff",
    opacity: 0.9,
  },
  eventDescription: {
    fontSize: rs(14),
    fontWeight: "700",
    color: "#ffffff",
    marginTop: rs(2),
  },
  bannerIndicator: {
    position: "absolute",
    bottom: rs(8),
    right: rs(16),
    flexDirection: "row",
    gap: rs(4),
  },
  indicatorDotActive: {
    width: rs(15),
    height: rs(6),
    borderRadius: rs(3),
    backgroundColor: "#ffffff",
  },
  indicatorDot: {
    width: rs(6),
    height: rs(6),
    borderRadius: rs(3),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  // Category
  categoryContainer: {
    marginTop: rs(20),
    gap: rs(8),
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: rs(72),
    height: rs(75),
    backgroundColor: "#ffffff",
    borderRadius: rs(12),
    alignItems: "center",
    justifyContent: "center",
    gap: rs(8),
  },
  categoryIconCircle: {
    width: rs(37),
    height: rs(37),
    borderRadius: rs(18.5),
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIconText: {
    fontSize: rs(18),
    color: "#ffffff",
  },
  categoryLabel: {
    fontSize: rs(12),
    fontWeight: "500",
    color: "#000000",
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: rs(24),
    paddingBottom: rs(12),
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(4),
  },
  sectionIcon: {
    fontSize: rs(18),
  },
  sectionTitle: {
    fontSize: rs(16),
    fontWeight: "700",
    color: "#000000",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(2),
  },
  moreButtonText: {
    fontSize: rs(12),
    color: "#828282",
  },
  moreArrow: {
    fontSize: rs(14),
    color: "#828282",
  },

  // Ranking
  rankingContainer: {
    backgroundColor: "#ffffff",
    borderRadius: rs(12),
    overflow: "hidden",
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rankCircle: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    justifyContent: "center",
    alignItems: "center",
  },
  rankNumber: {
    fontSize: rs(14),
    fontWeight: "700",
    color: "#ffffff",
  },
  rankingInfo: {
    flex: 1,
    paddingLeft: rs(12),
  },
  rankingNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(8),
  },
  rankingName: {
    fontSize: rs(14),
    fontWeight: "600",
    color: "#000000",
  },
  rankingCategory: {
    fontSize: rs(12),
    color: "#828282",
  },
  rankingBenefit: {
    fontSize: rs(12),
    color: "#4bbb6d",
    marginTop: rs(4),
  },
  discountBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(2),
  },
  discountArrow: {
    fontSize: rs(10),
    color: "#34b262",
  },
  discountText: {
    fontSize: rs(12),
    fontWeight: "600",
    color: "#34b262",
  },

  // Expiring Coupons
  couponScrollView: {
    marginTop: rs(8),
    marginHorizontal: rs(-22),
  },
  couponScrollContent: {
    paddingHorizontal: rs(22),
    gap: rs(12),
  },
  couponCard: {
    width: rs(120),
    height: rs(151),
    backgroundColor: "#ffffff",
    borderRadius: rs(12),
    overflow: "hidden",
  },
  couponTopSection: {
    height: rs(52),
    backgroundColor: "#fff4e6",
    justifyContent: "center",
    alignItems: "center",
  },
  couponEmoji: {
    fontSize: rs(24),
  },
  couponBottomSection: {
    flex: 1,
    padding: rs(10),
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: rs(4),
  },
  timerIcon: {
    fontSize: rs(10),
  },
  timerText: {
    fontSize: rs(10),
    color: "#dc2626",
    fontWeight: "600",
  },
  couponStoreName: {
    fontSize: rs(10),
    color: "#828282",
    marginTop: rs(6),
  },
  couponProductName: {
    fontSize: rs(12),
    fontWeight: "600",
    color: "#000000",
    marginTop: rs(2),
  },
  couponDiscount: {
    fontSize: rs(12),
    fontWeight: "700",
    color: "#ef6239",
    marginTop: rs(4),
  },

  bottomSpacer: {
    height: rs(100),
  },
});
