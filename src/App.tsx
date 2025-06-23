import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from "./Home";

const queryClient = new QueryClient()

export function App() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </SafeAreaProvider>
    )
  }