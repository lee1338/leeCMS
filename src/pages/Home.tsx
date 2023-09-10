import {
  IonContent,
  IonPage,
} from '@ionic/react';
import HeaderContainer from '../components/HeaderContainer';
import OverviewContainer from '../components/OverviewContainer';
import NewsContainer from '../components/NewsContainer';
import FooterContainer from '../components/FooterContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <HeaderContainer />
      <IonContent>
        <div>
          <OverviewContainer  />
        </div>
        <div>
          <NewsContainer />
        </div>
        <FooterContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
