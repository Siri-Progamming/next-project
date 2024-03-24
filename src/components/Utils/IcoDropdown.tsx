import React from "react";
import {useAuth} from "../../contexts/AuthContext";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
const IcoDropdown: React.FC = () => {
    const {user} = useAuth();

    return (
        <div className="dropdown dropdown-end">

            {!user ?
                <div tabIndex={0} role="button" className="avatar placeholder btn btn-lg btn-ghost btn-circle">
                    <div className="bg-neutral text-neutral-content rounded-full">
                        <span className="text-2xl"><AccountCircleTwoToneIcon
                            className="text-[80px] text-white opacity-93"/></span>
                    </div>
                </div>
                :
                <div tabIndex={0} role="button" className="btn btn-lg  btn-circle btn-white avatar">
                    <div className="w-32 rounded-full">
                        <img alt="User Avatar"
                             src="/avatar2.jfif"/>
                    </div>
                </div>}
            <ul tabIndex={1}
                className={`collapsible-element menu menu-sm dropdown-content mt-3 z-[2500] p-2 shadow bg-base-100 rounded-box w-52`}>
                {!user ? <IcoDropdownOffList /> : <IcoDropdownOnList/>}
            </ul>
        </div>
);
}
export default IcoDropdown;

const IcoDropdownOffList: React.FC = () => {
    return (
        <>
            <li><a>Connexion</a></li>
            <li><a>Inscription</a></li>
        </>
    );
}
const IcoDropdownOnList: React.FC = () => {
    const {logout} = useAuth();
    return (
        <>
            <li>
                <a className="justify-between">
                    Profile
                    {/*<span className="badge">New</span>*/}
                </a>
            </li>
            <li><a onClick={logout}>Déconnexion</a></li>
        </>
    );
}