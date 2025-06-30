import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { useNavigate } from 'react-router-dom';
import { OPNotification } from '../ComponentOP/OPNotification';

export const OPAddBench = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})

    const navigate = useNavigate();
    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();


    function initControl() {
        let ctlArray = [
            {
                /*txt: Menu List  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Table",
                    classname: "form-control",
                    id: "txt_bench",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter your Table ",
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
                    datatype: "alphanumeric",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Price : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Max Seats",
                    classname: "form-control",
                    id: "txt_maxseats",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter the Maximum seats",
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
                    datatype: "numeric",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*btn:cross : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Save",
                    classname: "btn btn-primary",
                    id: "btn_save",
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

            case "btn_save":
                fnSave();
                break;
        }
    }
    function fnSave() {
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
        } else {
            setStartLoader(true);
            fnSendData();
        }
    }
    function fnSendData() {
        console.log(getAppStoreData.burnerid)
        let _getBody = {
            companyName: getAppStoreData.companyName,
            labelname: ctlAttribute.current[0].inputvalue,
            maxseats: ctlAttribute.current[1].inputvalue,
            status: "open",
            showbutton: true,
            btn_values: []
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/addbench",
            apikey: "SAVE"
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
                    case "SAVE":
                        fnSaveResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    function fnSaveResult() {
        console.log(responseData)
        if (responseData.isAuth) {
            ctlNotify.current = {
                name: "Bench Added Successfully",
                title: responseData.errormsg[0].labelname,
                photo: "success"
            }
            setNotify(true);
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
                                                    Add Menu's
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
                                                            Restuarant Menu list
                                                        </h5>
                                                        <p>Adding Menu Details to Menu List</p>
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
                                                    </div>
                                                    <div className='mt-4 d-flex justify-content-end'>
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[2]}
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
