const FriendCardView = ({ header, onClick, shortDescr1, shortDescr2, shortDescr3, shortDescr4, shortDescr5, shortDescr6, longDescr, imgsrc, imgalt, highlight, emphasize, children }) => {
    const hoverColor = `${onClick ? 'hover:bg-slate-300 active:bg-slate-500' : '' }`;
    const highlightColor = highlight ? 'bg-slate-200 dark:bg-slate-600' : 'bg-white dark:bg-slate-800';
    const emphasizeColor = emphasize ? 'bg-slate-300 dark:bg-slate-500' : 'bg-white dark:bg-slate-800';
    const finalBg = emphasize ? emphasizeColor : highlightColor;
    return (
        <div className={`max-w-md mx-auto ${finalBg} rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 ${hoverColor}`} onClick={onClick}>
          <div className="md:flex">
            <div className="shrink-0 md:shrink-0 p-4 flex justify-center items-center">
              <div className="w-24 h-24 rounded-[30%] overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={imgsrc}
                  alt={imgalt}
                />
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center h-full">
              <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-white font-semibold">
                {header}
              </div>
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
              <p className="mt-2 text-slate-500">
                {longDescr}
              </p>
              {children}
            </div>
          </div>
        </div>
      );
  };
  
  export default FriendCardView;
  