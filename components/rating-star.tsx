import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex gap-[0.10rem]">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <label key={idx}>
            <FaStar
              className="text-lg"
              color={idx < rating ? "#01af93" : "#bbb"}
            />
          </label>
        ))}
    </div>
  );
}
