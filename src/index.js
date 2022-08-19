import React from "react";
import ReactDOM from "react-dom";
import { Expression } from './expression.js';
import App from "./App.js";


const example = new Expression('(A ^ B)', '^', 
                          [
                            new Expression('A', 'A', []),
                            new Expression('B', 'B', [])
                          ]);

ReactDOM.render(<App />, document.getElementById("root"));