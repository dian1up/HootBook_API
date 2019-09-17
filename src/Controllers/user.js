const userModel = require('../Models/user')
const cache = require('../Configs/redis')
module.exports={
    getBook: (req, res) => {
        // cache.get("books:0",  (err, obj)=> {}
        cache.hvals("books:0",  (err, obj)=> {
            
            if (obj.length !== 0) {
                console.log(obj)
                let data = JSON.parse(obj)
                console.log('get');
                res.json(data)
            } else {
                userModel.getAll()
                    .then(result =>{
                        result.map(
                            (val, index) =>{
                                cache.hmset('books:'+index, 'value', JSON.stringify(val))                            }
                        )
                        // cache.set('asd',JSON.stringify(result))
                        // console.log('server');
                        
                        res.json(result)
                    })
                    .catch(err => console.log(err))
            }
        });
      },
}