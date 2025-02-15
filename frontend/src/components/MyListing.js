    import React, { useContext, useEffect, useState } from "react";
    import Room from "./Room";
    import axios from "axios";
import { FaUser } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { UserData } from "./context/userData";
import url from "./auth/backendUrl";

    const MyListing = () => {

        const [roomArr,setRoomArr] = useState([]);
        const {userInfo} = useContext(UserData)

        useEffect(()=>{
            
            const idk = async()=>{
                try{
                    const responce = await axios.get(url+'/myListing',{
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials:true
                    })
                    //console.log(responce.data)
                    setRoomArr(responce.data)
                    console.log(responce.data)
                }catch(e){
                    console.log("not get",e)
                }
            }
            idk();
        },[])
        const imgurl = userInfo &&  userInfo.profilePicture;
return (
    <div className="sm:p-6 p-3 bg-gray-100 min-h-screen pt-24 flex flex-col justify-center items-center">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded shadow sm:w-2/3 justify-between">
            <div className="flex items-center">
                <div className="h-8 w-8 sm:h-16 sm:w-16 rounded-full flex items-center overflow-hidden bg-gray-200 mx-2  justify-center text-gray-400">
                    {userInfo && userInfo.profilePicture ?                            
                        <img src={imgurl} className="w-full h-full" alt='profile'/> :
                        <FaUser className="text-gray-500 mt-1 text-4xl" />
                    }
                </div>
            <h2 className="sm:text-xl text-md font-medium capitalize">{userInfo && userInfo.name},
                <span className="sm:text-md text-sm text-gray-700">{userInfo && " "+userInfo.age || " age"}</span>
            </h2>
            <span className="text-yellow-600 font-bold mx-2">{userInfo && userInfo.gender === 'Male'?<IoMdMale />:<IoMdFemale />}</span>
            </div>
            <div className="ml-auto font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-sm text-sm">
            Listing : {roomArr.length}
            </div>
        </div>

        {/* Listings Section */}
        <div className="mt-6 flex sm:w-2/3 flex-wrap">
            {/* Listing  */}
            {roomArr.map((value,idx)=>(
                <div key={idx} className="sm:w-1/2 p-2">
                <Room props={value} /></div>
            ))}

        </div>
    </div>
);};

    export default MyListing;
