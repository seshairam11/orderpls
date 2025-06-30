import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { OPNotification } from '../ComponentOP/OPNotification';
import { OPReadOnlyListTable } from '../ComponentOP/OPReadOnlyTable';
import { OPTextBox } from '../ComponentOP/OPTextBox';

export const OPViewMenuCard = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);
    const [listMenu, setListMenu] = useState(true);
    const [viewMenu, setViewMenu] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})
    const tbl_menuLst = useRef({})

    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    function fnViewMenuRequest() {
        let _getBody = {
            companyName: getAppStoreData.companyName,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/viewmenu",
            apikey: "VIEWMENU"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }

    function initControl() {
        if (responseData.isAuth) {
            let ctlArray = [
                {
                    /*txt: First Name  : 0*/
                    arrayindex: 0,
                    csstheme: {
                        labletext: "Menu List",
                        classname: "form-control",
                        id: "txt_hotelname",
                        length: 20,
                        readonly: false,
                        hinttext: "Enter your Hotel Name ",
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
                        labletext: "Price",
                        classname: "form-control",
                        id: "txt_Price",
                        length: 20,
                        readonly: false,
                        hinttext: "Enter the menu price ",
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
                        labletext: "Cancel",
                        classname: "btn btn-light me-2",
                        id: "btn_cancel",
                    },
                },
                {
                    /*btn:cross : 3*/
                    arrayindex: 3,
                    csstheme: {
                        labletext: "Delete",
                        classname: "btn btn-primary",
                        id: "btn_delete",
                    },
                }
            ]
            ctlAttribute.current = ctlArray;
            fnBuildEmployeesList(responseData.errormsg);
            setStartRender(true);
            setStartLoader(false);
            // setStartInit(false);

        } else {
            console.log(responseData.errormsg);
        }
    }


    function fnBuildEmployeesList(resTableData) {
        const benchlst = resTableData
            .map(item => ({
                _id: item._id,
                showrow: true,
                table_value: [
                    {
                        t_key: 0,
                        t_value: item.menuItem,
                    },
                    {
                        t_key: 1,
                        t_value: item.price,
                    }
                ]
            }))

        let l_tbl_menuLst = {
            tablename: "tbl_orderlist",
            tableindex: null,
            tabledataid: null,
            tableMetaData: {
                showPagination: false,
                showSearch: false,
            },
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Item's",
                    h_width: "150px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 1,
                    h_name: "Price",
                    h_width: "43px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: benchlst,
        };
        tbl_menuLst.current = l_tbl_menuLst
    }

    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "btn_cancel":
                setListMenu(true);
                setViewMenu(false);
                break;
            case "btn_delete":
                fnDeleteData();
                break;
        }
    }

    function handleClickTable(index) {
        const menuDetial = tbl_menuLst.current.tableData[index];
        tbl_menuLst.current.tableindex = index;
        tbl_menuLst.current.tabledataid = menuDetial._id;
        ctlAttribute.current[0].inputvalue = menuDetial.table_value[0].t_value
        ctlAttribute.current[1].inputvalue = menuDetial.table_value[1].t_value
        setListMenu(false);
        setViewMenu(true);
    }

    function fnDeleteData() {
        tbl_menuLst.current.tableData.splice(tbl_menuLst.current.tableindex, 1);
        let _getBody = {
            _id: tbl_menuLst.current.tabledataid,
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/deletemenu",
            apikey: "DELMENU"
        };
        serverRequest(serverRequestParam);
    }

    function fnDeleteMenuResult() {
        if (responseData.isAuth) {
            ctlNotify.current = {
                name: "Menu Deleted Successfully",
                title: responseData.errormsg.menuItem,
                photo: "success"
            }
            setViewMenu(false);
            setListMenu(true);
            setNotify(true);
        }
    }

    useEffect(() => {
        if (startInit === true) {
            fnViewMenuRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "DELMENU":
                        fnDeleteMenuResult();
                        break;
                    case "VIEWMENU":
                        initControl();
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
                                                    View Menu list
                                                </h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {listMenu &&
                                        < div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                View Menu's
                                                            </h5>
                                                            <p>Showing menu list</p>
                                                        </div>
                                                        <OPReadOnlyListTable
                                                            tablename={tbl_menuLst.current.tablename}
                                                            actionButton={tbl_menuLst.current.actionButton}
                                                            tableMetaData={tbl_menuLst.current.tableMetaData}
                                                            colMetaData={tbl_menuLst.current.colMetaData}
                                                            tableData={tbl_menuLst.current.tableData}
                                                            handleClickTable={handleClickTable}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {viewMenu &&
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                Menu Details
                                                            </h5>
                                                            <p>Showing Menu Details in ReadOnly Method</p>
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
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[3]}
                                                                handleButtonClick={handleButtonClick}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )
            }

        </>

    )
}
