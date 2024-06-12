import React, { useEffect, useState} from 'react';
import Case from '../components/Case';
import Table  from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    // const [lendings, setLendings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getStuffs();
        getLendings();
    }, []);

    function getStuffs(){
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }

    function getLendings(){
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
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }

    // Menggabungkan data lending ke dalam data stuff
    // const enhancedStuffs = stuffs.map(stuff => {
    //     const relatedLendings = lendings.filter(lending => lending.stuff_id === stuff.id);
    //     return {
    //         ...stuff,
    //         total_stuff: relatedLendings.length
    //     };
    // });

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Total Lending"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/{id}",
        "update": "http://localhost:8000/stuff/{id}",
        "store": "http://localhost:8000/stuff",
    };

    const columnIdentitasDelete = 'name';

    const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["KLN", "HTL", "Teknisi/Sarpras"]
        },
    };

    const titleModal = 'Stuff';

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete"
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",
        "lending": "total_stuff"
 
    };
    

    return (
        <Case>
            <Table
                headers={headers}
                data={stuffs}
                endpoint={endpointModal}
                identitasColumn={columnIdentitasDelete}
                inputData={inputData}
                titleModal={titleModal}
                opsiButton={buttons}
                columnForTd={tdColumn}
            />
        </Case>
    );
}
