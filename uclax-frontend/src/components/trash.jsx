import { useState } from 'react';

const TrashButton = ({ deleteConfirmation, requestId, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTrashClick = () => {
    setShowPopup(true);
  };

  const handleDeleteRequest = async (requestId) => {
    try {
        console.log("Trying to delete ", requestId);
        await fetch(`http://localhost:3000/auth/riderequests/${requestId}`, {
        method: "DELETE",
        credentials: "include",})
        console.log("CardView called delete.)");
        setShowPopup(false);
        onDelete();
    } catch (error) {
        console.error("Error deleting ride request:", error);
    }
  };

  return (
    <div className="absolute top-2 left-2">
      {/* Trash button taken from Tailwind CSS */}
      <button
        onClick={handleTrashClick}
        className="bg-slate-300 rounded-full p-2 transition-all duration-300 hover:bg-red-700 focus:outline-none"
      >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="black" 
            className="size-6">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-75" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4"> {deleteConfirmation} </p>
            <div className="flex justify-center">
              <button className="px-4 py-2 mr-4 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDeleteRequest(requestId)}>Delete</button>
              <button className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashButton;