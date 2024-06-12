import React from 'react'

export default function Card(props) {

    const {nama, rombel, rayon}=props;
    return (
        <>
            <div
                style={{
                    width: '500px',
                    height: 100,
                    border: '3px solid grey',
                    borderRadius: 15    
                }}
            >
                {/* ini cara mennggunakan props children */}
                {/* {props.children} */}

                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{props.nama}</td>
                </tr>
                <tr>
                    <td>rombel</td>
                    <td>:</td>
                    <td>{props.rombel}</td>
                </tr>
                <tr>
                    <td>rayon</td>
                    <td>:</td>
                    <td>{props.rayon}</td>
                </tr>
            </div>
        </>
    )
}
