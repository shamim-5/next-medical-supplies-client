"use client";

const ErrorPage = ({ error }: { error: any }) => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <h2>Error: {error}</h2>
    </div>
  );
};

export default ErrorPage;
