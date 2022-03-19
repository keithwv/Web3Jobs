import React from "react";
import "../style/Header.scss";
import close from "../components/images/icon-remove.svg";

const Header = ({ filterKeywords, clearAll, deleteKeyword }) => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__listItems">
          <ul>
            {filterKeywords.map((key, id) => {
              return (
                <li key={id}>
                  {key}
                  <button onClick={() => deleteKeyword(key)}>
                    <img fill="black" src={close} className="close" alt="" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <a href="#" onClick={() => clearAll()}>
          Clear
        </a>
      </div>
    </div>
  );
};

export default Header;
