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
      if (children.length == 2) {
        let leftExpression = this.props.currentNode.children[0];
        let rightExpression = this.props.currentNode.children[1];
        return (
          <li className="Tree">
            {'(' + leftExpression.text}<span className="highlight">{this.props.currentNode.mainConnective}</span>{rightExpression.text + ')'}
            <ul>
              {children}
            </ul>
          </li>
        );
      }
      
      return (
        <li className="Tree">
          {'('}<span className="highlight">{'~'}</span>{this.props.currentNode.children[0].text + ')'}
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
        <h4>{'(, ), |, &, >, -, ~'}</h4>
      </div>
    );
  }
}

class InformationRulesOfFormation extends React.Component {
  render() {
    return (
      <div>
      <h3>Rules of formation:</h3>
      <ol>
        <li>Sentence Symbols are WFFs</li>
        <li>If k and m are WFFs, so are (k|m), (k&m), (k>m), (k-m), (~k)</li>
        <li>Nothing else is a WFF</li>
      </ol>
    </div>
    );
  }
}

class InformationSentences extends React.Component {
  render() {
    return (
      <div>
        <h3>Sentences</h3>
        <h4>{'A, B, C, D, E, F, G, H, I'}</h4>
      </div>
    );
  }
}

class Information extends React.Component {
  render() {
    return (
      <div className="Information">
        <InformationSymbols/>
        <InformationSentences/>
        <InformationRulesOfFormation/>
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