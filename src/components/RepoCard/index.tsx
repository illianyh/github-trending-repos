import {
  Card,
  Flex,
  Group,
  Button,
  Text,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { IconStar } from "@tabler/icons";

export type Props = {
  description: string;
  href: string;
  name: string;
  ratings: number;
  isFavourite: boolean;
  onClickFavourite: () => void;
};
function RepoCard({
  description,
  href,
  name,
  ratings,
  isFavourite,
  onClickFavourite,
}: Props) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex
        h={{ sm: 200, md: 240 }}
        direction={{ base: "column" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>
            {name}{" "}
            <Badge ml={4} color="pink" variant="light">
              <IconStar size={10} />
              <Text ml={4} span>
                {ratings}
              </Text>
            </Badge>
          </Text>
          <ActionIcon
            data-testid={`favouriteBtn-${isFavourite ? "filled" : "outline"}`}
            name="favourite"
            color={"yellow"}
            variant={isFavourite ? "filled" : "outline"}
            onClick={onClickFavourite}
          >
            <IconStar size={18} />
          </ActionIcon>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <Card.Section></Card.Section>

        <Button
          component="a"
          href={href}
          target="_blank"
          variant="default"
          color="dark"
          fullWidth
          mt="auto"
          radius="md"
        >
          Learn more
        </Button>
      </Flex>
    </Card>
  );
}

export default RepoCard;
