/* eslint-disable @typescript-eslint/no-explicit-any */

type ReceivedProps = {
  species: Record<string, any>;
};

const Stats: React.FC<ReceivedProps> = async ({ species }) => {
  const {
    base_happiness,
    capture_rate,
    growth_rate,
    habitat,
    hatch_counter,
    egg_groups,
  } = species;

  return (
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
  );
};

export default Stats;
