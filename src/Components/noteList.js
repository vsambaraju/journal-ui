import React, {useState} from 'react';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import UpdateRecord from './updateRecord';
import DeleteConfirm from './deleteConfirm';

function NoteList({label,notes=[],onUpdate, onDelete}){

    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [selectedNote, setSelectedNote] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState('');

    function handleUpdateButtonClick(e, id, note){
        e.preventDefault();
        setShowUpdate(true);
        setSelectedNote(note);
        setSelectedNoteId(id);
    }

    function handleCancelUpdate(){
        setShowUpdate(false);
        setSelectedNote('');
        setSelectedNoteId('');
    }

    function handleUpdate(note){
        onUpdate(note, selectedNoteId);
        setShowUpdate(false);
        setSelectedNote('');
        setSelectedNoteId('');
    }

    function handleDeleteButtonClick(e, noteId){
        e.preventDefault();
        setShowDelete(true);
        setSelectedNoteId(noteId);
    }
    function handleCancelDelete(){
        setShowDelete(false);
        setSelectedNoteId('');
    }

    function handleDelete(){
        onDelete(selectedNoteId);
        setShowDelete(false);
        setSelectedNoteId('');
    }

    return (
        <Paper sx={{margin: 2}}> 
            <Typography variant="h6" sx={{margin: 1}}>{label}</Typography>
            <List key={label}>
                {notes.map(note => <ListItem key={note.id} secondaryAction={
                                                            <>
                                                                <IconButton onClick={(e)=>handleUpdateButtonClick(e, note.id,note.notes)}>
                                                                    <EditIcon></EditIcon>
                                                                </IconButton>
                                                                <IconButton onClick={(e)=>handleDeleteButtonClick(e, note.id)}>
                                                                    <DeleteIcon></DeleteIcon>
                                                                </IconButton>
                                                            </>
                                                            }
                                                            >
                                    <ListItemText sx={{margin: 1}}>
                                        <Typography variant="body1">{note.notes}</Typography>
                                    </ListItemText>
                                    </ListItem>)}
            </List>
            {showUpdate && <UpdateRecord show={showUpdate} existingNote={selectedNote} onCancel={handleCancelUpdate} onSubmit={handleUpdate}/>}
            {showDelete && <DeleteConfirm show={showDelete} onCancel={handleCancelDelete} onSubmit={handleDelete}/>}
        </Paper>
    )
}

export default NoteList;