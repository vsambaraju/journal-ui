import React from 'react';
import NoteList from './noteList';

function Records({records, onUpdate, onDelete}){

    const formattedRecords = new Map();
    records.forEach(record => {
        let created_date = new Date(record.created_date);
        let date = created_date.toDateString();
        if(formattedRecords.has(date)){
            let noteArray = formattedRecords.get(date);
            noteArray.push({id: record.journal_id,notes: record.notes,created_date: record.created_date})
            formattedRecords.set(date, noteArray);
        }else{
            formattedRecords.set(date,[{id: record.journal_id,notes: record.notes, created_date: record.created_date}]);
        }
    });
    return (
        <>
            {[...formattedRecords].map(entry=>{
                const [key, value] = entry;
               return  <NoteList key={key} label={key} notes={value} onUpdate={onUpdate} onDelete={onDelete}/>
            })}
        </>
    )
}

export default Records;