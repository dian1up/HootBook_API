require('dotenv').config()
const cache = require('../Configs/redis')
const bookingModel = require('../Models/booking')

module.exports = {
  book : (req, res) => {
    const data = {
      service_id: req.body.service_id,
      check_in: new Date(req.body.check_in),
      check_out: new Date(req.body.check_out),
      user_id: req.user_id,
      status: 0,
    }
    bookingModel.book(data)
      .then(result => {
        data.id = result.insertId
        const response = {
          message: 'Booked successfully',
          data, 
        }
        return res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json({message:err})
      })
  },
  getAllBookingsOnHotel : (req, res) => {
    const hotelId = req.params.hotelId
    bookingModel.getAllBookingsOnHotel(hotelId)
      .then(result => {
        let data = result.map(booking => {
          let durationMilis = new Date(booking.check_out) - new Date(booking.check_in)
          let days = durationMilis / (1000*60*60*24) + 1
          booking.totalPayment = booking.price * days
          return booking
        })
        const response = {
          message: `get all bookings from hotel_id ${hotelId}`,
          hotelId,
          data
        }
        return res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({message:err})
      })
  },
  getAllBookings : (req, res) => {
    bookingModel.getAllBookings()
      .then(result => {
        let data = result.map(booking => {
          let durationMilis = new Date(booking.check_out) - new Date(booking.check_in)
          let days = durationMilis / (1000*60*60*24) + 1
          booking.totalPayment = booking.price * days
          return booking
        })
        const response = {
          message: `get all bookings`,
          data
        }
        return res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({message:err})
      })
  },
  checking_out:(req, res) => {
    const data = {
      status : 1
    }
    bookingModel.updateBooking(req.params.bookingId, data)
      .then(result => {
        if(result.affectedRows !== 0){
          data.bookingId = req.params.bookingId
          const response = {
            message : 'Check out success',
            data
          }
          return res.status(200).json(response)
        } else {
          data.bookingId = req.params.bookingId
          const response = {
            message : 'Check out failed',
            data
          }
          return res.status(500).json(response)
        }
      })
      .catch(err => res.status(500).json({message:err}))
  },
}