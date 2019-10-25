class Box {
  goo() {
    for(let i = 1 ; i < 10 ; i++) {
      console.log(`${this.num} * ${i} = ${i*this.num}`);
    };
  };
  setNum(num) {
    this.num = num;
  }
  getNum() {
    return this.num;
  }
}

class Choi extends Box {
  setNum(num) {
    this.num = num + 1;
  }
  sumTen() {
    return this.num + 10;
  }
}




const 최 = new Choi();
최.setNum(20)
console.log(최.getNum())
console.log(최.goo())
