import BaseStyle from './BaseStyle';

export default class ViewStyle extends BaseStyle {

  flex(n) {
    this.style.flex = n;
    return this;
  }

  flexDirection(d) {
    this.style.flexDirection = d;
    return this;
  }

  justifyContent(jc) {
    this.style.justifyContent = jc;
    return this;
  }

  alignItems(ai) {
    this.style.alignItems = ai;
    return this;
  }

  background(bg) {
    this.style.backgroundColor = bg;
    return this;
  }
}
