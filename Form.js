import { useState, useEffect } from "react";
import Axios from "axios";
import "./form.css";

export default function Form() {

  const [persons, setPersons] = useState([]) 
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationalIDNumber, setNationalIDNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [academicDegree, setAcademicDegree] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  const [familyName,  setFamilyName] = useState("");
  const [familyAddress, setFamilyAddress] = useState("");
  const [familyTelephone, setFamilyTelephone] = useState("");
  const [numFamilyMembers, setNumFamilyMembers] = useState("");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Axios.get("http://localhost:3001/persons");
      setPersons(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
  const insert = () => {
    Promise.all([
      
      Axios.post("http://localhost:3001/family", {
        familyName: familyName,
        familyAddress: familyAddress,
        familyTelephone: familyTelephone,
        numFamilyMembers: numFamilyMembers
      }),
      Axios.post("http://localhost:3001/insert", {
        firstName: firstName,
        familyName: lastName,
        sex: sex,
        dateOfBirth: dateOfBirth,
        nationalIDNumber: nationalIDNumber,
        maritalStatus: maritalStatus,
        mobileNumber: mobileNumber,
        academicDegree: academicDegree,
        jobTitle: jobTitle
      })
      
    ])
    .then(([familyRes, personRes]) => {

      if (familyRes.data.success && personRes.data.success) {
        alert("Info inserted");
        alert("Family info inserted");
      } else {
        console.error("Error: One or both insertions failed");
      }
    })
    .catch(error => {
      console.error("Error inserting data:", error);
    });
  };
  
  

  return (
    <div className="container">
    <div className="form">
      <form class="form">
      <div class="center">
        <label>
          First Name:
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
              Family Name:
              <input
                type="text"
                placeholder="Enter family name"
                onChange={(e) => {setFamilyName(e.target.value); setLastName(e.target.value);}}
              />
            </label>
            <br />
        <label>Gender:
                <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
              </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <label>
          National ID Number:
          <input
            type="text"
            placeholder="Enter your national ID number"
            onChange={(e) => setNationalIDNumber(e.target.value)}
          />
        </label>
        <br />
        <label>Marital Status:</label>
                <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}>
                    <option value="" disabled>Select marital status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                </select>
        <br />
        <label>
          Mobile Number:
          <input
            type="tel"
            placeholder="Enter your mobile number"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label>
        <br />
        <label>Academic Degree:
                <select
                    value={academicDegree}
                    onChange={(e) => setAcademicDegree(e.target.value)}
                    required
                >
                    <option value="" disabled>Select academic degree</option>
                    <option value="highschool">High School</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                </select>
        </label>
        <br />
        <label>
          Job Title:
          <input
            type="text"
            placeholder="Enter your job title"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </label>
        <br />
        
        

      </div>
      <div className="center">
            
            <label>
              Family Address:
              <input
                type="text"
                placeholder="Enter family address"
                value={familyAddress}
                onChange={(e) => setFamilyAddress(e.target.value)}
              />
            </label>
            <br />
            <label>
              Family Telephone:
              <input
                type="tel"
                placeholder="Enter family telephone"
                value={familyTelephone}
                onChange={(e) => setFamilyTelephone(e.target.value)}
              />
            </label>
            <br />
            <label>
              Number of Family Members:
              <input
                type="number"
                placeholder="Enter number of family members"
                value={numFamilyMembers}
                onChange={(e) => setNumFamilyMembers(e.target.value)}
              />
            </label>
          </div>
          <br />
        <button type="submit" onClick={insert}>Submit</button>
    </form>
    </div>
    </div>
    
  );
}


