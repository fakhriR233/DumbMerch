import React from 'react'
import Image from 'react-bootstrap/esm/Image'
import ViperMini from "../../assets/images/viper-mini.jpg"
import { home } from '../../dataDummy'
import { useParams } from 'react-router-dom'

const DetailImageCompare = () => {
  // console.log(home[0]);

  const params = useParams()

  const indx = params.id

  // console.log(indx);
  
  return (
    <div>
        <div>
            <Image src={ViperMini} style={ImgSize}/>
        </div>
    </div>
  )
}

const ImgSize = {
    width: "436px",
    height: "555px",
    objectFit: "cover"
}

export default DetailImageCompare