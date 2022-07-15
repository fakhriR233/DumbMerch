import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link, useParams } from 'react-router-dom';
import { home } from '../../dataDummy';

const DetailDescCompare = () => {
    const params = useParams()

    const indx = params.id

  return (
    <div>
        <div>
            <div>
                <h2 style={Styles.RedText}> Amazing Mouse</h2>
            </div>
            <div>
                <h5 style={Styles.RedText}> Stock: 600</h5>
            </div>
            <div>
                <p style={Styles.WhiteText}>
                    - Wireless Mouse
                    - Konektivitas wireless 2.4 GHz
                    - Jarak wireless hingga 10 m
                    - Plug and Play
                    - Baterai tahan hingga 12 bulan

                    Mouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. 
                    Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. 
                    Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru 
                    dan sistem operasi Chrome OS.
                </p>
            </div>
            <div style={Styles.Button}>
                <div>
                    <p style={Styles.RedText} className="text-end my-3">Rp. Much Price</p>
                </div>
                <div className='d-flex justify-content-md-end mt-auto'>
                    <Button variant="danger" className='p-2 w-100'>Buy</Button>
                    <Link to='/CompareProduct'>
                    <Button variant="warning" className='p-2 ms-2'>Compare</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

const Styles = {
    RedText: {
        color: "red"
    },
    WhiteText: {
        color: "white",
        textAlign: "justify"
    },
    Button: {
        marginTop : "178px"
    }
}

export default DetailDescCompare