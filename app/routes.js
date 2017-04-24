var asignatura = require('./modelo/assignatura');
var estudiant = require('./modelo/estudiant');
var Controller = require ('./controller.js');

module.exports = function(app) {

	// Crear un nuevo estudiante
	app.post('/api/estudiant', Controller.setEstudiant);
	// Devolver todos los estudiantes
	app.get('/api/estudiant', Controller.getEstudiants);
	// Devolver un estudiante
	app.get('/api/estudiant/:estudiant_id', Controller.getEstudiant);
	// Eliminar estudiante
	app.delete('/api/estudiant/:estudiant_id', Controller.removeEstudiant);
	//Modificar estudiant
	app.put('/api/estudiant/:estudiant_id', Controller.updateEstudiant);
////////////////////////////////////////////////////////////////////////////////
	app.post('/api/assignatura', Controller.setAssignatura);
  // Listado de asignaturas CU_1
  app.get('/api/assignatura', Controller.getAssignatures);
  // Ver detalle de una asignatura CU_3
  app.get('/api/assignatura/:assignatura_id', Controller.getAssignatura);
  // Eliminar asignatura
  app.delete('/api/assignatura/:assignatura_id', Controller.removeAssignatura);
  // Añadir alumno en asignatura CU_2
  app.post('/api/assignatura/:assignatura_id', Controller.addEstudiant);
	//Modificar estudiant
	app.put('/api/assignatura/:assignatura_id', Controller.updateAssignatura);

	// application
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});
};
