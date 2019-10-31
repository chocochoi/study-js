class MemoServer {
  constructor() {
      this.db = {
          count : 0,
          items : []
      }
  }
  getMemoCount() {
      return this.db.count;
  }
  insertMemo(username,title,content) {
      this.db.count = this.db.count + 1;
      this.db.items.unshift({
        index: this.db.count,
        username: username,
        title:title,
        content: content
      });
  }
  retrieveMemo() {
      return this.db.items;
  }
  deleteMemo() {
      this.db.count = 0;
      this.db.index = 0;
      this.db.items = [];
  }
}

class MemoFront {
  constructor() {
      const prompt = require('prompt-sync')();
      this.server = new MemoServer();
      this.input = () => prompt('메뉴 중 처리할 항목을 선택하세요 : ');
      this.titleInput = () => prompt('제목을 입력하세요 : ');
      this.usernameInput = () => prompt('글쓴이를 입력하세요 : ');
      this.contentInput = () => prompt('내용을 입력하세요 : ');
      this.selectNumInput = () => prompt('조회할 글번호를 입력하세요 :');
      this.createForm = this.createForm.bind(this);
      this.numberSearchForm = this.numberSearchForm.bind(this);
      this.retrieveForm = this.retrieveForm.bind(this);
      this.deleteForm = this.deleteForm.bind(this);
  }

  total(){
    console.log(`전체 ${this.server.getMemoCount()} 개`);
  }

  header() {
      console.log('------------------------------------');
  }

  tableHeader(){
    console.log(`
번호   글쓴이      제목

------------------------------------
    `)
  }

  footer() {
      console.log('0. 뒤로가기');
      console.log('------------------------------------');
      while(true) {
          if(this.input() === '0') return true;
          console.log('잘못 입력하셨습니다.');
      }
  }

  index() {
      console.log(`
------------------------------------
1. 전체 게시물 조회
2. 글번호 조회
3. 글등록
4. 글수정
5. 글삭제
0. 종료
------------------------------------
  `);
      return this.input();
  }

  createForm() {
      this.header();

      this.server.insertMemo(this.titleInput(),this.usernameInput(),this.contentInput());
      console.log('게시글 등록이 완료되었습니다.');

      return this.footer();
  }

  retrieveForm() {
      this.total();
      this.header();
      this.tableHeader();
      if(this.server.getMemoCount()) {
          this.server.retrieveMemo().forEach(item => {
              console.log(` ${item.index}    ${item.username}         ${item.title}`);
          })
      }
      else {
          console.log(`
게시물이 존재하지 않습니다.

------------------------------------`);
      }
      return this.footer();
  }

  numberSearchForm(){
    let num = this.selectNumInput();
    let numCount = 0;
    this.header();
    // .entries()
    this.server.retrieveMemo().forEach(function (item, index, array) {
      if(item.index === parseInt(num)){
        console.log(`
번호 : ${item.index}

글쓴이 : ${item.username}

제목 : ${item.title}

내용 : ${item.content}
        `);
      }else{
        numCount++;
      }
    });
    if(numCount === this.server.retrieveMemo().length){
      console.log('입력된 번호는 존재하지 않습니다.');
    }
    return this.footer();
  }

  deleteForm() {
      this.header();
      if(this.server.getMemoCount()) {
          this.server.deleteMemo();
          console.log('메모가 전부 삭제되었습니다.');
      }
      else {
          console.log('메모가 없습니다.');
      }
      return this.footer();


  }

  render() {
      let action = null;
      switch(this.index()) {
          case '1' : action = this.retrieveForm; break;
          case '2' : action = this.numberSearchForm; break;
          case '3' : action = this.createForm; break;
          case '4' : action = this.editForm; break;
          case '5' : action = this.deleteForm; break;
          case '0' : return false; break;
          default : console.log('잘못 입력하셨습니다.'); return true;
      }
      return action();
  }
}

const user = new MemoFront();
let loop = true;
while(loop) {
  loop = user.render();
}



