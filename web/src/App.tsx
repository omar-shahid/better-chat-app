import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./global/store";
import WebRoutes from "./routes/WebRoutes";
const App: React.FC = () => {
  const client = new QueryClient();

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={client}>
          <WebRoutes />
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
