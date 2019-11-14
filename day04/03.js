function asyncFn(generatorFn, time) {
  setTimeout(function() {
      generatorFn.next('비동기 응답');
  },time)
}


const gen = (function* () {
  let result = null;
  result = yield asyncFn(gen,400);
  console.log(result);
  result = yield asyncFn(gen,1000);
  console.log(result);
}())

console.log('시작')
gen.next();
console.log('종료')

/*
  제너레이터를 사용한 비동기 처리
  콜백헬을 방지하여 비동기를 프로미스의 체이닝을 벗어나 보다 쉽게 처리할 수 있다.
  위와 같은 문법보다 더 쉬운 async/awit 함수가 ES7에 구현되었다.
*/