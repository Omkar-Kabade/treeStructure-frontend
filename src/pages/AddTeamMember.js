import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function AddTeamMember() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [parent, setParent] = useState('');
    const [is_parent,setIsParent] = useState(false)
    const [allMembers,setAllMembers] = useState([])

    useEffect(() => {
        const fetchOptions = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/getAll/');
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            const data = await response.json(); // Assuming API returns an array of names
            setAllMembers(data['data']);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchOptions();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., sending data to the backend)
        // console.log({ memberName, memberRole, selectParent });
        e.preventDefault();
        const memberData = {
            name,
            role,
            parent,
            is_parent
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/addPerson/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Success:', data['message']);
        } catch (error) {
            alert('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <h3 className='text-center'>Add Team Member Form</h3>
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="member_name">Member Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="member_name"
                            aria-describedby="textHelp"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="role">Member Role</label>
                            <input
                            type="text"
                            className="form-control"
                            id="role"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="exampleSelect">Select Team Lead (Parent)</label>
                            <select
                            className="form-control"
                            id="exampleSelect"
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                            >
                                <option value="">Select...</option>
                                {allMembers.map((option, index) => (
                                    <option key={index} value={option.id}>
                                        {option.name} - {option.role}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group form-check mb-3">
                            <input
                            type="checkbox"
                            className="form-check-input"
                            id="is_parent"
                            checked={is_parent}
                            onChange={(e) => setIsParent(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                            Will this member lead a team?
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default AddTeamMember;
