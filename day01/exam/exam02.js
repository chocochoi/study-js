class React {
  setState(data) {
    if(!this.state) {
      this.state = {};
    }
    for(let key of Object.keys(data)) {
      this.state[key] = parseInt(data[key]);
    }
  }
  render() {
    for(let key of Object.keys(this.state)) {
      console.log(this.state[key]);
    }
  }
}

class Calculation extends React {
  sum(){
    console.log(this.state[0]+this.state[1]);
  }
  sub(){
    console.log(this.state[0]-this.state[1]);
  }
  mul(){
    console.log(this.state[0]*this.state[1]);
  }
  par(){
    console.log(this.state[0]/this.state[1]);
  }
  goo(){
    for(var i=1;i<10;i++){
      console.log(`${this.state[0]} X ${i} = ${this.state[0]*i}`)
    }
  }
  evenOdd(){
    if(this.state[0]%2 ==0){
      console.log('짝수다');
    }else{
      console.log('홀수다');
    }
  }
}

const calculation = new Calculation;

calculation.setState({0:'3'});
calculation.setState({1:'2'});
calculation.sum();
//calculation.sub();
calculation.mul();
calculation.par();
calculation.evenOdd();
calculation.goo();

/**
 * 1. 리액트 상속받는 클래스 만들기
 * 2. 숫자 집어넣기
 * 3. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 더하는 함수
 * 4. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 곱하는 함수
 * 5. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 나누는 함수
 * 6. 기존에 집어넣은 숫자가 짝수인지 홀수인지 구하는 함수
 * 7. 기존에 집어넣은 숫자의 구구단
 *
 * 주의사항 setNum getNum 세터/게터 사용하지말고 setState 사용하기
 * 만드는 함수에는 매개변수 받지말기
 */
