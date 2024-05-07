import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import OnClickOut from "react-onclickoutside";

import React from 'react'

function DropDown({ hideDropDown }) {
    const { data: session } = useSession()
    const router = useRouter()
   const handleClickOutside=()=>{
    hideDropDown()
   }
   DropDown.handleClickOutside= handleClickOutside
    return (
        <div className="font-medium w-36 bg-white text-sm rounded shadow overflow-hidden border border-gray-100">
            {session && session.admin &&(
                <div className="dropdownOption border-b border-gray-200" >Dashboard
                </div>
            )}
            <div className="dropdownOption border-b border-gray-200" onClick={()=>router.push('/profile')}>Profile
            </div>
            <div className="dropdownOption border-b border-gray-200">Orders
            </div>
            <div className="dropdownOption border-b border-gray-200" onClick={()=>router.push('/about')}>Contact
            </div>
            <div className="dropdownOption border-b border-gray-200" onClick={signOut}>Logout
            </div>
        </div>
    )
}
const clickoutsideconfig={
    handleClickOutside:()=>DropDown.handleClickOutside
}
export default OnClickOut(DropDown,clickoutsideconfig)
