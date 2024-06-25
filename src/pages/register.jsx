import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../feature/counter/counterSlice";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

const fieldStyle = "rounded-md border border-gray-200";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Password must match"),
  lastName: Yup.string()
    .min(3, "Last name is too short")
    .required("Last name is required"),
  firstName: Yup.string()
    .min(3, "First name is too short")
    .required("First name is required"),
});
const Register = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }
  function handleViewConfirmPassword() {
    setviewConfirmPassword(!viewConfirmPassword);
  }
  async function handleRegister(value) {
    const { email, password, password2, first_name, last_name } = value;
    try {
      const response = await fetch(
        "https://store.istad.co/api/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            password2: password2,
            first_name: first_name,
            last_name: last_name,
          }),
        }
      );
      const data = response.json();
      if (data) {
        toast.success("User registration successfully");
        console.log("Email registered successfully");
      } else {
        toast.error("Email has already been registered");
        console.log("Email has already been registered  ");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex w-full h-[100vh] flex-col  justify-center items-center relative ">
      <NavLink to="/">
        <div className="w-full absolute flex top-0 right-0 p-5">
          <img
            src="https://imgs.search.brave.com/GcbagJctCYd0OW2WImsIDdMJ3Bp3QPHWZC1FULNZQ1c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0kvaW1kYi1p/bnRlcm5ldC1tb3Zp/ZS1kYXRhYmFzZS1s/b2dvLTAyNUQzNDU3/MEUtc2Vla2xvZ28u/Y29tLnBuZw"
            alt="logo"
            className="w-20 h-auto cursor-pointer"
          />
        </div>
      </NavLink>
      <ToastContainer />
      <div className="container w-auto ">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            lastName: "",
            firstName: "",
          }}
          onSubmit={(value, { setSubmitting, resetForm }) => {
            console.log(value);
            setSubmitting(false);
            handleRegister(value);
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="flex flex-col gap-4 bg-blue-400 p-10  justify-center items-center">
                <div className="flex w-96 flex-col relative">
                  <label htmlFor="email">Email:</label>
                  <Field
                    className={fieldStyle}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm italic"
                  />
                </div>
                <div className="flex w-96 flex-col relative">
                  <label htmlFor="password">Password:</label>
                  <Field
                    className={fieldStyle}
                    name="password"
                    type={viewPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm italic"
                  />
                  <div
                    onClick={handleViewPassword}
                    className="absolute right-[10px] top-[35px] cursor-pointer"
                  >
                    {viewPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="flex w-96 flex-col relative">
                  <label htmlFor="password">Confirm Password:</label>
                  <Field
                    className={fieldStyle}
                    name="confirmPassword"
                    type={viewConfirmPassword ? "text" : "password"}
                    placeholder="Enter your confirm password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-600 text-sm italic"
                  />
                  <div
                    onClick={handleViewConfirmPassword}
                    className="absolute right-[10px] top-[35px] cursor-pointer"
                  >
                    {viewConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="flex w-96 flex-col">
                  <label htmlFor="firstName">First name:</label>
                  <Field
                    className={fieldStyle}
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600 text-sm italic"
                  />
                </div>
                <div className="flex w-96 flex-col">
                  <label htmlFor="lastName">Last name:</label>
                  <Field
                    className={fieldStyle}
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600 text-sm italic"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex flex-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="mt-5">
        <button
          className="text-white bg-blue-500 p-4 rounded-full hover:bg-slate-500"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="text-gray-950 text-2xl p-5">{count}</span>
        <button
          className="text-white bg-red-500 p-4 rounded-full hover:bg-slate-500"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Register;
