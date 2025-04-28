import { BrowserRouter as Router } from "react-router-dom";
import { ReduxProvider } from "./app/store";
import { AuthProviderWithService } from "./features/auth/presentacion";
import { UserProviderWithService } from "./features/user/presentacion";
import { AppRoutes } from "./routes";

function App() {
  return (
    <ReduxProvider>
      <AuthProviderWithService>
        <UserProviderWithService>
          <Router>
            <AppRoutes />
          </Router>
        </UserProviderWithService>
      </AuthProviderWithService>
    </ReduxProvider>
  );
}

export default App;
