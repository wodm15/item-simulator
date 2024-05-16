import express from 'express';
import User from '../schemas/characters.schema.js';

// db에서 가져오려면 User 쓰기

const router = express.Router();

//캐릭터 생성
router.post('/characters', async (req, res, next) => {
  try {
    const { name } = await req.body;
    //중복 아이디 확인 절차
    const alreadyExist = await User.findOne({ name }).exec();
    if (alreadyExist !== null) {
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' });
    }

    const maxId = await User.findOne().sort('-character_id').exec();
    const character_id = maxId ? maxId.character_id + 1 : 1;
    const user = new User({ name, character_id });
    await user.save();
    return res.status(201).json({
      message: `새로운 캐릭터 ${name}가 생성되었습니다.`,
      character_id,
    });
  } catch (error) {
    next(error);
  }
});

//캐릭터 삭제
router.delete('/characters/:character_id', async (req, res, next) => {
  try {
    //id 파라미터 가져오기
    const { character_id } = req.params;

    //db에서 id 찾는 함수 , findbyId 는 고유 id 만 식별 가능함
    const findId = await User.findOne({ character_id }).exec();

    if (!findId) {
      return res.status(400).json({ message: '캐릭터 조회에 실패하였습니다.' });
    }

    await User.deleteOne({ _id: findId }).exec();
    return res
      .status(201)
      .json({ message: `캐릭터 ${findId.name}가 삭제되었습니다.` });
  } catch (error) {
    next(error);
  }
});

// 캐릭터 상세 조회
router.get('/characters/:character_id', async (req, res, next) => {
  try {
    const { character_id } = req.params;
    const findId = await User.findOne({ character_id }).exec();
    if (!findId) {
      return res.status(400).json({ message: '해당 캐릭터가 없습니다.' });
    }
    const user = await User.findOne({ _id: findId }).exec();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
