import React, { useState, useEffect } from "react";
import { fetchGameHistory } from "../../../service/GameHistoryService";

const GameHistory = () => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("All");
  const itemsPerPage = 10;

  // Fetch game history
  const fetchHistory = async () => {
    if (!dateStart || !dateEnd) {
      setError("Please select both start and end dates.");
      return;
    }

    setError(null);
    try {
      setLoading(true);
      const data = await fetchGameHistory({
        date_start: `${dateStart} 00:00:00`,
        date_end: `${dateEnd} 23:59:59`,
        page_number: 1,
        items_per_page: 50,
      });

      setHistory(data.data);
      setFilteredHistory(data.data);

      // Extract unique providers from the data
      const uniqueProviders = [
        ...new Set(
          data.data.map((item) => {
            const match = item.description.match(/\(([^)]+)\)$/);
            return match ? match[1] : "Unknown";
          })
        ),
      ];
      setProviders(["All", ...uniqueProviders]);
    } catch (err) {
      setError(err.message || "An error occurred while fetching game history.");
    } finally {
      setLoading(false);
    }
  };

  // Filter the table based on search query and provider
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = history.filter((item) => {
      const matchesQuery =
        item.description.toLowerCase().includes(lowerCaseQuery);
      const matchesProvider =
        selectedProvider === "All" ||
        item.description.includes(`(${selectedProvider})`);
      return matchesQuery && matchesProvider;
    });
    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchQuery, selectedProvider, history]);

  // Paginate the table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#2E2E2E] rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Game History
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-400 font-medium mb-2">Start Date</label>
          <input
            type="date"
            className="border border-gray-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-400 font-medium mb-2">End Date</label>
          <input
            type="date"
            className="border border-gray-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
      </div>

      {/* Fetch Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="bg-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Fetch History"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {/* Game History Table and Filters */}
      {filteredHistory.length > 0 && (
        <>
          {/* Provider Filter */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6 mt-8">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-400 font-medium mb-2">Filter by Provider</label>
              <select
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                {providers.map((provider, index) => (
                  <option key={index} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-400 font-medium mb-2">Search Description</label>
              <input
                type="text"
                placeholder="Search by description"
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="border border-gray-700 px-6 py-3 text-left">Time</th>
                  <th className="border border-gray-700 px-6 py-3 text-left">
                    Description
                  </th>
                  <th className="border border-gray-700 px-6 py-3 text-left">URL</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition`}
                  >
                    <td className="border border-gray-700 px-6 py-3 text-gray-300">
                      {item.time}
                    </td>
                    <td className="border border-gray-700 px-6 py-3 text-gray-300">
                      {item.description}
                    </td>
                    <td className="border border-gray-700 px-6 py-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    page === currentPage
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {!loading && filteredHistory.length === 0 && (
        <p className="text-gray-400 mt-8 text-center">No game history found.</p>
      )}
    </div>
  );
};

export default GameHistory;
