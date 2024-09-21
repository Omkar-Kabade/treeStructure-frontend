import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewMember() {
    const { id } = useParams(); // Get ID from the URL
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [parent, setParent] = useState('');
    const [is_parent, setIsParent] = useState(false);
    const [allMembers, setAllMembers] = useState([]);

    // Fetch the data for the particular member by ID
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getPerson/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch member data');
                }
                const data = await response.json();
                setName(data['data'].name);
                setRole(data['data'].role);
                setParent(data['data'].parent); // Assuming 'parent' is part of the data
                setIsParent(data['data'].is_parent);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };

        if (id) {
            fetchMemberData(); // Only fetch if there is an ID (for edit mode)
        }
    }, [id]);

    // Fetch all members for the select dropdown
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/getAll/');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json(); // Assuming API returns an array of members
                setAllMembers(data['data']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOptions();
    }, []);

    // Handle form submission for update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const memberData = {
            name,
            role,
            parent,
            is_parent
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updatePerson/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Member updated successfully');
            navigate(-1); // Go back to the previous page after updating
        } catch (error) {
            alert('Error updating member:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <h3 className="text-center">{id ? 'Edit Team Member' : 'Add Team Member'}</h3>
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="member_name">Member Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="member_name"
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
                                {allMembers.map((option) => (
                                    <option key={option.id} value={option.id}>
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
                            <label className="form-check-label" htmlFor="is_parent">
                                Will this member lead a team?
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default ViewMember;
