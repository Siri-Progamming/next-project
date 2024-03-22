import React from "react";

const IcoDropdown: React.FC = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-lg  btn-circle btn-white avatar">
                <div className="w-32 rounded-full">
                    <img alt="User Avatar"
                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />

                </div>
            </div>
            <ul tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[2500] p-1 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Profile
                        {/*<span className="badge">New</span>*/}
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    );
}

export default IcoDropdown;
