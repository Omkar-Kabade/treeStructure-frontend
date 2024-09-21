import React from 'react'
import { useEffect, useState } from 'react';
import '../tree.css';
import { Link } from 'react-router-dom'


export default function Home() {
    const [treeData, setTreeData] = useState([]);
    useEffect(() => {
      fetchTreeData();
    }, []);

    useEffect(() => {
        // Initialize tree data to state when component mounts
        const mappedData = mapTree(treeData);
        setTreeData(mappedData);
      }, []);

    
  const fetchTreeData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fetchNode/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTreeData(data['data']); // Assuming the response is an array of nodes
      } else {
        console.error('Failed to fetch tree data:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while fetching tree data:', error);
    }
  };

    console.log(treeData)

    const mapTree = (treeData) => {
        let personArr = [];
        treeData.forEach((each) => {
            personArr.push(each); // Accumulate each node in personArr
            const children = each.children && JSON.parse(JSON.stringify(each.children));
            if (children && children.length) {
            personArr = personArr.concat(mapTree(children)); // Recursively map children
            }
        });
        return personArr;
    };

  return (
    <div className="tree">
      {treeRendering(treeData)}
    </div>
  )
  
}
const treeRendering = (treeData) => {
    return (
      <ul>
        {treeData.map((item) => (
          <li key={item.id} className={item.name + item.id}>
            <div><Link to={`view-member/${item.id}`}>{item.name}</Link></div>
            {item.children && item.children.length ? treeRendering(item.children) : ''}
          </li>
        ))}
      </ul>
    );
  };
