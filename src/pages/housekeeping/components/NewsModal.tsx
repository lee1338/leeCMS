import {
  IonButtons,
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonImg,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { useContext, useRef, useState, useEffect } from 'react';
import imageList from '../imageList';
import '../Housekeeping.css';

const url = import.meta.env.VITE_URL+'/nitro-assets/c_images/web_promo/';

const NewsModal: React.FC = ({ onDismiss, news }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [success, successMsg] = useState();
  const [error, errorMsg] = useState();
  const [newsList, setNewslist] = useState([]);
  const [form, setForm] = useState({
    id: news.id,
    title: news.title,
    text: news.text,
    image: news.image || imageList[0]
  });

  const changeForm = (e: CustomEvent) => {
    const detail = e.detail;
    const name = e.target.name;
    const value = e.target.type === 'toggle' ? detail.checked : detail.value;
    successMsg();
    errorMsg();
    setForm({
      ...form,
      [name]: value,
    });
  }

  const onSubmit = (e: CustomEvent) => {
    e.preventDefault();
    fetch('/api/news/hk/edit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.error) return errorMsg(String(data.error.message));
      successMsg('Artikel erfolgreich geändert!');
    }, (error) => {
      errorMsg(String(error));
    });
  }

  const onDelete = (e: CustomEvent) => {
    fetch('/api/news/hk/delete?id='+news.id, {method: 'DELETE'})
    .then(res => res.json())
    .then(data => {
      if (data.error) return errorMsg(String(data.error.message));
      onDismiss('', null)
    }, (error) => {
      errorMsg(String(error))
    });
  }

  return (
    <IonPage id="news-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Artikel</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss('', null)}>Schließen</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={onSubmit}>
          <IonNote color="success">{success}</IonNote>
          <IonNote color="danger">{error}</IonNote>

          <IonImg src={`${url}${form.image}`}/>
          <IonSelect
            name="image"
            fill="outline"
            label="Titelbild"
            labelPlacement="floating"
            value={form.image}
            onIonChange={changeForm}
          >
          {imageList.map((image, i) => (
            <IonSelectOption
              key={i}
              value={image}
            >{image}</IonSelectOption>
          ))}
          </IonSelect>

          <IonInput
            name="title"
            fill="outline"
            label="Titel"
            labelPlacement="floating"
            required={true}
            value={form.title}
            onIonChange={changeForm}
          />

          <IonTextarea
            name="text"
            fill="outline"
            rows={5}
            autoGrow={true}
            required={true}
            placeholder="Schreibe einen Artikel für die Startseite"
            value={form.text}
            onIonChange={changeForm}
          />

          <IonButton type="submit">Absenden</IonButton>
          <IonButton color="danger" onClick={onDelete}>Löschen</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewsModal;
