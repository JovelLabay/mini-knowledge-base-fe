import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="order-1 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium order-2 ml-2">
        AI
      </div>
    </div>
  );
};

export default LoadingIndicator;
