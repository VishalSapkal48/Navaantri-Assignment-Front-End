import React, { useState } from 'react';
import HotelService from './HotelService';

const UpdateHotel = ({ id }) => {
    const [hotel, setHotel] = useState({
        hotelName: '',
        contact: '',
        email: '',
        address: '',
        hotelType: '',
    });

    const handleChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        HotelService.updateHotel(id, hotel)
            .then(() => {
                alert('Hotel updated successfully!');
            })
            .catch(() => {
                alert('Failed to update hotel');
            });
    };

    return (
        <div>

           <input
                type="text"
                name="hotelName"
                placeholder="Hotel Name"
                value={hotel.hotelName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={hotel.contact}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={hotel.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={hotel.address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="hotelType"
                placeholder="Hotel Type"
                value={hotel.hotelType}
                onChange={handleChange}
                required
            />
        
            <button onClick={handleUpdate}>Update Hotel</button>
        </div>
    );
};

export default UpdateHotel;
