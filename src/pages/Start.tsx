import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButtons,
  IonButton,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import OverviewContainer from '../components/OverviewContainer';
import NewsContainer from '../components/NewsContainer';
import FooterContainer from '../components/FooterContainer';
import './Start.css';

const isVersion = import.meta.env.VITE_VERSION;

const Start: React.FC = () => {
  return (
    <IonPage id="start-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start" class="logo">
          {isVersion != 'development' && (
            <IonImg src="/assets/logo.png" />
          )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="start-container">
          <div className="hotel-bg ion-padding">
            <div className="left">
              <IonCard color="primary">
                <IonCardHeader>
                  <IonCardTitle>Herzlich Willkommen</IonCardTitle>
                  <IonCardSubtitle>Im Habbo Hotel</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Eine lebendige und bunte Welt voller Kreativität, Freundschaften und spannender Aktivitäten erwartet dich. Tauche ein und entdecke das einzigartige Habbo-Feeling, während du deinen individuellen Charakter erschaffst und neue Abenteuer erlebst!
                </IonCardContent>
              </IonCard>
            </div>
            <div className="right">
              <IonButton color="secondary" routerLink="/login">Anmelden</IonButton>
              <IonButton color="secondary" routerLink="/register">Account erstellen</IonButton>
            </div>
          </div>
        </div>
        <div>
          <NewsContainer />
        </div>
        <div>
          <FooterContainer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Start;
