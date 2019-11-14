function resultPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      // throw '에러났음';
        resolve('비동기 응답');
    }, 500);
  }).then(data => {
    console.log(data)
    setTimeout(() => {

    console.log('응답2')
  }, 300)})
  .then()
    .catch(data => console.log(data))
    .catch()
}

console.log(1)
resultPromise();
console.log(2)
