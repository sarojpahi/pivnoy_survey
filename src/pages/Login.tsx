import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import Button from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/reduxHook";
import { fetchUser } from "../context/redux/AuthSlice";

interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      toast.info("Logging in...", {
        position: "top-right",
        autoClose: 1000,
      });
      const cred: UserCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
      });
      const user = cred.user;
      if (user) {
        // Dispatch a fetchUser action to load the user data
        dispatch(fetchUser());

        // Store the user's authentication token in local storage
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token || "");
        });
      }
      formikHelpers.resetForm();
      navigate("/");
    } catch (error) {
      const { message } = error as { message: string };
      toast.error("Login failed: " + message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:max-w-md lg:max-w-xl p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <div className="mb-2">
              <Label for="email" value="Email" />
              <Field
                as={TextInput}
                type="email"
                id="email"
                name="email"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            <div className="mb-2">
              <Label for="password" value="Password" />
              <Field
                as={TextInput}
                type="password"
                id="password"
                name="password"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            <div className="text-center mt-2 flex justify-between items-center">
              <div className="text-sm text-gray-600 font-semibold">
                New user?{" "}
                <span className="hover:text-blue-700">
                  <Link to={"/register"}>Register</Link>
                </span>
              </div>
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Login;
