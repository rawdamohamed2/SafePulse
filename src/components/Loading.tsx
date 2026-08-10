import { Skeleton } from "@/components/ui/skeleton.tsx";

const Loading = () => {
  return (
    <div className={`grid grid-cols-2 gap-2`}>
      <div className={`flex flex-col gap-5`}>
        <Skeleton
          className={`w-full h-140 bg-gray-200 flex justify-center  flex-col gap-3 p-5`}
        >
          <Skeleton className={`w-full h-20 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-6 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-6 bg-gray-300`}></Skeleton>
        </Skeleton>
      </div>
      <div className={`flex flex-col gap-5`}>
        <Skeleton
          className={`w-full h-40 bg-gray-200 flex justify-center items-center flex-col gap-3 p-5`}
        >
          <Skeleton className={`w-60 h-8 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-20 bg-gray-300`}></Skeleton>
        </Skeleton>
        <Skeleton className={`w-full h-60 bg-gray-200 flex flex-col gap-3 p-3`}>
          <Skeleton className={`w-60 h-8 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-15 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-15 bg-gray-300`}></Skeleton>
          <Skeleton className={`w-full h-15 bg-gray-300`}></Skeleton>
        </Skeleton>
      </div>
    </div>
  );
};
export default Loading;
