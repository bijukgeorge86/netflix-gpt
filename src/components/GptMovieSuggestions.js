import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
    const gpt = useSelector((store) => store.gpt);
    const { movieResults, movieNames } = gpt;
    //OR as below
    //const { movieResults, movieNames } = useSelector((store) => store.gpt);
    if (!movieNames) return <h1>error on tmdb server</h1>;
    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
            <div className=" text-white font-bold">
                {movieNames.map((movieName, index) => (
                    <MovieList
                        key={movieName}
                        title={movieName}
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default GptMovieSuggestions;
