import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { Home } from "./Home";
import { Details } from './Details';

const queryClient = new QueryClient()

export function App() {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {selectedCoin ? (
          <Details id={selectedCoin} onClose={() => setSelectedCoin(null)} />
        ) : (
          <Home onSelectCoin={setSelectedCoin} />
        )}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
