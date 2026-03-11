import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Book } from '../types/book';

type QRMode = 'scan' | 'generate';
type GenerateType = 'book' | 'list';

export default function QRScreen() {
  const [mode, setMode] = useState<QRMode>('scan');
  const [generateType, setGenerateType] = useState<GenerateType>('book');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segment, mode === 'scan' && styles.segmentActive]}
          onPress={() => setMode('scan')}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={20}
            color={mode === 'scan' ? colors.white : colors.textSecondary}
          />
          <Text style={[styles.segmentText, mode === 'scan' && styles.segmentTextActive]}>
            Escanear
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segment, mode === 'generate' && styles.segmentActive]}
          onPress={() => setMode('generate')}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="qr-code"
            size={20}
            color={mode === 'generate' ? colors.white : colors.textSecondary}
          />
          <Text style={[styles.segmentText, mode === 'generate' && styles.segmentTextActive]}>
            Generar
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'scan' ? (
        <View style={styles.scanContainer}>
          <View style={styles.cameraPlaceholder}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.scanIconCircle}>
              <MaterialIcons name="qr-code-scanner" size={36} color={colors.white} />
            </View>
          </View>
          <Text style={styles.scanTitle}>Escanear código QR</Text>
          <Text style={styles.scanHint}>
            Apunta la cámara al código QR para importar un libro o lista
          </Text>

          <View style={styles.scanFeatures}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.infoLight }]}>
                <MaterialIcons name="menu-book" size={18} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>Importar libros de amigos</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.successLight }]}>
                <MaterialIcons name="groups" size={18} color={colors.success} />
              </View>
              <Text style={styles.featureText}>Listas de club de lectura</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.warningLight }]}>
                <MaterialIcons name="star" size={18} color={colors.secondary} />
              </View>
              <Text style={styles.featureText}>Recomendaciones compartidas</Text>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.generateContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeChip, generateType === 'book' && styles.typeChipActive]}
              onPress={() => setGenerateType('book')}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="menu-book"
                size={18}
                color={generateType === 'book' ? colors.white : colors.textSecondary}
              />
              <Text style={[styles.typeChipText, generateType === 'book' && styles.typeChipTextActive]}>
                Libro Individual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeChip, generateType === 'list' && styles.typeChipActive]}
              onPress={() => setGenerateType('list')}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="format-list-numbered"
                size={18}
                color={generateType === 'list' ? colors.white : colors.textSecondary}
              />
              <Text style={[styles.typeChipText, generateType === 'list' && styles.typeChipTextActive]}>
                Lista / Top 10
              </Text>
            </TouchableOpacity>
          </View>

          {generateType === 'book' && (
            <View style={styles.bookSelector}>
              <Text style={styles.selectorLabel}>Selecciona un libro:</Text>
              <View style={styles.emptyBookList}>
                <MaterialIcons name="menu-book" size={32} color={colors.textLight} />
                <Text style={styles.emptyBookText}>No hay libros leídos aún</Text>
              </View>
            </View>
          )}

          {generateType === 'list' && (
            <View style={styles.listInfo}>
              <View style={styles.listInfoIcon}>
                <MaterialIcons name="format-list-numbered" size={24} color={colors.primary} />
              </View>
              <View style={styles.listInfoContent}>
                <Text style={styles.listInfoTitle}>Lista Top 10</Text>
                <Text style={styles.listInfoText}>
                  Se generará un QR con tus libros mejor calificados
                </Text>
              </View>
            </View>
          )}

          <View style={styles.qrPreview}>
            <View style={styles.qrPlaceholder}>
              <MaterialIcons name="qr-code-2" size={110} color={colors.textLight} />
              <Text style={styles.qrPlaceholderText}>
                {selectedBook || generateType === 'list'
                  ? 'Vista previa del QR'
                  : 'Selecciona un libro primero'}
              </Text>
            </View>
          </View>

          <View style={styles.qrActions}>
            <TouchableOpacity style={[styles.qrActionBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
              <MaterialIcons name="share" size={20} color={colors.white} />
              <Text style={styles.qrActionText}>Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.qrActionBtn, { backgroundColor: colors.success }]} activeOpacity={0.8}>
              <MaterialIcons name="download" size={20} color={colors.white} />
              <Text style={styles.qrActionText}>Descargar</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 13,
    gap: 6,
  },
  segmentActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.white,
  },
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraPlaceholder: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    overflow: 'hidden',
  },
  scanFrame: {
    position: 'absolute',
    width: '65%',
    height: '65%',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primaryLight,
  },
  topLeft: {
    top: 0, left: 0,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0, right: 0,
    borderTopWidth: 3, borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0, left: 0,
    borderBottomWidth: 3, borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0, right: 0,
    borderBottomWidth: 3, borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },
  scanIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scanHint: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  scanFeatures: {
    width: '100%',
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  generateContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  typeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 6,
  },
  typeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeChipTextActive: {
    color: colors.white,
  },
  bookSelector: {
    marginBottom: 8,
  },
  selectorLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  bookOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 10,
  },
  bookOptionActive: {
    borderColor: colors.primary,
    backgroundColor: '#EEF2FF',
  },
  bookOptionCover: {
    width: 36,
    height: 46,
    borderRadius: 6,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookOptionInfo: {
    flex: 1,
  },
  bookOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  bookOptionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookOptionAuthor: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  listInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: colors.infoLight,
    borderRadius: 14,
    marginBottom: 8,
  },
  listInfoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listInfoContent: {
    flex: 1,
  },
  listInfoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  listInfoText: {
    fontSize: 13,
    color: colors.primaryDark,
    lineHeight: 18,
    opacity: 0.8,
  },
  qrPreview: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  qrPlaceholderText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  qrActions: {
    flexDirection: 'row',
    gap: 12,
  },
  qrActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrActionText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  emptyBookList: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 8,
  },
  emptyBookText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
});
