import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearchPage = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img
                    src={BG_URL}
                    alt="background"
                    className="h-screen object-cover"
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    );
};

export default GptSearchPage;
