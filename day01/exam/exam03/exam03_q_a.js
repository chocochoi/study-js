

class BoardServer {
    constructor() {
        this.db = {
            count : 0,
            items : [],
            sequence : (function(){
                let result = 1;
                return function(){
                    return result++;
                }
            })()
        }
    }
    getBoardCount() {
        return this.db.count;
    }
    insertBoard(data) {
        this.db.count = this.db.count + 1;
        this.db.items.push({
            no: this.db.sequence(),
            title: data.title,
            writer: data.writer,
            content: data.content
        });
    }
    retrieveBoard(reqNo) {
        if(reqNo) {
            return (this.db.items.filter(row => row.no == reqNo))[0];
        }else {
            return this.db.items;
        }
    }
    updateBoard(data) {
        let result = false;
        this.db.items = this.db.items.map((row) => {
            if(row.no == data.no) {
                result = true;
                row.title = data.title;
                row.content = data.content;
            }
            return row;
        });
        return result;
    }
    deleteBoard(reqNo) {
        let result = false;
        this.db.items = this.db.items.filter((row) => {
            if(row.no == reqNo) {
                this.db.count = this.db.count - 1;
                result = true;
                return false;
            }
            else return true;
        });
        return result;
    }
}

class BoardFront {
    constructor() {
        const prompt = require('prompt-sync')();
        this.server = new BoardServer();
        this.input = () => prompt('메뉴 중 처리할 항목을 선택하세요 : ');
        this.customInput = msg => prompt(msg);

        this.createForm = this.createForm.bind(this);
        this.retrieveForm = this.retrieveForm.bind(this);
        this.retrieveAllForm = this.retrieveAllForm.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
    }

    header() {
        console.log('------------------------------------');
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
1. 전체게시물 조회
2. 글 번호 조회
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
        const board = {}
        board.title = this.customInput('제목을 입력하세요 : ');
        board.writer = this.customInput('글쓴이를 입력하세요 : ');
        board.content = this.customInput('내용을 입력하세요 : ');
        this.server.insertBoard(board);
        console.log('게시글 등록이 완료되었습니다.');
        return this.footer();
    }

    retrieveAllForm() {
        this.header();
        console.log(`전체 ${this.server.db.count}개`)
        console.log('------------------------------------')
        console.log('번호       글쓴이      제목')
        console.log('------------------------------------')
        if(this.server.db.count) {
            this.server.retrieveBoard().reverse().forEach(row => {
                console.log(`${row.no}   ${row.writer}   ${row.title}`);
            })
        }
        else {
            console.log('게시물이 존재하지 않습니다.');
        }
        console.log('------------------------------------')
        return this.footer();
    }

    retrieveForm() {
        this.header();
        const row = this.server.retrieveBoard(this.customInput('조회할 글번호를 입력하세요 : '));
        console.log('------------------------------------')
        if(row && row.no) {
            console.log(`번호 : ${row.no}`);
            console.log(`글쓴이 : ${row.writer}`);
            console.log(`제목 : ${row.title}`);
            console.log(`내용 : ${row.content}`);
        }
        else {
            console.log('입력된 번호는 존재하지 않습니다. ');
        }
        console.log('------------------------------------')
        return this.footer();
    }

    updateForm() {
        this.header();
        const board = {}
        board.no = this.customInput('수정할 글번호를 입력하세요 : ');
        board.title = this.customInput('변경할 제목을 입력하세요 : ');
        board.content = this.customInput('변경할 내용을 입력하세요 : ');
        if(this.server.updateBoard(board)) console.log('게시글이 수정되었습니다.');
        else console.log('입력된 번호는 존재하지 않습니다.');
        return this.footer();
    }

    deleteForm() {
        this.header();
        if(this.server.deleteBoard(this.customInput('삭제할 글번호를 입력하세요 : '))) console.log('게시글이 삭제되었습니다. ');
        else console.log('입력하신 번호에 해당하는 게시글이 없습니다.');
        return this.footer();
    }

    render() {
        let action = null;
        switch(this.index()) {
            case '1' : action = this.retrieveAllForm; break;
            case '2' : action = this.retrieveForm; break;
            case '3' : action = this.createForm; break;
            case '4' : action = this.updateForm; break;
            case '5' : action = this.deleteForm; break;
            case '0' : return false; break;
            default : console.log('잘못 입력하셨습니다.'); return true;
        }
        return action();
    }
}

const user = new BoardFront();
let loop = true;
while(loop) {
    loop = user.render();
}



