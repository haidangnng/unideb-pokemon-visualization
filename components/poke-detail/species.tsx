/* eslint-disable @typescript-eslint/no-explicit-any */
const POKE_SPRITE = process.env.POKE_SPRITE || "";

type ReceivedProps = {
  species: Record<string, any>;
};

const SpeciesTab: React.FC<ReceivedProps> = async ({ species }) => {
  const {
    flavor_text_entries,
    base_happiness,
    capture_rate,
    growth_rate,
    habitat,
    hatch_counter,
    egg_groups,
    evolution_chain: { url },
  } = species;

  const data = await fetch(`${url}`);
  const revChain: Record<string, any> = await data.json();
  console.log("revChain", revChain);

  const getSpeciesDisplay = ({ name, url }: { name: string; url: string }) => {
    const split = url.split("/");
    const id = split[split.length - 2];
    const sprite = `${POKE_SPRITE}${id}.png`;
    return {
      name,
      sprite,
    };
  };

  // const renderItem = (chain: Record<string, any>) => {
  //   const { evolves_to } = chain
  //   if (evolves_to.lenght >= 0) {
  //     evolves_to.map(to => )
  //   }
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <p>{flavor_text_entries[0].flavor_text}</p>
      </div>

      <div className="flex flex-wrap space-y-2 border p-4 rounded-md">
        <h4 className="w-1/3 mt-2">
          <span className="underline underline-offset-2">Base Happiness: </span>
          <p>{base_happiness}</p>
        </h4>
        <h4 className="w-1/3">
          <span className="underline underline-offset-2">Capture Rate: </span>
          <p>{capture_rate}</p>
        </h4>
        <h4 className="w-1/3">
          <span className="underline underline-offset-2">Growth Rate: </span>
          <p>{growth_rate.name}</p>
        </h4>
        <h4 className="w-1/3">
          <span className="underline underline-offset-2">Habitat: </span>
          <p>{habitat.name}</p>
        </h4>
        <h4 className="w-1/3">
          <span className="underline underline-offset-2">Hatch Counter: </span>
          <p>{hatch_counter}</p>
        </h4>

        <h4 className="w-full">
          <span className="underline underline-offset-2">Egg Groups</span>
          <div className="flex gap-2 justify-start items-center">
            {egg_groups.map((group: Record<string, string>) => (
              <p key={group.name}>{group.name}</p>
            ))}
          </div>
        </h4>
      </div>
    </div>
  );
};

export default SpeciesTab;
