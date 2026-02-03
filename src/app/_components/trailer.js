export const Trailer = ({ setTrailerKey, trailerKey }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
        <button
          onClick={() => setTrailerKey(null)}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-red-400 z-10"
        >
          ✕
        </button>

        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
