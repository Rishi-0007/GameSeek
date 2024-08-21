import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GenresList from "./components/GenresList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface gameQuery {
  genre: Genre | null;
  platform: Platform | null;
  selecteddSort: string;
  searchText: string;
}

const App = () => {
  const [gameQuery, setGameQuery] = useState<gameQuery>({} as gameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        // for screens larger than 1024px
        lg: `"nav nav" "aside main "`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar
          onSearch={(s) => setGameQuery({ ...gameQuery, searchText: s })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenresList
            onSelectedGenre={(g) => setGameQuery({ ...gameQuery, genre: g })}
            selectedGenre={gameQuery.genre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameHeading gamequery={gameQuery} />
        <HStack padding={3}>
          <PlatformSelector
            onSelectedPlatform={(p) =>
              setGameQuery({ ...gameQuery, platform: p })
            }
            selectedPlatform={gameQuery.platform}
          />
          <SortSelector
            onSortSelected={(s) =>
              setGameQuery({ ...gameQuery, selecteddSort: s })
            }
            selectedSort={gameQuery.selecteddSort}
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;
