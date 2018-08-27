var express = require('express');
var noteRouter = express.Router();
var api = require('../API/notesApi');

noteRouter.post('/', api.addNoteStation);
noteRouter.get('/:date/:station', api.getNotesByFechaStation);

module.exports = noteRouter;