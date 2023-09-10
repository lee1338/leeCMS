import {
  IonContent,
  IonPage,
  IonList,
  IonThumbnail,
  useIonViewWillEnter,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import HeaderContainer from '../components/HeaderContainer';
import FooterContainer from '../components/FooterContainer';
import UserCard from '../components/UserCard';
import './Staff.css';

const Home: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [staffList, setStafflist] = useState([]);

  const loadItems = () => {
    fetch('/api/staff', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      setStafflist(data);
    }, (error) => {
      console.log(error)
    });
  }

  useIonViewWillEnter(() => {
    loadItems();
  });

  return (
    <IonPage id="staff-page">
      <HeaderContainer />
      <IonContent>
        <div className="staff-container">
          <div className="staff-section ion-padding">
            <IonThumbnail>
              <img src="/assets/staff.png" />
            </IonThumbnail>
            <div>
              <h2>Habbo Hotel Mitarbeiter</h2>
              <p>Im Habbo Hotel sind Mitarbeiter Mitglieder des Teams, die dafür verantwortlich sind, eine positive und sichere Spielerfahrung zu gewährleisten. Diese Mitarbeiter überwachen den Chat, unterstützen Spieler bei Fragen und Problemen und organisieren unterhaltsame Events. Sie tragen dazu bei, eine freundliche Community aufzubauen und den reibungslosen Ablauf im Hotel zu gewährleisten.</p>
            </div>
          </div>
          <div className="cards">
          {staffList.map((staff, i) => (
            <UserCard key={i} user={staff} />
          ))}
          </div>
        </div>
      <FooterContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
