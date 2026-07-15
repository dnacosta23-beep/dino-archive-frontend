import { FaDragon } from "react-icons/fa";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <p className="eyebrow">Prehistoric Field Records</p>
       <h1>
    <FaDragon />
    {" "}
    Dino Archive
</h1>
        <p className="header-description">
          Explore stored dinosaur records and add discoveries
          to the collection.
        </p>
      </div>
    </header>
  )
}

export default Header