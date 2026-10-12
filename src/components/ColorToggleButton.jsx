import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton({ filter, setFilter }) {
  function handleFilter(e, newFilter) {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  }
  return (
    <ToggleButtonGroup
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
      color="success"
      exclusive
      aria-label="Task Filters"
      value={filter}
      onChange={handleFilter}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
    </ToggleButtonGroup>
  );
}
