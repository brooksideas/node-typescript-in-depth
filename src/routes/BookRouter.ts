import express from 'express';
import controller from '../controllers/BookController';

const router = express.Router();

router.post('/create', controller.createBook);
router.get('/get/:authorId', controller.readBook);
router.get('/get/', controller.readAllBook);
router.patch('/update/:authorId', controller.updateBook);
router.delete('/delete/:authorId', controller.deleteBook);

export = router;