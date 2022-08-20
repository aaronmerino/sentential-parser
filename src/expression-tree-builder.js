import { Expression } from './expression.js';

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
}

export {buildExpressionTree};