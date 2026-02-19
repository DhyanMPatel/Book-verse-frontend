import React from 'react'
import FooterView from './footerView'
import { useLocation } from 'react-router-dom';

const FooterContainer = () => {
  const location = useLocation();
    const pathname = location.pathname;
  return (
    <>
     <FooterView pathname={pathname}/> 
    </>
  )
}

export default FooterContainer
