import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const exportHistory = [
  { name: 'libros_2026.pdf', date: '01 Mar 2026', type: 'PDF', size: '245 KB' },
  { name: 'biblioteca_enero.csv', date: '15 Ene 2026', type: 'CSV', size: '12 KB' },
];

export default function ExportImportScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="upload" size={22} color={colors.primary} />
          <Text style={styles.sectionTitle}>Exportar</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Genera archivos de tu biblioteca personal para respaldo o para compartir
        </Text>

        <TouchableOpacity
          style={styles.exportCard}
          onPress={() => Alert.alert('Exportar PDF', 'Funcionalidad próximamente')}
          activeOpacity={0.7}
        >
          <View style={[styles.exportIcon, { backgroundColor: '#FEE2E2' }]}>
            <MaterialIcons name="picture-as-pdf" size={26} color="#DC2626" />
          </View>
          <View style={styles.exportInfo}>
            <Text style={styles.exportTitle}>Exportar como PDF</Text>
            <Text style={styles.exportSubtitle}>Genera "Mis libros leídos 2026"</Text>
          </View>
          <View style={styles.exportArrow}>
            <MaterialIcons name="arrow-forward-ios" size={16} color={colors.textLight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportCard}
          onPress={() => Alert.alert('Exportar CSV', 'Funcionalidad próximamente')}
          activeOpacity={0.7}
        >
          <View style={[styles.exportIcon, { backgroundColor: '#D1FAE5' }]}>
            <MaterialIcons name="table-chart" size={26} color="#059669" />
          </View>
          <View style={styles.exportInfo}>
            <Text style={styles.exportTitle}>Exportar como CSV</Text>
            <Text style={styles.exportSubtitle}>Compatible con Excel y Sheets</Text>
          </View>
          <View style={styles.exportArrow}>
            <MaterialIcons name="arrow-forward-ios" size={16} color={colors.textLight} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="download" size={22} color={colors.primary} />
          <Text style={styles.sectionTitle}>Importar</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Importa listas de libros desde archivos para agregarlos rápidamente
        </Text>

        <TouchableOpacity
          style={styles.importCard}
          onPress={() => Alert.alert('Importar CSV', 'Funcionalidad próximamente')}
          activeOpacity={0.7}
        >
          <View style={styles.importIconCircle}>
            <MaterialIcons name="upload-file" size={32} color={colors.primary} />
          </View>
          <Text style={styles.importTitle}>Importar archivo CSV</Text>
          <Text style={styles.importSubtitle}>
            Arrastra o selecciona un archivo con tu lista de libros
          </Text>
          <View style={styles.importBtnRow}>
            <View style={styles.importBtn}>
              <MaterialIcons name="folder-open" size={16} color={colors.primary} />
              <Text style={styles.importBtnText}>Seleccionar archivo</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialIcons name="history" size={22} color={colors.primary} />
          <Text style={styles.sectionTitle}>Historial</Text>
        </View>
        <View style={styles.historyCard}>
          {exportHistory.map((item, index) => (
            <View
              key={index}
              style={[
                styles.historyItem,
                index === exportHistory.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={[styles.historyIcon, {
                backgroundColor: item.type === 'PDF' ? '#FEE2E2' : '#D1FAE5',
              }]}>
                <MaterialIcons
                  name={item.type === 'PDF' ? 'picture-as-pdf' : 'table-chart'}
                  size={18}
                  color={item.type === 'PDF' ? '#DC2626' : '#059669'}
                />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyDate}>{item.date} · {item.size}</Text>
              </View>
              <TouchableOpacity style={styles.historyAction}>
                <MaterialIcons name="more-horiz" size={22} color={colors.textLight} />
              </TouchableOpacity>
            </View>
          ))}
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
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
    marginLeft: 30,
  },
  exportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  exportIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportInfo: {
    flex: 1,
    marginLeft: 14,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  exportSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  exportArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 28,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  importIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  importTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  importSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  importBtnRow: {
    flexDirection: 'row',
  },
  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.infoLight,
    borderRadius: 10,
  },
  importBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: 12,
  },
  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  historyAction: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
