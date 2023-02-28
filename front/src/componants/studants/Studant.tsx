import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Studant.css";

const Studant = () => {
  const [flag, setFlag] = useState(false);
  const [studansts, setStudants] = useState<any>([]);
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
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
  }, [flag]);

  const addStudant = async (first: any, last: any) => {
    await fetch("http://localhost:8000/api/studant", {
      method: "POST",
      body: JSON.stringify({
        first: first,
        last: last,
        id: new Date().getTime(),
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addStudant(first, last);
    console.log(studansts);
    setFlag(!flag);
  };

  //   const deleteStudant = async (id:number) => {
  //     try {
  //       const res = await axios.delete(`http://localhost:8000/api/studant/${id}`)
  //       console.log('Item successfully deleted.')
  //     } catch (error) {
  //       alert(error + '  =test')
  //     }
  //   }

  const deleteStudant = async (studantId: number) => {
    await fetch("http://localhost:8000/api/studant", {
      method: "DELETE",
      body: JSON.stringify({id: studantId}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setFlag(!flag);
  };

  const selectStudant = (id:number) =>{
    let item = studansts.find((studant:any) => studant.id === id);
    setFirst(item.first)
    setLast(item.last)
    setIdNumber(item.id)
  }
  const updateStudant = async () =>{
    let item = {first, last, idNumber};
    console.warn("item ",item)
    await fetch(`http://localhost:8000/api/studant`, {
      method: "PUT",
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({first: first, last: last, id: idNumber})
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
            <button onClick={handleSubmit} type="button">add studant</button>
            <button className="update-btn" onClick={updateStudant} type="button">update data</button>
          </form>
        </div>
        <table>
          <tr>
            <th>first name</th>
            <th>last name</th>
            <th>id</th>
            <th>delete</th>
          </tr>
          {studansts &&
            studansts.map((stu: any,index:number) => {
              return (
                <tr key={index}>
                  {<th>{stu.first}</th>}
                  {<th>{stu.last}</th>}
                  {<th>{stu["id"]}</th>}
                  <th>
                    <button onClick={() => deleteStudant(stu.id)}>
                      delete
                    </button>
                  </th>
                  <th>
                    <button className="update-btn" onClick={() => selectStudant(stu.id)} >
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
