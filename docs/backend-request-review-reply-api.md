# 백엔드 API 요청사항 — 리뷰 답글 OpenAPI 문서 업데이트

## 요약

리뷰 답글 API는 이미 구현되어 있으나, **openapi.json에 문서화가 누락**되어 프론트엔드에서 타입 생성이 불가능한 상태입니다.

---

## 현재 상태

### ✅ 백엔드 구현 완료 (Java 코드 확인)

```java
// ReviewResponse.java
private Long reviewId;
private Long storeId;
private String username;
private String content;
private Integer rating;
private LocalDateTime createdAt;
private int likeCount;
private List<String> imageUrls;
private List<ReviewResponse> replies;  // ← 답글 리스트 (중첩 구조)
```

### ❌ OpenAPI 문서 누락

`openapi.json`의 `ReviewResponse` 스키마에 `replies` 필드가 없음:

```json
"ReviewResponse": {
  "type": "object",
  "properties": {
    "reviewId": { "type": "integer", "format": "int64" },
    "storeId": { "type": "integer", "format": "int64" },
    "username": { "type": "string" },
    "content": { "type": "string" },
    "rating": { "type": "integer", "format": "int32" },
    "createdAt": { "type": "string", "format": "date-time" },
    "likeCount": { "type": "integer", "format": "int32" },
    "imageUrls": { "type": "array", "items": { "type": "string" } }
    // ❌ "replies" 필드 누락
  }
}
```

---

## 요청 사항

### 1. OpenAPI 스키마 업데이트 (P0 - 필수)

`ReviewResponse`에 `replies` 필드 추가:

```json
"ReviewResponse": {
  "type": "object",
  "properties": {
    "reviewId": { "type": "integer", "format": "int64" },
    "storeId": { "type": "integer", "format": "int64" },
    "username": { "type": "string" },
    "content": { "type": "string" },
    "rating": { "type": "integer", "format": "int32" },
    "createdAt": { "type": "string", "format": "date-time" },
    "likeCount": { "type": "integer", "format": "int32" },
    "imageUrls": { "type": "array", "items": { "type": "string" } },
    "replies": {
      "type": "array",
      "items": { "$ref": "#/components/schemas/ReviewResponse" }
    }
  }
}
```

### 2. API 엔드포인트 문서 정확성 확인

현재 `POST /api/stores/{storeId}/reviews`의 summary:
- ✅ "[공통] 리뷰 및 답글 작성" (이미 업데이트됨)

`CreateReviewRequest` 스키마:
- ✅ `parentReviewId` 필드 포함 확인됨

---

## 프론트엔드 구현 완료 항목

| 기능 | 상태 | 비고 |
|------|------|------|
| 리뷰 목록 조회 | ✅ | `useGetReviews` 연동 완료 |
| 리뷰 통계 조회 | ✅ | `useGetReviewStats` 연동 완료 |
| 답글 작성 | ✅ | `parentReviewId` 파라미터로 구현 |
| 리뷰 신고 | ✅ | `useReportReview` 연동 완료 |
| 미답변/답변완료 필터 | ✅ | `replies` 필드 기반 구현 |
| 답글 UI 표시 | ✅ | 중첩 구조 처리 완료 |

---

## 영향 범위

OpenAPI 문서가 업데이트되면:
1. `npm run generate:api` 실행 시 `ReviewResponse` 타입에 `replies` 필드 포함
2. TypeScript 타입 안정성 확보
3. 추가 프론트 코드 수정 불필요 (이미 런타임에서 정상 동작 중)

---

## 우선순위

| 순위 | 항목 | 사유 |
|------|------|------|
| **P0** | openapi.json에 `replies` 필드 추가 | 타입 생성 및 문서 정확성 |
