import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";
import { useRegister } from "@/hooks/useRegister.ts";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
export function Register() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutateAsync(data);
      toast.success(
        "Account created successfully. Please check your email to verify your account.",
        {
          position: "top-center",
        },
      );

      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };
  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col justify-center py-5 sm:px-6 lg:px-8">
      <Link to="/" className="flex justify-center items-center gap-2 ">
        <HeartPulse className="h-8 w-8 text-primary-600" />
        <span className="font-semibold text-2xl text-slate-900 tracking-tight">
          Wasaya
        </span>
      </Link>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px] bg-white px-6 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-12 border border-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Log in here
            </Link>
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-slate-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <Input
                {...register("full_name")}
                id="full_name"
                type="text"
                autoComplete="full_name"
                required
                placeholder="John Doe"
              />
            </div>
            {errors.full_name && (
              <p className="px-2 mt-1 text-sm text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="px-2 mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-900"
            >
              Password
            </label>
            <div className="mt-2">
              <Input
                id="password"
                {...register("password")}
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="px-2 mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="px-2 mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full h-12 text-base rounded-2xl">
              {isPending ? (
                <LoaderCircle size={30} className={`animate-spin`} />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
