import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

const SearchBar = () => {
    const [isFilterActivated, setIsFilterActivated] = useState(false);

    const handleFilterClick = () => {
        setIsFilterActivated(!isFilterActivated);
    };

    const filterImageSrc = isFilterActivated ? 'images/FilterWhite.svg' : 'images/Filter.svg';

    return (
        <div>
            <div className="space-y-2 flex">
                <div className="flex bg-gray-200 w-11/12 m-auto rounded-xl mt-2 ml-3">
                    <img src="images/Search.svg" className="ml-3" />
                    <Input placeholder="Search or start a new chat" className="bg-transparent border-0" />
                </div>
                <div className={` rounded-full flex items-center justify-center mr-2 ml-2 ${isFilterActivated ? 'bg-primary' : ''}`}>
                    <img
                        src={filterImageSrc}
                        className='mr-3 ml-3'
                        onClick={handleFilterClick}
                    />
                </div>
                <div></div>
            </div>
        </div >
    );
}

export default SearchBar;
