import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import axios from 'axios';
import Table from '../components/Table';

export default function TrashInbound() {
    const [inboundsTrash, setInboundsTrash] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/inbound-stuff/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInboundsTrash(res.data.data);
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
        "stuff_id",
        "total",
        "date",
        "proff_file"
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/inbound-stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/inbound-stuff/permanent/{id}",
    }

    const inputData = {}

    const title = 'InboundStuff'

    const columnIdentitasDelete = 'stuff_id'
    
    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "stuff_id" : null,
        "total": null,
        "date": null,
        "proff_file": null,
    }

    return (
       <>
            <Case>
                <Table headers={headers} data={inboundsTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
            </Case>
       </> 
    )
}
