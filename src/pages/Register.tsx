import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import Button from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/reduxHook";
import { fetchUser } from "../context/redux/AuthSlice";

interface RegistrationFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (
    values: RegistrationFormValues,
    formikHelpers: FormikHelpers<RegistrationFormValues>
  ) => {
    try {
      toast.info("Creating User...", {
        position: "top-right",
        autoClose: 1000, // Close notification after 3 seconds
      });
      const cred: UserCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = cred.user;
      // Display success notification
      toast.success("User created successfully", {
        position: "top-right",
        autoClose: 2000, // Close notification after 3 seconds
      });
      if (user) {
        // Dispatch a fetchUser action to load the user data
        dispatch(fetchUser());

        // Store the user's authentication token in local storage
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token || "");
        });
      }
      formikHelpers.setSubmitting(false);
      navigate("/");
    } catch (error) {
      // Display error notification
      type errorType = {
        code: string;
        message: string;
      };
      const { message } = error as errorType;
      toast.error("Error creating user: " + message, {
        position: "top-right",
        autoClose: 5000, // Close error notification after 5 seconds
      });

      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:max-w-md lg:max-w-xl p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Password confirmation is required"),
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

            <div className="mb-2">
              <Label for="password_confirmation" value="Confirm Password" />
              <Field
                as={TextInput}
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="password_confirmation"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            <div className="text-center mt-2 flex justify-between items-center">
              <div className="text-sm text-gray-600 font-semibold">
                Already a user?{" "}
                <span className="hover:text-blue-700">
                  <Link to={"/login"}>Login</Link>
                </span>
              </div>
              <Button type="submit">Register</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
