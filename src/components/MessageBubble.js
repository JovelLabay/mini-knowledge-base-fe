import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.type === "user";
  const isError = message.isError;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${
          isUser ? "order-2" : "order-1"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? "bg-blue-600 text-white"
              : isError
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-xs font-medium mb-2">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs hover:underline text-blue-200 hover:text-blue-100"
                  >
                    • {source.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Metadata for bot messages */}
          {!isUser && message.confidence !== undefined && (
            <div className="mt-2 pt-2 border-t border-gray-300 ">
              <p className="text-xs text-gray-500">
                Confidence: {(message.confidence * 100).toFixed(1)}%
                {message.chunksUsed && ` • Chunks used: ${message.chunksUsed}`}
              </p>
            </div>
          )}
        </div>

        <p
          className={`text-xs text-gray-500 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
          isUser ? "bg-blue-600 order-1 mr-2" : "bg-gray-600 order-2 ml-2"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
    </div>
  );
};

export default MessageBubble;
