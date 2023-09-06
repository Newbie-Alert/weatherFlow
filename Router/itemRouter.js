import express, { json } from 'express';

const router = express.Router();

const items = [
  {
    id: Date.now().toString(),
    content: "꼬미 산책",
    created: Date.now().toString(),
    username: 'user1',
    finish: false,
  }
]

// GET get All 
router.get('/', (req, res) => {
  res.status(200).json(items)
})

// POST _ body:{id, content, created, username, finish}
router.post('/post', (req, res, next) => {
  const postData = req.body
  items.push(postData);
  res.status(201).json({ message: "created" })
  // console.log(items);
})

// PUT _ body:{itemId, editedText}
router.put('/edit/:id', ((req, res, next) => {
  const itemid = req.params.id
  const editedText = req.body.editedText
  const foundItem = items.find(item => item.id === itemid)
  console.log(foundItem);
  foundItem.content = editedText;
  res.status(200).json(foundItem);
  // console.log(items);
}))

// DELETE _ body: {item id}
router.delete('/delete/:id', (req, res, next) => {
  const itemId = req.params.id;
  const deleted = items.filter(el => el.id !== itemId)
  res.status(200).json(deleted)

  // console.log(deleted);
})


export default router
