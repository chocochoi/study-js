const app = require('express')();
app.use(require('body-parser').json());

const db = {
  count : 0,
  items : [],
  sequence : (function(){
      let result = 1;
      return function(){
          return result++;
      }
  })()
}

app.post('/board', (req, res) => {
  const data = req.body.data;
  db.count = db.count + 1;
  db.items.push({
      no: db.sequence(),
      title: data.title,
      writer: data.writer,
      content: data.content
  });
  res.end();
});


app.get('/board', (req, res) => {
  const query = req.query;
  let result = {};
  if(query && query.no) {
    result = db.items.filter(row => row.no == query.no)[0] || false;
  }else {
    result = db.items
  }
  res.end(JSON.stringify(result));
});

app.put('/board', (req, res) => {
  const data = req.body.data;
  let result = false;
  db.items = db.items.map((row) => {
      if(row.no == data.no) {
          result = true;
          row.title = data.title;
          row.content = data.content;
      }
      return row;
  });
  res.end(JSON.stringify(result));
});

app.delete('/board', (req, res) => {
  const data = req.body;
  let result = false;
  db.items.filter((row) => {
      if(row.no == data.no) {
          db.count = db.count - 1;
          result = true;
          return false;
      }
      else return true;
  });
  res.end(JSON.stringify(result));
});

app.get('/boardCount', (req, res) => {
  res.end(JSON.stringify(db.count));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





// app.delete('/board');






// class BoardServer {
//   constructor() {

//   }
//   getBoardCount() {
//       return this.db.count;
//   }
//   insertBoard(data) {

//   }
//   retrieveBoard(reqNo) {
//       if(reqNo) {
//           return (this.db.items.filter(row => row.no == reqNo))[0];
//       }else {
//           return this.db.items;
//       }
//   }
//   updateBoard(data) {
//       let result = false;
//       this.db.items = this.db.items.map((row) => {
//           if(row.no == data.no) {
//               result = true;
//               row.title = data.title;
//               row.content = data.content;
//           }
//           return row;
//       });
//       return result;
//   }
//   deleteBoard(reqNo) {
//       let result = false;
//       this.db.items = this.db.items.filter((row) => {
//           if(row.no == reqNo) {
//               this.db.count = this.db.count - 1;
//               result = true;
//               return false;
//           }
//           else return true;
//       });
//       return result;
//   }
// }