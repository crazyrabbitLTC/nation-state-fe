import React from 'react';

const ActionBar: React.FC = () => {
    return (
        <div className="flex">
            <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">Claim </button>
            <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md">Register</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md">Create</button>
        </div>
    );
};

export default ActionBar;
