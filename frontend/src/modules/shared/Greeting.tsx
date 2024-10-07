export default function Greeting({ name }: { name: string }) {
  return (
    <div className="p-14 divide-y-2 divide-gray-500 text-gray-900">
      <h1 className="font-bold text-4xl py-4">Welcome {name}</h1>
      <h3 className="font-bold text-2xl py-4">Profile</h3>
    </div>
  );
}
