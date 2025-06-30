import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { setlogininfo } from "../brewStore/AppState";


export const OPNightModeToggle = () => {
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme', getAppStoreData.usertheme);
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        dispatchappStore(
            setlogininfo({
                ...getAppStoreData,
                usertheme: theme
            }));
    }, [theme]);

    const handleOnClick = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    return (
        <NavLink to="#" id="dark-mode-toggle" className="dark-mode-toggle" onClick={handleOnClick}>
            {({ isActive }) => (
                <>
                    <i className={theme === "light" ? "ti ti-sun light-mode active" : "ti ti-sun light-mode"}></i>
                    <i className={theme === "dark" ? "ti ti-moon dark-mode active" : "ti ti-moon dark-mode"}></i>
                </>
            )}
        </NavLink>
    )
}
