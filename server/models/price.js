const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const priceSchema = mongoose.Schema({
    martKey: {
        type: Number
    },
    productKey: {
        type: Number
    },
    date: {
         type: Date,
          default: Date.now
    },
    price: {
        type: Number
    }

})

//스키마를 모델로 감싸기   [모델 > 스키마]  구조
const Price = mongoose.model('Price', priceSchema)

//모델을 다른 파일에서도 쓸 수 있게 export
module.exports = { Price }