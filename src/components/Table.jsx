import React, { useState } from 'react';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalAdd from './ModalAdd';
import ModalRes from './ModalRes';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import Restoration from '../pages/Restoration';


export default function Table({ headers, data, endpoint, identitasColumn, inputData, titleModal, opsiButton, columnForTd, inputRestoration, titleModalRes }) {
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndpointToSend] = useState([]);
    const [isModalEditOpen, setModalEditOpen]= useState(false);
    const [isModalAddOpen, setModalAddOpen]= useState(false);
    const [isModalResOpen, setModalResOpen]= useState(false);
    const location = useLocation(); 

    function handleModalDelete(id){
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "delete" : replaceUrlDelete,
        }

        setEndpointToSend(endpointReplaced);
        setModalDeleteOpen(true)
    }

    function handleModalEdit(id){
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "update" : replaceUrlUpdate,
        }

        setEndpointToSend(endpointReplaced);
        setModalEditOpen(true)
    }

    function handleModalAdd() {
        const endpointReplaced = {
            "store" : endpoint['store'],
        }
        setEndpointToSend(endpointReplaced);
        setModalAddOpen(true)
    }

    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }

    function handleModalRes(){
        const endpointReplaced = {
            "storeto" : endpoint['storeto'],
        }
        setEndpointToSend(endpointReplaced);
        setModalResOpen(true)
    }

    function handlePermanentDelete(id) {
        const endpointPermanentDeleted = endpoint['delete_permanent'].replace("{id}", id);
        axios.delete(endpointPermanentDeleted, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }
    


    return (
        <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end">
                    {
                        location.pathname.includes('lending') && opsiButton.includes("create") ? (
                            <button type="button" onClick={handleModalRes} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5 mr-3 rounded-lg">
                                Restoration
                            </button>
                        ) : ''
                    }
                    {   
                        opsiButton.includes("create") ? (
                            <button type="button" onClick={handleModalAdd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5 mr-3 rounded-lg">
                                Create
                            </button>
                        ) : ''
                    }
                    {
                        location.pathname.includes('user') &&opsiButton.includes("trash") ? (
                            <Link to={'/users/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5 mr-3 rounded-lg">
                                Trash
                            </Link>
                        ) : ''
                    }
                    {
                        location.pathname.includes('stuff') && opsiButton.includes("trash") ? (
                            <Link to={'/stuffs/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5 mr-3 rounded-lg">
                                Trash
                            </Link>
                        ) : ''
                    }
                </div>

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" class="px-6 py-3" key={index}>{header}</th>
                            ))}

                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(data).map(([index, item, restoration]) => (
                                <>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index) + 1}</td>
                                        {
                                            Object.entries(columnForTd).map(([key, value]) => (
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {
                                                         key == 'restoration' ? (!item[key] ? 'belum ada' : 'ada restoration') : (!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0')
                                                            
                                                        
                                                        // key = '...' ?( key['....'] == 0 ? 'bl,' : '') : ()
                                                    }
                                                {/* {!value ? restoration[key] : restoration[key.replace(/[!&*;:]/g, '')] ? restoration[key.replace(/[!&*;:]/g, '')][value] : '0'}  */}
                                                </td>
                                            ))
                                        }
                                        {/* <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category}</td>
                                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? item.stuff_stock.total_available : '0'}</td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? item.stuff_stock.total_defec : '0'}</td> */}

                                        {/* aksi  */}
                                        <td class="px-6 py-4 text-right">
                                            {
                                                opsiButton.includes("edit") ? (
                                                    <button type="button" onClick={() => handleModalEdit(item.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                                ) : ''
                                            }
                                            {
                                                opsiButton.includes("delete") ? (
                                                    <button type="button" onClick={() => handleModalDelete(item.id)} class="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                                                ) : ''
                                            }
                                            {
                                                opsiButton.includes("restore") ? (
                                                    <button type="button" onClick={() => handleRestore(item.id)} class="font-medium text-blue-600 dark:text-green-600 hover:underline ml-3">Restore</button>
                                                ) : ''
                                            }
                                            {
                                                opsiButton.includes("permanentDeletes") ? (
                                                    <button type="button" onClick={() => handlePermanentDelete(item.id)} class="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                                ) : ''
                                            }

                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setModalDeleteOpen(false)} endpoint={endpointToSend} identitasColumn={identitasColumn}></ModalDelete>

            <ModalEdit isOpen={isModalEditOpen} onClose={() => setModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalEdit>

            <ModalAdd isOpen={isModalAddOpen} onClose={() => setModalAddOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalAdd>

            <ModalRes isOpen={isModalResOpen} onClose={() => setModalResOpen(false)} endpoint={endpointToSend} inputRestoration={inputRestoration} titleModalRes={titleModalRes}></ModalRes>
        </>
    )
}
