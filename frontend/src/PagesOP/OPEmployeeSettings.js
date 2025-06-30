import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPCards } from '../ComponentOP/OPCards';

export const OPEmployeeSettings = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);

    const ctlAttribute = useRef([]);
    const ctlCard = useRef([]);

    const validate = OPValidations();
    function initControl() {
        let ctlArray = [

        ]
        ctlAttribute.current = ctlArray;
        let ctl_Card = [
            {
                arrayindex: 0,
                title: "Password",
                para: "Last Changed 03 Jan 2023, 09:00 AM",
                span: "",
                whitebutton: {
                    showbutton: true,
                    id: "changepassword",
                    labelname: "Change",
                },
            },
            {
                arrayindex: 1,
                title: "Phone Number Verification",
                para: "Verified Mobile Number : ",
                span: "+917010631022",
                whitebutton: {
                    showbutton: true,
                    id: "changeph",
                    labelname: "Change",
                },
                linkbutton: {
                    showbutton: true,
                    id: "removeph",
                    labelname: "Remove",
                },
            },
            {
                arrayindex: 2,
                title: "Email Verification",
                para: "Verified Email : ",
                span: "4602seshasairam@gmail.com",
                whitebutton: {
                    showbutton: true,
                    id: "changeeid",
                    labelname: "Change",
                },
                linkbutton: {
                    showbutton: true,
                    id: "removeeid",
                    labelname: "Remove",
                },
            },
            {
                arrayindex: 3,
                title: "Device Management",
                para: "Last Changed 17 Feb 2023, 11.00 AM",
                span: "",
                whitebutton: {
                    showbutton: true,
                    id: "manage",
                    labelname: "Manage",
                },
            },
            {
                arrayindex: 4,
                title: "Account Activity",
                para: "Last Changed 22 Feb 2023, 01:20 PM",
                span: "",
                whitebutton: {
                    showbutton: true,
                    id: "view",
                    labelname: "View",
                },
            },
            {
                arrayindex: 5,
                title: "Delete Account",
                para: "Last Changed 13 Mar 2023, 02:40 PM",
                span: "",
                redbutton: {
                    showbutton: true,
                    id: "deleteaccount",
                    labelname: "Delete Account",
                },
            },
        ]
        ctlCard.current = ctl_Card;

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
                                                    Settings
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
                                                        Security Settings
                                                    </h4>
                                                    <div className="row">
                                                        <OPCards
                                                            Ctl_Card={ctlCard.current}
                                                        />
                                                    </div>
                                                    {/* <div className='mt-4 d-flex justify-content-end'>
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[10]}
                                                            handleButtonClick={handleButtonClick}
                                                        />
                                                        <OPButton
                                                            ctl_Attribute={ctlAttribute.current[11]}
                                                            handleButtonClick={handleButtonClick}
                                                        />
                                                    </div> */}
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
