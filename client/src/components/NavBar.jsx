import { Link } from 'react-router-dom'
import SuddenlySpacesLogo from '../assets/SuddenlySpacesLogo.png'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

export default function NavBar() {

    const { user } = useContext(AuthContext)

    return (
        <nav className="bg-[#fbfbfb] border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/tenant" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={SuddenlySpacesLogo} className="h-8" alt="Suddenly Spaces Logo" />
            </a>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {user ? (
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
                    {user.role === 'landlord' ? (
                        <li>
                            <Link to="/landlord"><span className="text-black">Landlord Dashboard</span></Link>
                        </li>
                    ) : (<></>)    
                    }
                    <li>
                        <Link to="/tenant"><span className="text-black">Tenant Search</span></Link>
                    </li>
                </ul>
            ) : (<></>)
            }

            </div>
        </div>
        </nav>
    )
}