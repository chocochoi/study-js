function asyncFn(time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve('비동기 응답');
      }, time);
  });
}

const async = async function() {
  try {
    let test1 = await asyncFn(500)
    console.log(test1);
    let test2 = await asyncFn(1000)
    console.log(test2);
  } catch(e) {
    console.log(e)
  }
  return 123;
}



console.log('시작')
async().then(data => console.log(data));
console.log('종료')
