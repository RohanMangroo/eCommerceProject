import express from 'express';

const app = express();
const PORT = 3000;

//URL encoded parsing middleware
app.use(express.urlencoded({ extended: false }));

//body parsing middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
