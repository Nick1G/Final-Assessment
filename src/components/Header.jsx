import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font"
          border="0"
        />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/my-watch-list">Watch List</Link>
            </li>
            <li>
              <Link to="/providers">Providers</Link>
            </li>
          </ul>
        </nav>
      </div>
      {props.children}
    </header>
  );
};

export default Header;
