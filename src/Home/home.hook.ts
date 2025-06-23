import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  symbol: string;
};

async function fetchCoins({ pageParam = 1 }): Promise<Coin[]> {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'brl',
      order: 'market_cap_desc',
      per_page: 15,
      page: pageParam,
      sparkline: false,
    },
  });
  return response.data;
}

export function useCoins() {
  return useInfiniteQuery({
    queryKey: ['coins'],
    queryFn: fetchCoins,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}
