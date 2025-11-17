import React, { useState } from "react";
import { scrapePagesAPI } from "../services/api";

const Header = () => {
  const [scraping, setScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState(null);

  const handleScrape = async () => {
    setScraping(true);
    setScrapeStatus(null);

    try {
      const result = await scrapePagesAPI();
      setScrapeStatus({
        type: "success",
        message: `Successfully scraped ${result.scrapeResults.successful} pages and created ${result.processing.totalChunks} chunks`,
      });
    } catch (error) {
      setScrapeStatus({
        type: "error",
        message: `Scraping failed: ${error.message}`,
      });
    } finally {
      setScraping(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex-row items-center justify-between md:flex">
          <div className="mb-3 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Cruise Knowledge Assistant
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Ask questions about cruise destinations from ShermansTravel
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleScrape}
              disabled={scraping}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                scraping
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {scraping ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scraping...
                </div>
              ) : (
                "Update Knowledge Base"
              )}
            </button>
          </div>
        </div>

        {scrapeStatus && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              scrapeStatus.type === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {scrapeStatus.message}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
