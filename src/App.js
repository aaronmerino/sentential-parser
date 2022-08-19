import React from "react";
import "./style.css";

class InputExpression extends React.Component {
  render() {
    return (
     <form>
        <input type="text" placeholder="enter expression..." />
        <p>
          <button type="button">enter</button> 
        </p>
      </form>
    );
  }
}

class Node extends React.Component {
  render() {
    return (
      <div>{this.props.expression}</div>
    );
  }
}

class Result extends React.Component {
  render() {
    const rows = [];

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}



class InformationSymbols extends React.Component {
  render() {
    return (
      <div>
        <h3>Symbols</h3>
        <h4>{'v, ^, >, =, ~'}</h4>
      </div>
    );
  }
}

class InformationLetters extends React.Component {
  render() {
    return (
      <div>
        <h3>Letters</h3>
        <h4>{'A, B, C, D, E, F, G, H, I'}</h4>
      </div>
    );
  }
}

class Information extends React.Component {
  render() {
    return (
      <div className="Information">
        <div><InformationSymbols/></div>
        <div><InformationLetters/></div>
      </div>
    );
  }
}


class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <h1> Sentential Logic Parser </h1>
        <p>By Aaron Merino</p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Information />
        <InputExpression />
      </div>
    );
  }
}

export default App;