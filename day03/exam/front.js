const axios = require('axios');
const url = 'http://localhost:3000/board';

class BoardFront {
    constructor() {
        const prompt = require('prompt-sync')();
        this.input = () => prompt('메뉴 중 처리할 항목을 선택하세요 : ');
        this.customInput = msg => prompt(msg);

        this.createForm = this.createForm.bind(this);
        this.retrieveAllForm = this.retrieveAllForm.bind(this);
        this.retrieveForm = this.retrieveForm.bind(this);
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

    async createForm() {
        this.header();
        const board = {}
        board.title = this.customInput('제목을 입력하세요 : ');
        board.writer = this.customInput('글쓴이를 입력하세요 : ');
        board.content = this.customInput('내용을 입력하세요 : ');
        await axios.post(url,{data: board});
        console.log('게시글 등록이 완료되었습니다.');
        return this.footer();
    }

    async retrieveAllForm() {
        this.header();
        const count = await axios.get(url+"Count");
        console.log(`전체 ${count.data}개`);
        console.log('------------------------------------');
        console.log('번호       글쓴이      제목');
        console.log('------------------------------------');
        if(Number(count.data)) {
            const board = await axios.get(url);
            board.data.reverse().forEach(row => {
                console.log(`${row.no}   ${row.writer}   ${row.title}`);
            })
        }
        else {
            console.log('게시물이 존재하지 않습니다.');
        }
        console.log('------------------------------------');
        return this.footer();
    }

    async retrieveForm() {
        this.header();
        const board = await axios.get(`${url}?no=${this.customInput('조회할 글번호를 입력하세요 : ')}`);
        const row = board && board.data || null;
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

    async updateForm() {
        this.header();
        const board = {}
        board.no = this.customInput('수정할 글번호를 입력하세요 : ');
        board.title = this.customInput('변경할 제목을 입력하세요 : ');
        board.content = this.customInput('변경할 내용을 입력하세요 : ');

        const result = await axios.put(url, {data: board});
        if(result && result.data) console.log('게시글이 수정되었습니다.');
        else console.log('입력된 번호는 존재하지 않습니다.');
        return this.footer();
    }

    async deleteForm() {
        this.header();
        const result = await axios.delete(url, {data: {no: this.customInput('삭제할 글번호를 입력하세요 : ')}});
        if(result && result.data) console.log('게시글이 삭제되었습니다. ');
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
            case '0' : return;
            default : console.log('잘못 입력하셨습니다.'); this.render();
        }
        action && action().then(data => data && this.render());
    }
}

const user = new BoardFront();
user.render();


