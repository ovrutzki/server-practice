import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Studant.css";

const Studant = () => {
  const [flag, setFlag] = useState(false);
  const [studansts, setStudants] = useState<any>([]);
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idNumber, setIdNumber] = useState<number>()
  
  useEffect(() => {
    fetch("http://localhost:8000/api/studant")
      .then((response) => response.json())
      .then((data) => {
        setStudants(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [studansts]);

  const addStudant = async (first: any, last: any, email:any, password:any) => {
    await fetch("http://localhost:8000/api/studant", {
      method: "POST",
      body: JSON.stringify({
        first: first,
        last: last,
        email:email,
        password:password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudants((studansts: any) => [data, ...studansts]);
        // setFirst("");
        // setLast("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const registerStudant = async (first:any, last:any, email:any, password:any) =>{
    console.log(first,last,email,password)
    await fetch("http://localhost:8000/api/studant/register",{
      method: "POST",
      body: JSON.stringify({
        first: first,
        last: last,
        email: email,
        password: password,
        id: new Date().getTime()
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setStudants((studansts: any) => [data, ...studansts]);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addStudant(first, last,email, password);
    setFlag(!flag);
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    registerStudant(first, last, email, password);
    setFlag(!flag);
  };


  const deleteStudant = async (studantId: number) => {
    await fetch("http://localhost:8000/api/studant", {
      method: "DELETE",
      body: JSON.stringify({_id: studantId}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setFlag(!flag);
  };

  const selectStudant = (id:number) =>{
    let item = studansts.find((studant:any) => studant._id === id);
    setFirst(item.first)
    setLast(item.last)
    setEmail(item.email)
    setPassword(item.password)
    setIdNumber(item._id)
  }
  const updateStudant = async () =>{
    let item = {first, last, idNumber, email, password};
    console.warn("item ",item)
    await fetch(`http://localhost:8000/api/studant`, {
      method: "PUT",
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({first: first, last: last, _id: idNumber, email: email, password: password})
    }).then((result)=> {
      result.json()
      .then((response) => {
        console.warn(response);
        setFlag(!flag)
      })
    })
  }
  return (
    <>
      <div id="page">
        <div id="container">
          <form >
            <label htmlFor="">
              first name
              <input
              value={first}
                onChange={(e) => setFirst(e.target.value)}
                name="first"
                type="text"
              />
            </label>
            <label htmlFor="">
              last name
              <input
              value={last}
                onChange={(e) => setLast(e.target.value)}
                name="last"
                type="text"
              />
            </label>
            <label htmlFor="">
              email
              <input
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
              />
            </label>
            <label htmlFor="">
              password
              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
              />
            </label>
            <button onClick={handleSubmit} type="button">add studant</button>
            <button onClick={handleRegister} type="button">register</button>
            <button className="update-btn" onClick={updateStudant} type="button">update data</button>
          </form>
        </div>
        <table>
          <tr>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>
            <th>password</th>
            <th>id</th>
            <th>delete</th>
          </tr>
          {studansts &&
            studansts.map((stu: any,index:number) => {
              return (
                <tr key={index}>
                  {<th>{stu.first}</th>}
                  {<th>{stu.last}</th>}
                  {<th>{stu.email}</th>}
                  {<th>{stu.password}</th>}
                  {<th>{stu._id}</th>}
                  <th>
                    <button onClick={() => deleteStudant(stu._id)}>
                      delete
                    </button>
                  </th>
                  <th>
                    <button className="update-btn" onClick={() => selectStudant(stu._id)} >
                      update
                    </button>
                  </th>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default Studant;
