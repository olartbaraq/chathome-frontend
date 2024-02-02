import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../typings";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";

const inviteFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be contain @ and .",
    })
    .email({
      message: "Email must contain @ and .",
    }),
  name: z.string().optional(),
});

const requiredForm = inviteFormSchema.required();

const InviteUser = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  // 1. Define your form.
  const form = useForm<z.infer<typeof requiredForm>>({
    resolver: zodResolver(requiredForm),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof requiredForm>) {
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };
    try {
      const addUserResponse = await axios.get(
        `https://chat-home-6d7818406fa3.herokuapp.com/chat/users/${values.email}`,
        { headers: headers }
      );

      if (addUserResponse.status === 200) {
        const data: UserData = addUserResponse.data;

        const body = { email: data.email };

        const saveEmailresponse = await axios.post(
          "https://chat-home-6d7818406fa3.herokuapp.com/chat/users/store_email/",
          body,
          { headers: headers }
        );

        if (saveEmailresponse.status === 201) {
          toast.success(`${data.email} has successfully been added`, {
            autoClose: 2000,
            theme: "light",
          });
        }
        form.reset();
      }
    } catch (error: any) {
      const errorBody = error.response.data;
      toast.error(`${errorBody.error || errorBody.detail}`, {
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setDisabled(false);
    }
  }

  const closeHandler = () => {
    navigate("/mainpage/nochat");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 rounded-md p-4 bg-gray-200 flex flex-col space-y-5">
        <h3 className="text-lg">Invite a Person</h3>
        <form
          className="w-full flex flex-col space-y-3 py-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Email Address */}
          <div className="w-full gap-2 flex flex-col">
            <label className="text-sm" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              placeholder="E.g john@gmail.com"
              {...form.register("email")}
              className="border rounded-md p-2 bg-slate-50"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label className="text-sm" htmlFor="name">
              <p>Name (Optional)</p>
            </label>
            <input
              type="text"
              placeholder="E.g john"
              {...form.register("name")}
              className="border rounded-md p-2 bg-slate-50"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.name?.message}
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full">
            <div
              onClick={closeHandler}
              className="text-slate-500 bg-white flex rounded-md items-center justify-center w-full h-10 cursor-pointer"
            >
              Cancel
            </div>

            <button
              type="submit"
              disabled={disabled}
              className={`${
                disabled ? "bg-gray-500" : "bg-blue-900"
              } text-white flex rounded-md items-center justify-center w-full h-10`}
            >
              Add person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUser;
