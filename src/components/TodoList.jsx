import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ColorToggleButton from "./ColorToggleButton";
import TaskList from "./TaskList";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import EditTaskDialog from "./EditTaskDialog";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [filter, setFilter] = useState("all");

  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const getTasks = localStorage.getItem("tasks");
    if (getTasks) {
      return JSON.parse(getTasks);
    }
    return [{ id: uuidv4(), task: "Learn React", completed: false }];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    const title = inputValue.trim();
    if (!title) return;
    const newTask = {
      id: uuidv4(),
      task: title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  }

  // finctions To Edit
  function openEditDialog(task) {
    setTaskToEdit(task);
    setEditValue(task.task);
  }

  function handleCancelEdit() {
    setTaskToEdit(null);
    setEditValue("");
  }

  function handleSaveEdit() {
    if (!editValue.trim() || !taskToEdit) return;
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskToEdit.id ? { ...item, task: editValue.trim() } : item,
      ),
    );
    handleCancelEdit();
  }

  function completedTask(id) {
    setTasks((prev) =>
      prev.map((toggle) =>
        toggle.id === id ? { ...toggle, completed: !toggle.completed } : toggle,
      ),
    );
  }

  // Filteration Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  // funtions To delete Task
  function requestDeleteTask(task) {
    setTaskToDelete(task);
    setIsOpen(true);
  }

  function handleCancelDelete() {
    setIsOpen(false);
    setTaskToDelete(null);
  }

  function handleConfirmDelete() {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((item) => item.id !== taskToDelete.id));
    handleCancelDelete();
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f5f5f0",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#176b5b",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Todo List
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Organize your tasks. Focus on what matters.
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Tasks
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="outlined-basic"
                placeholder="Enter a task..."
                variant="outlined"
                label="Task Title"
                fullWidth
              />
              <Button
                onClick={handleAddTask}
                variant="contained"
                sx={{
                  bgcolor: "#176b5b",
                  "&:hover": { bgcolor: "#125548" },
                }}
              >
                Add Task
              </Button>
            </Box>

            <Box sx={{ my: 3 }}>
              <ColorToggleButton filter={filter} setFilter={setFilter} />
            </Box>
            <Box
              sx={{ maxHeight: 350, overflowX: "hidden", overflowY: "auto" }}
            >
              <TaskList
                tasks={filteredTasks}
                requestDeleteTask={requestDeleteTask}
                openEditDialog={openEditDialog}
                completedTask={completedTask}
              />
              <DeleteConfirmDialog
                open={isOpen}
                task={taskToDelete}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
              <EditTaskDialog
                open={taskToEdit !== null}
                editValue={editValue}
                setEditValue={setEditValue}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
