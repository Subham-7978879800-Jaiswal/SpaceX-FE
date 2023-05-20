import { BrowserRouter as Router } from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";

import AppLayout from "./pages/AppLayout";

import { theme, resources, sounds } from "./settings";

import { ErrorProvider } from "./hooks/errorContext";
import { StoreProvider } from "./hooks/store";

import ErrorSnackBar from "./components/errorSnackBar";

const App = () => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes
          animate
          background={resources.background.large}
          pattern={resources.pattern}
        >
          {(anim) => (
              <ErrorProvider>
            <StoreProvider>
                <Router>
                  <ErrorSnackBar></ErrorSnackBar>
                  <AppLayout show={anim.entered} />
                </Router>
            </StoreProvider>
              </ErrorProvider>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

export default App;
