module.exports = {
    //강의자는 heroku를 통해 배포했기 때문에 heroku에 정의된 MONGO_URI를 사용한것.
    //배포할때 유의해야함
    mongoURI: process.env.mongoURI
}