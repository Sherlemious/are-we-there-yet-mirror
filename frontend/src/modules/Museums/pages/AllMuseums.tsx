import MuseumList from '../components/MuseumList';
import { useState, useEffect } from 'react';
import { createMuseum, deleteMuseum , updateMuseum, getMuseums} from '../Api/MuseumService';
import { MuseumFormData } from '../components/MuseumForm';
import { Museum} from '../types/museum';

const AllMuseums = () => {
      const [museums, setMuseums] = useState<Museum[]>([]);
      useEffect(() => {
      const fetchMuseums = async () => {
        const data = await getMuseums();
        setMuseums(data);
      };
      fetchMuseums();
    }, []);

  const handleCreate = async (museumData: MuseumFormData) => {
    const museum = {
        name: museumData.name,
        created_by: "6702aaa50ea778191df3cd5b",
        description: museumData.description,
        category: museumData.category,
        tags: museumData.tags,
        pictures: museumData.pictures,
        location: museumData.location,  
        opening_hours: museumData.opening_hours,
        ticket_prices: {
          foreigner: museumData.ticket_prices.foreigner,
          native: museumData.ticket_prices.native,
          student: museumData.ticket_prices.student,
        }
  }
    await createMuseum(museum);
    const Museums = await getMuseums();
    setMuseums(Museums);
  };

  const handleEdit = async (museumData: Museum) => {
    const museum = {
        _id: museumData._id,
        created_by: "6702aaa50ea778191df3cd5b",
        name: museumData.name,
        description: museumData.description,
        category: museumData.category,
        tags: museumData.tags,
        pictures: museumData.pictures,
        location: museumData.location,
        opening_hours: museumData.opening_hours,
        ticket_prices: {
          foreigner: museumData.ticket_prices.foreigner,
          native: museumData.ticket_prices.native,
          student: museumData.ticket_prices.student,
        }
  } 
  console.log(JSON.stringify(museum));
    await updateMuseum(museum._id, museum);
    const Museums = await getMuseums();
    setMuseums(Museums);
  };

  const handleDelete = async (museumId: string) => {
    await deleteMuseum(museumId);
    setMuseums(museums.filter((m) => m._id !== museumId));
  };



  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-9 text-text-primary">
        <h1 className="py-2 text-4xl font-bold">Welcome Tourism Governor</h1>
        <h3 className="py-2 text-2xl font-bold">Museums & Historical Places</h3>
      </div>
      <MuseumList museums={museums} role="TourismGovernor" onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete} />
    </div>
  );
};

export default AllMuseums;