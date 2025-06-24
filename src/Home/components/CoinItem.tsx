import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, Animated, Pressable } from 'react-native';
import { CaretUp, CaretDown } from 'phosphor-react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import { isPriceUp } from '../../utils/isPriceUp';
import { BlurView } from 'expo-blur';

type Props = {
  name: string;
  symbol: string;
  price: number;
  image: string;
  changePercentage: number;
  index: number;
  onPress: () => void;
};

export const CoinItem = React.memo(({ name, symbol, price, image, changePercentage, index, onPress }: Props) => {
  const isUp = isPriceUp(changePercentage);
  const slideAnim = useRef(new Animated.Value(100)).current; // Começa fora da tela (direita)
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50, // 👈 Efeito cascata (50ms por item)
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.left}>
          <Image source={{ uri: image }} style={styles.image} />
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          <Text style={[styles.price, isUp ? styles.up : styles.down]}>
            {changePercentage.toFixed(2)}%
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'android' ? '#FFF' : 'rgba(255, 255, 255, 0.4)',
    margin: 4,
    overflow: 'hidden',
    borderRadius: 10,
    height: 70,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  symbol: {
    fontSize: 12,
    color: '#2e2d2d',
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  up: {
    color: 'green',
  },
  down: {
    color: 'red',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
});
