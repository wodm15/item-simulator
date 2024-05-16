import express from 'express';
import Item from '../schemas/items.schema.js';

const router =express.Router();

//item 생성 코드

router.post('/items', async(req, res, next)=>{
    try{
    //3개 데이터 입력 받기
    const {item_code, item_name, item_stat} = req.body;
    
    const alreadyExist = await Item.findOne({ item_code }).exec();
    if(alreadyExist !== null){
        return res.status(400).json({ message: '이미 존재하는 아이템입니다.' });
    }
    const newItem = new Item({
        item_code, 
        item_name, 
        item_stat
    });

    const saveItem = await newItem.save();
    return res.status(201).json(saveItem);

    }catch (error){
        next(error);
    }
});



export default router;