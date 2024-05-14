// schemas/index.js

import mongoose from 'mongoose';



const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://user:3061892@mongo.1zjigsy.mongodb.net/?retryWrites=true&w=majority&appName=mongo',
      {
        dbName: 'item_memo', // 데이터베이스명 사용
      },
    )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;