import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { OPTextBox } from '../ComponentOP/OPTextBox';

export const OPEmployeeUser = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);

    const ctlAttribute = useRef([]);

    const validate = OPValidations();
    function initControl() {
        let ctlArray = [
            {
                /*txt: First Name  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "First Name",
                    classname: "form-control",
                    id: "txt_firstname",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter your First Name ",
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
                    labletext: "Last Name",
                    classname: "form-control",
                    id: "txt_lastname",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter your Last Name ",
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
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: User Name : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "User Name",
                    classname: "form-control",
                    id: "txt_username",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter your User Name",
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
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Phone Number : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Phone Number",
                    classname: "form-control",
                    id: "num_phonenumber",
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
                /*txt: Email : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Email",
                    classname: "form-control",
                    id: "text-email",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Email Address",
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
                /*txt: Address : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "Address",
                    classname: "form-control",
                    id: "txt_address",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Address",
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
                /*txt: Country : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Country",
                    classname: "form-control",
                    id: "txt_address",
                    length: 30,
                    readonly: false,
                    hinttext: "Enter your Country",
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
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: State / Province : 7*/
                arrayindex: 7,
                csstheme: {
                    labletext: "State / Province",
                    classname: "form-control",
                    id: "txt_stateorprovince",
                    length: 30,
                    readonly: false,
                    hinttext: "Enter your State or Province",
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
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: City : 8*/
                arrayindex: 8,
                csstheme: {
                    labletext: "City",
                    classname: "form-control",
                    id: "txt_city",
                    length: 30,
                    readonly: false,
                    hinttext: "Enter your City",
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
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Postal Code : 9*/
                arrayindex: 9,
                csstheme: {
                    labletext: "Postal Code",
                    classname: "form-control",
                    id: "num_postalcode",
                    length: 30,
                    readonly: false,
                    hinttext: "Enter your Postal Code",
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
                /*btn:cross : 10*/
                arrayindex: 10,
                csstheme: {
                    labletext: "Cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_crosssearch",
                },
            },
            {
                /*btn:cross : 11*/
                arrayindex: 11,
                csstheme: {
                    labletext: "Save Changes",
                    classname: "btn btn-primary",
                    id: "btn_crosssearch",
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

        }
    }

    useEffect(() => {
        if (startInit === true)
            initControl();
    }, [startInit]);
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
                                                            <div className="col-md-4">
                                                                <div className="mb-3">
                                                                    <OPTextBox
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
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom mb-3 pb-3">
                                                        <h5 className="fw-semibold mb-1">
                                                            Address
                                                        </h5>
                                                        <p>Please enter the address details</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <OPTextBox
                                                                    ctl_Attribute={ctlAttribute.current[5]}
                                                                    rerender={rerender}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="mb-3">
                                                                <OPTextBox
                                                                    ctl_Attribute={ctlAttribute.current[6]}
                                                                    rerender={rerender}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="mb-3">
                                                                <OPTextBox
                                                                    ctl_Attribute={ctlAttribute.current[7]}
                                                                    rerender={rerender}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="mb-3">
                                                                <OPTextBox
                                                                    ctl_Attribute={ctlAttribute.current[8]}
                                                                    rerender={rerender}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="mb-3">
                                                                <OPTextBox
                                                                    ctl_Attribute={ctlAttribute.current[9]}
                                                                    rerender={rerender}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 d-flex justify-content-end'>
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[10]}
                                                            handleButtonClick={handleButtonClick}
                                                        />
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[11]}
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
