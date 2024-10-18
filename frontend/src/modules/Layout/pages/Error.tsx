import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError() as Error;

  const title = "An error occurred!";
  const message = error?.message || "Something went wrong!";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-4xl text-red-500">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
