import React, {useEffect, useState} from 'react';
import Case from '../components/Case';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';


export default function Dashboard() {
  const [stuffs, setStuffs] = useState([0]);
  const [users, setUsers] = useState([0]);
  const [checkProses, setCheckProses] = useState(false);
  const [lendingGrouped, setLendingGrouped] =useState([]);
  const [action, setAction] =useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getDataStuffs();
    getDataUsers();
    getDataLendings();
  }, [checkProses]);

  function getDataStuffs(){
    axios.get('http://localhost:8000/stuff/data',{
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        setStuffs(res.data.data)
      })
      .catch(err => {
        if(err.response.status == 401){
          navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
        }
      })
  }

  function getDataUsers(){
    axios.get('http://localhost:8000/user/data',{
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        if(err.response.status == 401){
          navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
        }
      })
  }

  function getDataLendings(){
    axios.get('http://localhost:8000/lending', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })

    .then(res => {
      const data = res.data.data;
console.log(data);
      //mengelompokan data berdasarrkan date_time

      const groupeData = {};
      data.forEach((entry) => {
        const date = new Date(entry.date_time);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // console.log(formattedDate);
        if (!groupeData[formattedDate]) {
          groupeData[formattedDate] = [];
        }
        groupeData[formattedDate].push(entry);
      });
      
      //membuat struktur array baru yang berisi date (tanggal terformat sebelumnya) dan totalstuff (total dari total_stuff)
      const processeData = Object.keys(groupeData).map((date) => ({
        date,
        totalStuff: groupeData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
      }));

      //simpan data pada state
      setLendingGrouped(processeData);
      setCheckProses(true)

      //mengubah state checkProses menjadi true untul men trigger useEffect
      
    })

    .catch(err => {
      if (err.response.status == 401){
        navigate('/login?message=' + encodeURIComponent('anda belum login!'))
      }
    })
  }
  console.log(lendingGrouped);

  return (
    <Case>
      <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                        </div>
                    </div>
                </div>

                <BarChart
                  width={500}
                  height={300}
                  data={lendingGrouped}
                  margin={{
                    top: 5,
                    right: 30,
                    left:20,
                    bottom: 5,
                  }}

                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="date"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalStuff" fill="#8884d8" activeBar= {<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
                
      </div>
    </Case>
  )
}

