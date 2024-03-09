import { usePokemonContext } from "../context";


const PokemonDetail = () => {
  const { state } = usePokemonContext();

  const { selected } = state;

  return (
    <section className="block">
      <article className={` z-20 top-0 bg-white w-full h-[90%]`}>
        <div className="w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
          {selected ? (
            <div className="flex flex-col items-center py-10">
              <img
                className="w-[85%] mb-3 "
                src={selected?.image}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {selected.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selected.name}
              </span>
              <div className="flex mt-4 md:mt-6">
                {selected.types?.map((type) => {
                  console.log(selected);

                  return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {type}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <h5 className="block w-full my-5 text-xl font-medium text-center">
              Please select a pokemon
            </h5>
          )}
        </div>
      </article>
    </section>
  );
};

export default PokemonDetail;

