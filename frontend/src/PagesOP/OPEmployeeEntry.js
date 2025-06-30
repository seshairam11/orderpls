import React, { useEffect, useRef, useState } from 'react'
import { OPButton } from '../ComponentOP/OPButton'
import { OPLoader } from '../ComponentOP/OPLoader';
import { useNavigate } from 'react-router-dom';
import { setlogininfo } from '../brewStore/AppState';
import { useDispatch, useSelector } from 'react-redux';

export const OPEmployeeEntry = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);

    const ctlAttribute = useRef([]);

    const navigate = useNavigate();
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    function initControl() {
        dispatchappStore(
            setlogininfo({
                ...getAppStoreData,
                isloggedin: false,
                burnerid: 0,
            })
        );
        let ctl_array = [
            {
                /*Ctl:Hotels : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Login",
                    classname: "btn btn-primary",
                    id: "btn_login",
                },
            },
            {
                /*Ctl:Hotels : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Sign up",
                    classname: "btn btn-secondary",
                    id: "btn_signup",
                },
            },
        ]
        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }

    function handleButtonClick(e) {
        const btn_id = e.target.id;
        switch (btn_id) {
            case "btn_login":
                navigate("employee-login")
                break;
            case "btn_signup":
                navigate("employee-signup")
                break;
        }
    }
    useEffect(() => {
        if (startInit == true)
            initControl();
    }, [startInit]);
    return (<>
        {startLoader && (<OPLoader />)}
        {startRender && (
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className='mt-5em'></div>
                        <div className="d-flex flex-wrap w-100 vh-100 justify-content-center">
                            <div className='d-flex justify-content-center flex-wrap overflow-auto p-4 w-50 bg-backdrop'>
                                <form action='index.html' className='flex-fill'>
                                    <div className='mx-auto'>
                                        <div className='text-center mb-4'>
                                            <img
                                                src={require("../assets/img/logo.png")}
                                                alt="Order pls"
                                            ></img>
                                        </div>
                                        <div className='mb-4'>
                                            <h4>Employee</h4>
                                            <p>This is a Page for Employee's </p>
                                        </div>
                                        <div className='d-grid mx-auto'>
                                            <OPButton
                                                ctl_Attribute={ctlAttribute.current[0]}
                                                handleButtonClick={handleButtonClick}
                                            />
                                        </div>
                                    </div>
                                    <p className='subtitle-entry'>Click here, If you are have a already been Registered your hotel</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )}
    </>)
}
