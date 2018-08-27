var express = require('express');
var noteRouter = express.Router();
var api = require('../API/notesApi');

noteRouter.post('/', api.addNoteStation);
noteRouter.get('/:date/:station', api.getNotesByFechaStation);
noteRouter.get('/:station', api.getNotesByStation);
noteRouter.delete('/:idNote', api.deleteNote);

module.exports = noteRouter;