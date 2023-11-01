interface RatingRulerProps {
  rating: number | null;
  setRating: (value: number | null) => void;
}

const RatingRuler: React.FC<RatingRulerProps> = ({ rating, setRating }) => {
  const rate = Array.from({ length: 10 }, (_, index) => index + 1);
  const handleRatingChange = (value: number | null) => {
    setRating(value);
  };
  return (
    <div className="w-fit">
      <div className="flex items-center">
        <div>
          <div className="flex items-center">
            {rate.map((value) => (
              <button
                key={value}
                onClick={() => handleRatingChange(value)}
                className={`${
                  rating === value
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-700"
                } w-10 h-10 rounded-lg mx-1 hover:bg-yellow-400 hover:text-white`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <div className="ml-2 text-center text-sm">Not Likely</div>
            <div className="text-center text-sm">Very Likely</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingRuler;
