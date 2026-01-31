import { NaverMap } from '@/src/app/(student)/components/map/naver-map-view';
import { SelectedStoreDetail } from '@/src/app/(student)/components/map/selected-store-detail';
import { FilterTab, StoreFilterModal } from '@/src/app/(student)/components/map/store-filter-modal';
import { StoreCard } from '@/src/app/(student)/components/store/store-card';
import { SelectModal } from '@/src/shared/common/select-modal';
import { ThemedText } from '@/src/shared/common/themed-text';
import { ThemedView } from '@/src/shared/common/themed-view';
import {
  CATEGORY_TABS,
  DISTANCE_OPTIONS,
  SNAP_INDEX,
  SORT_OPTIONS,
} from '@/src/shared/constants/map';
import { useTabBar } from '@/src/shared/contexts/tab-bar-context';
import { useMapSearch } from '@/src/shared/hooks/use-map-search';
import { rs } from '@/src/shared/theme/scale';
import { Gray, Owner, Text } from '@/src/shared/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapTab() {
  const { setTabBarVisible } = useTabBar();
  const router = useRouter();
  const searchInputRef = useRef<TextInput>(null);

  const {
    keyword,
    setKeyword,
    viewMode,
    selectedCategory,
    selectedSort,
    setSelectedSort,
    selectedDistance,
    setSelectedDistance,
    selectedStoreTypes,
    selectedMoods,
    selectedEvents,
    mapCenter,
    setMapCenter,
    currentIndexRef,
    submittedKeyword,
    stores,
    markers,
    selectedStore,
    isLoading,
    refetchStores,
    myLocation,
    handleSearchFocus,
    handleSearch,
    handleCategorySelect,
    handleStoreSelect,
    handleMarkerClick,
    handleMapClick,
    handleBack,
    handleFilterApply,
    handleStoreTypeToggle,
    handleMoodToggle,
    handleEventToggle,
  } = useMapSearch();

  // 모달 state
  const [showSortModal, setShowSortModal] = useState(false);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>('storeType');

  // 바텀시트 ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 탭 포커스/블러 시 탭바 제어
  // - 다른 탭으로 이동(blur) → 탭바 강제 복구
  // - 다시 돌아올 때(focus) → 현재 상태에 맞게 탭바 적용
  useFocusEffect(
    useCallback(() => {
      if (viewMode === 'list') {
        setTabBarVisible(false);
      } else {
        setTabBarVisible(currentIndexRef.current === SNAP_INDEX.COLLAPSED);
      }

      return () => {
        setTabBarVisible(true);
      };
    }, [viewMode, setTabBarVisible, currentIndexRef]),
  );

  // viewMode 변경 시 탭바 제어
  useEffect(() => {
    if (viewMode === 'list') {
      setTabBarVisible(false);
    } else {
      setTabBarVisible(currentIndexRef.current === SNAP_INDEX.COLLAPSED);
    }
  }, [viewMode, setTabBarVisible, currentIndexRef]);

  // snap points
  const snapPoints = useMemo(() => {
    const collapsedHeight = 220;
    return [collapsedHeight, '50%', '80%'];
  }, []);

  // 바텀시트 인덱스 변경
  const handleSheetChanges = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      setTabBarVisible(index === SNAP_INDEX.COLLAPSED);
    },
    [setTabBarVisible, currentIndexRef],
  );

  // 뒤로가기
  const handleBackPress = useCallback(() => {
    const handled = handleBack();
    if (!handled) {
      // 바텀시트가 확장된 상태면 접기
      if (currentIndexRef.current > SNAP_INDEX.COLLAPSED) {
        bottomSheetRef.current?.snapToIndex(SNAP_INDEX.COLLAPSED);
      }
    }
  }, [handleBack, currentIndexRef]);

  // 지도 클릭
  const onMapClick = useCallback(() => {
    handleMapClick();
    bottomSheetRef.current?.snapToIndex(SNAP_INDEX.COLLAPSED);
  }, [handleMapClick]);

  // 마커 클릭
  const onMarkerClick = useCallback(
    (markerId: string) => {
      handleMarkerClick(markerId);
      bottomSheetRef.current?.snapToIndex(SNAP_INDEX.HALF);
    },
    [handleMarkerClick],
  );

  // 가게 상세 보기
  const handleViewStoreDetail = useCallback(
    (storeId: string) => {
      const store = stores.find((s) => s.id === storeId);
      router.push({
        pathname: '/store/[id]',
        params: {
          id: storeId,
          name: store?.name ?? '',
          image: store?.image ?? '',
          rating: String(store?.rating ?? 0),
          reviewCount: String(store?.reviewCount ?? 0),
        },
      });
    },
    [stores, router],
  );

  // 리스트에서 가게 카드 클릭
  const handleStoreCardPress = useCallback(
    (storeId: string) => {
      Keyboard.dismiss();
      handleStoreSelect(storeId);
      bottomSheetRef.current?.snapToIndex(SNAP_INDEX.HALF);
    },
    [handleStoreSelect],
  );

  // 검색 포커스
  const onSearchFocus = useCallback(() => {
    handleSearchFocus();
  }, [handleSearchFocus]);

  // 검색 실행
  const onSearchSubmit = useCallback(() => {
    handleSearch();
    Keyboard.dismiss();
  }, [handleSearch]);

  // 필터 모달 핸들러
  const handleOpenFilterModal = (tab: FilterTab) => {
    setActiveFilterTab(tab);
    setShowFilterModal(true);
  };

  const handleSortSelect = (sortId: string | number) => {
    setSelectedSort(String(sortId));
  };

  const handleDistanceSelect = (distanceId: string | number) => {
    setSelectedDistance(String(distanceId));
  };

  const onFilterApply = () => {
    handleFilterApply();
    setShowFilterModal(false);
  };

  // ────────────────────────────────────────────
  // 공통: 검색바 + 카테고리 탭
  // ────────────────────────────────────────────
  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <TouchableOpacity style={styles.searchIconButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color={Text.primary} />
        </TouchableOpacity>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="행운의 가게를 검색하세요!"
          placeholderTextColor={Text.placeholder}
          value={keyword}
          onChangeText={setKeyword}
          onFocus={onSearchFocus}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchIconButton} onPress={onSearchSubmit}>
          <Ionicons name="search" size={24} color={Text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {CATEGORY_TABS.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.filterButton,
            selectedCategory === category.id && styles.filterButtonActive,
          ]}
          onPress={() => handleCategorySelect(category.id)}
        >
          {selectedCategory === category.id && (
            <Ionicons
              name="checkmark"
              size={16}
              color={Gray.white}
              style={styles.filterCheck}
            />
          )}
          <ThemedText
            style={[
              styles.filterText,
              selectedCategory === category.id && styles.filterTextActive,
            ]}
          >
            {category.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // ────────────────────────────────────────────
  // 공통: 필터 칩 행
  // ────────────────────────────────────────────
  const renderFilterChips = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bottomFilterContent}
    >
      {/* 정렬 버튼 */}
      <TouchableOpacity
        style={styles.bottomFilterButton}
        onPress={() => setShowSortModal(true)}
      >
        <ThemedText style={styles.bottomFilterText}>
          {SORT_OPTIONS.find((o) => o.id === selectedSort)?.label}
        </ThemedText>
        <Ionicons name="chevron-down" size={14} color={Text.primary} />
      </TouchableOpacity>

      {/* 가게 종류 버튼 */}
      <TouchableOpacity
        style={styles.bottomFilterButton}
        onPress={() => handleOpenFilterModal('storeType')}
      >
        <ThemedText style={styles.bottomFilterText}>가게 종류</ThemedText>
        <Ionicons name="chevron-down" size={14} color={Text.primary} />
      </TouchableOpacity>

      {/* 이벤트 버튼 */}
      <TouchableOpacity
        style={styles.bottomFilterButton}
        onPress={() => handleOpenFilterModal('event')}
      >
        <ThemedText style={styles.bottomFilterText}>이벤트</ThemedText>
        <Ionicons name="chevron-down" size={14} color={Text.primary} />
      </TouchableOpacity>
    </ScrollView>
  );

  // ────────────────────────────────────────────
  // 리스트 뷰 (전체화면)
  // ────────────────────────────────────────────
  if (viewMode === 'list') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.listSafeArea} edges={['top']}>
          {renderSearchBar()}

          {/* 검색어 제출 전에는 카테고리/필터/목록 숨김 */}
          {submittedKeyword ? (
            <>
              {renderCategoryTabs()}
              <View style={styles.listFilterRow}>{renderFilterChips()}</View>

              {isLoading ? (
                <View style={styles.centerContent}>
                  <ActivityIndicator size="large" color={Owner.primary} />
                </View>
              ) : stores.length > 0 ? (
                <FlatList
                  data={stores}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <StoreCard
                      store={item}
                      onPress={() => handleStoreCardPress(item.id)}
                    />
                  )}
                  contentContainerStyle={styles.listContent}
                  keyboardShouldPersistTaps="handled"
                />
              ) : (
                <View style={styles.centerContent}>
                  <View style={styles.emptyStateCard}>
                    <ThemedText style={styles.emptyStateTitle}>
                      아직 찾으시는 데이터이 안 보여요...
                    </ThemedText>
                    <ThemedText style={styles.emptyStateText}>
                      {'\u2022'} 검색어의 철자가 정확한지 확인해 보세요.
                    </ThemedText>
                    <ThemedText style={styles.emptyStateText}>
                      {'\u2022'} 다른 키워드로 검색해 보시겠어요?
                    </ThemedText>
                    <ThemedText style={styles.emptyStateText}>
                      {'\u2022'} 필터 조건을 변경하면 더 많은 결과를 찾을 수 있어요!
                    </ThemedText>
                  </View>
                </View>
              )}
            </>
          ) : (
            <View style={styles.centerContent}>
              <ThemedText style={styles.emptyStateTitle}>
                검색어를 입력해 주세요
              </ThemedText>
            </View>
          )}
        </SafeAreaView>

        {/* 모달들 */}
        <SelectModal
          visible={showSortModal}
          options={SORT_OPTIONS}
          selectedId={selectedSort}
          onSelect={handleSortSelect}
          onClose={() => setShowSortModal(false)}
        />
        <StoreFilterModal
          visible={showFilterModal}
          activeTab={activeFilterTab}
          selectedStoreTypes={selectedStoreTypes}
          selectedMoods={selectedMoods}
          selectedEvents={selectedEvents}
          onTabChange={setActiveFilterTab}
          onStoreTypeToggle={handleStoreTypeToggle}
          onMoodToggle={handleMoodToggle}
          onEventToggle={handleEventToggle}
          onClose={() => setShowFilterModal(false)}
          onApply={onFilterApply}
        />
      </ThemedView>
    );
  }

  // ────────────────────────────────────────────
  // 지도 뷰 (기본)
  // ────────────────────────────────────────────
  return (
    <ThemedView style={styles.container}>
      {/* 지도 */}
      <NaverMap
        center={mapCenter}
        markers={markers}
        onMapClick={onMapClick}
        onMarkerClick={onMarkerClick}
        onMapReady={() => {}}
        style={styles.map}
        isShowZoomControls={false}
      />

      {/* 오버레이 UI */}
      <SafeAreaView style={styles.overlay} edges={['top']} pointerEvents="box-none">
        {renderSearchBar()}
        {renderCategoryTabs()}
      </SafeAreaView>

      {/* 지도 컨트롤 버튼 */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => refetchStores()}>
          <Ionicons name="refresh" size={20} color={Owner.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => bottomSheetRef.current?.snapToIndex(SNAP_INDEX.HALF)}
        >
          <Ionicons name="list" size={20} color={Owner.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (myLocation) {
              setMapCenter({ lat: myLocation.lat, lng: myLocation.lng });
            }
          }}
        >
          <Ionicons name="locate" size={20} color={Owner.primary} />
        </TouchableOpacity>
      </View>

      {/* 바텀시트 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={SNAP_INDEX.COLLAPSED}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}
        enablePanDownToClose={false}
      >
        <View style={styles.bottomSheetContent}>
          {/* 바텀시트 헤더 */}
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity
              style={styles.bottomSheetTriggerContent}
              onPress={() => setShowDistanceModal(true)}
            >
              <ThemedText type="subtitle" lightColor={Text.primary}>
                주변 {DISTANCE_OPTIONS.find((o) => o.id === selectedDistance)?.label}
              </ThemedText>
              <Ionicons name="chevron-down" size={20} color={Text.primary} />
            </TouchableOpacity>

            {renderFilterChips()}
          </View>

          {/* 가게 목록 / 선택된 가게 상세 */}
          <BottomSheetScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.storeListContent}
          >
            {selectedStore ? (
              <SelectedStoreDetail
                store={selectedStore}
                onViewDetail={() => handleViewStoreDetail(selectedStore.id)}
              />
            ) : isLoading ? (
              <View style={styles.loadingState}>
                <ActivityIndicator size="large" color={Owner.primary} />
              </View>
            ) : stores.length > 0 ? (
              stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onPress={() => handleStoreCardPress(store.id)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <ThemedText style={styles.emptyStateTitle}>
                  아직 찾으시는 데이터이 안 보여요...
                </ThemedText>
                <ThemedText style={styles.emptyStateText}>
                  {'\u2022'} 다른 검색어로 시도해보세요
                </ThemedText>
              </View>
            )}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>

      {/* 정렬 선택 모달 */}
      <SelectModal
        visible={showSortModal}
        options={SORT_OPTIONS}
        selectedId={selectedSort}
        onSelect={handleSortSelect}
        onClose={() => setShowSortModal(false)}
      />

      {/* 거리 선택 모달 */}
      <SelectModal
        visible={showDistanceModal}
        options={DISTANCE_OPTIONS}
        selectedId={selectedDistance}
        onSelect={handleDistanceSelect}
        onClose={() => setShowDistanceModal(false)}
      />

      {/* 필터 모달 */}
      <StoreFilterModal
        visible={showFilterModal}
        activeTab={activeFilterTab}
        selectedStoreTypes={selectedStoreTypes}
        selectedMoods={selectedMoods}
        selectedEvents={selectedEvents}
        onTabChange={setActiveFilterTab}
        onStoreTypeToggle={handleStoreTypeToggle}
        onMoodToggle={handleMoodToggle}
        onEventToggle={handleEventToggle}
        onClose={() => setShowFilterModal(false)}
        onApply={onFilterApply}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  // 검색바
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Gray.white,
    borderRadius: 12,
    height: rs(56),
    paddingHorizontal: 8,
  },
  searchIconButton: {
    width: rs(40),
    height: rs(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Text.primary,
  },
  // 카테고리 탭
  filterContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Gray.white,
    borderWidth: 1,
    borderColor: Owner.primary,
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: Gray.black,
    borderColor: Owner.primary,
  },
  filterCheck: {
    marginRight: 4,
  },
  filterText: {
    fontSize: 14,
    color: Text.primary,
  },
  filterTextActive: {
    color: Gray.white,
  },
  // 지도 컨트롤
  mapControls: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -60 }],
    gap: 12,
  },
  controlButton: {
    width: rs(44),
    height: rs(44),
    borderRadius: 20,
    backgroundColor: Gray.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Gray.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // 바텀시트
  bottomSheetBackground: {
    backgroundColor: Gray.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bottomSheetHandle: {
    backgroundColor: Gray.gray4,
    width: 40,
    height: 4,
  },
  bottomSheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: Gray.white,
    zIndex: 1,
  },
  bottomSheetTriggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  bottomFilterContent: {
    gap: 8,
    paddingBottom: 12,
  },
  bottomFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Gray.gray2,
    borderWidth: 1,
    borderColor: Gray.gray4,
    gap: 4,
  },
  bottomFilterText: {
    fontSize: 13,
    color: Text.primary,
  },
  // 가게 목록
  storeListContent: {
    paddingHorizontal: 16,
  },
  // 로딩
  loadingState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Text.secondary,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: Text.tertiary,
    marginBottom: 4,
  },
  // ── 리스트 뷰 전용 ──
  listSafeArea: {
    flex: 1,
    backgroundColor: Gray.white,
  },
  listFilterRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexGrow: 0,
    flexShrink: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateCard: {
    backgroundColor: '#f0f4ff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
});
