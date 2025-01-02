import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = { title, description, date };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (res.status === 200) {
        setSuccessMessage(result.message);
        setTitle("");
        setDescription("");
        setDate("");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setErrorMessage(result.error || "Error adding event");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-20 pb-6 px-4">
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Event</h1>
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 mb-4 rounded">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="bg-green-500 text-white p-2 mb-4 rounded">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Event Description</label>
              <textarea
                id="description"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEventPage;
