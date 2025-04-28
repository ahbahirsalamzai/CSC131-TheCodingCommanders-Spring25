import React from 'react';
import DashboardIcon from '../assets/element-4.svg';
import CalendarIcon from '../assets/calendar_white_small-4.png'
import { useNavigate } from 'react-router-dom';
import LoggOff from '../assets/logoff.png';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';


// this section will help protect the pages: RBAC 
import { useAuth } from '../context/AuthContext';
//RBAC^

const CLIENT_ID = "256345888442-nkne9mq5sce57c9mn80g38hp5m2bm9dd.apps.googleusercontent.com"; 
const API_KEY = "AIzaSyCDE4pb7q0WuXGzjjmDNkYtn4qS7I1xnrg"; 
const SCOPES = "https://www.googleapis.com/auth/calendar.events";



export default function TutorScheduling(){
    const navigate = useNavigate();

    //RBAC v
    const { user } = useAuth();

    useEffect(()=> {
        if (user){
        if (!user || user.role !== 'tutor'){
            localStorage.setItem('accessDenied', 'Access restricted. You do not have permission to view this page.');
            navigate('/'); // send them to home if they do not belong
        }
    }
    },[user, navigate]);
    

    //RBAC^

useEffect(() =>{
    const initClient = async () =>{
        try {
            await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            discoveryDocs:[
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
        });
        console.log("GAPI Client initialized.")
    }catch(error){
        console.error("GAPI init error:", error);
    }
    };
    gapi.load("client:auth2", initClient)
    }); 


const handleCreateEvent = async ()=>{
    const event = {
        summary: "Tutoring Sessions",
        description: "StudyHive Tutoring Session",
        start: {
            dateTime:"2025-04-16T10:00:00-07:00",
            timeZone:"America/Los_Angeles",
        },
        end: {
            dateTime: "2025-04-16T10:00:00-07:30",
            timeZone: "America/Los_Angeles",
        },
    };
    const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
    });

    request.execute((event) => {
        alert(`Event created: ${event.htmlLink}`);
    });
    };

    



    return(
        <div className="bg-gray-50 min-h-screen"> 
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        
        {/*Sidebar */}
        <aside className="hidden lg:block bg-[#E1EADF] min-h-full px-6 py-8 border-gray-300 mt-20">
            <nav className="flex flex-col justify-between h-full text-gray-800">

                {/*Navigates home as place holder */}
                <div className="space-y-4">

                    <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-white text-gray-600 px-3 py-2 rounded shadow-sm" >
                        <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5" /> 
                        <span className="text-sm font-semibold">Dashboard</span>
                </button> 

                    <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-green-900 text-white px-3 py-2 rounded shadow-sm">
                        <img src={CalendarIcon} alt="Calendar" className="w-5 h-5" />
                        <span className="text-sm font-semibold">Schedule Session</span>
                </button>
            </div>

                <button  onClick={() => navigate('/logged-out')} className="flex items-center gap-2 bg-white text-gray-600 px-3 py-2 rounded shadow-sm">
                <img src={LoggOff} alt="LogOff" className="w-5 h-5" /> 
                <span className="text-sm font-semibold">Logout</span>
                    </button>
            </nav>
        </aside>

    {/* Main Content */}
    <main className="p-4 sm:p-8">

          {/* Topbar */}
        <div className="flex justify-between items-center mb-20 mt-20">
            <div>
            <h1 className="text-2xl font-bold text-green-900">Put Up Availability</h1>
            <p className="text-gray-600 text-sm">Schedule your available tutoring sessions.</p>
            </div>
            <div className="text-right">
            <div className="text-sm font-semibold">John Doe</div>
            <div className="text-xs text-gray-500">johndoe@example.com</div>
            </div>
        </div>

        {/* tutor bio card */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">James Dupont</h2>
                    <p className="text-sm text-gray-500 mb-2">History</p>
                    <hr className="my-2" />
                    <p className="text-sm text-gray-600">
                        Experienced and dedicated tutor specializing in [subject], committed to helping Students
                        build a strong foundation and achieve their academic goals...
                    </p>
                </section>

        {/* Calendar + Time Slots */}
        <section className="bg-white  p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Date & Time</h2>
            <p className="text-sm text-gray-500 mb-4">Select the days and times you are availible</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calendar placeholder */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-500">[Calendar Component Here]</p>
                </div>
        
         {/* Calendar placeholder */}
        <div className="bg-gray-100 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                    <li> 9:00am - 10:00am</li>
                    <li> 10:15am - 11:15am</li>
                    <li> 11:30am - 12:30am</li>
                    <li> 5:00pm - 6:00pm</li>
                </ul>
            </div>
        </div>
        

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-4">
            <button className="border border-green-900 text-green-900 px-5 py-2 rounded-md">Cancel</button>
            <button onClick={handleCreateEvent} className="bg-green-900 text-white px-5 py-2 rounded-md">Confirm</button>

        </div>
    </section>
    </main>
</div>
</div>
    );
}

