var Estudiant = require('./modelo/estudiant');
var Assignatura = require('./modelo/assignatura');

// Obtiene todos los objetos Persona de la base de datos
exports.getEstudiants = function (req, res){
	Estudiant.find(
		function(err, estudiant) {
			if (err)
				res.send(err)
					res.json(estudiant); // devuelve todas las Personas en JSON
				}
			);
}

// Guarda un objeto Persona en base de datos
exports.setEstudiant = function(req, res) {
		// Creo el objeto Persona
		Estudiant.create(
			{nom : req.body.nom, direccio: req.body.direccio, estudis: req.body.estudis, telefons: {casa: req.body.telefons.casa, feina: req.body.telefons.feina}},
			function(err, estudiant) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Estudiant.find(function(err, estudiant) {
				 	if (err)
				 		res.send(err)
				 	res.json(estudiant);
				});
			});
	}

// Modificamos un objeto Persona de la base de datos
exports.updateEstudiant = function(req, res){
		Estudiant.update( {_id : req.params.estudiant_id},
					{$set:{nom : req.body.nom, direccio: req.body.direccio, estudis: req.body.estudis, telefons: {casa: req.body.telefons.casa, feina: req.body.telefons.feina}},
					function(err, estudiant) {
						if (err)
							res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Estudiant.find(function(err, estudiant) {
				 	if (err)
				 		res.send(err)
				 	res.json(estudiant);
				});
			}
	});
}

// Elimino un objeto Persona de la base de Datos
exports.removeEstudiant = function(req, res) {
	Estudiant.remove({_id : req.params.estudiant_id}, function(err, estudiant) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			Estudiant.find(function(err, estudiant) {
				if (err)
					res.send(err)
				res.json(estudiant);
			});
		});
}

/////////////////////////////////////////////////////////////////
// Obtiene todos los objetos Persona de la base de datos
exports.getAssignatures = function (req, res){
	Assignatura.find(
		function(err, assignatura) {
			if (err)
				res.send(err)
					res.json(assignatura); // devuelve todas las Personas en JSON
				}
			);
}
// Obtiene detalles de una asignatura
exports.getAssignatura = function(req, res){
    Assignatura.findOne( {_id : req.params.assignatura_id},
        function(err, assignatura) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (assignatura == null){
                console.log("La assignatura no existeix!");
                res.json(assignatura);
            }
            else {
                console.log("Existeix la assignatura")
                res.json(assignatura);
            }
        });
};

// Guarda un objeto Persona en base de datos
exports.setAssignatura = function(req, res) {
		// Creo el objeto Persona
		Assignatura.create(
			{nom : req.body.nom, periode: req.body.periode },
			function(err, assignatura) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Assignatura.find(function(err, assignatura) {
				 	if (err)
				 		res.send(err)
				 	res.json(assignatura);
				});
			});
	}

// Modificamos un objeto Persona de la base de datos
exports.updateAssignatura = function(req, res){
		Assignatura.update( {_id : req.params.assignatura_id},
					{$set:{nom : req.body.nom, periode: req.body.periode },
					function(err, assignatura) {
						if (err)
							res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Assignatura.find(function(err, assignatura) {
				 	if (err)
				 		res.send(err)
				 	res.json(assignatura);
				});
			}
	});
}

// Elimino un objeto Persona de la base de Datos
exports.removeAssignatura = function(req, res) {
	Assignatura.remove({_id : req.params.assignatura_id}, function(err, assignatura) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			Assignatura.find(function(err, assignatura) {
				if (err)
					res.send(err)
				res.json(assignatura);
			});
		});
}
/////////////////////////////////////////////////////////
// Añadimos estudiante a asignatura
exports.addEstudiant = function(req, res){
    //Verificamos que el usuario existe
    Estudiant.findOne( {nom : req.body.estudiant},
        function(err, estudiant) {
            if (err) {
                res.send(err);
                Console.log(err);
                res.json(estudiant);
            }
            else if (estudiant == null){
                console.log("El usuari no existeix!");
                res.json(estudiant);
            }
            else {
                console.log("Existeix el usuario");
                console.log("Usuari:", estudiant.nom, "ID:", estudiant._id);
                //Añadimos usuario a la asignatura
                Assignatura.update( {_id : req.params.assignatura_id},
                    {$push: {estudiants : estudiant._id}},
                    function(err, assignatura) {
                        if (err)
                            res.send(err);
                        //Devuelve la asignatura actualizada
                        Assignatura.find({_id : req.params.assignatura_id},
                            function(err, assignatura) {
                            if (err)
                                res.send(err);
                                console.log("Afegit", assignatura);
                                res.json(assignatura);
                        });
                    });
            }
        });
};

//Obtener detalle estudiante
exports.getEstudiant = function(req, res) {
    Estudiant.findOne( {_id : req.params.estudiant_id},
        function(err, estudiant) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (estudiant == null){
                console.log("El usuari no existeix!");
                res.json(estudiant);
            }
            else {
                console.log("Existeix el usuario")
                res.json(estudiant);
            }
        });
};
