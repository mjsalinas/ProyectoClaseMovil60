import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function RatingStars({ rating, size = 20, interactive = false, onRate }: Props) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((star) => {
        const filled = star <= rating;
        if (interactive) {
          return (
            <TouchableOpacity key={star} onPress={() => onRate?.(star)} style={styles.star}>
              <MaterialIcons
                name={filled ? 'star' : 'star-border'}
                size={size}
                color={filled ? colors.secondary : colors.textLight}
              />
            </TouchableOpacity>
          );
        }
        return (
          <View key={star} style={styles.star}>
            <MaterialIcons
              name={filled ? 'star' : 'star-border'}
              size={size}
              color={filled ? colors.secondary : colors.textLight}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
});
