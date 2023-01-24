require('dotenv').config({path: '../.env'});
const exec = require('child_process').exec;
const uri = process.env.DB_STRING_PROD
const path = require('path');
const backupPath = path.join(__dirname, '..', 'db_backup');

const backupDB = () => {
    exec(`mongodump --uri ${uri} --out=${backupPath}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Error: ${stderr}`);
            return;
        }
        console.log(`Database backed up successfully to "./backup"`);
    });
}

backupDB();
