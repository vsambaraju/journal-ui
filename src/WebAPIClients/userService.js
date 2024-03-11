const loginUrl = 'http://localhost:4000/users/login';
const logoutUrl = 'http://localhost:4000/users/logout';
const createuserUrl = 'http://localhost:4000/users';
//const getUserByIdUrl = 'http://localhost:4000/users/{userId}';
const getJournalRecordsUrl = 'http://localhost:4000/users/{userId}/journal';
const createJournalRecordUrl = 'http://localhost:4000/users/{userId}/journal';
const updateJournalRecordUrl = 'http://localhost:4000/users/{userId}/journal/{journalId}';
const deleteJournalRecordUrl = 'http://localhost:4000/users/{userId}/journal/{journalId}';


function handleError(err){
    console.log("Error",err);
    return new Error(err.message);
}

function generateJournalUrl(url, userId, journalId){
    if(!url) return null;
    let replacedString = url;
    if(userId) replacedString = replacedString.replace('{userId}',userId);
    if(journalId) replacedString = replacedString.replace('{journalId}', journalId);
    return replacedString;
}

function createUser(userObj){
    const result = fetch(createuserUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userObj)
       });

   return result
          .then(res => res.json())
          .catch(err => handleError(err));
}

function login(userObj){
    const result = fetch(loginUrl,{
     method: 'POST',
     headers: {
         'Content-Type': 'application/json;charset=utf-8'
     },
     credentials: "include",
     body: JSON.stringify(userObj)
    });

    return result
            .then(res => res.json())
            .catch(err => handleError(err));
 }

 function logout(){
    const result = fetch(logoutUrl,{
        method: 'POST',
        credentials: "include",
    })

    return result
            .then(res => res.json())
            .catch(err => handleError(err));
 }

function getJournalRecords(userId){
    const result = fetch(generateJournalUrl(getJournalRecordsUrl,userId),{
        credentials: "include"
    })

    return result
    .then(res => res.json())
    .catch(err => handleError(err));

}

function createJournalRecord(userId,notes){
    const result = fetch(generateJournalUrl(createJournalRecordUrl,userId),{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: "include",
        body: JSON.stringify(notes)
    })

   return result
    .then(res => res.json())
    .catch(err => handleError(err));
}

function updateJournalRecord(userId, notes, journalId){
    const result = fetch(generateJournalUrl(updateJournalRecordUrl, userId, journalId),{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: "include",
        body: JSON.stringify(notes)
    })

    return result
        .then(res => res.json())
        .catch(err => handleError(err));
}

function deleteJournalRecord(userId, journalId){
    const result = fetch(generateJournalUrl(deleteJournalRecordUrl, userId, journalId),{
        method: 'DELETE',
        credentials: "include"
    })
    return result
        .then(res => res.json())
        .catch(err => handleError(err))
}

export {
    createUser,
    login,
    getJournalRecords,
    createJournalRecord,
    updateJournalRecord,
    deleteJournalRecord,
    logout
};