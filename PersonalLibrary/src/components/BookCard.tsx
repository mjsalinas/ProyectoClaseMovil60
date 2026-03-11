import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Book } from '../types/book';
import { colors, statusColors } from '../theme/colors';
import RatingStars from './RatingStars';
import StatusBadge from './StatusBadge';

interface Props {
  book: Book;
  onPress: () => void;
}

export default function BookCard({ book, onPress }: Props) {
  const statusColor = statusColors[book.status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.coverPlaceholder, { borderLeftColor: statusColor.text }]}>
        <MaterialIcons name="menu-book" size={28} color={colors.primaryLight} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <View style={styles.metaRow}>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>{book.genre}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RatingStars rating={book.rating} size={14} />
          <StatusBadge status={book.status} size="small" />
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={22} color={colors.textLight} style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  coverPlaceholder: {
    width: 56,
    height: 74,
    borderRadius: 10,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 3,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 1,
  },
  author: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  genreTag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  genreText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chevron: {
    marginLeft: 6,
  },
});
