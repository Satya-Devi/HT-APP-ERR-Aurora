import { Paper, Text, Title } from "@mantine/core";
import classes from "./ImageCard.module.css";

export function ImageCard() {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      visibleFrom="md"
    >
      <div>
        <Title order={2} className={classes.title}>
          Alex Johnson, Azure Developer{" "}
        </Title>
        <Text className={classes.category} size="lg">
          HappyTechies helped me quickly land my dream job as a Microsoft Azure
          Developer with their user-friendly platform and excellent support—if
          you're a developer seeking new opportunities, I highly recommend
          joining HappyTechies!
        </Text>
      </div>
    </Paper>
  );
}
