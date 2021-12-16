import { useContext, useState } from "react";
import Head from "next/head";
import Loading from "../components/Loading";
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
      <Head>
        <title>{search ? search : "Poké Search"} | Pokémon Card Manager</title>
      </Head>
      <div className="pb-16 animate-fade-in">
        <form onSubmit={formSubmit} className="text-center">
          <input
            className="border rounded border-gray-300 mx-4 mt-8 mb-12 px-3 py-2"
            disabled={loading}
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
            className="text-sm sm:text-lg cursor-pointer p-2 w-32 mt-2 border border-gray-600 bg-purple-600 text-yellow-400 rounded shadow-xl hover:bg-purple-700"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: "2.5px",
            }}
            disabled={loading}
            type="submit"
            value="Search"
          />
        </form>
        {loading ? (
          <div className="text-center">
            <Loading />
          </div>
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
