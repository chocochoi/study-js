/**
 * 1. 폴더를 만들어서 이 파일을 넣는다.
 * 2. 터미널에 npm init  그다음 계속 엔터
 * 3. npm install prompt-sync
 * 4. node exam03 실행해보기
 */
// const prompt = require('prompt-sync')();
// let data = prompt('아무거나 입력해주세요 : ');
// console.log('입력한것은 : ',data);



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
    insertMemo(content) {
        this.db.count = this.db.count + 1;
        this.db.items.push({index: this.db.count, content: content});
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
        this.memoInput = () => prompt('메모 입력 : ');
        this.createForm = this.createForm.bind(this);
        this.retrieveForm = this.retrieveForm.bind(this);
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
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
    `);
        return this.input();
    }

    createForm() {
        this.header();
        if(this.server.getMemoCount() >= 5) {
            console.log('메모가 가득찼습니다.');
        }
        else {
            this.server.insertMemo(this.memoInput());
            console.log('메모가 입력되었습니다.');
        }
        return this.footer();
    }

    retrieveForm() {
        this.header();
        if(this.server.getMemoCount()) {
            this.server.retrieveMemo().forEach(item => {
                console.log(`[${item.index}] ${item.content}`);
            })
        }
        else {
            console.log('메모가 없습니다.');
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
            case '2' : action = this.createForm; break;
            case '3' : action = this.deleteForm; break;
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



