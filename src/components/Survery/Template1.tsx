import React, { useState } from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi";
import Button from "../PrimaryButton";
import RatingRuler from "../RatingRuler";
import { useAppSelector } from "../../hooks/reduxHook";

const Template1: React.FC = () => {
  const { topic1 } = useAppSelector((state) => state.form);
  const [rating, setRating] = useState<number | null>(null);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg w-fit">
        <div>
          <div className="flex border-b border-gray-500 justify-between w-full">
            <div className="py-3 pl-4 w-full">{topic1}</div>
            <div className="text-4xl bg-blue-700 w-12 h-12 flex justify-center items-center">
              {<HiOutlineCheckBadge />}
            </div>
          </div>
          <div className="p-4">
            <RatingRuler rating={rating} setRating={setRating} />
          </div>
          <div className="border-t border-gray-400 p-2 flex justify-end">
            <Button>
              Next <HiArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
