import {
  NaverMapMarkerOverlay,
  NaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
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
  isShowZoomControls?: boolean;
}

export const NaverMap = forwardRef<NaverMapViewRef, NaverMapProps>(
  function NaverMap(
    {
      center = { lat: 35.8358, lng: 127.1294 }, // 전북대학교 기본 좌표
      markers = [],
      onMapClick,
      onMarkerClick,
      onMapReady,
      style,
      isShowZoomControls = false,
    },
    ref,
  ) {
    const mapRef = useRef<NaverMapViewRef>(null);
    const isInitialMount = useRef(true);

    useImperativeHandle(ref, () => mapRef.current!, []);

    // center prop 변경 시 카메라 이동 (초기 마운트 제외)
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      if (center && mapRef.current) {
        mapRef.current.animateCameraTo({
          latitude: center.lat,
          longitude: center.lng,
          duration: 500,
        });
      }
    }, [center?.lat, center?.lng]);

    return (
      <View style={[styles.container, style]}>
        <NaverMapView
          ref={mapRef}
          style={styles.map}
          initialCamera={{
            latitude: center.lat,
            longitude: center.lng,
            zoom: 15,
          }}
          isShowZoomControls={isShowZoomControls}
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
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
