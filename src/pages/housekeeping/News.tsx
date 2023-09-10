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
  IonListHeader,
  IonItem,
  IonButton,
  useIonViewWillEnter,
  useIonModal,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import MenuComponent from './components/MenuComponent';
import NewsModal from './components/NewsModal';

const News: React.FC = () => {
  const [newsList, setNewslist] = useState([]);
  const [activeNews, setActivenews] = useState();
  const [present, dismiss] = useIonModal(NewsModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    news: activeNews,
  });

  function openModal(news) {
    setActivenews(news);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        loadItems();
      },
    });
  }

  const createNews = () => {
    fetch('/api/news/hk/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({}),
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) return errorMsg(String(data.error.message));
      openModal(data);
    }, (error) => {
      errorMsg(String(error))
    });
  }

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
    <>
      <MenuComponent />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Neues</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {newsList.map((news, i) => (
              <IonItem key={i} button detail onClick={() => openModal(news)}>
                {news.title}
              </IonItem>
            ))}
            <IonButton onClick={createNews}>
              Neuen Artikel erstellen
            </IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default News;
