const CardView = ({ header, onClick, shortDescr1, shortDescr2, shortDescr3, shortDescr4, shortDescr5, shortDescr6, longDescr, imgsrc, imgalt, highlight, emphasize, children }) => {
  const hoverColor = `${onClick ? 'hover:bg-slate-300 active:bg-slate-500' : '' }`;
  const highlightColor = highlight ? 'bg-slate-200 dark:bg-slate-600' : 'bg-white dark:bg-slate-800';
  const emphasizeColor = emphasize ? 'bg-slate-300 dark:bg-slate-500' : 'bg-white dark:bg-slate-800';
  const finalBg = emphasize ? emphasizeColor : highlightColor;
  
  return (
    <div className={`relative max-w-md mx-auto ${finalBg} rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 ${hoverColor}`} onClick={onClick} style={{ width: '80%' }}>
      <div className="md:flex">
        {/* Left Container for Image */}
        <div className="relative w-48">
          <img
            className="absolute h-full w-full object-cover"
            src={imgsrc}
            alt={imgalt}
          />
        </div>
        {/* Right Container for Text */}
        <div className="p-8 flex-1 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-xl text-indigo-500 dark:text-white font-semibold">
            {header}
          </div>
          {
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-zinc-400">
              <>
                {shortDescr1} <br />
                {shortDescr2} <br />
                {shortDescr3} <br />
                {shortDescr4} <br />
                {shortDescr5} <br />
                {shortDescr6}
              </>
            </p>
          }
          <p className="mt-2 mb-4 text-slate-500">
            {longDescr}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardView;
