import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonAvatar,
  IonChip,
  IonButton,
  IonImg,
  IonInput,
} from '@ionic/react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user';
import './OverviewContainer.css';

const url = import.meta.env.VITE_URL;

const OverviewContainer: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [currencies, setCurrencies] = useState([]);

  const changeMotto = (e: CustomEvent) => {
    fetch('/api/user/motto', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({motto: e.detail.value}),
    })
    .then(response => response.json())
    .then(data => {
      setUser({...user, motto: data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetch('/api/user/currencies', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      if (data.error) throw(data.error);
      setCurrencies(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div id="overview-container" className="ion-padding">
      <div className="left">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonItem lines="none" class="ion-no-padding">
                <IonAvatar slot="start" class="user-avatar">
                  <img src={`https://nitro-imager.habbo.je/?figure=${user.look}&gesture=sml&direction=2&size=l`} />
                </IonAvatar>
                <IonLabel>
                  <IonCardTitle>{user.username}</IonCardTitle>
                  <IonInput
                    label="Mein Motto:"
                    label-placement="floating"
                    class="ion-no-padding"
                    value={user.motto}
                    onIonChange={changeMotto}
                  />
                </IonLabel>
              </IonItem>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonChip>
              <IonAvatar>
                <img src="assets/credits.png" />
              </IonAvatar>
              <IonLabel>{user.credits}</IonLabel>
            </IonChip>

            <IonChip>
              <IonAvatar>
                <img src="assets/duckets.png" />
              </IonAvatar>
              <IonLabel>{currencies.find(x => x.type == 0)?.amount || 0}</IonLabel>
            </IonChip>

            <IonChip>
              <IonAvatar>
                <img src="assets/diamonds.png" />
              </IonAvatar>
              <IonLabel>{currencies.find(x => x.type == 5)?.amount || 0}</IonLabel>
            </IonChip>
          </IonCardContent>
        </IonCard>
      </div>
      <div className="right">
        <div className="reception-bg">
          <IonButton
            target="_blank"
            color="secondary"
            shape="round"
            href={`${url}/client?sso=${user.auth_ticket}`}
          >
            Ins Hotel
            <IonImg slot="end" src="assets/checkin.png"></IonImg>
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;
