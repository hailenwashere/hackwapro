export default function Header() {
  return (
    <div className="header" style={{ display: 'flex' }}>
      <div style={{ fontSize: '30', fontWeight: 'bold', color: 'purple' }}>OurFridge</div>
      <div>
        <button>Add to Fridge</button>
      </div>
      <div>
        <button>Recipe Generator</button>
      </div>
      <div>
        <button>Stats??</button>
      </div>
    </div>
  );
}
