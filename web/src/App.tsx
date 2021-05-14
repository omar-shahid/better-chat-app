import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundry from "./components/ErrorBoundry";
import Loader from "./components/Loader";
import { persistor, store } from "./global/store";
import WebRoutes from "./routes/WebRoutes";

const App: React.FC = () => {
  const client = new QueryClient();

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <QueryClientProvider client={client}>
          <ErrorBoundry>
            <WebRoutes />
          </ErrorBoundry>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
