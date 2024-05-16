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

//아이템 수정 api (patch 는  리소스의 부분적인 수정을 할 때에 사용)
router.patch('/items/:item_code', async (req, res, next) => {
    try {    
        const { item_code } = req.params;
        const { item_name, item_stat } = req.body;

        // id 존재여부 확인
        const checkExist = await Item.findOne({ item_code }).exec();
        if (checkExist === null) {
            return res.status(400).json({ message: "아이템 코드가 존재하지 않습니다." });
        }

        // 업데이트 함수 findByIdAndUpdate 함수 이용
        const updatedItem = await Item.findOneAndUpdate({ item_code }, { item_name, item_stat }, { new: true });
        return res.status(201).json(updatedItem);
    } catch (error) {
        next(error);
    }
});

// 아이템 전체 목록 조회 API
router.get('/items', async (req, res, next) => {
    try {
        //find 함수 {}, {보여주고싶은 것 : 1 , 기본적으로 보여주는 _id 보여주기 싫음 : 0}
        const getAll = await Item.find({},{item_code: 1 , item_name: 1, _id: 0}).exec();
        return res.status(201).json(getAll);
    } catch (error) {
        next(error);
    }
});

//아이템 상세 목록 조회 API
router.get('/items/:item_code',async (req, res, next) =>{
    try{
        const {item_code} = req.params;

        //item 스키마에서 stat은 또다른 고유 _id를 가지고 있어서 지워야됨
        const getItem = await Item.findOne({ item_code }, { _id: 0, "item_stat._id": 0,}).exec();

        //아이디가 없으면?
        if(getItem ===null){
            res.status(400).json({message: "해당하는 아이템이 없습니다."});
        }

        const response = {
            item_code: getItem.item_code,
            item_name: getItem.item_name,
            item_stat: getItem.item_stat
        };

        return res.status(201).json(response);
    }catch (error){
        next(error);
    }
});


export default router;