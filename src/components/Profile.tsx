import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { CharacterT } from "../types";

function Profile() {

  //State variables
  const [character, setCharacter] = useState<CharacterT | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  //Hooks
  useEffect(() => {
    const characterId = params.id;
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  //navigate back to home page
  const handleBackClick = () => {
    navigate(-1);
  };

  //if character is unset
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-600 rounded-lg p-8 max-w-md bg-gray-800 hover:bg-gray-700 shadow-lg transition duration-300">
        <h1 className="text-2xl text-center font-semibold text-green-500">
          Profile
        </h1>
        <div className="mt-4 flex flex-col items-center">
          <img
            src={character.image}
            alt={character.name}
            className="h-54 w-54 rounded-full"
          />
          <p className="text-sm font-medium text-gray-300 mt-2">
            Name: {character.name}
          </p>
          <p className="text-sm text-gray-400">Species: {character.species}</p>
          <p className="text-sm text-gray-400">Status: {character.status}</p>
          <p className="text-sm text-gray-400">Type: {character.type}</p>
          <p className="text-sm text-gray-400">Gender: {character.gender}</p>
          <p className="text-sm text-gray-400">
            Origin: {character.origin.name}
          </p>
          <p className="text-sm text-gray-400">
            Location: {character.location.name}
          </p>
          <button
            onClick={handleBackClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
