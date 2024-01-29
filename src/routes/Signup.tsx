import homelogo from "../assets/home.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be contain @ and .",
    })
    .email({
      message: "Email must contain @ and .",
    }),
  password: z.string().min(1, {
    message: "password cannot be empty.",
  }),
});

const requiredForm = signFormSchema.required();

type signupUser = {
  email: string;
  password: string;
};

type signUpResponse = {
  email: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof requiredForm>>({
    resolver: zodResolver(requiredForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof requiredForm>) {
    const body: signupUser = {
      email: values.email,
      password: values.password,
    };

    try {
      const registerResponse = await axios.post(
        "http://127.0.0.1:8000/register/",
        body
      );
      setDisabled(true);

      if (registerResponse.status === 201) {
        const data: signUpResponse = registerResponse.data;
        //console.log("DATA>>>", data);
        const user = data.email;

        //console.log(user);
        toast.error(`${user} registered successfully!!!`, {
          autoClose: 2000,
          theme: "light",
        });
        navigate("/login");
        form.reset();
      } else {
        toast.error("Uh Oh! Something went wrong !!!", {
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error: any) {
      const errorBody = error.response.data;
      toast.error(`${errorBody.errors}`, {
        autoClose: 2000,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col w-full items-center space-y-10 py-20 px-20">
      <div className="w-full flex items-center space-x-1 justify-center">
        <div>
          <img src={homelogo} alt="chat-home_image" className="w-5 h-5" />
        </div>
        <h2>
          <Link
            className="text-xl text-blue-900 font-normal leading-relaxed"
            to={"/"}
          >
            Home
          </Link>
        </h2>
      </div>

      <div className="flex flex-col space-y-5 border-slate-200 px-10 py-20 border rounded-md w-full self-center items-center">
        <div className="flex flex-col space-y-0 items-center">
          <p className="text-2xl text-black">Sign Up</p>
          <h5 className="leading-loose text-base">Create an account</h5>
        </div>

        {/* Design form here */}
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Email Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              placeholder="assessment@gmail.com"
              {...form.register("email")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {/* Password Input */}
          <div className="w-full gap-2 flex flex-col ">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className="border rounded-md p-2 bg-slate-300"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.password?.message}
            </p>
          </div>

          {/* Forgot Password */}
          <div>
            <h3 className="text-lg leading-relaxed">
              Already have an account?{" "}
              <Link className="text-yellow-500" to={"login"}>
                Login
              </Link>
            </h3>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled}
            className={`${
              disabled ? "bg-gray-500" : "bg-blue-900"
            } text-white py-2 rounded-md items-center justify-center`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
