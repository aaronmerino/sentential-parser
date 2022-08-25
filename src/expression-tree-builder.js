import { Expression } from './expression.js';
import { SYMBOLS, LETTERS } from './symbols.js';
/*
  Parses the expression and builds the tree top-down along the way.

  returns the unique tree for the expression.
  returns false if exprsesion is not a WFF.
*/
function buildExpressionTree(expression) {
  /*
    probly need a stack to keep track of all the current leaves of the tree.

    new Expression(expression, '', '')
    push expression node into stack

    while true
      pop from stack
        if stack empty: 
          we are done and return
        else:
          generate its children expresions and push them into stack

  */
  let leavesStack = [];
  
  let rootExpression = new Expression(expression, '', []);
  leavesStack.push(rootExpression);

  while (true) {
    let currentNode = leavesStack.pop();

    if (!currentNode) {
      break;
    }

    if (currentNode.text.length == 1) {
      if (LETTERS[currentNode.text]) {
        continue;
      }
      return false;
    }

    // Check first char
    if (currentNode.text[0] !== '(') {
      return false;
    }
    
    // Check second char
    if (currentNode.text[1] === '~') {
      let remainingText = currentNode.text.substring(2);
      let leftBracketsStack = [];
      let constituent = '';
      let foundConstituent = false;
      let foundLastRightBracket = false;

      for (const c of remainingText) {
        if (!SYMBOLS[c] && !LETTERS[c]) {
          return false;
        }
        
        if (foundLastRightBracket) {
          return false;
        }

        if (foundConstituent && !foundLastRightBracket) {
          if (c !== ')') {
            return false;
          }
          foundLastRightBracket = true;
          continue;
        }

        
        constituent += c;
        

        if (c === '(') {
          // push into leftBracketsStack
          leftBracketsStack.push(c);
        } else if (c === ')') {
          // pop from leftBracketsStack
          let res = leftBracketsStack.pop();

          if (!res) {
            return false;
          }

          if (leftBracketsStack.length == 0) {
            // found constituent
            foundConstituent = true;
          }
        } else { // c is a letter
          if (leftBracketsStack.length != 0) {
            continue;
          }
          foundConstituent = true;
        }
      }

      if (!foundConstituent || !foundLastRightBracket) {
        return false;
      }
      let node = new Expression(constituent, '', []);
      console.log("we push node: " + constituent);
      currentNode.children.push(node);
      currentNode.mainConnective = '~';

      leavesStack.push(node);

    } else {
      let remainingText = currentNode.text.substring(1);
      let leftBracketsStack = [];
      let mainConnective = '';
      let leftConstituent = '';
      let rightConstituent = '';

      let foundMainConnective = false;
      let foundLeftConstituent = false;
      let foundRightConstituent = false;
      let foundLastRightBracket = false;

      for (const c of remainingText) {
        // console.log();
        // console.log(c);
        if (!SYMBOLS[c] && !LETTERS[c]) {
          return false;
        }
        
        if (foundLastRightBracket) {
          return false;
        }

        if (foundRightConstituent && !foundLastRightBracket) {
          if (c !== ')') {
            return false;
          }
          foundLastRightBracket = true;
          // console.log('found last right bracket')
          continue;
        }

        if (foundLeftConstituent && !foundMainConnective) {
          if (c === '(' || c === ')' || LETTERS[c]) {
            return false;
          } 

          foundMainConnective = true;
          // console.log('found main connective');
          mainConnective = c;
          continue;
        }

        if (!foundLeftConstituent) {
          leftConstituent += c;
        } else {
          rightConstituent += c;
        }
        
        if (c === '(') {
          // push into leftBracketsStack
          leftBracketsStack.push(c);
        } else if (c === ')') {
          // pop from leftBracketsStack
          let res = leftBracketsStack.pop();

          if (!res) {
            return false;
          }

          if (leftBracketsStack.length == 0) {
            // found constituent
            if (!foundLeftConstituent) {
              foundLeftConstituent = true;
              // console.log('found left constituent');
            } else {
              foundRightConstituent = true;
              // console.log('found right constituent');
            }
          }
        } else { // c is a letter
          if (leftBracketsStack.length != 0) {
            continue;
          }

          if (!foundLeftConstituent) {
            foundLeftConstituent = true;
            // console.log('found left constituent');
          } else {
            foundRightConstituent = true;
            // console.log('found right constituent');
          }
        }


      }

      if (!foundLeftConstituent || !foundRightConstituent || !foundLastRightBracket) {
        return false;
      }
      let leftNode = new Expression(leftConstituent, '', []);
      let rightNode = new Expression(rightConstituent, '', []);
      console.log("we push left node: " + leftConstituent + ", we push right node: " + rightConstituent);
      currentNode.children.push(leftNode);
      currentNode.children.push(rightNode);
      currentNode.mainConnective = mainConnective;
      leavesStack.push(leftNode);
      leavesStack.push(rightNode);
    }


  }
  console.log('asddfdsfs');
  return rootExpression;
}

export {buildExpressionTree};