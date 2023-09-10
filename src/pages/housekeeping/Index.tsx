import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import News from './News';
import Catalog from './Catalog';
import './Housekeeping.css';

const Housekeeping: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Redirect exact from={match.url} to={`${match.url}/news`} />
      <Route exact path={`${match.url}/news`} component={News} />
      <Route exact path={`${match.url}/catalog`} component={Catalog} />
    </IonRouterOutlet>
  );
};

export default Housekeeping;
