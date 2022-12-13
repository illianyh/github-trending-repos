import { Flex, NativeSelect, Switch, useMantineTheme } from "@mantine/core";
import { useRepositoriesContext } from "../context";

import { ItemsOrder } from "../types";

function Filters() {
  const {
    filterByLanguage,
    priorDays,
    setPriorDays,
    itemsOrder,
    setFilterByLanguage,
    setItemsOrder,
    setShowFavourites,
    showFavourites,
  } = useRepositoriesContext();

  const languages = [
    "All",
    "Go",
    "JavaScript",
    "Kotlin",
    "Java",
    "Python",
    "TypeScript",
    "Ruby",
    "Swift",
  ];
  const priorDaysOptions = [7, 30, 60, 90, 180, 365];
  const selectPriorDaysData = priorDaysOptions.map((day) => day.toString());
  const theme = useMantineTheme();

  return (
    <Flex justify={"space-between"} align="center" mb={8} gap="md" wrap="wrap">
      <Switch
        color={theme.colorScheme === "dark" ? "gray" : "dark"}
        size="xl"
        onLabel={"Favourite repos"}
        offLabel={"All repos"}
        checked={showFavourites}
        onChange={(event) => setShowFavourites(event.currentTarget.checked)}
      />
      <Flex
        gap="md"
        justify={{ sm: "center", md: "flex-end" }}
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <NativeSelect
          label={`Last created in ${priorDays} days`}
          value={priorDays}
          onChange={(event) => setPriorDays(Number(event.currentTarget.value))}
          data={selectPriorDaysData}
        />
        <NativeSelect
          label={`Filter by ${
            filterByLanguage ? filterByLanguage : "language"
          }`}
          value={filterByLanguage}
          onChange={(event) =>
            event.target.value === "All"
              ? setFilterByLanguage(undefined)
              : setFilterByLanguage(event.target.value)
          }
          data={languages}
        />
        <NativeSelect
          label={`Sort by ${itemsOrder}`}
          value={itemsOrder}
          onChange={(event) =>
            setItemsOrder(event.currentTarget.value as ItemsOrder)
          }
          data={["desc", "asc"]}
        />
      </Flex>
    </Flex>
  );
}

export default Filters;
