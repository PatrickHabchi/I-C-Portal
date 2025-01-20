import React, { useEffect } from 'react'
import HeaderComponent from '../../components/HeaderComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveButton } from '../../app/DigitalI&CAccountSlice';
import ICTable from './I&CTable';
import '../../utils/Style/pages/I&CTable.scss'
import DigitalICAccountDetails from './DigitalICAccountDetails.js';


function DigitalICAccount() {


    const activeButton = useSelector((state) => state.digitalICaccount.activeButton);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveButton("I&C Table"));
    }, [])


  return (
    <>
    <HeaderComponent title={"Digital I&C Accounts"}/>
    
    <div className='DigitalICAccount'>

        {activeButton === "I&C Table" && (
            <ICTable />
        )}
        {activeButton === "Digital I&C Account Details" && (
          <DigitalICAccountDetails/>
        )}
    </div>
    
    </>
  )
}

export default DigitalICAccount;