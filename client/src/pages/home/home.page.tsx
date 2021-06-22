import { Center, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export const HomePage: React.FC = () => {
  return (
    <Center height="100vh" role="main">
      <Grid gridTemplateColumns="1fr 1fr" width="80%" backgroundColor="gray.700" gap="1" padding="1" borderRadius={4}>
        <GridItem colSpan={2} textAlign={["center", "left"]} backgroundColor="gray.800" padding="5">
          Siemaneczko
        </GridItem>
        <GridItem backgroundColor="gray.800" padding="5" fontSize="5" textAlign={["center", "left"]}>
          Ziomeczki
        </GridItem>
        <GridItem backgroundColor="gray.800" padding="5" textAlign={["center", "left"]}>
          Moje
        </GridItem>
      </Grid>
    </Center>
  );
};
