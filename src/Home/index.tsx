import React from 'react';
import { FlatList, RefreshControl, Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCoins } from './home.hook';

import { CoinItem } from './components/CoinItem';


type Props = {
  onSelectCoin: (id: string) => void;
};

export function Home({ onSelectCoin }: Props) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useCoins();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

if (isLoading && !data) return <ActivityIndicator size="small" color="#6200ee" />;

return (
  <ImageBackground source={require('../assets/money.jpg')} style={{ flex: 1 }}>
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetching && !isLoading ? <ActivityIndicator size="small" color="#6200ee" /> : null
        }
        ListHeaderComponent={() => (
          <View>
            {isError && (
              <View style={{ backgroundColor: '#ffe0e0', padding: 8 }}>
                <Text style={{ color: '#d32f2f', textAlign: 'center' }}>
                  Dados desatualizados. Última tentativa de atualização falhou.
                </Text>
              </View>
            )}
            <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#ECECEC' }}>Moeda</Text>
              <Text style={{ fontWeight: 'bold', color: '#ECECEC' }}>Preço</Text>
            </View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <CoinItem
            name={item.name}
            symbol={item.symbol}
            price={item.current_price}
            image={item.image}
            changePercentage={item.price_change_percentage_24h}
            index={index}
            onPress={() => onSelectCoin(item.id)}
          />
        )}
      />
    </SafeAreaView>
  </ImageBackground>
);

}
