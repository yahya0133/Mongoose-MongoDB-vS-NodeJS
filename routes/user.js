const Person = require('/user');

//  creat new person 
exports.createPerson = async (req, res) => {
    try {
        const person = await Person.create(req.body);
        res.status(201).json({
            success: true,
            data: person
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// creat many person
exports.createManyPeople = async (req, res) => {
    try {
        const people = await Person.create(req.body);
        res.status(201).json({
            success: true,
            count: people.length,
            data: people
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// serch person
exports.findPeople = async (req, res) => {
    try {
        const { name, food, age } = req.query;
        let query = {};

        if (name) query.name = name;
        if (food) query.favoriteFoods = food;
        if (age) query.age = age;

        const people = await Person
            .find(query)
            .sort({ name: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: people.length,
            data: people
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// updete person
exports.updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findById(id);

        if (!person) {
            return res.status(404).json({
                success: false,
                error: ' the user is not fund '
            });
        }

        // add food
        if (req.body.newFood) {
            person.favoriteFoods.push(req.body.newFood);
            person.markModified('favoriteFoods');
        }

    // updete person
        Object.assign(person, req.body);

        const updatedPerson = await person.save();

        res.status(200).json({
            success: true,
            data: updatedPerson
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

//  delete Person
exports.deletePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                error: ' the person not found'
                            });
        }

        res.status(200).json({
            success: true,
            message: 'the delate succeeded'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// the sershe...
exports.advancedSearch = async (req, res) => {
    try {
        const result = await Person
            .find({ favoriteFoods: 'burrito' })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec();

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};