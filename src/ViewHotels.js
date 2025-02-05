import React, { useEffect, useState } from 'react';
import HotelService from './HotelService';

const ViewHotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        HotelService.getAllHotels()
            .then((response) => {
                setHotels(response.data);
            })
            .catch(() => {
                alert('Failed to fetch hotels');
            });
    }, []);

    return (
        <div>
            <h2>Hotel List</h2>
            <ul>
                {hotels.map((hotel) => (
                    <li key={hotel.id}>
                        {hotel.hotelName} - {hotel.location} - {hotel.rating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewHotels;
