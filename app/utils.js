class Utils {

  isCollission(a, b) {
    return !(
      ((a.y + a.height) < (b.y)) ||
      (a.y > (b.y + b.height)) ||
      ((a.x + a.width) < b.x) ||
      (a.x > (b.x + b.width))
    );
  }

  areColidedElements(elem1, elem2){
    let el1 = elem1.getBoundingClientRect();
    let el2 = elem2.getBoundingClientRect();
    let elementsColided = this.isCollission(
      { y: el1.top, x: el1.left, height: el1.height, width: el1.width },
      { y: el2.top, x: el2.left, height: el2.height, width: el2.width }
    );
    return elementsColided;
  }

}

module.exports = new Utils();