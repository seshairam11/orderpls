import React, { useEffect, useRef, useState } from 'react'
import { OPButton } from '../ComponentOP/OPButton'
import { OPLoader } from '../ComponentOP/OPLoader';
import { useNavigate } from 'react-router-dom';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { OPCheckBox } from '../ComponentOP/OPCheckBox';
import { OPLink } from '../ComponentOP/OPLink';
import { OPValidations } from '../CommonOP/OPValidations';
import { setlogininfo } from '../brewStore/AppState';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';


export const OPHotelLogin = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(false);

    const ctlAttribute = useRef([]);

    const navigate = useNavigate();
    const validate = OPValidations();
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();

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
                /*Ctl:Email Address : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Login ID",
                    classname: "form-control",
                    id: "txt_loginid",
                    inputtype: "text",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Registered Email, Phone, or Username",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "loginid",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Password",
                    classname: "form-control",
                    id: "txt_password",
                    inputtype: "text",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Password",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "alphanumeric",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Remember Me : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Remember Me",
                    classname: "form-check-input",
                    id: "cb_rememberme",
                    checked: true,
                },
            },
            {
                /*Ctl:Forgot Password : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Forgot Password?",
                    classname: "text-primary fw-medium link-hover",
                    id: "cb_rememberme",
                },
                to: "Forgot-password"
            },
            {
                /*Ctl:Login : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Login",
                    classname: "btn btn-primary pad-btn",
                    id: "btn_login",
                },
            },
            {
                /*Link:Sign up : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: " Sign up.",
                    classname: "text-purple link-hover",
                    id: "cb_signup",
                },
                to: "/Restuarant/Restuarant-signup"
            },
        ]
        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }

    function handleCheckBox(e) {

    }
    function fnLogin() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[1]))
        err.push(validate(ctlAttribute.current[0]))
        console.log(err);

        for (let i = 0; i < err.length; i++) {
            if (err[i].founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[err[i].arrayindex].error.errorshow = true;
                l_validate.push(err[i])
            }
        }
        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isvalidation = true;
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isfocus.focus();
            setRerender(!rerender);
        }
        else {
            setStartLoader(true);
            fnGetAuthlogin();
        }
    }

    function fnGetAuthlogin() {
        let _getLoginAuth = {
            loginID: ctlAttribute.current[0].inputvalue,
            password: ctlAttribute.current[1].inputvalue
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getLoginAuth),
            apiUrl: "/api/v1/loginrestauant",
            apikey: "LOGIN"
        };
        serverRequest(serverRequestParam);
    }
    function handleButtonClick(e) {
        const btn_id = e.target.id;
        switch (btn_id) {
            case "btn_login":
                fnLogin();
                break;

        }
    }
    useEffect(() => {
        if (startInit === true) {
            initControl();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "LOGIN":
                        fnLoginResult();
                        break;
                }
            }
        }

    }, [startInit, isLoadingApi]);

    function fnLoginResult() {
        console.log(responseData)
        if (responseData.isAuth) {
            dispatchappStore(
                setlogininfo({
                    ...getAppStoreData,
                    isloggedin: responseData.isAuth,
                    burnerid: responseData.employeeID,
                    mailID: responseData.mailID,
                    phone: responseData.phone,
                    userName: responseData.userName,
                    room: responseData.room,
                    companyName: responseData.companyName,
                    usertype: "restauant",
                }),
            );
            if (getAppStoreData.lastseen !== null) {
                let arr = getAppStoreData.lastseen.split("/").find(item => item === "restauant");
                console.log(arr)
                if (arr !== undefined) {
                    navigate(getAppStoreData.lastseen);
                } else {
                    navigate(`/${responseData.companyName}/restauant/my-profile`);
                }
            } else {
                navigate(`/${responseData.companyName}/restauant/my-profile`);
            }
        } else {
            if (responseData.message === "Wrong Password") {
                ctlAttribute.current[1].error.errorshow = true;
                ctlAttribute.current[1].error.errormsg = responseData.message;
                ctlAttribute.current[1].tooltip.isvalidation = true;
                ctlAttribute.current[1].tooltip.isfocus.focus();
            } else if (responseData.message === "LoginID didn't matched") {
                ctlAttribute.current[0].error.errorshow = true;
                ctlAttribute.current[1].error.errorshow = true;
                ctlAttribute.current[0].error.errormsg = responseData.message;
                ctlAttribute.current[0].tooltip.isvalidation = true;
                ctlAttribute.current[0].tooltip.isfocus.focus();
            }
        }
        setStartLoader(false);
    }
    return (<>
        {startLoader && (<OPLoader />)}
        {startRender && (
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className='mt-5em'></div>
                        <div className="d-flex flex-wrap w-100 vh-100 justify-content-center">
                            <div className='d-flex justify-content-center flex-wrap p-4 w-50 bg-backdrop'>
                                <div className='flex-fill'>
                                    <div className='mx-auto'>
                                        <div className='text-center mb-4'>
                                            <img
                                                src={require("../assets/img/orderpls.png")}
                                                alt="Order pls"
                                            ></img>
                                        </div>
                                        <div className='mb-4'>
                                            <h4>Restaurant</h4>
                                            <p>This page is used to Login the Registered Restaurant Account</p>
                                        </div>
                                        <div className='mb-3'>
                                            <OPTextBox
                                                ctl_Attribute={ctlAttribute.current[0]}
                                                rerender={rerender}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <OPTextBox
                                                ctl_Attribute={ctlAttribute.current[1]}
                                                rerender={rerender}
                                            />
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between mb-3'>
                                            <OPCheckBox
                                                ctl_Attribute={ctlAttribute.current[2]}
                                                handleCheckBox={handleCheckBox}
                                            />
                                            <OPLink
                                                ctl_Attribute={ctlAttribute.current[3]}
                                            />
                                        </div>
                                        <div className='d-grid mx-auto mb-3'>
                                            <OPButton
                                                ctl_Attribute={ctlAttribute.current[4]}
                                                handleButtonClick={handleButtonClick}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <h6>Not a member yet?
                                                <OPLink
                                                    ctl_Attribute={ctlAttribute.current[5]}
                                                />
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )}
    </>)
}
