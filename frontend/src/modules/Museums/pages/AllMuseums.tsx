import MuseumList from '../components/MuseumList';
import MuseumForm from '../components/MuseumForm';
const AllMuseums = () => {
    const museumsExample = [
        {
          _id: '1',
          name: 'Louvre Museum',
          tags: [
            {
              _id: '1',
              name: 'Renaissance Art',
              type: 'Museum',
              historical_period: '1400-1600'
            }
          ],
          description: 'The world’s largest art museum and a historic monument in Paris.',
          category: 'Art',
          pictures: [''],
          location: {
            name: 'Paris, France',
            latitude: 48.8606,
            longitude: 2.3376
          },
          opening_hours: '09:00 AM - 06:00 PM',
          ticket_prices: {
            foreigner: 17,
            native: 12,
            student: 10
          }
        },
        {
          _id: '2',
          name: 'Eiffel Tower',
          tags: [
            {
              _id: '2',
              name: '19th Century Monument',
              type: 'Monument',
              historical_period: '1889-Present'
            }
          ],
          description: 'A wrought-iron lattice tower on the Champ de Mars in Paris.',
          category: 'Monument',
          pictures: ['eiffel1.jpg', 'eiffel2.jpg'],
          location: {
            name: 'Paris, France',
            latitude: 48.8584,
            longitude: 2.2945
          },
          opening_hours: '09:30 AM - 11:00 PM',
          ticket_prices: {
            foreigner: 25,
            native: 18,
            student: 12
          }
        },
        {
          _id: '3',
          name: 'Notre-Dame Cathedral',
          tags: [
            {
              _id: '3',
              name: 'Gothic Architecture',
              type: 'ReligiousSight',
              historical_period: '1163-1345'
            }
          ],
          description: 'A medieval Catholic cathedral in Paris, France.',
          category: 'Religious Sight',
          pictures: [''],
          location: {
            name: 'Paris, France',
            latitude: 48.8530,
            longitude: 2.3499
          },
          opening_hours: '08:00 AM - 06:45 PM',
          ticket_prices: {
            foreigner: 10,
            native: 7,
            student: 5
          }
        },
        {
          _id: '4',
          name: 'Buckingham Palace',
          tags: [
            {
              _id: '4',
              name: 'British Royalty',
              type: 'Palace',
              historical_period: '1703-Present'
            }
          ],
          description: 'The London residence and administrative headquarters of the monarch of the UK.',
          category: 'Palace',
          pictures: ['buckingham1.jpg', 'buckingham2.jpg'],
          location: {
            name: 'London, UK',
            latitude: 51.5014,
            longitude: -0.1419
          },
          opening_hours: '09:30 AM - 07:00 PM',
          ticket_prices: {
            foreigner: 30,
            native: 20,
            student: 15
          }
        },
        {
          _id: '5',
          name: 'Edinburgh Castle',
          tags: [
            {
              _id: '5',
              name: 'Scottish History',
              type: 'Castle',
              historical_period: '12th Century-Present'
            }
          ],
          description: 'A historic fortress which dominates the skyline of Edinburgh.',
          category: 'Castle',
          pictures: [''],
          location: {
            name: 'Edinburgh, Scotland',
            latitude: 55.9486,
            longitude: -3.1999
          },
          opening_hours: '09:30 AM - 05:00 PM',
          ticket_prices: {
            foreigner: 20,
            native: 15,
            student: 10
          }
        },
        {
          _id: '6',
          name: 'The British Museum',
          tags: [
            {
              _id: '6',
              name: 'Ancient Civilizations',
              type: 'Museum',
              historical_period: '1753-Present'
            }
          ],
          description: 'A public institution dedicated to human history, art, and culture.',
          category: 'History',
          pictures: [''],
          location: {
            name: 'London, UK',
            latitude: 51.5194,
            longitude: -0.1270
          },
          opening_hours: '10:00 AM - 05:30 PM',
          ticket_prices: {
            foreigner: 15,
            native: 10,
            student: 8
          }
        }
      ];
      
  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-9 text-text-primary">
        <h1 className="py-2 text-4xl font-bold">Welcome 3abSamad</h1>
        <h3 className="py-2 text-2xl font-bold">Museums & Historical Places</h3>
      </div>
      {/* <MuseumForm onSubmit={handleCreate} /> */}
      <MuseumList museums={museumsExample} role="tourismGovernor" />
    </div>
  );
};

export default AllMuseums;