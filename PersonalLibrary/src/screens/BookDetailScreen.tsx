import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import RatingStars from '../components/RatingStars';
import StatusBadge from '../components/StatusBadge';
import PhotoGrid from '../components/PhotoGrid';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deleteBook } from '../store/slices/booksSlice';

export default function BookDetailScreen({ route, navigation }: any) {
  const { bookId } = route.params;
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) =>
    state.books.books.find((b) => b.id === bookId)
  );

  if (!book) {
    return (
      <View style={styles.notFound}>
        <View style={styles.notFoundIcon}>
          <MaterialIcons name="error-outline" size={48} color={colors.textLight} />
        </View>
        <Text style={styles.notFoundTitle}>Libro no encontrado</Text>
        <Text style={styles.notFoundText}>Este libro ya no está disponible</Text>
      </View>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-HN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.coverContainer}>
        <View style={styles.coverGlow} />
        <View style={styles.coverPlaceholder}>
          <MaterialIcons name="menu-book" size={64} color={colors.primaryLight} />
          <Text style={styles.coverText}>Portada del libro</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>por {book.author}</Text>

        <View style={styles.badgesRow}>
          <View style={styles.genreBadge}>
            <MaterialIcons name="category" size={14} color={colors.textSecondary} />
            <Text style={styles.genreText}>{book.genre}</Text>
          </View>
          <StatusBadge status={book.status} />
        </View>

        <View style={styles.ratingCard}>
          <RatingStars rating={book.rating} size={28} />
          {book.rating > 0 && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingNumber}>{book.rating}.0</Text>
            </View>
          )}
        </View>

        <View style={styles.datesCard}>
          <View style={styles.dateRow}>
            <View style={[styles.dateIcon, { backgroundColor: colors.infoLight }]}>
              <MaterialIcons name="calendar-today" size={16} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.dateLabel}>Fecha de inicio</Text>
              <Text style={styles.dateValue}>{formatDate(book.startDate)}</Text>
            </View>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateRow}>
            <View style={[styles.dateIcon, { backgroundColor: colors.successLight }]}>
              <MaterialIcons name="event-available" size={16} color={colors.success} />
            </View>
            <View>
              <Text style={styles.dateLabel}>Fecha de fin</Text>
              <Text style={styles.dateValue}>{formatDate(book.endDate)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="rate-review" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Reseña</Text>
          </View>
          {book.review ? (
            <Text style={styles.reviewText}>{book.review}</Text>
          ) : (
            <View style={styles.emptyReview}>
              <MaterialIcons name="edit-note" size={24} color={colors.textLight} />
              <Text style={styles.emptyText}>Sin reseña todavía. Toca editar para agregar una.</Text>
            </View>
          )}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="photo-library" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Fotos ({book.photos.length})</Text>
          </View>
          <PhotoGrid
            photos={book.photos}
            onPressViewAll={() => navigation.navigate('PhotoAlbum', { bookId: book.id, bookTitle: book.title })}
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="touch-app" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Acciones</Text>
          </View>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#EEF2FF' }]}
              onPress={() => navigation.navigate('AddEditBook', { bookId: book.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </View>
              <Text style={[styles.actionText, { color: colors.primary }]}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#F0FDF4' }]}
              onPress={() => Alert.alert('Compartir', 'Funcionalidad próximamente')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
                <MaterialIcons name="share" size={18} color={colors.white} />
              </View>
              <Text style={[styles.actionText, { color: colors.success }]}>Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FFF7ED' }]}
              onPress={() => Alert.alert('Código QR', 'Funcionalidad próximamente')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#EA580C' }]}>
                <MaterialIcons name="qr-code" size={18} color={colors.white} />
              </View>
              <Text style={[styles.actionText, { color: '#EA580C' }]}>QR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.dangerLight }]}
              onPress={() =>
                Alert.alert(
                  'Eliminar libro',
                  `¿Estás seguro de eliminar "${book.title}"? Esta acción no se puede deshacer.`,
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                      text: 'Eliminar',
                      style: 'destructive',
                      onPress: () => {
                        dispatch(deleteBook(book.id));
                        navigation.goBack();
                      },
                    },
                  ]
                )
              }
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.danger }]}>
                <MaterialIcons name="delete-outline" size={18} color={colors.white} />
              </View>
              <Text style={[styles.actionText, { color: colors.danger }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="send" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Compartir como tarjeta</Text>
          </View>
          <View style={styles.shareCard}>
            <View style={styles.shareCardAccent} />
            <View style={styles.shareCardContent}>
              <View style={styles.shareCardHeader}>
                <View style={styles.shareCardCover}>
                  <MaterialIcons name="menu-book" size={24} color={colors.primaryLight} />
                </View>
                <View style={styles.shareCardInfo}>
                  <Text style={styles.shareCardTitle} numberOfLines={1}>{book.title}</Text>
                  <Text style={styles.shareCardAuthor}>{book.author}</Text>
                  <RatingStars rating={book.rating} size={14} />
                </View>
              </View>
              {book.review ? (
                <Text style={styles.shareCardReview} numberOfLines={2}>"{book.review}"</Text>
              ) : null}
              <Text style={styles.shareCardFooter}>Compartido desde BookLog</Text>
            </View>
          </View>
          <View style={styles.shareButtons}>
            <TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#25D366' }]} activeOpacity={0.8}>
              <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
              <Text style={styles.shareBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#1877F2' }]} activeOpacity={0.8}>
              <Ionicons name="logo-facebook" size={20} color={colors.white} />
              <Text style={styles.shareBtnText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 40,
  },
  notFoundIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  notFoundText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  coverContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  coverGlow: {
    position: 'absolute',
    bottom: -20,
    width: 200,
    height: 40,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    opacity: 0.3,
  },
  coverPlaceholder: {
    width: 160,
    height: 220,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  coverText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textLight,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 14,
    fontStyle: 'italic',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  genreBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  genreText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  ratingBadge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#92400E',
  },
  datesCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: 1,
  },
  dateDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
    marginLeft: 48,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 23,
  },
  emptyReview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    padding: 14,
    borderRadius: 10,
  },
  emptyText: {
    flex: 1,
    fontSize: 13,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  shareCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  shareCardAccent: {
    width: 4,
    backgroundColor: colors.primary,
  },
  shareCardContent: {
    flex: 1,
    padding: 14,
  },
  shareCardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  shareCardCover: {
    width: 46,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareCardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  shareCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  shareCardAuthor: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  shareCardReview: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 17,
  },
  shareCardFooter: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'right',
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
