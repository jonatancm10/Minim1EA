var mongoose = require('mongoose');

module.exports = mongoose.model('Assignatura', {
    nom: String,
    periode: String,
    estudiants: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Estudiant'
    }]
});
