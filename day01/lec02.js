class Box {
  goo(num) {
    for(let i = 1 ; i < 10 ; i++) {
      console.log(`${num} * ${i} = ${i*num}`);
    };
  };
  setNum(num) {
    this.num = num;
  }
  getNum() {
    return this.num;
  }
}


const box1 = new Box();
box1.setNum(3);
console.log(box1.getNum())

const box2 = new Box();
console.log(box2.getNum())
