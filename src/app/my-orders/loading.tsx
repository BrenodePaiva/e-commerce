import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      <Spinner className="size-16" />
    </div>
  );
};

export default Loading;
