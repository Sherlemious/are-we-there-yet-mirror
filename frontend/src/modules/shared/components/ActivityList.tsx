interface Activity {
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  tags: string[];
  discount: string;
  bookingOpen: boolean;
}

const data: Activity[] = [
  {
    date: '2021/09/01',
    time: '10:00',
    location: 'Cairo, Egypt',
    price: '100',
    category: 'Sport',
    tags: ['football', 'soccer'],
    discount: '10%',
    bookingOpen: true,
  },
  {
    date: '2021/10/05',
    time: '14:00',
    location: 'London, UK',
    price: '150',
    category: 'Concert',
    tags: ['music', 'live'],
    discount: '15%',
    bookingOpen: false,
  },
  {
    date: '2021/11/12',
    time: '18:30',
    location: 'Paris, France',
    price: '200',
    category: 'Theater',
    tags: ['drama', 'performance'],
    discount: '20%',
    bookingOpen: true,
  },
  {
    date: '2022/01/15',
    time: '09:00',
    location: 'New York, USA',
    price: '120',
    category: 'Workshop',
    tags: ['art', 'painting'],
    discount: '5%',
    bookingOpen: true,
  },
  {
    date: '2022/03/20',
    time: '16:00',
    location: 'Tokyo, Japan',
    price: '300',
    category: 'Festival',
    tags: ['culture', 'food'],
    discount: '25%',
    bookingOpen: false,
  },
  {
    date: '2022/05/10',
    time: '11:00',
    location: 'Sydney, Australia',
    price: '180',
    category: 'Exhibition',
    tags: ['art', 'sculpture'],
    discount: '0%',
    bookingOpen: true,
  },
  {
    date: '2022/07/08',
    time: '20:00',
    location: 'Berlin, Germany',
    price: '250',
    category: 'Sport',
    tags: ['tennis', 'competition'],
    discount: '10%',
    bookingOpen: false,
  },
  {
    date: '2022/08/12',
    time: '13:30',
    location: 'Dubai, UAE',
    price: '220',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    discount: '30%',
    bookingOpen: true,
  },
  {
    date: '2022/10/25',
    time: '17:00',
    location: 'Rome, Italy',
    price: '170',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    discount: '12%',
    bookingOpen: true,
  },
  {
    date: '2022/12/05',
    time: '15:00',
    location: 'Bangkok, Thailand',
    price: '90',
    category: 'Tour',
    tags: ['sightseeing', 'adventure'],
    discount: '20%',
    bookingOpen: false,
  },
];

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="w-full h-fit border-black border-2 grid grid-cols-7 py-8 px-2">
      <div className="text-center">{activity.date}</div>
      <div className="text-center">{activity.time}</div>
      <div className="text-center">{activity.location}</div>
      <div className="text-center">{activity.price}</div>
      <div className="text-center">{activity.category}</div>
      <div className="text-center">{activity.tags.join(', ')}</div>
      <div className="text-center">{activity.discount}</div>
    </div>
  );
}

export function ActivityList() {
  // return fake data
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* header */}
      <div className="w-full h-fit border-black border-2 grid grid-cols-7 py-4 px-2">
        <div className="text-center font-bold text-xl">Date</div>
        <div className="text-center font-bold text-xl">Time</div>
        <div className="text-center font-bold text-xl">Location</div>
        <div className="text-center font-bold text-xl">Price</div>
        <div className="text-center font-bold text-xl">Category</div>
        <div className="text-center font-bold text-xl">Tags</div>
        <div className="text-center font-bold text-xl">Discount</div>
      </div>
      {/* body */}
      {data.map((activity) => (
        <ActivityCard key={activity.date} activity={activity} />
      ))}
    </div>
  );
}
