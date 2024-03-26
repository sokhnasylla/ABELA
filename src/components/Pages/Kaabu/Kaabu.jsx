import React,{useState} from 'react'
import useAuth from '../Auth/useAuth';
import Header from '../../Header/Header'
import MenuPersoEtatSup from '../MySMC/EtatSupervision/MenuPersoEtatSup';
import FormVerifNum from './FormVerifNum';
import FormVerifLogin from './FormVerifLogin';
import FormVerifNumHlr from './FormVerifNumHlr';
import FormVerifLogKaabu from './FormVerifLogKaabu';
import MenuPerso from '../../Card/MenuPerso/MenuPerso';

const kaabuItemsMenus=[

    {label:"Verification d'un numero sur simplissimo",link:"verifnumsimplissimo"},
    {label:"Verification d'un login sur simplissimo",link:"veriflogsimplissimo"},
    {label:"Verification d'un numero sur HLR",link:"verifnumhlr"},
    {label:"Verification d'un numero sur kaabu",link:"veriflogkaabu"}
];

function Kaabu() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")
  
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
  
  
  return (
    <div>
        <Header/>
        <MenuPerso propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick} />
        <div>
        {currentForm === "verifnumsimplissimo" ?<FormVerifNum/> : null}
        {currentForm === "veriflogsimplissimo" ?<FormVerifLogin/> : null}
        {currentForm === "verifnumhlr" ?<FormVerifNumHlr/> : null}
        {currentForm === "veriflogkaabu" ?<FormVerifLogKaabu/> : null}
      </div>

    </div>
  )
}

export default Kaabu