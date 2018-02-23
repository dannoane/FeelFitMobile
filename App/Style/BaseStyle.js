
export default class BaseStyle {

  constructor() {
    this.style = {};
  }

  width(w) {
    this.style.width = w;
    return this;
  }

  height(h) {
    this.style.height = h;
    return this;
  }

  custom(c) {
    this.style = Object.assign({}, this.style, c);
    return this;
  }

  build() {
    return this.style;
  }
}
