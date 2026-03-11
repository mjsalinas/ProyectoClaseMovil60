import { View, Text, StyleSheet } from 'react-native';
import { BookStatus } from '../types/book';
import { statusColors } from '../theme/colors';

interface Props {
  status: BookStatus;
  size?: 'small' | 'medium';
}

export default function StatusBadge({ status, size = 'medium' }: Props) {
  const colorConfig = statusColors[status];

  return (
    <View style={[
      styles.badge,
      { backgroundColor: colorConfig.bg },
      size === 'small' && styles.badgeSmall,
    ]}>
      <Text style={[
        styles.text,
        { color: colorConfig.text },
        size === 'small' && styles.textSmall,
      ]}>
        {colorConfig.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 11,
  },
});
