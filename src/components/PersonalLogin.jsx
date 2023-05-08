// import { mytoken } from 'features/user/myUserSlice'
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthContext from "../app/context/AuthContext";
import Layout from "./Layout";
import {
  facebookLogin,
  getProfile,
  mysocialtokenlogin,
  mytoken,
  tokenLogin,
} from "features/redux-users/myUserSlice";
import Button from "./Button";
import FacebookLogin from "@greatsumini/react-facebook-login";

// import facebookMyLogin

const PersonalLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { registered, loading } = useSelector((state) => state.myuser);

  // useEffect(() => {}, [])

  const schema = yup.object().shape({
    // first_name: yup.string().required('your fullname is required'),
    // last_name: yup.string().required('your fullname is required'),
    email: yup.string().email().required("your email is required"),
    password: yup.string().min(4).max(20).required("enter password"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log("form", data);
    dispatch(mytoken(data));
    // dispatch(getProfile())

    navigate("/");
  };

  if (registered) return <Navigate to="/" />;

  if (localStorage.getItem("isAuthenticated")) return <Navigate to="/" />;

  const logMeIn = (response) => {
    console.log(response);
    // console.log("this is my fake response and response", response.accessToken);
    dispatch(facebookLogin(response.accessToken));
    // facebookMyLogin(response.accessToken);
  };

  return (
    <Layout>
      <div className="  grid place-content-center place-items-center items-center">
        <div>
          <form
            className="card w-full max-w-lg p-8"
            onSubmit={handleSubmit(submitForm)}
            // onSubmit={submitFormer}
          >
            <div className="-mx-3 mb-6 flex flex-wrap " />
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  for="email"
                >
                  email
                </label>
                <input
                  type="email"
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="email"
                  name="email"
                  {...register("email")}
                  placeholder="example@email.com"
                />
                <p className="text-xs italic text-red-500">
                  {errors.email?.message}
                </p>
              </div>
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  placeholder="******************"
                />
                <p className="text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
                {!errors.password && (
                  <p className="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                )}
              </div>
            </div>
            <input type="submit" value="Submit" className="btn success" />
          </form>
        </div>
        <div className="mt-4">
          new Here:{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalLogin;