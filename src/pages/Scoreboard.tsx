import {
  IonContent,
  IonPage,
  IonThumbnail,
  IonList,
  IonListHeader,
  useIonViewWillEnter,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import HeaderContainer from '../components/HeaderContainer';
import FooterContainer from '../components/FooterContainer';
import UserCard from '../components/UserCard';
import './Scoreboard.css';

const Scoreboard: React.FC = () => {
  const [creditsList, setCreditsList] = useState([]);
  const [pixelList, setPixelList] = useState([]);
  const [pointsList, setPointsList] = useState([]);

  const loadCreditsList = () => {
    fetch('/api/scoreboard/credits', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setCreditsList(data);
    }, (error) => {
      console.log(error)
    });
  }

  const loadPixelList = () => {
    fetch('/api/scoreboard/pixels', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setPixelList(data);
    }, (error) => {
      console.log(error)
    });
  }

  const loadPointsList = () => {
    fetch('/api/scoreboard/points', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setPointsList(data);
    }, (error) => {
      console.log(error)
    });
  }

  useIonViewWillEnter(() => {
    loadCreditsList();
    loadPixelList();
    loadPointsList();
  });

  return (
    <IonPage id="scoreboard-page">
      <HeaderContainer />
      <IonContent>
        <div className="scoreboard-container">
          <div className="scoreboard-section ion-padding">
            <IonThumbnail>
              <img src="/assets/scoreboard.png" />
            </IonThumbnail>
            <div>
              <h2>Habbo Hotel Bestenliste</h2>
              <p>Die Habbo Hotel Bestenliste ist eine Plattform, auf der die herausragenden Leistungen und Errungenschaften der Spieler hervorgehoben werden. Hier werden Spieler basierend auf verschiedenen Kriterien wie Aktivität, Möbelgestaltung, Beliebtheit und Wettbewerben gerankt. Die Bestenliste fördert den gesunden Wettbewerb unter den Spielern und bietet Anreize, sich in verschiedenen Aspekten des Spiels zu engagieren und zu verbessern.</p>
            </div>
          </div>
          <div className="cards">
            <IonList>
              <IonListHeader>
                <img src="assets/credits.png" />
                <h2>Taler</h2>
              </IonListHeader>
              {creditsList.map((x, i) => (
                <UserCard key={i} user={x} />
              ))}
            </IonList>
            <IonList>
              <IonListHeader>
                <img src="assets/duckets.png" />
                <h2>Duckets</h2>
              </IonListHeader>
              {pixelList.map((x, i) => (
                <UserCard key={i} user={x} />
              ))}
            </IonList>
            <IonList>
              <IonListHeader>
                <img src="assets/diamonds.png" />
                <h2>Diamonds</h2>
              </IonListHeader>
              {pointsList.map((x, i) => (
                <UserCard key={i} user={x} />
              ))}
            </IonList>
          </div>
        </div>
      <FooterContainer />
      </IonContent>
    </IonPage>
  );
};

export default Scoreboard;
