import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
      getUsers()
  }, []);

  function getUsers(){
      axios.get('http://localhost:8000/user/data', {
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          }
      })
      .then(res => {
          setUsers(res.data.data);
      })
      .catch(err => {
          console.log(err)
          if (err.response.status == 401) {
              navigate('/login?message' + encodeURIComponent('Anda belum login'));
          }
      })
  }

  const headers = [
      "#",
      "Username",
      "email",
      "Role"
  ]

  const endpointModal = {
      "data_detail": "http://localhost:8000/user/{id}",
      "delete": "http://localhost:8000/user/{id}",
      "update": "http://localhost:8000/user/{id}",
      "store": "http://localhost:8000/user",
  }

  const columnIdentitasDelete = 'username';

  const inputData = {
      "username" : {
          "tag": "input",
          "type": "text",
          "option": null
      },
      "email" : {
        "tag": "input",
        "type": "text",
        "option": null
    },
    "password" : {
      "tag": "input",
      "type": "password",
      "option": null
  },
    "role" : {
        "tag": "select",
        "type": "select",
        "option": [ "staff", "admin"] 
    },
  }

  const titleModal = 'User'

  const buttons = [
      "create",
      "trash",
      "edit",
      "delete"
  ]

  const tdColumn = {
      "username": null,
      "email": null,
      "role": null,
  }
    return (
      <Case>
        <Table headers={headers} data={users} endpoint={endpointModal} identitasColumn={columnIdentitasDelete} inputData={inputData} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn} ></Table>
    </Case>
    )       
}