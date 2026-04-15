import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../store/toast.store";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const naviagte = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const {mutate ,isPending} = useMutation({
   mutationKey: ["login"] ,
    mutationFn: loginUser,
    onSuccess:(data:any)=>{
        
        const token = data.data?.access_token
        if(token)
        localStorage.setItem("AI_PROJECT_TOKEN",token)
      showToast({
      type: "success",
      message: "Logged in Successfully!",
    });
      naviagte('/dashboard')
    },
    onError:(err:any)=>{
      console.log("error",err)
    }
   
  })

  const onSubmit = async (data: LoginFormInputs) => {
   mutate(data)
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-1 p-2 border rounded-lg"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-1 p-2 border rounded-lg"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-900 disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;