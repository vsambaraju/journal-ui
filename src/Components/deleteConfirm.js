import React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteConfirm({show, onSubmit, onCancel}){

    function handleDelete(e){
        e.preventDefault();
        onSubmit();
    }

    function handleCancel(e){
        e.preventDefault();
        onCancel();
    }

    return (
        <Dialog open={show} onClose={handleCancel}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete a note?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" type="submit" onClick={handleDelete}>Delete</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )

}

export default DeleteConfirm;