
import mongoose from 'mongoose';


//stat 서브 스키마

const item_statSchema = new mongoose.Schema({
    health: {
        type: Number,
    },
    power: {
        type: Number,
    },
},
{ _id: false }); 

//itemInfo 메인 스키마
const itemInfo = new mongoose.Schema({
    item_code: {
        type: Number,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    item_stat: item_statSchema,
});


export default mongoose.model('item', itemInfo);