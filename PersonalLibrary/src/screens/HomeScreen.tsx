import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Book, BookStatus } from '../types/book';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import FilterChip from '../components/FilterChip';
import EmptyState from '../components/EmptyState';

type FilterOption = 'all' | BookStatus;

const filters: { key: FilterOption; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'read', label: 'Leídos' },
  { key: 'reading', label: 'En Lectura' },
  { key: 'pending', label: 'Pendientes' },
];

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [books] = useState<Book[]>([]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || book.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: books.length,
    read: books.filter((b) => b.status === 'read').length,
    reading: books.filter((b) => b.status === 'reading').length,
    pending: books.filter((b) => b.status === 'pending').length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>BookLog</Text>
              <Text style={styles.headerSubtitle}>
                {stats.total} libros en tu biblioteca
              </Text>
            </View>
            <TouchableOpacity style={styles.avatarButton}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={20} color={colors.white} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: colors.successLight }]}
              onPress={() => setActiveFilter('read')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="check-circle" size={20} color="#065F46" />
              <Text style={[styles.statNumber, { color: '#065F46' }]}>{stats.read}</Text>
              <Text style={[styles.statLabel, { color: '#065F46' }]}>Leídos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: colors.warningLight }]}
              onPress={() => setActiveFilter('reading')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="auto-stories" size={20} color="#92400E" />
              <Text style={[styles.statNumber, { color: '#92400E' }]}>{stats.reading}</Text>
              <Text style={[styles.statLabel, { color: '#92400E' }]}>Leyendo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: colors.infoLight }]}
              onPress={() => setActiveFilter('pending')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="bookmark-outline" size={20} color="#3730A3" />
              <Text style={[styles.statNumber, { color: '#3730A3' }]}>{stats.pending}</Text>
              <Text style={[styles.statLabel, { color: '#3730A3' }]}>Pendientes</Text>
            </TouchableOpacity>
          </View>

          <SearchBar value={search} onChangeText={setSearch} />

          <View style={styles.filtersContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filters}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.filtersList}
              renderItem={({ item }) => (
                <FilterChip
                  label={item.label}
                  active={activeFilter === item.key}
                  onPress={() => setActiveFilter(item.key)}
                />
              )}
            />
          </View>

          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.bookList}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={() => Keyboard.dismiss()}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
              />
            )}
            ListEmptyComponent={
              <EmptyState
                icon="library-books"
                title="No se encontraron libros"
                message="Intenta cambiar los filtros o agrega un nuevo libro a tu biblioteca"
              />
            }
          />

          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('AddEditBook')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  avatarButton: {
    padding: 4,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  filtersContainer: {
    marginBottom: 4,
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  bookList: {
    paddingBottom: 90,
    paddingTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
