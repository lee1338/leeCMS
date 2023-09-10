import { Link } from 'react-router-dom';
import './FooterContainer.css';

const version = import.meta.env.VITE_VERSION;

const FooterContainer: React.FC<ContainerProps> = () => {


  return (
    <div id="footer-container" className="ion-padding">
      <span>
        <p>Habbo.ms © 2023</p>
      </span>
      <span>
        <p>{version}</p>
      </span>
      <span>
        <p><Link color="light" to='/privacy'>Datenschutzrichtlinien</Link></p>
        <p><Link color="light" to='/version'>Versionsverlauf</Link></p>
      </span>
    </div>
  );
};

export default FooterContainer;
