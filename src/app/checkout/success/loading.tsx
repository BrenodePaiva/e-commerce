import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner className="size-12 text-white" />
    </div>
  );
};

export default Loading;
