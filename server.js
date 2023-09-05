import router from './Router/itemRouter.js';
import express from 'express';
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// item Router
app.use('/item', router);



// ERROR HANDLER
app.use('*', (err, req, res, next) => {
  res.status(400).json({ message: "Sorry, not found" })
})

// PORT
app.listen(8080, () => {
  console.log(`listening on 8080`);
})