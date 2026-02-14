
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom"
import { PhoneIcon } from "../SvgIcons";

const CareerHeader: React.FC = () => {
    return (
        <header className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center rounded-full bg-white px-8 py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2">
                    <div className="flex items-center font-bold text-xl text-blue-900 tracking-tight">
                        <span className="text-blue-600 mr-1">{'{'}</span>
                        Code Upscale
                        <span className="text-blue-600 ml-1">{'}'}</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link to="#" className="hover:text-black">Services</Link>
                    <Link to="#" className="hover:text-black">About Company</Link>
                    <Link to="#" className="hover:text-black">Projects</Link>
                    <Link to="#" className="hover:text-black">Blogs</Link>
                    <Link to="#" className="text-black font-semibold">Careers</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden md:block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        MVP Development
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <PhoneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CareerHeader;
