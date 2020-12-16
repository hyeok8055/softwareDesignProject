const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    productKey: {
        type: Number
    }
})

//스키마를 모델로 감싸기   [모델 > 스키마]  구조
const Product = mongoose.model('Product', productSchema)

//모델을 다른 파일에서도 쓸 수 있게 export
module.exports = { Product }