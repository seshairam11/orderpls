import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { OPNotification } from '../ComponentOP/OPNotification';
import { OPReadOnlyListTable } from '../ComponentOP/OPReadOnlyTable';
import { OPTextBox } from '../ComponentOP/OPTextBox';

export const OPViewBench = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);
    const [listBench, setListBench] = useState(true);
    const [viewBench, setViewBench] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})
    const tbl_BenchLst = useRef({})

    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    function fnViewBenchRequest() {
        let _getBody = {
            companyName: getAppStoreData.companyName,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/viewbench",
            apikey: "VIEWBENCH"
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
                        labletext: "Table Nmae",
                        classname: "form-control",
                        id: "txt_benchname",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter your Table Name ",
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
                    /*txt: Maximum seats : 1*/
                    arrayindex: 1,
                    csstheme: {
                        labletext: "Maximum seats",
                        classname: "form-control",
                        id: "txt_Maximum seats",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Maximum seats ",
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
                    /*txt: Last Name : 2*/
                    arrayindex: 2,
                    csstheme: {
                        labletext: "Status",
                        classname: "form-control",
                        id: "txt_Status",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Table Status ",
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
                    /*txt: Server Name : 3*/
                    arrayindex: 3,
                    csstheme: {
                        labletext: "Server Name	",
                        classname: "form-control",
                        id: "txt_Price",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Server Name ",
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
                    /*txt: chef Name : 4*/
                    arrayindex: 4,
                    csstheme: {
                        labletext: "chef Name",
                        classname: "form-control",
                        id: "txt_chefname",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Chef Name ",
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
        console.log(resTableData);
        const benchlst = resTableData.map(item => ({
            _id: item._id,
            showrow: true,
            table_value: [
                {
                    t_key: 0,
                    t_value: item.labelname,
                },
                {
                    t_key: 1,
                    t_value: item.maxseats,
                },
                {
                    t_key: 2,
                    t_value: item.status,
                },
                {
                    t_key: 3,
                    t_value: item.serverName ?? "NULL",
                },
                {
                    t_key: 4,
                    t_value: item.chefName ?? "NULL",
                },
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
                    h_name: "Table Name",
                    h_width: "150px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 1,
                    h_name: "Maximum seats",
                    h_width: "50px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 2,
                    h_name: "Status",
                    h_width: "50px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 3,
                    h_name: "Server Name",
                    h_width: "50px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 4,
                    h_name: "chef Name",
                    h_width: "50px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: benchlst,
        };
        tbl_BenchLst.current = l_tbl_menuLst
    }

    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "btn_cancel":
                setListBench(true);
                setViewBench(false);
                break;
            case "btn_delete":
                fnDeleteData();
                break;
        }
    }

    function handleClickTable(index) {
        const menuDetial = tbl_BenchLst.current.tableData[index];
        tbl_BenchLst.current.tableindex = index;
        tbl_BenchLst.current.tabledataid = menuDetial._id;
        ctlAttribute.current[0].inputvalue = menuDetial.table_value[0].t_value
        ctlAttribute.current[1].inputvalue = menuDetial.table_value[1].t_value
        ctlAttribute.current[2].inputvalue = menuDetial.table_value[2].t_value
        ctlAttribute.current[3].inputvalue = menuDetial.table_value[3].t_value
        ctlAttribute.current[4].inputvalue = menuDetial.table_value[4].t_value
        setListBench(false);
        setViewBench(true);
    }

    function fnDeleteData() {
        tbl_BenchLst.current.tableData.splice(tbl_BenchLst.current.tableindex, 1);
        let _getBody = {
            _id: tbl_BenchLst.current.tabledataid,
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/deletebench",
            apikey: "DELBENCH"
        };
        serverRequest(serverRequestParam);
    }

    function fnDeleteBenchResult() {
        if (responseData.isAuth) {
            ctlNotify.current = {
                name: "Bench Deleted Successfully",
                title: responseData.errormsg.labelname,
                photo: "success"
            }
            setViewBench(false);
            setListBench(true);
            setNotify(true);
        }
    }

    useEffect(() => {
        if (startInit === true) {
            fnViewBenchRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "DELBENCH":
                        fnDeleteBenchResult();
                        break;
                    case "VIEWBENCH":
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
                                                    View Bench list
                                                </h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {listBench &&
                                        < div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                View Bench's
                                                            </h5>
                                                            <p>Showing menu list</p>
                                                        </div>
                                                        <OPReadOnlyListTable
                                                            tablename={tbl_BenchLst.current.tablename}
                                                            actionButton={tbl_BenchLst.current.actionButton}
                                                            tableMetaData={tbl_BenchLst.current.tableMetaData}
                                                            colMetaData={tbl_BenchLst.current.colMetaData}
                                                            tableData={tbl_BenchLst.current.tableData}
                                                            handleClickTable={handleClickTable}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {viewBench &&
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                Bench Details
                                                            </h5>
                                                            <p>Showing Bench Details in ReadOnly Method</p>
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
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[5]}
                                                                handleButtonClick={handleButtonClick}
                                                            />
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[6]}
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
