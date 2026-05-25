import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "./api"; // ✅ change this
import { useNavigate } from "react-router-dom";
import { showToast } from "../../store/toast.store";
import Button, { ButtonVariant } from "../../components/Button";

type SignupFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onSuccess: (data: any) => {
      const token = data.data?.access_token;

      if (token) {
        localStorage.setItem("AI_PROJECT_TOKEN", token);
      }

      showToast({
        type: "success",
        message: "Account created successfully!",
      });

      navigate("/projects");
    },
    onError: (err: any) => {
      showToast({
        type: "error",
        message: err?.response?.data?.message || "Signup failed",
      });
    },
  });

  const onSubmit = (data: SignupFormInputs) => {
    mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  const password = watch("password");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-1 p-2 border rounded-lg"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">
            {errors.name.message}
          </p>
        )}

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
          <p className="text-red-500 text-xs mb-2">
            {errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-1 p-2 border rounded-lg"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mb-3">
            {errors.confirmPassword.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full p-3 my-3"
          variant={ButtonVariant.PRIMARY}
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;