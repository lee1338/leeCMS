import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButtons,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import './HeaderContainer.css';

const isVersion = import.meta.env.VITE_VERSION;

const HeaderContainer: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    fetch('/api/user/logout', {method: 'GET'})
    .then(res => res.json())
    .then(() => {
      setUser();
    });
  }

  return (
    <IonHeader id="header-container">
      <IonToolbar>
        <IonTitle slot="start" class="logo">
        {isVersion != 'development' && (
          <IonImg src="/assets/logo.png" />
        )}
        </IonTitle>
        <IonButtons slot="end">
          <IonButton id="home-hover">Home</IonButton>
          <IonPopover trigger="home-hover" triggerAction="click" showBackdrop={false}>
            <IonList>
              <IonItem button={true} detail={false} routerLink="/home">
                Startseite
              </IonItem>
              <IonItem button={true} detail={false}>
                Profil
              </IonItem>
            </IonList>
          </IonPopover>

          <IonButton id="community-hover">Community</IonButton>
          <IonPopover trigger="community-hover" triggerAction="click" showBackdrop={false}>
            <IonList>
              <IonItem button={true} detail={false} routerLink="/staff">
                Mitarbeiter
              </IonItem>
              <IonItem button={true} detail={false} routerLink="/scoreboard">
                Bestenliste
              </IonItem>
            </IonList>
          </IonPopover>

          {user.rank > 5 && (
            <IonButton fill="clear" routerLink="/housekeeping">HK</IonButton>
          )}
          <IonButton
            fill="clear"
            color="danger"
            routerLink="/start"
            onClick={logOut}
          >Logout</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderContainer;
