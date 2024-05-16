import express from 'express';
import connect from './schemas/index.js';
import UserRouter from './routes/characters.router.js';
import ItemRouter from './routes/items.router.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

//프론트엔드 자산
//app.use(express.static('./assets'));

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

app.use('/api', router, UserRouter , ItemRouter);

// 에러 핸들링 미들웨어를 등록
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
