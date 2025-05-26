import { FaStar } from "react-icons/fa";

interface StarProps {
  filled: boolean;
}
export const Star = ({ filled }: StarProps) => {
  return (
    <>
      <FaStar style={{ color: filled ? "orange" : "lightgray" }} />
    </>
  );
};
