import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Home";

const queryClient = new QueryClient()

export function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
  }