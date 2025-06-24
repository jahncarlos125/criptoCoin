import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchDetails(id: string) {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return data;
}

async function fetchPrices(id: string) {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'brl',
      days: 7,
    },
  });
  return data.prices as number[][];
}

export function useCoinDetails(id: string) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: async () => {
      const [details, prices] = await Promise.all([fetchDetails(id), fetchPrices(id)]);
      return { details, prices };
    },
  });
}
