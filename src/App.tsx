import { BrowserRouter as Router } from "react-router-dom";
import { ReduxProvider } from "./app/store";
import { AuthProviderWithService } from "./features/auth/presentacion";
import { UserProviderWithService } from "./features/user/presentacion";
import { AppRoutes } from "./routes";
import { GroupProviderWithService } from "./features/group/presentation";

function App() {
  return (
    <ReduxProvider>
      <AuthProviderWithService>
        <UserProviderWithService>
          <GroupProviderWithService>
            <Router>
              <AppRoutes />
            </Router>
          </GroupProviderWithService>
        </UserProviderWithService>
      </AuthProviderWithService>
    </ReduxProvider>
  );
}

export default App;
