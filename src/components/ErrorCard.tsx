import { MdErrorOutline } from "react-icons/md";

interface ErrorCardProps {
  message?: string;
}

const ErrorCard = ({
  message = "Something went wrong while loading the data.",
}: ErrorCardProps) => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-3 rounded-3xl bg-white p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <MdErrorOutline className="text-4xl text-red-500" />
      </div>

      <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>

      <p className="max-w-md text-sm text-slate-500">{message}</p>
    </div>
  );
};

export default ErrorCard;
