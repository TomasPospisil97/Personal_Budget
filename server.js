const express = require('express');
const app = express();

const PORT = 3000;
//process.env.PORT ||

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  