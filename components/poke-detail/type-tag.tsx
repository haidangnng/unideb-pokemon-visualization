import { Badge } from "@/components/ui/badge";

type ReceivedProps = {
  type: string;
};

const tagColors: Record<string, string> = {
  normal: "#dcdcdc",
  grass: "#56b656",
  fire: "#f78030",
  water: "#6890f0",
  bug: "#a8b820",
  electric: "#f8d030",
  rock: "#b8a038",
  ghost: "#705898",
  poison: "#a040a0",
  psychic: "#f85888",
  fighting: "#c03028",
  dragon: "#7038f8",
  flying: "#a890f0",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
  ice: "#98d8d8",
  ground: "#e0c068",
};

const TypeTag: React.FC<ReceivedProps> = ({ type }) => {
  return (
    <Badge
      className={`rounded-full text-lg w-18 flex justify-center items-center flex-1 h-fit p-0.5 uppercase border-2 bg-white hover:bg-white`}
      style={{
        borderColor: tagColors[type],
      }}
    >
      <div
        className="w-full flex justify-center items-center rounded-full"
        style={{
          backgroundColor: tagColors[type],
        }}
      >
        {type}
      </div>
    </Badge>
  );
};

export default TypeTag;
