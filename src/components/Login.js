import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL, PROFILE_PIC } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        // Validate the form
        //console.log(email.current.value);
        //console.log(password.current.value);
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        //console.log(message);
        setErrorMessage(message);
        if (message) return;
        // Sign In / Sign Up
        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: PROFILE_PIC,
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } =
                                auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL,
                                })
                            );
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setErrorMessage(error.code + "-" + error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(error.code + "-" + error.message);
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(error.code + "-" + error.message);
                });
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src={BG_URL}
                    alt="background"
                    className="h-screen object-cover"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        ref={name}
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input
                    type="text"
                    ref={email}
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <p className="text-red-500 font-bold text-lg py-2">
                    {errorMessage}
                </p>
                <button
                    className="p-4 my-6 bg-red-700 rounded-lg w-full"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New to Netflix? Sign Up Now."
                        : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    );
};

export default Login;
