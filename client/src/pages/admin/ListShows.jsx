import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/title';
import dateFormat from '../../lib/dateFormat';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const {user} = useAuth()
  const {axios, getToken} = useAppContext();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/shows", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if(data.success) {
        setShows(data.shows);
      }
    setLoading(false);
    } catch (error) {
      console.error(error);
    setLoading(false);
    }
  }
useEffect(() => {
  if (!user) return;

  getAllShows();

  const onFocus = () => getAllShows();
  window.addEventListener("focus", onFocus);

  return () => window.removeEventListener("focus", onFocus);
}, [user]);
  return !loading ? (
    <>
        <Title text1="List" text2="Shows" />
        <div className='max-w-4xl mt-6 overflow-x-auto'>
          <table className='w-full border-collapse rounded-md overflow-hidden
          text-nowrap'>
            <thead>
              <tr className='bg-primary/10 text-left text-white'>
                <th className='p-2 font-medium pl-5'>Movie Name</th>
                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Total Bookings</th>
                <th className='p-2 font-medium'>Earnings</th>
              </tr>
            </thead>
            <tbody className='text-sm font-light'>
              {shows.map((show,index) => (
                <tr key={show._id} className='border-b border-primary/10
                bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                  <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                  <td className='p-2'>{show.totalBookings}</td>
                  <td className='p-2'>{currency} {show.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  ) : <p>Loading...</p>
}

export default ListShows