import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddRecord({onSubmit, existingNote}){

    const [note, setNote] = useState(existingNote);
    const [open,setOpen] = useState(false);

    function handleNoteEnter(e){
        setNote(e.target.value);
    }
    function handleCancel(e){
        setNote('');
        setOpen(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(note){
            onSubmit(note);
            setNote('');
            setOpen(false);
        }
    }

    function handleAddNote(e){
        e.preventDefault();
        setOpen(true);
    }
    

    return(
        <>
            <Button variant="contained" onClick={handleAddNote} sx={{margin: 2}}>Add a note</Button>
            <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
                <DialogTitle>Add a note</DialogTitle>
                <DialogContent>
                    <TextField
                        id="note"
                        label="Add a note"
                        multiline
                        rows={4}
                        variant="filled"
                        value={note}
                        onChange={handleNoteEnter}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default AddRecord;