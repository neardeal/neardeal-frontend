import { NaverMapMarkerOverlay, NaverMapView } from '@mj-studio/react-native-naver-map';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title?: string;
}

interface NaverMapProps {
  center?: { lat: number; lng: number };
  markers?: MarkerData[];
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerClick?: (markerId: string) => void;
  onMapReady?: () => void;
  style?: object;
}

export function NaverMap({
  center = { lat: 35.8358, lng: 127.1294 }, // 전북대학교 기본 좌표
  markers = [],
  onMapClick,
  onMarkerClick,
  onMapReady,
  style,
}: NaverMapProps) {
  return (
    <View style={[styles.container, style]}>
      <NaverMapView
        style={styles.map}
        initialCamera={{
          latitude: center.lat,
          longitude: center.lng,
          zoom: 15,
        }}
        onInitialized={onMapReady}
        onTapMap={(event) => {
          onMapClick?.(event.latitude, event.longitude);
        }}
      >
        {markers.map((marker) => (
          <NaverMapMarkerOverlay
            key={marker.id}
            latitude={marker.lat}
            longitude={marker.lng}
            onTap={() => onMarkerClick?.(marker.id)}
            caption={marker.title ? { text: marker.title } : undefined}
          />
        ))}
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
