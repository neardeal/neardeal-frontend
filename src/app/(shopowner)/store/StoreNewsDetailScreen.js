import { useGetStore } from '@/src/api/store';
import { useDeleteStoreNews, useGetComments, useGetStoreNews } from '@/src/api/store-news';
import { rs } from '@/src/shared/theme/scale';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

// [삭제] 더미 데이터 주석 처리/제거
// const COMMENTS = [...];

export default function StoreNewsDetailScreen({ navigation, route }) {



    const { newsItem: initialNewsItem, storeId } = route.params || {};
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // 전체화면 이미지 상태

    // 1. 상세 데이터 가져오기 (실시간 좋아요, 댓글 수 반영)
    const { data: detailResponse, isLoading: isDetailLoading } = useGetStoreNews(initialNewsItem?.id);
    const newsItem = detailResponse?.data?.data || initialNewsItem;



    // 2. 댓글 목록 가져오기
    const { data: commentsResponse, isLoading: isCommentsLoading } = useGetComments(newsItem?.id, { query: { page: 0, size: 50, sort: 'createdAt,desc' } });
    const comments = commentsResponse?.data?.data?.content || [];

    // 3. 가게 정보 가져오기 (가게 이름 표시용)
    const { data: storeResponse } = useGetStore(storeId);
    const storeInfo = storeResponse?.data?.data;
    const storeName = storeInfo?.name ? `${storeInfo.name}${storeInfo.branch ? ` ${storeInfo.branch}` : ''}` : '';

    const queryClient = useQueryClient();

    // 삭제 Mutation
    const deleteMutation = useDeleteStoreNews({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`/api/stores/${storeId}/news`] });
                Alert.alert("완료", "소식이 삭제되었습니다.", [
                    { text: "확인", onPress: () => navigation.goBack() }
                ]);
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("오류", "소식 삭제 중 문제가 발생했습니다.");
            }
        }
    });

    // 수정 버튼 핸들러
    const handleEdit = () => {
        // 쓰기 페이지로 이동하되, 현재 데이터를 넘겨줌 (수정 모드)
        navigation.navigate('StoreNewsWrite', {
            newsItem: newsItem,
            isEdit: true,
            storeId: storeId
        });
    };

    // 삭제 확인 핸들러
    const confirmDelete = () => {
        setDeleteModalVisible(false);
        if (newsItem?.id) {
            deleteMutation.mutate({ newsId: newsItem.id });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: 'white' }} />

            {/* 1. 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="arrow-back" size={rs(24)} color="#1B1D1F" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* 2. 가게 이름 및 날짜 */}
                <View style={styles.topSection}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <View style={styles.metaRow}>
                        <View style={styles.tagBox}>
                            <Ionicons name="megaphone" size={rs(16)} color="#309821" />
                            <Text style={styles.tagText}>소식</Text>
                        </View>
                        <Text style={styles.dateText}>{newsItem?.createdAt ? newsItem.createdAt.substring(0, 10) : ""}</Text>
                    </View>
                </View>

                {/* 3. 본문 내용 */}
                <View style={styles.bodySection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.newsTitle}>{newsItem?.title || ""}</Text>
                        <View style={styles.editDeleteBox}>
                            <TouchableOpacity onPress={handleEdit}><Text style={styles.actionText}>수정</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}><Text style={styles.actionText}>삭제</Text></TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.newsContent}>
                        {newsItem?.content || ""}
                    </Text>

                    {/* 이미지 영역 */}
                    {(() => {
                        const rawImages = newsItem?.imageUrls || newsItem?.images || [];
                        const validImages = rawImages.map(img => {
                            if (typeof img === 'string') return img;
                            return img?.url || img?.uri || null;
                        }).filter(Boolean);

                        if (validImages.length === 0) return null;

                        return (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScroll}>
                                {validImages.map((url, idx) => (
                                    <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => setSelectedImage(url)}>
                                        <Image source={{ uri: url }} style={styles.imageBox} resizeMode="cover" />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        );
                    })()}
                </View>

                {/* 4. 통계 및 구분선 */}
                <View style={styles.statsSection}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name={newsItem?.liked ? "heart" : "heart-outline"} size={rs(18)} color={newsItem?.liked ? "#FF437C" : "black"} />
                            <Text style={styles.statText}>{newsItem?.likeCount || 0}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="chatbubble-outline" size={rs(18)} color="black" />
                            <Text style={styles.statText}>{newsItem?.commentCount || 0}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                </View>

                {/* 5. 댓글 리스트 */}
                <View style={styles.commentList}>
                    {isCommentsLoading ? (
                        <ActivityIndicator size="small" color="#FF6200" />
                    ) : comments.length === 0 ? (
                        <View style={{ paddingVertical: rs(20), alignItems: 'center' }}>
                            <Text style={{ fontSize: rs(12), color: '#828282' }}>아직 댓글이 없습니다.</Text>
                        </View>
                    ) : (
                        comments.map((comment) => (
                            <View key={comment.id} style={styles.commentItem}>
                                {/* 프로필 이미지 (API에 필드가 없으므로 우선 기본 아이콘 유지, 추후 profileImageUrl 등 추가 시 대응) */}
                                <View style={[styles.avatar, { backgroundColor: '#F2F4F7' }]}>
                                    {comment.profileImageUrl ? (
                                        <Image source={{ uri: comment.profileImageUrl }} style={styles.avatarImage} resizeMode="cover" />
                                    ) : (
                                        <Ionicons name="person" size={rs(18)} color="#98A2B3" />
                                    )}
                                </View>
                                <View style={styles.commentTextBox}>
                                    <View style={styles.commentUserRow}>
                                        <Text style={styles.commentUser}>{comment.nickname || '익명'}</Text>
                                        <Text style={styles.dateTextSmall}>{comment.createdAt ? comment.createdAt.substring(5, 10).replace('-', '.') : ""}</Text>
                                    </View>
                                    <Text style={styles.commentContent}>{comment.content}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

            </ScrollView>

            {/* ==================== 삭제 커스텀 팝업 ==================== */}
            <Modal transparent visible={deleteModalVisible} animationType="fade" onRequestClose={() => setDeleteModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setDeleteModalVisible(false)}>
                    <TouchableWithoutFeedback>
                        <View style={styles.popupContainer}>
                            <View style={styles.popupTextGroup}>
                                <Text style={styles.popupTitle}>소식을 삭제하시겠어요?</Text>
                                <Text style={styles.popupDesc}>
                                    소식 삭제 시 해당 소식 정보는 복구가 불가능합니다.{'\n'}
                                    정말로 삭제하시겠어요?
                                </Text>
                            </View>
                            <View style={styles.popupBtnGroup}>
                                <TouchableOpacity style={styles.popupCancelBtn} onPress={() => setDeleteModalVisible(false)}>
                                    <Text style={styles.popupCancelText}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.popupDeleteBtn} onPress={confirmDelete}>
                                    <Text style={styles.popupDeleteText}>삭제하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            {/* ==================== 이미지 전체보기 모달 ==================== */}
            <Modal visible={!!selectedImage} transparent={true} animationType="fade" onRequestClose={() => setSelectedImage(null)}>
                <SafeAreaView style={styles.fullScreenContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                        <Ionicons name="close" size={rs(30)} color="white" />
                    </TouchableOpacity>
                    <View style={styles.fullScreenImageContainer}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
                        )}
                    </View>
                </SafeAreaView>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    header: {
        paddingHorizontal: rs(20),
        paddingVertical: rs(10),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },

    content: {
        paddingHorizontal: rs(20),
        paddingBottom: rs(50)
    },

    // 상단 스타일
    topSection: { marginTop: rs(10), gap: rs(10) },
    storeName: { fontSize: rs(20), fontWeight: '700', color: 'black', fontFamily: 'Pretendard', lineHeight: rs(30) },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: rs(10) },
    tagBox: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
    tagText: { fontSize: rs(14), fontWeight: '700', color: '#309821', fontFamily: 'Pretendard' },
    dateText: { fontSize: rs(12), fontWeight: '400', color: '#828282', fontFamily: 'Pretendard' },

    // 본문 스타일
    bodySection: { gap: rs(20), marginTop: rs(10) },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    newsTitle: { fontSize: rs(18), fontWeight: '600', color: 'black', fontFamily: 'Inter' },
    editDeleteBox: { flexDirection: 'row', gap: rs(10) },
    actionText: { fontSize: rs(12), fontWeight: '600', color: '#828282', fontFamily: 'Pretendard' },
    newsContent: { fontSize: rs(14), fontWeight: '400', color: '#828282', fontFamily: 'Pretendard', lineHeight: rs(19.6) },
    imageScroll: { flexDirection: 'row', gap: rs(5) },
    imageBox: { width: rs(150), height: rs(150), backgroundColor: '#D9D9D9', marginRight: rs(5) },

    // 통계 및 댓글
    statsSection: { marginTop: rs(20), gap: rs(10), alignItems: 'flex-end' },
    statsRow: { flexDirection: 'row', alignItems: 'center', gap: rs(15) },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
    statText: { fontSize: rs(12), fontWeight: '500', color: 'black', fontFamily: 'Pretendard' },
    divider: { width: '100%', height: 1, backgroundColor: '#E6E6E6' },
    commentList: { marginTop: rs(15), gap: rs(15) },
    commentItem: { flexDirection: 'row', alignItems: 'flex-start', gap: rs(10) }, // [B] Row layout
    avatar: { width: rs(33), height: rs(33), borderRadius: rs(16.5), justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%' },
    commentTextBox: { flex: 1, gap: rs(2) }, // [B] Gap between name and content
    commentUserRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rs(2) },
    commentUser: { fontSize: rs(14), fontWeight: '700', color: 'black', fontFamily: 'Pretendard' }, // [B] Size up
    commentContent: { fontSize: rs(14), fontWeight: '400', color: '#333333', fontFamily: 'Pretendard', lineHeight: rs(20) }, // [B] Color darken
    dateTextSmall: { fontSize: rs(12), color: '#828282', fontFamily: 'Pretendard' },


    // [팝업 스타일]
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    popupContainer: { width: rs(335), backgroundColor: 'white', borderRadius: rs(10), paddingVertical: rs(26), paddingHorizontal: rs(14), alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 },
    popupTextGroup: { marginBottom: rs(25), alignItems: 'center', gap: rs(10) },
    popupTitle: { fontSize: rs(20), fontWeight: '700', color: 'black', fontFamily: 'Pretendard', textAlign: 'center' },
    popupDesc: { fontSize: rs(14), fontWeight: '500', color: '#828282', fontFamily: 'Pretendard', textAlign: 'center', lineHeight: rs(20) },
    popupBtnGroup: { flexDirection: 'row', gap: rs(7), width: '100%' },
    popupCancelBtn: { flex: 1, height: rs(40), backgroundColor: '#D5D5D5', borderRadius: rs(8), justifyContent: 'center', alignItems: 'center' },
    popupCancelText: { color: 'white', fontSize: rs(14), fontWeight: '700', fontFamily: 'Pretendard' },
    popupDeleteBtn: { flex: 1, height: rs(40), backgroundColor: '#FF6200', borderRadius: rs(8), justifyContent: 'center', alignItems: 'center' },
    popupDeleteText: { color: 'white', fontSize: rs(14), fontWeight: '700', fontFamily: 'Pretendard' },

    // [전체화면 이미지 모달]
    fullScreenContainer: { flex: 1, backgroundColor: 'black' },
    closeButton: { position: 'absolute', top: Platform.OS === 'android' ? rs(40) : rs(50), right: rs(20), zIndex: 10, padding: rs(5), backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: rs(20) },
    fullScreenImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    fullScreenImage: { width: '100%', height: '100%' },
});