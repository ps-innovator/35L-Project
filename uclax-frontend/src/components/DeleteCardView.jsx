import { useState } from 'react';

const DeleteCardView = ({ header, requestId, shortDescr1, shortDescr2, shortDescr3, shortDescr4, longDescr, imgsrc, imgalt, highlight, emphasize }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteRequest = async (requestId) => {
    try {
      console.log("Trying to delete ", requestId);
      await fetch("http://localhost:3000/auth/deleteRideRequest", {
        method: "DELETE",
        credentials: "include",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({requestId})
      })
      console.log("CardView called delete.)");
    } catch (error) {
        console.error("Error deleting ride request:", error);
    }
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const highlightColor = highlight ? 'bg-slate-200 dark:bg-slate-600' : 'bg-white dark:bg-slate-800';
  const emphasizeColor = emphasize ? 'bg-slate-300 dark:bg-slate-500' : 'bg-white dark:bg-slate-800';
  const finalBg = emphasize ? emphasizeColor : highlightColor;

  return (
    <div className={`max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 ${finalBg}`}>
      <div className="md:flex">
        <div className="shrink md:shrink-0" onClick={handleImageClick}>
          <img
            className="h-48 w-full object-cover md:h-full md:w-48 cursor-pointer"
            src={imgsrc} //try to change image on hover? or highlight in red or something
            alt={imgalt}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-white font-semibold">
            {header}
          </div>
          {
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-zinc-400">
              <>
                {shortDescr1} <br />
                {shortDescr2} <br />
                {shortDescr3} <br />
                {shortDescr4}
              </>
            </p>
          }
          <p className="mt-2 text-slate-500">
            {longDescr}
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-75" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this ride request?</p>
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

export default DeleteCardView;
