import React, { useEffect, useState } from 'react';
import Records from './records';
import AddRecord from './addRecord';
import { Typography } from '@mui/material';
import { getJournalRecords, createJournalRecord, updateJournalRecord, deleteJournalRecord } from '../WebAPIClients/userService';



function Journal({user}){

    const [records, setRecords] = useState([]);
    const {user_id,username, first_name, last_name} = user;
    
    useEffect(()=> {
        if(user_id) {
            getJournalRecords(user_id)
            .then(records => setRecords(records))
            .catch(err => console.log(err))
        }

    },[user_id])

    function handleSubmit(note){
        
       const notes = {
            notes: note
       };
       createJournalRecord(user_id,notes)
       .then(res => {
            getJournalRecords(user_id)
            .then(records => setRecords(records))
            .catch(err => console.log(err))
       })
       .catch(err => console.log(err))
       
    }


    function handleUpdate(note, noteId){
        const notes = {
            notes: note
       };
       updateJournalRecord(user_id,notes,noteId)
       .then(res => {
            getJournalRecords(user_id)
            .then(records => setRecords(records))
            .catch(err => console.log(err))
       })
       .catch(err => console.log(err))
    }

    function handleDelete(noteId){

        deleteJournalRecord(user_id, noteId)
        .then(res => {
            getJournalRecords(user_id)
            .then(records => setRecords(records))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    return(
        <>
            <Typography variant="h3" sx={{margin: 1}}>Welcome {first_name}</Typography>
            <AddRecord onSubmit={handleSubmit}/>
            {records.length > 0 && <Records records={records} userId={user_id} onUpdate={handleUpdate} onDelete={handleDelete}/>}
        </>
        
    )

}

export default Journal;