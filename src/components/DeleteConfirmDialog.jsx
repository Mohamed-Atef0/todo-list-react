import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function DeleteConfirmDialog({
  open,
  task,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{task?.task}"? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>

        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
