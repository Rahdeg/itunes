'use client'
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { app } from "../config/fire";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nullUser, userValidator } from "../../features/users/userSlices";

const Login = ({ setauth }) => {
  const firebaseauth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      router.push("/", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googlelogin = async () => {
    await signInWithPopup(firebaseauth, provider).then((userCred) => {
      if (userCred) {
        console.log("user",userCred)
        setauth(true);
        window.localStorage.setItem("auth", "true");
        firebaseauth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              dispatch(userValidator(token));
            });
            router.push("/", { replace: true });
          } else {
            setauth(false);
            dispatch(nullUser());
            router.push("/");
          }
        });
      }
    });
  };

  return (
    <div className=" relative h-screen w-screen">
      <video
        src='/login_bg.mp4'
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className=" md:w-375 p-4  bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex
      flex-col items-center justify-center"
        >
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={googlelogin}
          >
            <FcGoogle className="text-xl font-medium" />
            Sign in with google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
