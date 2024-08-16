import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies) return;
    const mainMovie = movies[0];
    //console.log(mainMovie);
    const { original_title, overview, id } = mainMovie;
    return (
        <div>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    );
    {
        /*
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const mainMovie = movies[0];
    //console.log(mainMovie);
    return (
        <div>
            <VideoTitle />
            <VideoBackground />
        </div>
    );*/
    }
};

export default MainContainer;
