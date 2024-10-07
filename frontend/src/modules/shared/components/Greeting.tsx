export default function Greeting({
  name,
  signedIn,
  className,
  title,
}: {
  name?: string;
  signedIn: boolean;
  className?: string;
  title?: string;
}) {
  if (signedIn)
    return (
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-14 text-text-primary">
        <h1 className="py-4 text-4xl font-bold">Welcome {name}</h1>
        <h3 className="py-4 text-2xl font-bold">{title}</h3>
      </div>
    );

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p className="text-2xl italic text-text-primary">Welcome to</p>
      <h1 className="text-4xl font-bold">Are we there yet?</h1>
    </div>
  );
}
