import Image from "next/image";
import loadingImage from "@/assets/loading.png";

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-col my-24">
      <Image src={loadingImage} width={96} className="animate-spin m-0 p-0" alt="login image" />

      <h1 className="text-3xl text-center text-primary m-0 p-0">Processing.....</h1>
    </div>
  );
};

export default Loading;
