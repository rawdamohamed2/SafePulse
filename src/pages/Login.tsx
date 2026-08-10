import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useLogin.ts";
import { useAuth } from "@/store/auth.store";

export function Login() {
  const { mutateAsync, isPending } = useLogin();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mutateAsync(data);

      if (!response.is_verified) {
        toast.error("Please confirm your email address.", {
          position: "top-center",
        });
        return;
      }

      toast.success("You logged in successfully.", {
        position: "top-center",
      });

      setUser(response);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message ?? "Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/" className="flex justify-center items-center gap-1">
        <HeartPulse className="h-8 w-8 text-primary-600" />
        <span className="font-semibold text-2xl text-slate-900 tracking-tight">
          Wasaya
        </span>
      </Link>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px] bg-white px-6 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-12 border border-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Create one today
            </Link>
          </p>
        </div>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                {...register("email")}
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="px-2 mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
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
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="px-2 mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full h-12 text-base rounded-2xl">
              {isPending ? (
                <LoaderCircle size={30} className={`animate-spin`} />
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
