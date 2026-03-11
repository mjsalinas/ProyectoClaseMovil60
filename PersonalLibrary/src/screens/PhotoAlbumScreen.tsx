import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function PhotoAlbumScreen({ route }: any) {
  const { bookTitle, photos: routePhotos } = route.params;
  const photos: string[] = routePhotos || [];

  const renderPhotoItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity style={styles.photoItem} activeOpacity={0.8}>
      <View style={styles.photoInner}>
        <MaterialIcons name="image" size={36} color={colors.primaryLight} />
        <Text style={styles.photoLabel}>Foto {index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="menu-book" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.bookTitle} numberOfLines={1}>{bookTitle}</Text>
            <Text style={styles.photoCount}>{photos.length} fotos en el álbum</Text>
          </View>
        </View>
      </View>

      {photos.length > 0 ? (
        <FlatList
          data={photos}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={renderPhotoItem}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBg}>
            <MaterialIcons name="photo-library" size={52} color={colors.textLight} />
          </View>
          <Text style={styles.emptyTitle}>Sin fotos</Text>
          <Text style={styles.emptyMessage}>
            Agrega fotos de la portada, notas, citas o recibos de compra
          </Text>
        </View>
      )}

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.8}>
          <View style={styles.btnIconCircle}>
            <MaterialIcons name="photo-camera" size={20} color={colors.primary} />
          </View>
          <Text style={styles.bottomBtnText}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnPrimary]} activeOpacity={0.8}>
          <View style={[styles.btnIconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <MaterialIcons name="photo-library" size={20} color={colors.white} />
          </View>
          <Text style={[styles.bottomBtnText, { color: colors.white }]}>Galería</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    maxWidth: 220,
  },
  photoCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
  grid: {
    padding: 10,
  },
  photoItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
  },
  photoInner: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  photoLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  bottomBtnPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  btnIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
