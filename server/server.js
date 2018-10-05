const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('root')
})

app.listen(3000, function () {
  console.log(`Listening on port 3000`);
});
