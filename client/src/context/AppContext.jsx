// Holds session state
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const AppContext = createContext();

const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const AppProvider = ({ children }) => {
    const { user } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        console.log("ISADMIN STATE CHANGED:", isAdmin);
    }, [isAdmin]);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);
    const [checkedAdmin, setCheckedAdmin] = useState(false)

    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

    // ADMIN CHECK
    const fetchIsAdmin = async () => {

        setAdminLoading(true);

        try {

            const { data } = await axios.get(
                '/api/admin/is-admin',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            console.log("ADMIN RESPONSE:", data);
            console.log("SETTING ADMIN:", data.isAdmin);
            setIsAdmin(data.isAdmin);

            setTimeout(() => {
                setAdminLoading(false);
                setCheckedAdmin(true)
            }, 0);

        } catch (error) {

            console.log("ADMIN ERROR:", error.response?.data);

            setIsAdmin(false);

            setAdminLoading(false);
        }
    };

    // SHOWS
    const fetchShows = async () => {
        try {
            const { data } = await axios.get("/api/shows/all");

            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // FAVORITES
    const fetchFavoriteMovies = async () => {
        if (!user) return;

        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get("/api/user/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
        console.log("FAVORITES RESPONSE:", data);

            if (data.success) {
                setFavoriteMovies(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // RUN ON USER CHANGE
    useEffect(() => {
        const loadData = async () => {
            if (user) {
                await fetchIsAdmin()
                await fetchFavoriteMovies()
            } else {
                setIsAdmin(false)
                setFavoriteMovies([])
                setAdminLoading(false)
            }
        }
        loadData()
    }, [user?._id])

    // LOAD SHOWS ONCE
    useEffect(() => {
        fetchShows();
    }, []);

    return (
        <AppContext.Provider
            value={{
                axios,
                isAdmin,
                getToken: () => localStorage.getItem("token"),
                shows,
                favoriteMovies,
                adminLoading,
                checkedAdmin,
                fetchIsAdmin,
                fetchShows,
                fetchFavoriteMovies,
                image_base_url
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);