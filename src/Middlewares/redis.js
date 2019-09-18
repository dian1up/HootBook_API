const cache = require('../Configs/redis')

module.exports = {
  getServices : (req, res, next) =>{
    if(cache.hexists('services', req.params.id)){
      console.log('cache');
      cache.hget('services', req.params.id, (err,reply) =>{
        if(reply){
          return res.status(200).json(JSON.parse(reply))
        }else{
          next()
        }
      })
    }else{
      next()
    }
  },
  getBookings : (req, res, next) =>{
    if(cache.hexists('bookings', 'all')){
      console.log('cache');
      cache.hget('bookings', 'all', (err,reply) =>{
        if(reply){
          return res.status(200).json(JSON.parse(reply))
        }else{
          next()
        }
      })
    }else{
      next()
    }
  },
  getBookingsOnHotel : (req, res, next) =>{
    if(cache.hexists('bookings', req.params.hotelId)){
      console.log('cache');
      cache.hget('bookings', req.params.hotelId, (err,reply) =>{
        if(reply){
          return res.status(200).json(JSON.parse(reply))
        }else{
          next()
        }
      })
    }else{
      next()
    }
  }
}