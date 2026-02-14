
import { SearchIconSolid, ChevronDownIconSolid } from '../Common/SvgIcons';

interface JobFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
}

const JobFilter: React.FC<JobFilterProps> = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-12 border-b border-gray-200 pb-4">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIconSolid className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border-none leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="relative w-full md:w-64">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-none focus:outline-none focus:ring-0 sm:text-sm rounded-md bg-transparent font-medium text-gray-700 cursor-pointer"
                    style={{ backgroundImage: 'none' }} // hide default arrow if custom one is used, but here simpler to just use default
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDownIconSolid className="fill-current h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default JobFilter;
