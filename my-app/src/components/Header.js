import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header" style={{ display: 'flex' }}>
            <div style={{ fontSize: '30', fontWeight: 'bold', color: 'purple' }}>OurFridge</div>
            <Link to="/add">
                <a href="" style={{ marginRight: '10px' }}>
                    Add to Fridge
                </a>
            </Link>
            <div>
                <button>Recipe Generator</button>
            </div>
            <div>
                <button>Stats??</button>
            </div>
        </div>
    );
}
