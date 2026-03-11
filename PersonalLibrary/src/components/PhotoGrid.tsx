import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  photos: string[];
  maxDisplay?: number;
  onPressViewAll?: () => void;
}

export default function PhotoGrid({ photos, maxDisplay = 4, onPressViewAll }: Props) {
  const displayPhotos = photos.slice(0, maxDisplay);
  const remaining = photos.length - maxDisplay;

  if (photos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="photo-library" size={32} color={colors.textLight} />
        <Text style={styles.emptyText}>Sin fotos</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.grid}>
        {displayPhotos.map((_, index) => (
          <View key={index} style={styles.photoPlaceholder}>
            <MaterialIcons name="image" size={28} color={colors.primaryLight} />
            {index === maxDisplay - 1 && remaining > 0 && (
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{remaining}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      {onPressViewAll && photos.length > 0 && (
        <TouchableOpacity style={styles.viewAllButton} onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>Ver álbum completo</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  overlayText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textLight,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
});
