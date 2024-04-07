import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';


export default function Header() {
    return (
        <header className="header">
          <div className="left">
            <h1 className="logo">OURFRIDGE</h1>
          </div>
          <div className="right">
            <button className="button_header button-short">my items</button>
            <button className="button_header button-short">summary</button>
            <button className="button_header button-short">generate recipe</button>
            <button className="button_header add_item"><FontAwesomeIcon icon={faCirclePlus} /> ADD ITEM</button>
          </div>
        </header>
      );
}

