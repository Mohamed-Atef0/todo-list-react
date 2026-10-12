import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskList({
  tasks,
  requestDeleteTask,
  openEditDialog,
  completedTask,
}) {
  if (tasks.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
        No tasks found.
      </Typography>
    );
  }

  return (
    <List>
      {tasks.map((t) => (
        <ListItem
          key={t.id}
          sx={{
            borderBottom: "1px solid #eee",
            py: 1.5,
          }}
        >
          <Tooltip title={t.completed ? "Mark as active" : "Mark as completed"}>
            <IconButton
              onClick={() => completedTask(t.id)}
              aria-label="toggle task completion"
              sx={{
                color: t.completed ? "#176b5b" : "#9ca3af",
              }}
            >
              <CheckCircleOutlinedIcon />
            </IconButton>
          </Tooltip>

          <ListItemText
            primary={t.task}
            sx={{
              ml: 1,
              textDecoration: t.completed ? "line-through" : "none",
              color: t.completed ? "text.disabled" : "text.primary",
              overflowWrap: "anywhere",
            }}
          />

          <Tooltip title="Edit">
            <IconButton
              onClick={() => openEditDialog(t)}
              aria-label="edit task"
              sx={{
                color: "#176b5b",
                "&:hover": { bgcolor: "#e5f2ed" },
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton
              onClick={() => requestDeleteTask(t)}
              aria-label="delete task"
              sx={{
                color: "#c24141",
                "&:hover": { bgcolor: "#fef2f2" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
}
