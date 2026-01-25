// components/common/divider.tsx
import { StyleSheet, View } from 'react-native';

export function Divider({ spacing = 0 }: { spacing?: number }) {
  return <View style={[styles.divider, { marginVertical: spacing }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});
