import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonItem,
  IonLabel,
  IonIcon,
  useIonViewWillEnter,
} from '@ionic/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Version.css';

const Version: React.FC = () => {
  const [versions, setVersions]= useState([]);

  useIonViewWillEnter(() => {
    fetch('/api/version', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setVersions(data.reverse());
    }, (error) => {
      console.log(error)
    });
  });

  return (
    <IonPage id="version-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Versionsverlauf</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home">Zurück</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {versions.map((x, i) => (
            <IonItem key={i}>
              <IonLabel>
                <h2>{x.number}{x.build}</h2>
                <p>{x.desc}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Version;
