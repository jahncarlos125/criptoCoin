import React from 'react';
import { ActivityIndicator, Button, Dimensions, ScrollView, Text, View, Image } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { Chart } from './Chart';
import { useCoinDetails } from './details.hook';

interface Props {
  id: string;
  onClose: () => void;
}

export function Details({ id, onClose }: Props) {
  const { data, isLoading } = useCoinDetails(id);
  const width = Dimensions.get('window').width - 32;

  if (isLoading || !data) {
    return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  }

  const { details, prices } = data;
  const market = details.market_data;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button title="Voltar" onPress={onClose} />
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Image source={{ uri: details.image.large }} style={{ width: 64, height: 64 }} />
        <Text style={{ fontSize: 24, fontWeight: '700' }}>{details.name}</Text>
        <Text style={{ fontSize: 16 }}>{details.symbol.toUpperCase()}</Text>
      </View>
      <Chart data={prices.map(p => p[1])} width={width} height={200} />
      <View style={{ marginTop: 16 }}>
        <Text>Preço atual: {formatCurrency(market.current_price.brl)}</Text>
        <Text>Maior 24h: {formatCurrency(market.high_24h.brl)}</Text>
        <Text>Menor 24h: {formatCurrency(market.low_24h.brl)}</Text>
        <Text>Capitalização: {formatCurrency(market.market_cap.brl)}</Text>
        <Text>Variação 24h: {market.price_change_percentage_24h.toFixed(2)}%</Text>
      </View>
    </ScrollView>
  );
}
