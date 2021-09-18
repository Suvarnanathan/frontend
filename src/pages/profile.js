import React, { useContext, useEffect, useState } from 'react'
import ApplicantResume from './dashboard-applicants/[userId]';
import SidebarDashboard from "../components/SidebarDashboard";
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';
export default function profile() {  
    const gContext = useContext(GlobalContext);
    return (
        <>
         <Header isDark={gContext.headerDark} />
            <SidebarDashboard />
         <ApplicantResume isProfile={true}/>
        </>
    )
}
 