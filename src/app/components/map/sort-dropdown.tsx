import { ThemedText } from '@/src/shared/common/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SortOption {
  id: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SortDropdown({ options, selectedId, onSelect }: SortDropdownProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selectedId === option.id && styles.optionActive,
          ]}
          onPress={() => onSelect(option.id)}
        >
          <ThemedText
            style={[
              styles.optionText,
              selectedId === option.id && styles.optionTextActive,
            ]}
          >
            {option.label}
          </ThemedText>
          {selectedId === option.id && (
            <Ionicons name="checkmark" size={20} color="#34b262" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionActive: {
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontSize: 15,
    color: '#1d1b20',
  },
  optionTextActive: {
    color: '#34b262',
    fontWeight: '600',
  },
});
