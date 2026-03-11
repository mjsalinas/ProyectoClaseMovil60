import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import { Book } from '../types/book';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const books: Book[] = [];

  const stats = {
    read: books.filter((b) => b.status === 'read').length,
    reading: books.filter((b) => b.status === 'reading').length,
    pending: books.filter((b) => b.status === 'pending').length,
  };
  const totalBooks = stats.read + stats.reading + stats.pending;

  const avgRating = () => {
    const rated = books.filter((b) => b.rating > 0);
    if (rated.length === 0) return '0.0';
    return (rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1);
  };

  const topGenre = () => {
    const genreCount: Record<string, number> = {};
    books.forEach((b) => {
      if (b.genre) genreCount[b.genre] = (genreCount[b.genre] || 0) + 1;
    });
    const sorted = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || '—';
  };

  const bestRated = books
    .filter((b) => b.rating > 0)
    .sort((a, b) => b.rating - a.rating)[0]?.title || '—';

  const readProgress = totalBooks > 0 ? (stats.read / totalBooks) * 100 : 0;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.profileHeader}>
        <View style={styles.headerDecoration} />
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color={colors.white} />
        </View>
        <Text style={styles.userName}>{user?.email || 'usuario@correo.edu'}</Text>
        <Text style={styles.memberSince}>Miembro desde enero 2026</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progreso de lectura</Text>
            <Text style={styles.progressPercent}>{Math.round(readProgress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${readProgress}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: colors.successLight }]}>
            <MaterialIcons name="check-circle" size={18} color="#065F46" />
          </View>
          <Text style={styles.statValue}>{stats.read}</Text>
          <Text style={styles.statLabel}>Leídos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: colors.warningLight }]}>
            <MaterialIcons name="auto-stories" size={18} color="#92400E" />
          </View>
          <Text style={styles.statValue}>{stats.reading}</Text>
          <Text style={styles.statLabel}>Leyendo</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: colors.infoLight }]}>
            <MaterialIcons name="bookmark-outline" size={18} color="#3730A3" />
          </View>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="insights" size={22} color={colors.primary} />
          <Text style={styles.sectionTitle}>Mi Año en Lectura 2026</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.infoLight }]}>
              <MaterialIcons name="auto-stories" size={18} color={colors.primary} />
            </View>
            <Text style={styles.summaryLabel}>Libros leídos</Text>
            <Text style={styles.summaryValue}>{stats.read}</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.warningLight }]}>
              <MaterialIcons name="category" size={18} color={colors.secondary} />
            </View>
            <Text style={styles.summaryLabel}>Género favorito</Text>
            <Text style={styles.summaryValue}>{topGenre()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryIcon, { backgroundColor: '#FEF3C7' }]}>
              <MaterialIcons name="star" size={18} color={colors.secondary} />
            </View>
            <Text style={styles.summaryLabel}>Rating promedio</Text>
            <Text style={styles.summaryValue}>{avgRating()}</Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#FFF7ED' }]}>
              <MaterialIcons name="emoji-events" size={18} color="#EA580C" />
            </View>
            <Text style={styles.summaryLabel}>Mejor calificado</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>{bestRated}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="settings" size={22} color={colors.primary} />
          <Text style={styles.sectionTitle}>Configuración</Text>
        </View>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsRow} activeOpacity={0.6}>
            <View style={[styles.settingsIcon, { backgroundColor: colors.infoLight }]}>
              <MaterialIcons name="language" size={20} color={colors.primary} />
            </View>
            <View style={styles.settingsInfo}>
              <Text style={styles.settingsLabel}>Idioma</Text>
              <Text style={styles.settingsHint}>Cambiar idioma de la app</Text>
            </View>
            <Text style={styles.settingsValue}>Español</Text>
            <MaterialIcons name="chevron-right" size={22} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => navigation.navigate('ExportImport')}
            activeOpacity={0.6}
          >
            <View style={[styles.settingsIcon, { backgroundColor: colors.successLight }]}>
              <MaterialIcons name="import-export" size={20} color={colors.success} />
            </View>
            <View style={styles.settingsInfo}>
              <Text style={styles.settingsLabel}>Exportar / Importar</Text>
              <Text style={styles.settingsHint}>PDF, CSV y más</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} activeOpacity={0.6}>
            <View style={[styles.settingsIcon, { backgroundColor: colors.warningLight }]}>
              <MaterialIcons name="info-outline" size={20} color={colors.warning} />
            </View>
            <View style={styles.settingsInfo}>
              <Text style={styles.settingsLabel}>Acerca de BookLog</Text>
              <Text style={styles.settingsHint}>Versión 1.0.0</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingsRow, { borderBottomWidth: 0 }]}
            onPress={() => logout()}
            activeOpacity={0.6}
          >
            <View style={[styles.settingsIcon, { backgroundColor: colors.dangerLight }]}>
              <MaterialIcons name="logout" size={20} color={colors.danger} />
            </View>
            <View style={styles.settingsInfo}>
              <Text style={[styles.settingsLabel, { color: colors.danger }]}>Cerrar Sesión</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.textLight} />
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 40,
    backgroundColor: colors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  headerDecoration: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  memberSince: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  progressContainer: {
    width: '75%',
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondaryLight,
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: -22,
    borderRadius: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 6,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: 12,
  },
  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    maxWidth: 120,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: 12,
  },
  settingsIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsInfo: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  settingsHint: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 1,
  },
  settingsValue: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    marginRight: 2,
  },
});
