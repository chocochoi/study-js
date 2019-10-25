class Box {
  setNum(num) {
    this.num = num
  }
 goo(){
    for(var i=1; i<10;i++){
      console.log(`${this.num} x ${i} = ${this.num*i} `)
    }
  }
}

const a = new Box();
a.setNum(2);
a.goo();