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
  IonCheckbox,
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
import './Register.css';

const isVersion = import.meta.env.VITE_VERSION;

const Register: React.FC = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, errorMsg] = useState();
  const [form, setForm] = useState({
    username: '',
    mail: '',
    password: '',
    password2: '',
    acceptRules: false,
  });

  const changeForm = (event: any) => {
    const target = event.target;
    const value = target.role === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    errorMsg();
    setForm({
      ...form,
      [name]: value,
    });
  }

  const checkPasswords = () => {
    if (form.password.length < 4) return false;
    if (form.password !== form.password2) return false;
    return true;
  }

  const submitForm = (e: CustomEvent) => {
    e.preventDefault();
    if (!checkPasswords()) return errorMsg('Deine Passwörter stimmen nicht überein');
    if (form.acceptRules == false) return errorMsg('Bitte, akzeptiere die Community Richtlinien');
    fetch('/api/user/register', {
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
    <IonPage id="register-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start" class="logo">
          {isVersion != 'development' && (
            <IonImg src="/assets/logo.png" />
          )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/login">Anmelden</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class="container">
          <IonCardHeader>
            <IonCardTitle>Erstelle einen Habbo</IonCardTitle>
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
                minlength={3}
                onIonChange={changeForm}
                onIonBlur={changeForm}
              />

              <IonInput
                name="mail"
                fill="outline"
                label="Email Adresse"
                labelPlacement="floating"
                autocomplete="accountName"
                minlength={5}
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
                minlength={5}
                onIonInput={changeForm}
                onIonBlur={changeForm}
              />

              <IonInput
                name="password2"
                fill="outline"
                type="password"
                label="Passwort wiederholen"
                labelPlacement="floating"
                autocomplete="password"
                onIonInput={changeForm}
                onIonBlur={changeForm}
              />

              <IonItem
                button={false}
                lines="none"
                class="ion-no-padding"
              >
                <IonCheckbox
                  name="acceptRules"
                  justify="space-between"
                  onIonChange={changeForm}
                >Ich akzeptiere die Community Richtlinien</IonCheckbox>
              </IonItem>

              <IonButton
                expand="block"
                color="secondary"
                type="submit"
              >Registrieren</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
