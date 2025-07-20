import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Auth from "../auth/Auth";

import Button from "../components/Button";

import useAuth from "../hooks/useAuth";

function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/time-log", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <div className="w-full h-full flex items-center justify-center pt-10 sm:pt-20 ">
      <div className="w-full min-w-fit max-w-[600px] h-fit px-4 sm:px-6 py-6 border border-cyan-600 rounded-sm">
        <Auth isSignUp={isSignUp} onSignUp={setIsSignUp} />
        <hr className="my-5"></hr>
        <p className="font-body text-sm sm:text-base leading-[1.2]">
          {isSignUp ? "Already have an account" : "Don't have an account?"}
        </p>
        <div className="mt-3">
          <Button
            textSize="text-base sm:text-lg"
            label={isSignUp ? "Sign in" : "Sign up"}
            version="version1"
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp((isSignUp) => !isSignUp);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
