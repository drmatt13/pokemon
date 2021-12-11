import { useState } from "react";

const PokemonCard = ({ data }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="relative flex flex-col text-yellow-300">
      <div className="flex items-start mb-2">
        <div className="flex-1 truncate">
          <div className="text-center truncate">{data.name}</div>
          <div className="text-center">
            {data?.cardmarket?.prices?.averageSellPrice ? (
              <span>${data.cardmarket.prices.averageSellPrice}</span>
            ) : (
              <span>No price</span>
            )}
          </div>
        </div>
        <div className="h-full w-6 flex items-center text-3xl">
          {count > 0 ? (
            <i className="fas fa-check text-green-500" />
          ) : (
            <i className="fas fa-times text-red-500" />
          )}
        </div>
      </div>
      <img className="rounded-md" src={data.images.small} alt={data.name} />
      <input
        className="text-black w-12 p-1 rounded-md border-2 border-black absolute bottom-2 right-1 md:bottom-3 md:right-2"
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
    </div>
  );
};

export default PokemonCard;
