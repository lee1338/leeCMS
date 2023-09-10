import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { UserProvider } from './context/user';

import Start from './pages/Start';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Scoreboard from './pages/Scoreboard';
import Privacy from './pages/Privacy';
import Version from './pages/Version';
import Login from './pages/Login';
import Register from './pages/Register';
import Housekeeping from './pages/housekeeping';

import Loader from './pages/Loader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isLoading, setIsloading] = useState(true);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <UserProvider>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/start">
              <Start />
            </Route>
            <Route exact path="/home">
              <Loader
                Page={Home}
                Default={Start}
              />
            </Route>

            <Route exact path="/staff">
              <Loader
                Page={Staff}
                Default={Start}
              />
            </Route>
            <Route exact path="/scoreboard">
              <Loader
                Page={Scoreboard}
                Default={Start}
              />
            </Route>
            
            <Route exact path="/privacy">
              <Privacy />
            </Route>
            <Route exact path="/version">
              <Version />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route path="/housekeeping" component={Housekeeping} />
          </UserProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
