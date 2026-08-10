import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
// import { useVerifyEmail } from "@/hooks/useVerifyEmail";

export default function VerifyEmail() {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // console.log(searchParams);
  // const token = searchParams.get("token");
  //
  // const { mutateAsync, isPending, isSuccess, isError } = useVerifyEmail();
  //
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[420px] text-center">
        <>
          <CheckCircle2 className="mx-auto text-green-500" size={70} />

          <h2 className="mt-6 text-2xl font-bold">Email Verified 🎉</h2>

          <p className="mt-2 text-slate-500">Redirecting to Login...</p>
        </>
      </div>
    </div>
  );
}
