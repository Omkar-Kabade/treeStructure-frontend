import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function ViewAllMembers() {
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState([]);
    
      // Fetch data from an API when the component mounts
      useEffect(() => {
        const fetchCardData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/getAll/');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data['data'])

            setMemberData(data['data']);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCardData();
      }, []);

      const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this member?');
        if (confirmed) {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/deletePerson/${id}`, {
              method: 'DELETE',
            });
    
            if (response.ok) {
              setMemberData(memberData.filter(card => card.id !== id)); // Remove the deleted card from state
              alert('Member deleted successfully.');
              navigate(-1);
            } else {
              throw new Error('Failed to delete member');
            }
          } catch (error) {
            console.error('Error deleting member:', error);
            alert('Error deleting member.');
          }
        }
      };

  return (
    <div className="container mt-3">
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <div className="row">
                {memberData && memberData.map((card, index) => (
                    <div className="col-sm-3 mx-3 my-2">
                        <div className="card" style={{ width: '18rem' }} key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{card.name}</h5>
                                
                                <p className="card-text">{card.role}</p>
                                <p className="card-text">{card.is_parent}</p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Link to="/" className="btn btn-primary btn-sm">
                                            Home
                                        </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <button
                                                className="btn btn-sm btn-danger "
                                                style={{ cursor: 'pointer', float: 'right' }}
                                                onClick={() => handleDelete(card.id)}
                                            >delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="col-sm-1"></div>
        </div>
    </div>
  );
}

export default ViewAllMembers;
