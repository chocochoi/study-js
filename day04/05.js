const axios = require('axios');



const async = async function() {
  console.log(1)
  const temp = await axios.get('http://localhost:4000/get');
  console.log(temp.data)
  console.log(3)
}
async()

