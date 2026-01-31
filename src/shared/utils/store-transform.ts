import type { StoreResponse } from '@/src/api/generated.schemas';
import type { Store } from '@/src/shared/types/store';

/**
 * 거리 계산 (Haversine 공식)
 */
export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // 지구 반경 (km)
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

/**
 * StoreResponse (API) → Store (UI) 변환
 */
export function transformStoreResponse(
  response: StoreResponse,
  myLocation?: { lat: number; lng: number } | null,
): Store {
  const lat = response.latitude ?? 0;
  const lng = response.longitude ?? 0;

  let distance = '';
  if (myLocation && lat && lng) {
    const km = getDistanceKm(myLocation.lat, myLocation.lng, lat, lng);
    distance = formatDistance(km);
  }

  return {
    id: String(response.id ?? 0),
    name: response.name ?? '',
    image: response.imageUrls?.[0] ?? '',
    rating: 0, // TODO: 서버에서 averageRating 제공 시 연동
    reviewCount: 0, // TODO: 서버에서 reviewCount 제공 시 연동
    distance,
    openStatus: '', // TODO: 서버에서 영업상태 제공 시 연동
    openHours: response.operatingHours ?? '',
    benefits: [], // TODO: 서버에서 혜택 목록 제공 시 연동
    lat,
    lng,
  };
}

/**
 * StoreResponse[] → Store[] 배열 변환
 */
export function transformStoreResponses(
  responses: StoreResponse[],
  myLocation?: { lat: number; lng: number } | null,
): Store[] {
  return responses.map((r) => transformStoreResponse(r, myLocation));
}
