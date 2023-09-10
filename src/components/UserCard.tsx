import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonBadge,
  IonAvatar,
  IonLabel,
} from '@ionic/react';
import './UserCard.css';

const ranks = [
  'User',
  'Expert',
  'Community Manager',
  'Moderator',
  'Super-Moderator',
  'Head-Moderator',
  'Admin',
];

const UserCard: React.FC = ({ user }) => {
  return (
    <IonCard id="user-card" color="primary">
      <IonCardHeader>
        <IonCardTitle>
          <IonItem lines="none" class="ion-no-padding">
            <IonAvatar slot="start" class="user-avatar">
              <img src={`https://nitro-imager.habbo.je/?figure=${user.look}&gesture=sml&direction=2&size=l`} />
            </IonAvatar>
            <IonLabel>
              <IonBadge color="secondary">{ranks[user.rank-1]}</IonBadge>
              <h1>{user.username}</h1>
              <p>{user.motto}</p>
            </IonLabel>
          </IonItem>
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default UserCard;
