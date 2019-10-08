const express = require('express');
const xss = require('xss');

const FoldersService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

//serialize folder in case of xss attacks
const serializeFolder = folder => ({
    folder_id: folder.folder_id,
    folder_name: xss(folder.folder_name),
    date_created: folder.date_created
})

//CRUD routes for a folder
foldersRouter
 .route('/')
 .get((req, res, next) => {
     const knexInstance = req.app.get('db');
     FoldersService.getAllFolders(knexInstance)
      .then(folders => {
          res.json(folders.map(serializeFolder))
      })
      .catch(next)
 })

 module.exports = foldersRouter