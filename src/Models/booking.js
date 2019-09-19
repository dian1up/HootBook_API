const conn = require('../Configs/db')
module.exports = {
  book: (data) => {
    return new Promise((resolve,reject)=>{
      conn.query(`INSERT bookings SET ?`, data, (err, result)=>{
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllBookings: () => {
    return new Promise((resolve,reject)=>{
      conn.query(`SELECT bookings.*, services.id AS service_id, services.room_type, services.price FROM bookings JOIN services ON bookings.service_id = services.id`, (err, result)=>{
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllBookingsOnHotel: (hotel_id) => {
    return new Promise((resolve,reject)=>{
      conn.query(`SELECT bookings.*, services.id AS service_id, services.room_type, services.price FROM bookings JOIN services ON bookings.service_id = services.id WHERE services.hotel_id = ?`, hotel_id, (err, result)=>{
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateBooking: (id,data) =>{
    return new Promise((resolve,reject)=>{
      conn.query(`UPDATE bookings SET ? WHERE id = ?`, [data, id], (err, result)=>{
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}