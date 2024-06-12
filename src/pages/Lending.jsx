import React, { useEffect, useState,} from 'react';
import Case from '../components/Case';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Lending() {
    const [lendings, setLendings] = useState([]);
    const [users, setUsers] = useState([]);
    // const [restorations, setRestorations] = useState([]);
    const [loadingUsers,setLoadingUsers]=useState(false)
    const [loadingLendings,setLoadingLendings]=useState(false)
  
    const navigate = useNavigate();

    useEffect(() => {
        getLendings();
        getUsers()
        // getRestorations()

    }, []);

    function getLendings(){
        setLoadingLendings(true)
        axios.get('http://localhost:8000/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setLendings(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login'));
            }
        })
        .finally(()=>{
            setLoadingLendings(false)
        })
    }
    
    function getUsers(){
        setLoadingUsers(true)
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
            
        })
        .finally(()=>{
            setLoadingUsers(false)
        })
    }
    const headers = [
        "#",
        "Name Stuff",
        "Username",
        "Waktu",
        "Name",
        "Notes",
        "Total Stuff",
        "restoration"
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/lending/{id}",
        "delete": "http://localhost:8000/lending/delete/{id}",
        "update": "http://localhost:8000/lending/update/{id}",
        "store": "http://localhost:8000/lending/store",
        "storeto": "http://localhost:8000/restoration/store",

    }


    const columnIdentitasDelete = 'stuff_id';

    const inputData = {
        "stuff_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "user_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date_time" : {
            "tag": "input",
            "type": "datetime-local",
            "option": null
        },
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null, 
        },
        "notes" : {
            "tag": "input",
            "type": "text",
            "option": null, 
        },
        "total_stuff" : {
            "tag": "input",
            "type": "text",
            "option": null, 
        },
    }
// console.log('users',users)
// console.log('lendings',lendings)
    const inputRestoration = {
        "user_id" : {
            "tag": "select",
            "type": "select",
            "option": users
        },
        "lending_id" : {
            "tag": "select",
            "type": "select",
            "option": lendings
        },
        "total_good_stuff" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total_defec_stuff" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date_time" : {
            "tag": "input",
            "type": "datetime-local",
            "option": null
        },
    };

    const titleModal = 'Lending'
    const titleModalRes = 'Restoration';

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "stuff": "name",
        "user": "username",
        "date_time": null,
        "name": null,   
        "notes": null,
        "total_stuff": null,
        "restoration":"id"
    }

    return (
        <Case>
            <Table 
                    headers={headers} 
                    data={lendings} 
                    endpoint={endpointModal} 
                    identitasColumn={columnIdentitasDelete} 
                    inputData={inputData} 
                    titleModal={titleModal} 
                    opsiButton={buttons} 
                    columnForTd={tdColumn} 
                    inputRestoration={inputRestoration}
                    titleModalRes={titleModalRes}
            />
            
      </Case>
      )
}