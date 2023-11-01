import React, { useState } from "react";
import TextInput from "../TextInput";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import Label from "../Label";
import { updateTopic } from "../../context/redux/FormSlice";
import { useAppDispatch } from "../../hooks/reduxHook";
import Button from "../PrimaryButton";

interface initialValues {
  topic1: string;
  topic2: string;
  delay: number;
  popupTimes: number;
  interval: number;
}

const Form1: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<initialValues>({
    topic1: "",
    topic2: "",
    delay: 0,
    popupTimes: 0,
    interval: 0,
  });
  const handleFormSubmit = async (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    try {
      // Perform any additional processing, validation, or API calls here if needed
      console.log("formvalue", values);
      formikHelpers.resetForm();
    } catch (error) {
      const { message } = error as { message: string };
      console.log(message);
    }
  };
  const handleTopic1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      topic1: newValue,
    }));
    dispatch(
      updateTopic({
        ...formValues,
        topic1: newValue,
      })
    );
  };

  const handleTopic2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      topic2: newValue,
    }));
    dispatch(
      updateTopic({
        ...formValues,
        topic2: newValue,
      })
    );
  };
  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          topic: Yup.string().required("Topic is required"),
          delay: Yup.number().required("Delay is required"),
          popupTimes: Yup.number().required(
            "Number of popup times is required"
          ),
          interval: Yup.number().required("Interval is required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <div className="mb-2">
              <Label for="topic1" value="Topic 1" />
              <Field
                as={TextInput}
                type="text"
                id="topic1"
                name="topic1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleTopic1Change(e);
                }}
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="topic1"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div className="mb-2">
              <Label for="topic2" value="Topic 2" />
              <Field
                as={TextInput}
                type="text"
                id="topic2"
                name="topic2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleTopic2Change(e);
                }}
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="topic2"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div className="mb-2">
              <Label for="delay" value="Delay (in seconds)" />
              <Field
                as={TextInput}
                type="number"
                id="delay"
                name="delay"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="delay"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            <div className="mb-2">
              <Label for="popupTimes" value="Number of Popup Times" />
              <Field
                as={TextInput}
                type="number"
                id="popupTimes"
                name="popupTimes"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="popupTimes"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            <div className="mb-2">
              <Label for="interval" value="Interval (in seconds)" />
              <Field
                as={TextInput}
                type="number"
                id="interval"
                name="interval"
                className="w-full p-1.5 border rounded-md"
              />
              <ErrorMessage
                name="interval"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit">Generate Template</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form1;
