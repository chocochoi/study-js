// function test(object) {
//   object.num && console.log(object.num);
//   // 방어로직
//   // 예외로직

//   console.log('함수종료');
// }

function test(object) {
  try {
    object.num && console.log(object.num);
  } catch(e) {
    console.log(e);
  } finally {
    console.log('파이널리');
  }
  console.log('함수종료');
}


test();