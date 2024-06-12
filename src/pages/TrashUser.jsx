import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import axios from 'axios';
import Table from '../components/Table';

export default function TrashUser() {
    const [usersTrash, setUsersTrash] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/user/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUsersTrash(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('Anda Belum login'));
            }
        })
    }, [])

    const headers = [
        "#",
        "Username",
        "Email",
        "Role"
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/user/restore/{id}",
        "delete_permanent": "http://localhost:8000/user/permanent/{id}",
    }

    const inputData = {}

    const title = 'User'

    const columnIdentitasDelete = 'username'
    
    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "username" : null,
        "email": null,
        "role": null,
    }

    return (
       <>
            <Case>
                <Table headers={headers} data={usersTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
            </Case>
       </> 
    )
}
