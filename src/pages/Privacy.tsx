import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
  IonBackButton,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import './Privacy.css';

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage id="privacy-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Privacy Policy</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home">{t('Back')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <p>We take your privacy very seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our app.</p>
        <h3>1. Personal Information We Collect</h3>
        <p>We do not collect any personal information such as your name, address, email address, phone number, or payment information when you use our app. However, we may collect non-personal information such as your device type, operating system version, IP address, and app usage information for the purpose of improving our app and providing better service to our users.</p>
        <h3>2. How We Use Your Personal Information</h3>
        <p>We do not use your personal information for any purpose other than to improve our app and provide better service to our users. We may use the non-personal information we collect for analytics purposes, to monitor and analyze usage patterns, to improve the functionality and usability of our app, and to troubleshoot any technical problems.</p>
        <h3>3. How We Protect Your Personal Information</h3>
        <p>We take reasonable measures to protect the security and confidentiality of your personal information. We use industry-standard security protocols and procedures to safeguard your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet, or method of electronic storage, is 100% secure.</p>
        <h3>4. Third-Party Services</h3>
        <p>We do not use any third-party services that collect or process your personal information. However, our app may contain links to third-party websites or services that have their own privacy policies. We are not responsible for the privacy practices or content of these third-party websites or services.</p>
        <h3>5. Changes to this Privacy Policy</h3>
        <p>We reserve the right to modify or update this Privacy Policy at any time without prior notice. If we make any material changes to this Privacy Policy, we will notify you by email or by posting a notice in our app. Your continued use of our app after any changes to this Privacy Policy indicates your acceptance of the changes.</p>
        <h3>6. Contact Us</h3>
        <p>If you have any questions or concerns about our privacy policy, please contact us at <a href="mailto:info@habbo.ms">info@habbo.ms</a>. We will be happy to answer any questions you may have.</p>
      </IonContent>
    </IonPage>
  );
};

export default Privacy;
