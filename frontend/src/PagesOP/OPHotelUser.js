import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { setlogininfo } from '../brewStore/AppState';
import { useNavigate } from 'react-router-dom';

export const OPHotelUser = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [showSaveChanges, setShowSaveChanges] = useState(false);
    const [rerender, setRerender] = useState(true);

    const ctlAttribute = useRef([]);

    const navigate = useNavigate();
    const validate = OPValidations();
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();


    function initControl() {
        let ctlArray = [
            {
                /*txt: First Name  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Hotel Name",
                    classname: "form-control",
                    id: "txt_Restuarantname",
                    length: 20,
                    readonly: true,
                    hinttext: "Enter your Hotel Name ",
                },
                inputvalue: getAppStoreData.companyName ?? "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "alpha",
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
                    labletext: "User Name",
                    classname: "form-control",
                    id: "txt_username",
                    length: 20,
                    readonly: true,
                    hinttext: "Enter your User Name ",
                },
                inputvalue: getAppStoreData.userName ?? "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                //empty
            },
            {
                /*txt: Phone Number : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Phone Number",
                    classname: "form-control",
                    id: "num_phonenumber",
                    length: 10,
                    readonly: true,
                    hinttext: "Enter your Phone Number",
                },
                inputvalue: getAppStoreData.phone ?? "",
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
                /*txt: Email : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Email",
                    classname: "form-control",
                    id: "text-email",
                    length: 50,
                    readonly: true,
                    hinttext: "Enter your Email Address",
                },
                inputvalue: getAppStoreData.mailID ?? "",
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
                /*btn:cross : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "Cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel",
                },
            },
            {
                /*btn:cross : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Edit",
                    classname: "btn btn-primary",
                    id: "btn_edit",
                },
            },
            {
                /*btn:cross : 7*/
                arrayindex: 7,
                csstheme: {
                    labletext: "Save Changes",
                    classname: "btn btn-primary",
                    id: "btn_savechange",
                },
            }
        ]
        ctlAttribute.current = ctlArray;

        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }




    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id);
        switch (btn_id) {
            case "btn_edit":
                ctlAttribute.current[0].csstheme.readonly = false;
                ctlAttribute.current[1].csstheme.readonly = false;
                ctlAttribute.current[3].csstheme.readonly = false;
                ctlAttribute.current[4].csstheme.readonly = false;
                setShowSaveChanges(true);
                break;
            case "btn_savechange":
                fnSaveChange();
                break;
            case "btn_cancel":
                ctlAttribute.current[0].csstheme.readonly = true;
                ctlAttribute.current[1].csstheme.readonly = true;
                ctlAttribute.current[3].csstheme.readonly = true;
                ctlAttribute.current[4].csstheme.readonly = true;
                setShowSaveChanges(false);
                break;
        }
    }
    function fnSaveChange() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[4]))
        err.push(validate(ctlAttribute.current[3]))
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
            setStartLoader(true);
            fnSendData();
        }
    }
    function fnSendData() {
        console.log(getAppStoreData.burnerid)
        let _getBody = [
            { "id": getAppStoreData.burnerid },
            {
                companyName: getAppStoreData.companyName !== ctlAttribute.current[0].inputvalue ? ctlAttribute.current[0].inputvalue : undefined,
                userName: getAppStoreData.userName !== ctlAttribute.current[1].inputvalue ? ctlAttribute.current[1].inputvalue : undefined,
                phone: getAppStoreData.phone !== ctlAttribute.current[3].inputvalue ? ctlAttribute.current[3].inputvalue : undefined,
                mailID: getAppStoreData.mailID !== ctlAttribute.current[4].inputvalue ? ctlAttribute.current[4].inputvalue : undefined,
            }]

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/editrestauantprofile",
            apikey: "EDIT"
        };
        serverRequest(serverRequestParam);
    }
    useEffect(() => {
        if (startInit === true) {
            initControl();
        } else {
            if (isLoadingApi) {
                console.log(apiKey)
                switch (apiKey) {
                    case "EDIT":
                        fnEditResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    function fnEditResult() {
        if (responseData.isAuth) {
            console.log(responseData.errormsg)
            console.log(responseData.value)
            let toRedex = responseData.value
            dispatchappStore(
                setlogininfo({
                    ...getAppStoreData,
                    ...toRedex
                }),
            );
            if (toRedex.companyName) {
                navigate(`/${toRedex.companyName}/restauant/my-profile`)
            }
            ctlAttribute.current[0].csstheme.readonly = true;
            ctlAttribute.current[1].csstheme.readonly = true;
            ctlAttribute.current[3].csstheme.readonly = true;
            ctlAttribute.current[4].csstheme.readonly = true;
            setShowSaveChanges(false);
        } else {
            console.log(responseData.errormsg)
        }
        setStartLoader(false);
    }
    return (
        <>
            {startLoader && (<OPLoader />)}
            {startRender && (
                <>
                    <div className="page-wrapper">
                        <div className='content'>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <h4 className='page-title'>
                                                    My Profile
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
                                                    <h4 className='fw-semibold mb-3'>
                                                        User Detail's
                                                    </h4>
                                                    <div className='border-bottom mb-3 pb-3'>
                                                        <h5 className='fw-semibold mb-1'>
                                                            Employee Information
                                                        </h5>
                                                        <p>Provide the information below</p>
                                                    </div>
                                                    <div className="mb-3 profile-upload">
                                                        <div className="profile-upload-img">
                                                            <span>
                                                                <i className="ti ti-photo"></i>
                                                            </span>
                                                        </div>
                                                        <div className="profile-upload-content">
                                                            <label className="profile-upload-btn">
                                                                <i className="ti ti-file-broken"></i>
                                                                Upload File
                                                                <input type="file" id="img" className='input-img' />
                                                            </label>
                                                            <p>JPG, GIF or PNG. Max size of 800K</p>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[0]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[1]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[3]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[4]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 d-flex justify-content-end'>
                                                        {showSaveChanges === true &&
                                                            <>
                                                                <OPButton
                                                                    ctl_Attribute={ctlAttribute.current[5]}
                                                                    handleButtonClick={handleButtonClick}
                                                                />
                                                                <OPButton
                                                                    ctl_Attribute={ctlAttribute.current[7]}
                                                                    handleButtonClick={handleButtonClick}
                                                                />
                                                            </>
                                                        }
                                                        {showSaveChanges === false &&
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[6]}
                                                                handleButtonClick={handleButtonClick}
                                                            />}

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
