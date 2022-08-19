class Expression {
  #text;
  #mainConnective;
  #children;

  constructor(text, mainConnective, children) {
    this.#text = text;
    this.#mainConnective = mainConnective;
    this.#children = children;
  }

  get text() {
    return this.#text;
  }
  
  get mainConnective() {
    return this.#mainConnective;
  }

  get children() {
    return this.#children;
  }
}

export { Expression };
