import { ThemedText } from '@/src/shared/common/themed-text';
import { rs } from '@/src/shared/theme/scale';
import { Brand, Gray } from '@/src/shared/theme/theme';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { SectionHeader } from './section-header';

interface EventItem {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  imageUrls: string[];
}

interface EventSectionProps {
  events: EventItem[];
}

// 이벤트 상태별 스타일
const EVENT_STYLES = {
  LIVE: {
    background: '#EFF9FE',
    badge: '#61ADE3',
    highlight: '#2086BA',
  },
  UPCOMING: {
    background: '#FEF1F0',
    badge: '#FA726B',
    highlight: '#FA5F54',
  },
  ENDED: {
    background: Gray.gray2,
    badge: Gray.gray5,
    highlight: Gray.gray6,
  },
};

export function EventSection({ events }: EventSectionProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleMorePress = () => {
    // TODO: 이벤트 목록 페이지 구현 후 연결
    router.push('/map?category=EVENT' as any);
  };

  const handleEventPress = (_eventId: number) => {
    // TODO: 이벤트 상세 페이지 구현 후 연결
    router.push(`/map?category=EVENT` as any);
  };

  const getDDayText = (event: EventItem) => {
    if (event.status === 'LIVE') {
      return 'D-DAY';
    }

    const start = new Date(event.startDateTime);
    const now = new Date();
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'D-DAY';
    return `D-${diffDays}`;
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  if (events.length === 0) {
    return null;
  }

  const renderEventCard = ({ item }: { item: EventItem }) => {
    const ddayText = getDDayText(item);
    const style = EVENT_STYLES[item.status] || EVENT_STYLES.UPCOMING;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleEventPress(item.id)}
        activeOpacity={0.8}
      >
        {/* 상단 컬러 영역 */}
        <View style={[styles.cardTop, { backgroundColor: style.background }]}>
          <View style={[styles.ddayBadge, { backgroundColor: style.badge }]}>
            <ThemedText style={styles.ddayText}>{ddayText}</ThemedText>
          </View>
          <ThemedText style={styles.eventTitle} numberOfLines={2}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.eventDescription} numberOfLines={1}>
            참여하고{' '}
            <ThemedText style={[styles.eventHighlight, { color: style.highlight }]}>
              {item.description}
            </ThemedText>
          </ThemedText>
          {item.imageUrls.length > 0 && (
            <Image
              source={{ uri: item.imageUrls[0] }}
              style={styles.eventImage}
              resizeMode="contain"
            />
          )}
        </View>
        {/* 하단 흰색 영역 */}
        <View style={styles.cardBottom}>
          <ThemedText style={styles.eventDate}>
            {formatEventDate(item.startDateTime, item.endDateTime)}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        icon="🎉"
        title="지금 바로 진행중인 이벤트!"
        onMorePress={handleMorePress}
      />
      <FlatList
        ref={flatListRef}
        data={events.slice(0, 10)}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.indicatorContainer}>
        {events.slice(0, 3).map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function formatEventDate(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours <= 12 ? hours : hours - 12;
    return `${period} ${displayHours}시${minutes > 0 ? ` ${minutes}분` : ''}`;
  };

  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day} ${formatTime(startDate)} ~ ${formatTime(endDate)}`;
}

const styles = StyleSheet.create({
  container: {
    gap: rs(8),
  },
  listContent: {
    gap: rs(12),
  },
  card: {
    width: rs(172),
    borderRadius: rs(8),
    overflow: 'hidden',
  },
  cardTop: {
    height: rs(100),
    padding: rs(12),
    position: 'relative',
  },
  ddayBadge: {
    position: 'absolute',
    top: rs(12),
    left: rs(12),
    paddingHorizontal: rs(8),
    paddingVertical: rs(4),
    borderRadius: rs(12),
  },
  ddayText: {
    fontSize: rs(10),
    fontWeight: '700',
    color: Gray.white,
  },
  eventTitle: {
    marginTop: rs(24),
    fontSize: rs(12),
    fontWeight: '600',
    color: Gray.black,
    lineHeight: rs(16),
  },
  eventDescription: {
    marginTop: rs(4),
    fontSize: rs(10),
    fontWeight: '400',
    color: Gray.black,
  },
  eventHighlight: {
    fontWeight: '700',
  },
  eventImage: {
    position: 'absolute',
    right: rs(8),
    bottom: rs(8),
    width: rs(60),
    height: rs(50),
  },
  cardBottom: {
    height: rs(40),
    backgroundColor: Gray.white,
    justifyContent: 'center',
    paddingHorizontal: rs(12),
  },
  eventDate: {
    fontSize: rs(9),
    color: Gray.gray6,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rs(4),
    paddingTop: rs(8),
  },
  indicator: {
    width: rs(4),
    height: rs(4),
    borderRadius: rs(2),
    backgroundColor: Gray.gray4,
  },
  indicatorActive: {
    width: rs(12),
    backgroundColor: Brand.primary,
  },
});
