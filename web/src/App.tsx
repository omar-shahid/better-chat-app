import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundry from "./common/components/ErrorBoundry";
import Loader from "./common/components/Loader";
import { persistor, store } from "./common/redux/store";
import WebRoutes from "./routes/WebRoutes";

export const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundry>
            <WebRoutes />
          </ErrorBoundry>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
