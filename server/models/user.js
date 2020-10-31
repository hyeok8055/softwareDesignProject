const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//유저 스키마 작성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//모델에 정보를 저장하기 전에(pre) 아래와 같은 함수를 실행한다
userSchema.pre('save',function( next ){
    //암호화 해야할 비밀번호를 가져온다.
    var user = this;
    //비밀번호를 암호화 한다.
    //단, 비밀번호의 암호화를 하는 경우를 제한해야 한다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})


//comparePassword 메소드 정의
userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainpassword 와 암호화된 비밀번호가 동일한지 체크하는 함수
    //암호화된 비밀번호를 복호화 할수는 없으므로 plainPassword를 암호화하여 동일한지 체크한다.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //토큰을 디코드 한다
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를이용해서 유저 를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err,user){
            if(err) return cb(err)
            cb(null,user)
        })
    })
}

//스키마를 모델로 감싸기   [모델 > 스키마]  구조
const User = mongoose.model('User',userSchema)

//모델을 다른 파일에서도 쓸 수 있게 export
module.exports = {User}