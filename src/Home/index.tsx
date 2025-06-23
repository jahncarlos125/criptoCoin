import React from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { useCoins } from './home.hook';

export function Home() {
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

  const coins = data?.pages.flat() ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

if (isLoading && !data) return <ActivityIndicator size="small" color="#6200ee" />;

return (
  <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{ fontWeight: 'bold' }}>Moeda</Text>
            <Text style={{ fontWeight: 'bold' }}>Preço</Text>
          </View>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 24, height: 24, marginRight: 8 }} />
            <Text>{item.name}</Text>
          </View>
          <Text>R$ {item.current_price}</Text>
        </View>
      )}
    />
  </SafeAreaView>
);

}
