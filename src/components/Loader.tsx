const Loader = () => {
  return (
    <>
      <div className="bg-primary flex justify-center items-center p-4 h-svh">
        <svg
          // Applies the spinning animation
          // Sets the height and width (adjust h-XX w-XX as needed)
          className="animate-spin h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none" // Important: We use stroke and fill on child elements
        >
          {/* Background Track Circle */}
          <circle
            // Sets the track color using your configured 'contrast' name
            // Sets opacity to make it slightly faded
            // Note: stroke-COLOR assumes you defined 'contrast' in tailwind.config.js
            className="stroke-contrast opacity-25"
            cx="12"
            cy="12"
            r="10"
            // Sets the thickness of the circle line.
            // Use a standard Tailwind class (e.g., stroke-2) or arbitrary value.
            // If using arbitrary value like stroke-[4px], ensure JIT mode is enabled (default in Tailwind v3+).
            strokeWidth="4"></circle>

          {/* Loading Indicator Arc/Shape */}
          <path
            // Sets the main spinner color using your configured 'accessible-green' name
            // Sets opacity (optional, 75% is common)
            // Note: fill-COLOR assumes you defined 'accessible-green' in tailwind.config.js
            className="fill-accessible-green opacity-75"
            // This 'd' attribute defines the shape (a common Pac-Man like spinner arc)
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </>
  );
};

export default Loader;
