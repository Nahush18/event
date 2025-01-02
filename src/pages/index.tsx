import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
    };

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (response.status === 200) {
      // After adding the event, fetch the events again to display the latest list
      const fetchEvents = async () => {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      };
      fetchEvents();
    } else {
      console.error("Failed to add event:", data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#333' }}>Upcoming Events</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#222', marginBottom: '10px' }}>{event.title}</h2>
              <p style={{ color: '#555', marginBottom: '10px' }}>{event.description}</p>
              <p style={{ color: '#888', fontSize: '0.875rem' }}>Date: {event.date}</p>
            </div>
          ))}
        </div>

        {/* Add Event Form */}
        <div style={{ marginTop: '40px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add Event</h2>
          <form onSubmit={handleAddEvent}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="eventTitle" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Event Title</label>
              <input
                type="text"
                id="eventTitle"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="eventDescription" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Description</label>
              <textarea
                id="eventDescription"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="eventDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Date</label>
              <input
                type="date"
                id="eventDate"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
