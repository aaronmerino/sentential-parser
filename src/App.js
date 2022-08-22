import React from "react";
import "./style.css";
import { Expression } from './expression.js';
import { buildExpressionTree } from './expression-tree-builder.js';

class InputExpressionBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.props.onHandleInputChange(e.target.value);
  }

  render() {
    return (
     <form className="InputExpressionBar">
        <input 
          type="text" 
          placeholder="enter expression..." 
          onChange={this.handleInputChange}
          />
        {/* <p>
          <button type="button">enter</button> 
        </p> */}
      </form>
    );
  }
}

class Tree extends React.Component {
  render() {
    const children = [];
    this.props.currentNode.children.forEach((node) => {
      children.push(
        <Tree currentNode={node}/>
      );
    });

    if (children.length > 0) {
      return (
        <li className="Tree">
          {this.props.currentNode.text}
          <ul>
            {children}
          </ul>
        </li>
      );
    }

    return (
      <li className="Tree">
        {this.props.currentNode.text}
      </li>
    );
  }
}

class Result extends React.Component {
  render() {
    if (this.props.invalidExpression) {
      return (
        <div className="Result">{"not a wff"}</div>
      );
    } 
    return (
      <div className="Result">
        <ul><Tree currentNode={this.props.expression}/></ul>
      </div>
    );
  }
}



class InformationSymbols extends React.Component {
  render() {
    return (
      <div>
        <h3>Symbols</h3>
        <h4>{'|, &, >, -, ~'}</h4>
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
      <header className="Header">
        <h1> Sentential Logic Parser </h1>
        <p>By Aaron Merino</p>
      </header>
    );
  }
}

class App extends React.Component {
  /*
    When we enter a valid WFF:
      Build a tree using a class called Node
      Pass this tree to Result component
        Result component will walk through the tree Node:
          Make a component Expression which will walk the tree:
            <Experssion expression={this.node.expression} currentNode={this.node}/>
  */

  constructor(props) {
    super(props);
    // const example = new Expression('((A ^ B) > C)', '>', 
    // [
    //   new Expression('(A ^ B)', '^', [
    //     new Expression('A', 'A', []),
    //     new Expression('B', 'B', []),
    //   ]),
    //   new Expression('C', 'C', [])
    // ]);

    this.state = {
      expressionText: '',
      invalidExpression: true,
      expressionTree: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(expression) {
    let tree;
    tree = buildExpressionTree(expression);

    if (!tree) {
      this.setState({
        invalidExpression: true
      });
    } else {
      this.setState({
        expressionText: tree.text,
        expressionTree: tree,
        invalidExpression: false
      });
    }
  }

  render() {


    return (
      <div className="App">
        <Header />
        <Information />
        <InputExpressionBar onHandleInputChange={this.handleInputChange}/>
        <Result invalidExpression={this.state.invalidExpression} expression={this.state.expressionTree}/>
      </div>
    );
  }
}



export default App;