const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema ({
    firstName: { type: String },
    familyName: { type: String },
    sex: { type: String },
    dateOfBirth: { type: Date },
    nationalIDNumber: { type: String },
    maritalStatus: { type: String },
    mobileNumber: { type: String },
    academicDegree: { type: String },
    jobTitle: { type: String }
})

const getPersonsByAddress = async (address) => {
    try {
        const users = await User.find({ address });
        const count = users.length;
        const names = users.map(user => user.username);
        return { count, names };
    } catch (error) {
        console.error('Error fetching users by address:', error);
        throw error;
    }
};

// Function to get total number of males and females
const getGenderCount = async () => {
    try {
        const males = await User.countDocuments({ gender: 'male' });
        const females = await User.countDocuments({ gender: 'female' });
        return { males, females };
    } catch (error) {
        console.error('Error counting users by gender:', error);
        throw error;
    }
};

// Function to get total number and names of individuals living in the same city/governorate
const getPersonsByLocation = async (city, governorate) => {
    try {
        const users = await User.find({ city, governorate });
        const count = users.length;
        const names = users.map(user => user.username);
        return { count, names };
    } catch (error) {
        console.error('Error fetching users by location:', error);
        throw error;
    }
};

// Function to get number and names of persons having a particular birth date
const getPersonsByBirthDate = async (birthDate) => {
    try {
        const users = await User.find({ birthDate });
        const count = users.length;
        const names = users.map(user => user.username);
        return { count, names };
    } catch (error) {
        console.error('Error fetching users by birth date:', error);
        throw error;
    }
};

// Function to get number and names of citizens having a certain academic degree
const getPersonsByAcademicDegree = async (academicDegree) => {
    try {
        const users = await User.find({ academicDegree });
        const count = users.length;
        const names = users.map(user => user.username);
        return { count, names };
    } catch (error) {
        console.error('Error fetching users by academic degree:', error);
        throw error;
    }
};

module.exports = {
    getPersonsByAddress,
    getGenderCount,
    getPersonsByLocation,
    getPersonsByBirthDate,
    getPersonsByAcademicDegree
};


const PersonModel = mongoose.model("Persons",PersonSchema)
module.exports = PersonModel