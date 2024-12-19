const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'yor name please'],
        trim: true,
        minlength: [3, 'the lange for name >3']
    },
    age: {
        type: Number,
        min: [0, 'the age >0'],
        max: [100, 'the age not !']
    },
    favoriteFoods: {
        type: [String],
        default: [],
        validate: {
            validator: function(array) {
                return array.every(item => typeof item === 'string');
            },
            message: 'your favoriteFoods please in Mongoose_und_MongoDB_VS_NodeJS_123 '
        }
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);