const express = require('express')
const app = express()
app.use(express.json())

var cors = require('cors');
app.use(cors());

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://karimelesseily:JhkF1ZiFINvyx3gw@cluster0.5nz8h57.mongodb.net/webDB?retryWrites=true&w=majority&appName=Cluster0")

const PersonModel = require("./model/Persons")

const UserModel = require('./model/User');

const RoleModel = require('./model/Role');

const FamilyModel = require('./model/Family');

app.get("/role", async (req, res) => {
    const role = await RoleModel.find();
    res.json(role);
});

app.get('/countUsers', async (req, res) => {
    try {
        const count = await UserModel.countDocuments({});
        res.status(200).send({ success: true, count });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error counting users' });
    }
});

app.get("/persons", async (req,res)=>{
    const persons = await PersonModel.find()
    res.json(persons)
})

app.post("/insert", async (req,res)=>{
    const person = req.body; 
    const newPerson = new PersonModel(person)
    await newPerson.save()

    res.json(person)
})

app.post("/family", async (req,res)=>{
  const family = req.body; 
  const newFamily = new FamilyModel(family)
  await newFamily.save()

  res.json(family)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await UserModel.findOne({ username, password });

      if (user) {
          if (user.role === 'Admin') {
              return res.status(200).json({ message: 'Welcome Admin', redirect: '/admin' });
          } else if (user.role === 'Query employee') {
              return res.status(200).json({ message: 'Welcome Employee', redirect: '/query' });
          } else if (user.role === 'Data entry representative') {
              return res.status(200).json({ message: 'Welcome Employee', redirect: '/form' });
          } else {
              return res.status(403).json({ message: 'Unauthorized role' });
          }
      } else {
          return res.status(401).json({ message: 'Wrong credentials' });
      }
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/result', async (req, res) => {
  try {
      const {
          firstName, familyName, sex, dateOfBirth, nationalIDNumber,
          maritalStatus, mobileNumber, academicDegree, jobTitle,
          familyAddress, familyTelephone, numFamilyMembers
      } = req.body;

      const queryIndividual = {};
      const queryFamily = {};

      if (firstName) queryIndividual.firstName = firstName;
      if (familyName) {
          queryIndividual.familyName = familyName;
          queryFamily.familyName = familyName; 
      }
      if (sex) queryIndividual.sex = sex;
      if (dateOfBirth) queryIndividual.dateOfBirth = dateOfBirth;
      if (nationalIDNumber) queryIndividual.nationalIDNumber = nationalIDNumber;
      if (maritalStatus) queryIndividual.maritalStatus = maritalStatus;
      if (mobileNumber) queryIndividual.mobileNumber = mobileNumber;
      if (academicDegree) queryIndividual.academicDegree = academicDegree;
      if (jobTitle) queryIndividual.jobTitle = jobTitle;
      if (familyAddress) queryFamily.familyAddress = familyAddress;
      if (familyTelephone) queryFamily.familyTelephone = familyTelephone;
      if (numFamilyMembers) queryFamily.numFamilyMembers = numFamilyMembers;

    
      const families = await FamilyModel.find(queryFamily);

      const familyNames = families.map(family => family.familyName);

      if (familyNames.length > 0) {
          queryIndividual.familyName = { $in: familyNames };
      }

      const persons = await PersonModel.find(queryIndividual);

      const males = persons.filter(person => person.sex === 'male').length;
      const females = persons.filter(person => person.sex === 'female').length;

      res.json({ persons, families, males, females }); 
  } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const newUser = new UserModel({ username, password, role });
    await newUser.save();
    res.json({ message: 'User registered successfully', user: newUser });
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await UserModel.findByIdAndDelete(userId);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
      const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
      res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});



app.listen("3001", ()=>{
    console.log("Server working...")
})