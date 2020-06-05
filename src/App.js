import React, { useEffect, useState } from 'react';
import { database } from './firebase.js';
import logo from './logo.svg';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const itemsRef = database.ref('/');
    itemsRef.on('value', snapshot => {
      let members = Object.values(snapshot.val())[0].members;
      console.log('snapshot values, son', members)
      setMembers(members)
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {
          members.map(member => {
            return (
              <div key={member.id}>
                {member.name} is {member.isCool ? 'cool' : 'not cool'}
              </div>
            )
          })
        }
      </header>
    </div>
  );
}

export default App;
