"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Settings = () => {
  const { data: session} = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect, um die Sitzungsdaten bei jedem Rendern zu laden
  useEffect(() => {
    if (session) {
        console.log(session)
      setName(session.user.name || ""); // Setze den Namen, falls er in der Sitzung vorhanden ist
      setEmail(session.user.email || ""); // Setze die E-Mail, falls sie in der Sitzung vorhanden ist
    }
  }, [session]); // Abhängigkeit von session, damit der Effekt nur ausgeführt wird, wenn sich session ändert

  const handleSave = async () => {
    console.log(session)
        const response = await axios.patch("/api/updateUser",
            {
                name: name,
                email: email
            }
        );

        if(response.ok){
            await update({
                name: name,
                email: email,
              });

              console.log(session)
        }

        console.log("user updated", response.data)

        

        
        
    setIsEditing(false); 
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex">
     
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
          {!isEditing ? (
            <div>
              <div className="mb-4">
                <p className="text-gray-700 text-sm">Name:</p>
                <p className="font-bold">{name}</p>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 text-sm">Email:</p>
                <p className="font-bold">{email}</p>
              </div>
              <button
                onClick={handleEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          ) : (
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
