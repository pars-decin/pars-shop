const express = require('express');

const app = express();
const port = 9999;

app.listen(port, err => {
  if (err) throw err;
  console.log(`server is listening on port: ${port}`);
});
