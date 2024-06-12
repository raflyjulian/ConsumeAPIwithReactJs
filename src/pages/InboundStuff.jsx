import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InboundStuff() {
    const [ inbound, setInbound] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getInbound()
    }, []);

    function getInbound(){
        axios.get('http://localhost:8000/inbound-stuff/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbound(res.data.data);
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
        "Stuff_id",
        "Total",
        "Date",
        "Proff_file"
    ]

    const endpointModal = {
        // "data_detail": "http://localhost:8000/inbound-stuff/detail/{id}",
        // "delete": "http://localhost:8000/inbound-stuff/delete/{id}",
        // "update": "http://localhost:8000/inbound-stuff/upadate/{id}",
        // "store": "http://localhost:8000/inbound-stuff",
        "delete_permanent": "http://localhost:8000/inbound-stuff/permanent/{id}",
    }

    const columnIdentitasDelete = 'stuff_id';

    const inputData = {
        // "stuff_id" : {
        //     "tag": "input",
        //     "type": "text",
        //     "option": null
        // },
        // "total" : {
        //     "tag": "input",
        //     "type": "text",
        //     "option": null
        // },  
        // "date" : {
        //     "tag": "input",
        //     "type": "date",
        //     "option": null
        // },
        // "proff_file" : {
        //     "tag": "input",
        //     "type": "file",
        //     "option": null
        // },
    }

    const titleModal = 'InboundStuff'

    const buttons = [
        // "create",
        // "trash",
        // "edit",
        // "delete"
        "permanentDeletes",
    ]

    const tdColumn = {
        "stuff_id": null,
        "total": null,
        "date": null,
        "proff_file": null
    }

    return (
    <Case>
        <Table headers={headers} data={inbound}  endpoint={endpointModal} identitasColumn={columnIdentitasDelete} inputData={inputData} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn} ></Table>
    </Case>
    )
    }
