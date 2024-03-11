import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function UpdateRecord({show, existingNote, onCancel, onSubmit}){

    const [note, setNote] = useState(existingNote);
    const [open,setOpen] = useState(show);

    function handleNoteEnter(e){
        setNote(e.target.value);
    }
    function handleCancel(e){
        setNote('');
        onCancel();
        setOpen(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(note){
            onSubmit(note);
            setOpen(false);
        }
    } 

    return(
        <>
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
        {/* <form onSubmit={handleSubmit}>
            <TextField
                id="note"
                label="Add a note"
                multiline
                rows={4}
                variant="filled"
                value={note}
                onChange={handleNoteEnter}
            />
           <Button variant="contained" type="submit">Add</Button>
           <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </form> */}
        </>

    )
}

export default UpdateRecord;