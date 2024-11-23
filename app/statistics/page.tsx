import StatsStatistics from "@/components/statistics/pokemons";
import TypeStatistic from "@/components/statistics/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page: React.FC = () => {
  return (
    <Tabs defaultValue="types" className="w-full h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="types">Types</TabsTrigger>
      </TabsList>
      <TabsContent value="stats" className="flex-1">
        <StatsStatistics />
      </TabsContent>
      <TabsContent value="types" className="flex-1">
        <TypeStatistic />
      </TabsContent>
    </Tabs>
  );
};

export default Page;
