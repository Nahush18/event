import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-20 pb-6 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{event.title}</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="text-gray-500 text-sm">Date: {event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
