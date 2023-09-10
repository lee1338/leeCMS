import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSpinner,
  useIonViewWillEnter,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import './Loader.css';

const Loader: React.FC = ({ Page, Default }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useIonViewWillEnter(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  });

  return (
    <>
      {loading ? (
        <IonPage id="loader">
          <div className="container">
            <IonLabel color="light">loading</IonLabel><br />
            <IonSpinner color="secondary" name="circular"></IonSpinner>
          </div>
        </IonPage>
      ) : (
        <>{user ? <Page /> : <Default />}</>
      )}
    </>
  );
};

export default Loader;
