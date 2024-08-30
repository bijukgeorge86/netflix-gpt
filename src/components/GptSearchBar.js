import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../redux/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    // Search Movie in TMDB API as per result from GPT Search Result
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
                movie +
                "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    };

    const handleGptSearch = async () => {
        //console.log(searchText.current.value);
        // Make an API call to GPT API and get Movie Results

        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            "only give names of 10 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, PK, Koi Mil Gaya, Pathaan, Happy New Year, Dangal, 3 Idiots, Jawan";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });

        if (!gptResults.choices) {
            //TO DO: Write Error Handling
        }
        // console.log(gptResults.choices?.[0]?.message?.content);
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

        const promiseMovieArray = gptMovies.map((movie) =>
            searchMovieTMDB(movie)
        );
        // the above will return a list of Promises here we will get 10 Promises as below.
        //[Promise, Promise, Promise, Promise, Promise, Promise, Promise, Promise, Promise, Promise]

        const tmdbMovieResults = await Promise.all(promiseMovieArray);
        dispatch(
            addGptMoviesResult({
                movieNames: gptMovies,
                movieResults: tmdbMovieResults,
            })
        );
    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form
                className="w-full md:w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg"
                    onClick={handleGptSearch}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
