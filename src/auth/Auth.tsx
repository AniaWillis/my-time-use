import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import Button from "../components/Button";
import { AuthProps } from "../types/auth";
import { supabase } from "./supabase-client";

function Auth({ isSignUp, onSignUp }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
          },
        },
      });
      if (signUpError) {
        toast.error("Something went wrong. Please try signing up again.");
        return;
      }
      toast.success(
        "Sign-up successful! Check your email to verify your account, then log in."
      );
      onSignUp(false);
      setPassword("");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        toast.error("Something went wrong. Please try signing in again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full xs:min-w-[450px] min-w-[250px] h-fit "
    >
      <h2 className="font-heading text-xl sm:text-2xl mb-2 font-bold text-cyan-600">
        {isSignUp ? "Sign up" : "Login"}
      </h2>
      <p className="font-body text-sm sm:text-base leading-[1.2]">
        {isSignUp ? "Create an account" : "Sign in to your account"}
      </p>

      {isSignUp && (
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="font-heading text-base sm:text-lg mt-4 mb-1 font-medium"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            className="border p-2 rounded-sm focus:border-cyan-600 focus:outline-cyan-600 text-base sm:text-lg "
          />
        </div>
      )}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="font-heading text-base sm:text-lg mt-4 mb-1 font-medium"
        >
          Email address
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          id="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="border p-2 rounded-sm  focus:border-cyan-600 focus:outline-cyan-600 text-base sm:text-lg "
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="font-heading text-base sm:text-lg mt-4 mb-1 font-medium"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="border p-2 rounded-sm focus:border-cyan-600 focus:outline-cyan-600 text-base sm:text-lg"
        />
      </div>
      <div className="mt-4">
        <Button
          textSize="text-base sm:text-lg"
          label="Submit"
          version="version2"
        />
      </div>
    </form>
  );
}

export default Auth;
