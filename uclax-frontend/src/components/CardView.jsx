const CardView = ({ header, shortDescr1, shortDescr2, shortDescr3, shortDescr4, longDescr, imgsrc, imgalt }) => {
  return (<div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8">
    <div className="md:flex">
      <div className="shrink md:shrink-0">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
          src={imgsrc}
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
  </div>);
};

export default CardView;