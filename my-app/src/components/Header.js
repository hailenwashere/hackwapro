import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import { useNavigate } from 'react-router';


export default function Header() {
  const navigate = useNavigate();
  const gotoAdd = () => {
    // Define the logic for navigating to the desired location
    navigate("/add");
  };
  const gotoGPT = () => {
    // Define the logic for navigating to the desired location
    navigate("/gpt");
  };

    return (
        <header className="header">
          <div className="left">
            <h1 className="logo">OURFRIDGE</h1>
          </div>
          <div className="right">
            <button className="button_header button-short">my items</button>
            <button className="button_header button-short">summary</button>
            <button className="button_header button-short" onClick={gotoGPT} >generate recipe</button>
            <button className="button_header add_item"onClick={gotoAdd}><FontAwesomeIcon icon={faCirclePlus} /> ADD ITEM</button>
          </div>
        </header>
      );
}

