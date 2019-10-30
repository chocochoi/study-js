/**
 * 1. 폴더를 만들어서 이 파일을 넣는다.
 * 2. 터미널에 npm init  그다음 계속 엔터
 * 3. npm install prompt-sync
 * 4. node exam03 실행해보기
 */

//console.log('입력한것은 : ',data);

const prompt = require('prompt-sync')();
let memoList = [];

class Memo{
  start(){
    console.log(`
    ------------------------------------
    1. 전체메모 조회
    2. 메모 입력
    3. 메모 모두 삭제하기
    0. 종료
    ------------------------------------
    `);
    let selectNum = prompt('메뉴 중 처리할 항목을 선택하세요 :');
    if(selectNum === "1"){
      this.lookUp();
    }else if(selectNum === "2"){
      this.input();
    }else if(selectNum === "3"){
      this.delete();
    }else if(selectNum === "0"){
      console.log('프로그램 종료다~~');
    }else{
      this.start();
    }
  }
  lookUp(){
    if(memoList.length === 0){
      console.log('메모가 없습니다');
      this.back();
    }else{
      for(let i in memoList) {
        console.log(`[${parseInt(i)+1}] ${memoList[i]}`);
      }
      this.back();
    }
  }
  input(){
    let memoTxt = prompt('메모 입력 : ');
    if(memoList.length<5){
      memoList.push(memoTxt);
      this.start();
    }else{
      console.log('메모는 5개까지만 됩니다요');
      this.start();
    }
  }
  delete(){
    if(memoList.length === 0){
      console.log('지울게 없다요');
      this.start();
    }else{
      memoList = [];
      this.start();
    }
  }
  back(){
    let back = prompt('0. 뒤로가기');
    if(back==='0'){
      this.start();
    }else{
      this.lookUp();
    }
  }
}

const memo = new Memo;
memo.start();

/*

과제 밑의 프로그램 만들어오기
클래스 꼭 안써도 괜찮음





------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 1




------------------------------------
메모가 없습니다
0. 뒤로가기
------------------------------------




------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 2


------------------------------------
메모 입력 : 123456


------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 1



------------------------------------
[1] 123456
0. 뒤로가기
------------------------------------



- 전체메모 조회기능
메모 없으면 없다고 나오기

- 메모 입력하기 기능
메모는 최대 5개까지 입력가능
메모가 이미 5개면 입력 못한다는 문구 띄워주기

- 메모 모두 삭제
지금까지 작성한 메모 전부 삭제
작성한 메모가 없으면 없다는 문구 띄워주기


- 0을 입력받아 종료하기 전까지 계속 프로그램이 돌아가야함

 */