export default function Greeting({ name, sectionName = 'Profile' }: { name: string; sectionName?: string }) {
  return (
    <div className="p-14 divide-y-2 divide-gray-500 text-gray-900 w-fit">
      <h1 className="font-bold text-4xl py-4">Welcome {name}</h1>
      <h3 className="font-bold text-2xl py-4">{sectionName}</h3>
    </div>
  );
}
