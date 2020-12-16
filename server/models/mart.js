// 마트 관련 DB 작성
const mongoose = require('mongoose');

//마트 스키마 작성
const martSchema = mongoose.Schema({
    martKey: {
        type: Number
    },
    name: {
        type: String
    },
    callNumber: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    info: {
        type: String
    }
})

//스키마를 모델로 감싸기   [모델 > 스키마]  구조
const Mart = mongoose.model('Mart',martSchema)

//모델을 다른 파일에서도 쓸 수 있게 export
module.exports = {Mart}









