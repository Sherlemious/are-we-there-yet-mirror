export default function Greeting({ name }: { name: string }) {
  return (
    <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-14 text-text-primary">
      <h1 className="py-4 text-4xl font-bold">Welcome {name}</h1>
      <h3 className="py-4 text-2xl font-bold">Profile</h3>
    </div>
  );
}
