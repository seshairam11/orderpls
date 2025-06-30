import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { setlogininfo } from '../brewStore/AppState';
import { useNavigate } from 'react-router-dom';
import { OPDropDown } from '../ComponentOP/OPDropDown';
import { OPNotification } from '../ComponentOP/OPNotification';

export const OPAddEmployees = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})

    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();


    function initControl() {
        let ctlArray = [
            {
                /*txt: First Name  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "User Name",
                    classname: "form-control",
                    id: "txt_username",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter the Employee User name ",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "username",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Last Name : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Email",
                    classname: "form-control",
                    id: "txt_emailid",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter the Employee Email Id",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "email",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Phone Number : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Phone no",
                    classname: "form-control",
                    id: "num_phoneno",
                    length: 10,
                    readonly: false,
                    hinttext: "Enter your Phone Number",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "phoneno",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Employee Types : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Employee Types",
                    classname: "form-control",
                    id: "sel_Employeetypes",
                    readonly: false,
                    hinttext:
                        "Select the usertype for Employee",
                },
                inputvalue: "",
                tooltip: {
                    place: "right",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "dropdown",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
                dropdata: [
                    {
                        keylistid: "11000",
                        keylistvalue: "Server"
                    },
                    {
                        keylistid: "11001",
                        keylistvalue: "Chef"
                    },
                    {
                        keylistid: '11002',
                        keylistvalue: "Casher"
                    },
                ],
            },
            {
                /*txt: Password : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Password",
                    classname: "form-control",
                    id: "text-email",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter the Employee Password",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "text",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Confirm Password : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "Confirm Password",
                    classname: "form-control",
                    id: "text-confirmpassword",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter the Employee Confirm Password",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "dropdown",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*btn:Register : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Register",
                    classname: "btn btn-primary me-2",
                    id: "btn_register",
                },
            }
        ]
        ctlAttribute.current = ctlArray;
        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }

    function checkPassword(p1, p2) {
        if (p1 === p2) {
            return true
        }
        return false;
    }


    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id);
        switch (btn_id) {
            case "btn_register":
                fnRegisterEmployee();
                break;
        }
    }
    function fnRegisterEmployee() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[5]))
        err.push(validate(ctlAttribute.current[4]))
        err.push(validate(ctlAttribute.current[3]))
        err.push(validate(ctlAttribute.current[2]))
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
        } else {
            if (checkPassword(ctlAttribute.current[4].inputvalue, ctlAttribute.current[5].inputvalue)) {
                setStartLoader(true);
                fnSendData()
            } else {
                ctlAttribute.current[4].error.errorshow = true;
                ctlAttribute.current[5].error.errorshow = true;
                ctlAttribute.current[5].error.errormsg = "Check your password";
                ctlAttribute.current[5].tooltip.isvalidation = true;
                ctlAttribute.current[5].tooltip.isfocus.focus();
            }
        }
    }
    function fnSendData() {
        let _getBody = {
            userName: ctlAttribute.current[0].inputvalue,
            mailID: ctlAttribute.current[1].inputvalue,
            phone: ctlAttribute.current[2].inputvalue,
            employeeType: ctlAttribute.current[3].inputvalue,
            password: ctlAttribute.current[4].inputvalue,
            room: getAppStoreData.room,
            companyName: getAppStoreData.companyName,
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/addemployees",
            apikey: "ADDEMP"
        };
        serverRequest(serverRequestParam);
    }

    function fnAddEmpResult() {
        console.log(responseData);
        if (responseData.isAuth) {
            ctlNotify.current.name = "Success";
            ctlNotify.current.title = responseData.errormsg;
            ctlNotify.current.photo = "success";
            ctlAttribute.current[0].inputvalue = "";
            ctlAttribute.current[1].inputvalue = "";
            ctlAttribute.current[2].inputvalue = "";
            ctlAttribute.current[3].inputvalue = "";
            ctlAttribute.current[4].inputvalue = "";
            ctlAttribute.current[5].inputvalue = "";
        } else {
            ctlNotify.current.name = "Error";
            ctlNotify.current.title = responseData.errormsg;
            ctlNotify.current.photo = "error";
            if (responseData.errormsg === "Username already registered") {

                ctlAttribute.current[0].error.errorshow = true;
                ctlAttribute.current[0].error.errormsg = responseData.errormsg;
                ctlAttribute.current[0].tooltip.isvalidation = true;
                ctlAttribute.current[0].tooltip.isfocus.focus();
            } else {
                if (responseData.errormsg === "EmailID already registered") {

                    ctlAttribute.current[1].error.errorshow = true;
                    ctlAttribute.current[1].error.errormsg = responseData.errormsg;
                    ctlAttribute.current[1].tooltip.isvalidation = true;
                    ctlAttribute.current[1].tooltip.isfocus.focus();
                } else {
                    if (responseData.errormsg === "phoneno already registered") {

                        ctlAttribute.current[2].error.errorshow = true;
                        ctlAttribute.current[2].error.errormsg = responseData.errormsg;
                        ctlAttribute.current[2].tooltip.isvalidation = true;
                        ctlAttribute.current[2].tooltip.isfocus.focus();
                    }
                }
            }
        }
        setNotify(true);
        setStartLoader(false);
    }

    useEffect(() => {
        if (startInit === true) {
            initControl();
        } else {
            if (isLoadingApi) {
                console.log(apiKey)
                switch (apiKey) {
                    case "ADDEMP":
                        fnAddEmpResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    useEffect(() => {
        if (notify) {
            const closeNotify = setInterval(() => {
                setNotify(false);
            }, 2000);
            return () => clearInterval(closeNotify);
        }
    }, [notify]);

    return (
        <>
            {startLoader && (<OPLoader />)}
            {startRender && (
                <>
                    <div className="page-wrapper">
                        <OPNotification
                            nameProps={ctlNotify.current.name}
                            titleProps={ctlNotify.current.title}
                            photoProps={ctlNotify.current.photo}
                            bool={notify}
                        />
                        <div className='content'>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <h4 className='page-title'>
                                                    Add Employee's
                                                </h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className='border-bottom mb-3 pb-3'>
                                                        <h5 className='fw-semibold mb-1'>
                                                            Employee Signup Detail's
                                                        </h5>
                                                        <p>Provide the Employee Signup Detail's</p>
                                                    </div>
                                                    <div className="border-bottom mb-3">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[0]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[1]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[2]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPDropDown
                                                                        ctl_Attribute={ctlAttribute.current[3]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[4]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[5]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 d-flex justify-content-end'>
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[6]}
                                                            handleButtonClick={handleButtonClick}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )}

        </>

    )
}
