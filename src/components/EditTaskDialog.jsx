import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditTaskDialog({
  open,
  editValue,
  setEditValue,
  onCancel,
  onSave,
}) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>Edit Task</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          placeholder="Enter task title..."
          fullWidth
          value={editValue}
          onChange={(event) => setEditValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSave();
            }
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            bgcolor: "#176b5b",
            "&:hover": { bgcolor: "#125548" },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
