import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  AuthErrorCodes,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
// import React from "react";
import Appe from "./FireBase";
// import SignIn from "./SignIn";

const auth = getAuth(Appe);

const UserAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, `${email}`, `${password}`)
      .then(async (data) => {
        let response = data.user;

        // console.log(response);

        await sendEmailVerification(response);

        // console.log("success");
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          alert("password is weak ");
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  // console.log(user);
  // console.log(user);

  return (
    <>
      <section>
        {/* lg:grid-cols-2 */}
        <div className="grid grid-cols-1 ">
          {/* py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 */}
          <div className="flex items-center justify-center px-4 ">
            {/* xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md */}
            <div className="w-96">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/SignIn"
                  title=""
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    {/* NAME LABEL */}
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                      ></input>
                    </div>
                  </div>
                  <div>
                    {/* EMAIL LABEL */}
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      {/* PASSWORD LABEL */}
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        id="password"
                      ></input>
                    </div>
                  </div>
                  <div>
                    {/* CREATE ACCOUNT BUTTON */}
                    <button
                      onClick={signupUser}
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Create Account <ArrowRight className="ml-2" size={16} />
                    </button>
                    {/* <Link
                      to="/SignIn"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Sign In <ArrowRight className="ml-2" size={16} />
                    </Link> */}
                  </div>
                </div>
              </form>
              <div>
                {user ? (
                  <div>
                    <p>User Email : {user?.email}</p>
                    <p>
                      User Verified Status :{" "}
                      {user?.emailVerified ? "True" : "False"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Hi, please add a new user.</p>
                  </div>
                )}
              </div>

              {/* <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-[#2563EB]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </span>
                  Sign up with Facebook
                </button>
              </div> */}
            </div>
          </div>
          {/* <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default UserAuth;
