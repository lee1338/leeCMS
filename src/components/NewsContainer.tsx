import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonChip,
  useIonModal,
  useIonViewWillEnter,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import './NewsContainer.css';

const url = import.meta.env.VITE_URL+'/nitro-assets/c_images/web_promo/';

const NewsContainer: React.FC = () => {
  const [newsList, setNewslist] = useState([]);

  const loadItems = () => {
    fetch('/api/news', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setNewslist(data);
    }, (error) => {
      console.log(error)
    });
  }

  useIonViewWillEnter(() => {
    loadItems();
  });

  return (
    <div id="news-container" className="ion-padding">
      <div className="title">
        <h2>Aktuelle News</h2>
      </div>
      <div className="cards">
      {newsList.map((news, i) => (
        <IonCard key={i}>
          <img  src={`${url}${news.image}`} />
          <IonCardHeader>
            <IonCardTitle>{news.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{news.text}</IonCardContent>
        </IonCard>
      ))}

      </div>
    </div>
  );
};

export default NewsContainer;
