import { useContext, useState } from "react";
import PokemonCard from "../components/PokemonCard";

// context
import _appContext from "../context/_appContext";

export default function Home() {
  const { user, pokemon } = useContext(_appContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (search) {
      console.log("search");
      setLoading(true);
      pokemon.card.where({ q: `name:${search}` }).then((result) => {
        setData(result.data);
        console.log(result.data);
        setLoading(false);
      });
    }
  };

  return !user ? (
    <></>
  ) : (
    <>
      <div className="pb-16">
        <form onSubmit={formSubmit} className="text-center">
          <input
            className="border border-gray-300 mx-4 mt-8 mb-12 px-3 py-2"
            style={{
              minWidth: "200px",
              width: "50vw",
              maxWidth: "450px",
            }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <input
            className="border bg-gray-300 border-gray-300 px-3 py-2 shadow-lg hover:bg-gray-200 hover:cursor-pointer"
            type="submit"
            value="Search"
          />
        </form>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div className="px-8 lg:px-12 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-8">
            {data &&
              data.map((item) => <PokemonCard key={item.id} data={item} />)}
          </div>
        )}
      </div>
    </>
  );
}
