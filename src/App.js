import { useEffect, useState } from 'react';
import { db } from './firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import './App.css';

 function App() {

  const [users,setUsers] = useState([]);
  const [age,setAge] = useState('');

  const user = "User" + Math.floor(Math.random() * 100)





  useEffect( () => {

    const getData =async ()=>{

      /* const querySnapshot = await getDocs(collection(db,"users"))
      console.log(querySnapshot);
      querySnapshot.forEach((doc)=> console.log(`${doc.id}=>${doc.data().Users}`))
       const currentUsers = querySnapshot.docs.map((doc)=>{

        const obj = {
          id: doc.id,
          ...doc.data()
        };
        return obj

      });
      console.log(currentUsers);
      setUsers(currentUsers)  */
      onSnapshot(collection(db,"users"), collection=>{

        const currentUsers=collection.docs.map((doc)=>{

          const obj = {
            id: doc.id,
            ...doc.data()
          };
          return obj
  
        }) ;

      

        
        setUsers(currentUsers)
      })
      /* console.log(querySnapshot); */
      /* querySnapshot.forEach((doc)=> console.log(`${doc.id}=>${doc.data().Users}`)) */
      /* const currentUsers2 = querySnapshot.docs.map((doc)=>{

        const obj = {
          id: doc.id,
          ...doc.data()
        };
        return obj

      }); */
    }
    getData()
  
  }, []);


   const handleSubmit =(event)=>{
     event.preventDefault();
     const newUser ={
       name: user,
       age:`età attuale:${age}`
     }
     addDoc(collection(db,"users"),newUser)
     console.log(newUser)
   }

  return (
    <div className="App">
        <h1>Learning Firebase</h1>

        <form onSubmit={handleSubmit} >
          <input type="number" value={age} onChange={(e)=> setAge(e.target.value) } />
        </form>
        <ul>
          {users.map((user,index)=>
          (<li key={index}>
            <h2>{user.name}</h2>
            <h2>{user.age}</h2>
          </li>
          ))}
        </ul>
    </div>
  );
}

export default App;