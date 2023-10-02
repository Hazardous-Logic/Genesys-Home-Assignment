import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { CharacterT } from "../types";
import "./Home.component.css";

function Home() {

  //State variables
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number | null>(null);
  const navigate = useNavigate();

  //API get with Axios
  const loadCharacters = async (page: number = 1) => {
    try {
      const res = await axios.get(
        "https://rickandmortyapi.com/api/character" +
          (page > 1 ? `?page=${page}` : "")
      );
      setCharacters(res.data.results);
      if (!maxPages) {
        setMaxPages(res.data.info.pages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Hooks
  useEffect(() => {
    loadCharacters();
  }, []);

  //passes the id of the selected character and routes to the profile page
  const handleCharacterClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  //Search bar update on input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  //filters the characters array using the search input
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container max-w-4xl mx-auto">
    <h1 className="text-6xl font-semibold text-center text-green-500 mt-2 aliens">
        Rick and Morty Characters
    </h1>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchInput}
        onChange={handleSearchInputChange}
        className="mt-4 mb-4 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300"
      />

      <table className="min-w-full divide-y mb-16 border border-gray-600 rounded-lg divide-gray-700 shadow-lg">
        <thead className="bg-gray-800">
          <tr className="bg-gray-600">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Avatar
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Species
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {filteredCharacters.map((character) => (
            <tr
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}
              className="cursor-pointer hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-24 h-24">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                {character.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {character.species}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {character.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center mb-16 gap-4">
        {maxPages && (
          <button
            onClick={() => {
              setPage(1);
              loadCharacters(1);
            }}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-gray-300 cursor-pointer hover:bg-gray-700 disabled:opacity-50"
          >
            First
          </button>
        )}

        <button
          onClick={() => {
            const newPage = page - 1;
            if (newPage < 1) return;
            setPage(newPage);
            loadCharacters(newPage);
          }}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-gray-300 cursor-pointer hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-300">
          {page}
        </div>

        <button
          onClick={() => {
            const newPage = page + 1;
            if (!maxPages || newPage > maxPages) return;
            setPage(newPage);
            loadCharacters(newPage);
          }}
          disabled={page === maxPages}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 cursor-pointer disabled:opacity-50"
        >
          Next
        </button>

        {maxPages && (
          <button
            onClick={() => {
              setPage(maxPages);
              loadCharacters(maxPages);
            }}
            disabled={page === maxPages}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 cursor-pointer disabled:opacity-50"
          >
            Last ({maxPages})
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;