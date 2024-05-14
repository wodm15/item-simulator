import express from 'express';
import User from '../schemas/characters.schema.js';

const router = express.Router();

//캐릭터 생성
router.post('/characters', async(req, res , next)=>{
    try{
        const {name} = await req.body;
        const maxId = await User.findOne().sort('-character_id').exec();
        const character_id = maxId ? maxId.character_id + 1 : 1;
    const user = new User({name, character_id});
    await user.save();
    return res.status(201).json({ message: `새로운 캐릭터 ${name}가 생성되었습니다.`, character_id });
    } catch (error) {
        next(error);
    }

})

// //캐릭터 삭제
// router.delete('/characters/:character_id:', async(error, req, res , next)=>{

// })

// //캐릭터 상세 조회
// router.get('/characters/:character_id', async(error, req, res , next)=>{

// })



export default router;