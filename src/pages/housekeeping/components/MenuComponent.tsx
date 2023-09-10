import {
  IonMenu,
  IonMenuToggle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

const MenuComponent: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Housekeeping</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem button routerLink="/housekeeping/news">Neues</IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button routerLink="/housekeeping/catalog">Katalog</IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem button routerLink="/home">
              <IonLabel color="danger">Verlassen</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MenuComponent;
