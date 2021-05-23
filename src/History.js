import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';

function History() {
    const [isLoading, setLoading] = useState(true);
    const [record, setRecord] = useState();

    useEffect(() => {
        console.debug("After mount! Let's load data from API...");
        axios.get("https://ip-lab.herokuapp.com/istoric/").then(response => {
          setRecord(response.data);
          setLoading(false);
        });
      }, []);

      if (isLoading) {
        return <div className="history">Table is Loading...</div>;
      }

    return (
        <div className="history">
            <table className="table">
                <thead className="table__header">
                    <tr>
                        <th>Id</th>
                        <th>Expeditor</th>
                        <th>Destinatar</th>
                        <th>Data cererii</th>
                        <th>Data plecării curierului</th>
                        <th>Data livrării</th>
                        <th>Tip echipament</th>
                        <th>Cantitate</th>
                        <th>Nume curier</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                        {record.map((recorder) => {
                            return (
                                <tr>
                                <td>{recorder.id}</td>
                                <td>{recorder.institutie_donatoare}</td>
                                <td>{recorder.institutie_primitoare}</td>
                                <td>{recorder.data_cerere}</td>
                                <td>{recorder.data_plecare_sofer}</td>
                                <td>{recorder.data_livrare}</td>
                                <td>{recorder.tip_material}</td>
                                <td>{recorder.cantitate}</td>
                                <td>{recorder.sofer}</td>
                                </tr>
                                );
                            })}
                </tbody>
            </table>
        </div>
    );
}

export default History;

/*
Functions that should have allowed to start sorting data based on a selected criteria
<form action="" className="table__sort">
                <label>Sortare după:</label>
                <select className="table__sort__select">
                    <option>Id</option>
                    <option>Nume expeditor</option>
                    <option>Nume destinatar</option>
                    <option>Data cererii</option>
                    <option>Data plecării curierului</option>
                    <option>Data livrării</option>
                    <option>Tip echipament</option>
                    <option>Cantitate</option>
                    <option>Nume curier</option>
                </select>
                <select className="table__sort__select">
                    <option>Ascendent</option>
                    <option>Descendent</option>
                </select>
            </form>
*/