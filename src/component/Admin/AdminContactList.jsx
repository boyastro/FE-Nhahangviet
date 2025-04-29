import React, { useState, useEffect } from "react";

const AdminContactList = () => {
  const [contacts, setContacts] = useState([]);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/contact`);
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="space-y-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
          >
            <p className="mb-2 text-gray-800 font-semibold">
              <strong>Name:</strong> {contact.name}
            </p>
            <p className="mb-2 text-gray-800 font-semibold">
              <strong>Email:</strong> {contact.email}
            </p>
            <p className="mb-2 text-gray-800 font-semibold">
              <strong>Subject:</strong> {contact.subject}
            </p>
            <p className="text-gray-600">
              <strong>Message:</strong> {contact.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContactList;
