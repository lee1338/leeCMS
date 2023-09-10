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
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonNote,
  IonInput,
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
import './Login.css';

const isVersion = import.meta.env.VITE_VERSION;

const Login: React.FC = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, errorMsg] = useState();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });


  const changeForm = (event: Event) => {
    const name = event.target.name;
    const value = event.target.value;
    errorMsg();
    setForm({
      ...form,
      [name]: value,
    });
  }

  const submitForm = (e: CustomEvent) => {
    e.preventDefault();
    fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) return errorMsg(String(error));
      history.push('/home');
      setUser(data);
    }, (error) => {
      errorMsg(String(error))
    });
  }

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start" class="logo">
          {isVersion != 'development' && (
            <IonImg src="/assets/logo.png" />
          )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/register">Einen Account erstellen</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class="container">
          <IonCardHeader>
            <IonCardTitle>Gib deine Zugangsdaten ein</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={submitForm}>
              <input className="hidden" type="submit"/>
              <IonNote color="danger">{error}</IonNote>

              <IonInput
                name="username"
                fill="outline"
                label="Benutzername"
                labelPlacement="floating"
                autocomplete="accountName"
                onIonChange={changeForm}
                onIonBlur={changeForm}
              />

              <IonInput
                name="password"
                fill="outline"
                type="password"
                label="Passwort"
                labelPlacement="floating"
                autocomplete="password"
                onIonInput={changeForm}
                onIonBlur={changeForm}
              />

              <IonButton
                expand="block"
                color="secondary"
                type="submit"
              >Login</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
