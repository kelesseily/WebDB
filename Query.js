import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './query.css';

export default function Query(){
    const [formData, setFormData] = useState({
        firstName: '',
        familyName: '',
        sex: '',
        dateOfBirth: '',
        nationalIDNumber: '',
        maritalStatus: '',
        mobileNumber: '',
        academicDegree: '',
        jobTitle: '',
        familyAddress: '',
        familyTelephone: '',
        numFamilyMembers: ''
    });

    const [fields, setFields] = useState({
        firstName: false,
        familyName: false,
        sex: false,
        dateOfBirth: false,
        nationalIDNumber: false,
        maritalStatus: false,
        mobileNumber: false,
        academicDegree: false,
        jobTitle: false,
        familyAddress: false,
        familyTelephone: false,
        numFamilyMembers: false
    });

    const [results, setResults] = useState([]);
    const [males, setMales] = useState(0);
    const [females, setFemales] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFields({ ...fields, [name]: checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/result', formData);
            setResults(response.data.persons);
            setMales(response.data.males);
            setFemales(response.data.females);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await axios.post('http://localhost:3001/result', {});
                setResults(response.data.persons);
                setMales(response.data.males);
                setFemales(response.data.females);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchPersons();
    }, []);

    return (
        <div className="query-container">
            <form className="query-form" onSubmit={handleSubmit}>
                {Object.keys(fields).map((field) => (
                    <div className="query-form-group" key={field}>
                        <input
                            type="checkbox"
                            id={`query-${field}`}
                            name={field}
                            onChange={handleCheckboxChange}
                            className="query-form-checkbox"
                        />
                        <label htmlFor={`query-${field}`} className="query-form-label">{field}</label>
                        <input
                            type={field === 'dateOfBirth' ? 'date' : 'text'}
                            id={`query-${field}`}
                            name={field}
                            onChange={handleChange}
                            disabled={!fields[field]}
                            className="query-form-input"
                        />
                    </div>
                ))}
                <button type="submit" className="query-form-button">Submit</button>
            </form>

            <div className="query-table-container">
                <table className="query-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((person, index) => (
                            <tr key={index}>
                                <td>{person.firstName} {person.familyName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="query-table-summary">Males: {males}</p>
                <p className="query-table-summary">Females: {females}</p>
            </div>
        </div>
    );
};


