/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

import { useNavigate } from "react-router-dom";

// declare function require(name: string): string;
// const css = require("./NotFound.css");

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <body>
        <section className="css.notFound">
          <div className="img">
            <img
              src="https://assets.codepen.io/5647096/backToTheHomepage.png"
              alt="Back to the Homepage"
            />
            <img
              src="https://assets.codepen.io/5647096/Delorean.png"
              alt="El Delorean, El Doc y Marti McFly"
            />
          </div>
          <div className="text">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <h3>BACK TO HOME?</h3>
            <a onClick={() => navigate("/", { replace: true })} className="yes">
              YES
            </a>
            <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
          </div>
        </section>
      </body>
    </div>
  );
};

export default NotFound;
