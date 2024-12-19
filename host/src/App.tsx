import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "mfe_1/button";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
    <Button />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
