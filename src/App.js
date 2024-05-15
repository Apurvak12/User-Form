
import './App.css';
import {Button, Container,Form,Col} from 'react-bootstrap';
import { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import Popup from './alert'
import Update from './updatealert';



function App() {
  const [userlist,setUserList]=useState([]);
  const [firstName,setFirstName]=useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [selectedData,setSelectedData] =useState();

  
  //getuser
  const getUser=async()=>{
    try{
      const response=await axios('http://localhost:3001/post');
      console.log('Response',response);
      setUserList(response.data);
    }catch(error){
    console.log(error)
    }
  }
  //postUser
  const postUser=async()=>{
    try{
     let response=await axios({
      method:'POST',
      url:'http://localhost:3001/post',
      data:{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        address:address,
      }
     })
     console.log('Response',response);
     Popup(setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPassword(""),
        setAddress(""));
      getUser();
    }catch(error){
      console.log(error)
    }
  }
    //deleteUser
  
    const deleteUser=async(post)=>{
      console.log('delete',post);
      try{
      let response=await axios({
        method:'DELETE',
        url:`http://localhost:3001/post/${post._id}`,
      })
      console.log('Response',response);
    alert('data deleted successfully');
      getUser();
      }catch(error){
        console.log(error);
      }
    }
    //updateUser
    const updateUser=async(post)=>{
      try{
        let response=await axios({
          method:'PUT',
          url:`http://localhost:3001/post/${post._id}`,
          data:{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            address:address
          }
        })
        console.log('res',response);
        Update();
        getUser();
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      if(selectedData){
        setFirstName(selectedData.firstName);
        setLastName(selectedData.lastName);
        setEmail(selectedData.email);
        setPassword(selectedData.password);
        setAddress(selectedData.address);
      }
    },[selectedData]);
 
  useEffect(()=>{
    getUser().then();
  },[]);
  return (
    <>
    <ul>
      {userlist.map((post, index) => (
     <li key={index}>

     First Name:{post.firstName}
     <br/>
     Last Name:{post.lastName}
     <br/>
     Email:{post.email}
     <br/>
     Password:{post.password}
     <br/>
     Address:{post.address}
     <br/>
     <Button variant='secondary' onClick={()=>{

       deleteUser(post)
     }}>Delete</Button>{' '}
     <Button variant='primary' onClick={()=>{
      setSelectedData(post);
     }}>edit</Button>
    
  </li>
))}

    </ul>
    <Container className='container'>
      <h3>User Form</h3>
      <div class="row">
  <div class="col">
    <Form.Label>First Name</Form.Label>
    <Form.Control type='text' value={firstName} onChange={(event=>{setFirstName(event.target.value)})} placeholder='enter your first name'/>
  </div>
  <div class="col">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type='text' value={lastName} onChange={(event=>{setLastName(event.target.value)})} placeholder='enter your last name'/>
  </div>
</div>
<div>
  <Form.Label>Email</Form.Label>
    <Form.Control type='email' value={email} onChange={(event=>{setEmail(event.target.value)})}  placeholder='xyz@gmail.com'/>
</div>
<Form.Label >
          Password
        </Form.Label>
        <Col>
          <Form.Control type="password" value={password} onChange={(event=>{setPassword(event.target.value)})} placeholder="Password" />
        </Col>
<div>
  <Form.Label className='ad' >Address</Form.Label>
  <textarea value={address} onChange={(event=>{setAddress(event.target.value)})}></textarea>
</div>
{!selectedData ?(
<Button onClick={()=>{
  postUser({
    firstName,lastName,email,password,address,
  });

}}>Submit</Button>
):(
  <Button onClick={()=>{
    updateUser(selectedData);
  }}>Update</Button>
)
}
</Container>
    </>
    
  );
}

export default App;