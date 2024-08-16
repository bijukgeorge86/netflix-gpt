import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    // Fetch Trailer Video && updating the reducx store with the trailer video data
    const getMovieVideos = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/videos?language=en-US",
            API_OPTIONS
        );
        const json = await data.json();
        //console.log(json.results);

        const filterData = json.results.filter(
            (video) => video.type === "Trailer"
        );
        //console.log(filterData);
        const trailer = filterData.length ? filterData[0] : json.results[0];
        //console.log(trailer.key);
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getMovieVideos();
    }, []);
};

export default useMovieTrailer;
