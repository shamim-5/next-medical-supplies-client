import Image from "next/image";
import notFoundImage from "@/assets/not-found.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl uppercase text-primary m-0 p-0">Page not found !</h1>
      <Image src={notFoundImage} width={600} className="m-0 p-0" alt="login image" />
    </div>
  );
};

export default NotFoundPage;
