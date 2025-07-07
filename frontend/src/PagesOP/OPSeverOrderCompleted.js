import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPGroupButton } from '../ComponentOP/OPGroupButton';
import { OPButton } from '../ComponentOP/OPButton';
import { OPLocalSearchBar } from '../ComponentOP/OPLocalSearchBar';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { OPVerticalTable } from '../ComponentOP/OPVerticalTable';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';

export const OPServerOrderCompleted = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [sideBar, setSideBar] = useState(false);
    const [addOrder, setAddOrder] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [completed, setCompleted] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlBench = useRef({});
    const tbl_menu = useRef([]);
    const responce_data = useRef([]);

    const socketUrl = 'https://orderpls.onrender.com'
    const socketRef = useRef(null);
    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    function initControl(responseData) {
        const MenuList = responseData.menuList.map((item) => ({
            m_key: item._id,
            m_value: item.menuItem
        }))

        let ctlArray = [
            {
                /*txt: Menu : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Menu",
                    classname: "form-control",
                    id: "txt_test",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Order",
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
                    datatype: "searchBox",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
                dropdownlist: MenuList,
            },
            {
                /*txt: Quantity : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Qty",
                    classname: "form-control",
                    id: "num_qty",
                    length: 2,
                    readonly: false,
                    hinttext: "Enter your Quantity",
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
                    labletext: "",
                    classname: "btn-close",
                    id: "btn_crosssearch",
                    icon: "ti ti-x",
                },
            },
            {
                /*btn:cancel_delete : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel_search",
                },
            },
            {
                /*btn:confirm_search : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Confirm",
                    classname: "btn btn-danger",
                    id: "btn_confirm_search",
                },
            },
            {
                /*btn:cross : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "",
                    classname: "btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle",
                    id: "btn_cross",
                    icon: "ti ti-x",
                },
            },
            {
                /*btn:Add Order : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Add Order",
                    classname: "label-add btn2lnk",
                    id: "btn_addorder",
                    icon: "ti ti-square-rounded-plus",
                },
            },
            {
                /*btn:Save : 7*/
                arrayindex: 7,
                csstheme: {
                    labletext: " Save",
                    classname: "btn btn-primary",
                    id: "btn_save",
                },
            },
            {
                /*btn:cancel : 8*/
                arrayindex: 8,
                csstheme: {
                    labletext: "Cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel",
                },
            },
            {
                /*btn:cancel : 9*/
                arrayindex: 9,
                csstheme: {
                    labletext: "Completed",
                    classname: "btn btn-primary me-2",
                    id: "btn_completed",
                },
            },
        ]
        ctlAttribute.current = ctlArray;
        fnCreateBench(responseData.hotelBench);
        fnBuildMenuList();
        setStartRender(true);
        setStartLoader(false);
    }
    function fnCreateBench(l_responceData) {
        responce_data.current = l_responceData;
        const benchlst = l_responceData
            .filter(sts => sts.status == "close")

        let l_bench = {
            groupbtnname: "beanchlst",
            groupbtnselectedname: null,
            groupbtndata: benchlst
        }
        ctlBench.current = l_bench;

    }

    function fnBuildMenuList() {
        let l_tbl_menu = {
            tablename: "tbl_orderlist",
            grpbtnrowid: null,
            grpbtnindex: null,
            tableindex: null,
            actionButton: {
                hasAction: true,
                hasStatus: true,
                canEditRow: true,
                canDeleteRow: true,
            },
            tableMetaData: {
                showPagination: false,
                showSearch: false,
            },
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Orders",
                    h_width: "200px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 1,
                    h_name: "Qty",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 2,
                    h_name: "Sts",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 3,
                    h_name: "Actions",
                    h_width: "43px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: [],
        };
        tbl_menu.current = l_tbl_menu
    }
    function fnTableOrderList(index, rowmode, rowaction) {
        if (rowaction === 2) {
            tbl_menu.current.tableData.splice(index, 1);
            setRerender(!rerender)
        } else if (rowaction === 1) {
            tbl_menu.current.tableaction = 1;
            tbl_menu.current.tableindex = index;
            let t_data = tbl_menu.current.tableData[index].table_value
            ctlAttribute.current[0].inputvalue = t_data[0].t_value
            ctlAttribute.current[1].inputvalue = t_data[1].t_value
            setAddOrder(true);
        }
    }
    function fnConfirmOrder() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[0]));
        err.push(validate(ctlAttribute.current[1]));

        for (let i = 0; i < err.length; i++) {
            if (err[i].founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[err[i].arrayindex].error.errorshow = true;
                l_validate.push(err[i])
            }
        }
        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isvalidation = false;
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isfocus.focus();
            setRerender(!rerender);
        }
        else {
            let l_tableValues = [
                {
                    t_key: 0,
                    t_value: ctlAttribute.current[0].inputvalue,
                },
                {
                    t_key: 1,
                    t_value: ctlAttribute.current[1].inputvalue,
                },
            ]
            if (tbl_menu.current.tableaction === 0) {
                let l_tableThirdvalue = [
                    {
                        t_key: 2,
                        t_value: "New",
                    }
                ]
                tbl_menu.current.tableData.push({
                    showrow: true,
                    rowmode: 0,
                    table_value: l_tableValues.concat(l_tableThirdvalue),
                })
            } else if (tbl_menu.current.tableaction === 1) {
                let l_tableThirdvalue = tbl_menu.current.tableData[tbl_menu.current.tableindex].table_value[2]
                let l_tableData = {
                    showrow: true,
                    rowmode: 1,
                    table_value: l_tableValues.concat(l_tableThirdvalue),
                }
                tbl_menu.current.tableData.splice(tbl_menu.current.tableindex, 1, l_tableData)
            }
            ctlAttribute.current[0].inputvalue = "";
            ctlAttribute.current[1].inputvalue = "";
            setCompleted(true);
            setAddOrder(false);
        }
    }
    function fnSaveSelectedButton() {
        const docId = tbl_menu.current.grpbtnrowid;
        const newContent = tbl_menu.current.tableData.map(item => ({
            showrow: item.showrow,
            table_value: [
                {
                    t_key: 0,
                    t_value: item.table_value[0].t_value
                },
                {
                    t_key: 1,
                    t_value: item.table_value[1].t_value
                },
                {
                    t_key: 2,
                    t_value: item.table_value[2].t_value === "Completed" ? "Completed" : 'Processing'
                },
            ]
        }));
        const companyName = getAppStoreData.companyName;
        socketRef.current.emit('updateServerOrderProcessing', docId, newContent, companyName);
        document.body.style = "";
        setSideBar(false);
    }
    function fnCompletedSelectedButton() {

        const docId = tbl_menu.current.grpbtnrowid;
        const newContent = tbl_menu.current.tableData.map(item => ({
            showrow: item.showrow,
            table_value: [
                {
                    t_key: 0,
                    t_value: item.table_value[0].t_value
                },
                {
                    t_key: 1,
                    t_value: item.table_value[1].t_value
                },
                {
                    t_key: 2,
                    t_value: "Completed"
                },
            ]
        }));
        console.log(newContent);
        const companyName = getAppStoreData.companyName;
        socketRef.current.emit('updateServerOrderCompleted', docId, newContent, companyName);

        document.body.style = "";
        setSideBar(false);
    }
    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id);

        switch (btn_id) {
            case "btn_addorder":
                tbl_menu.current.tableaction = 0;
                tbl_menu.current.tableindex = null;
                setAddOrder(true)
                break;
            case "btn_cross":
            case "blurdiv":
            case "btn_cancel":
                document.body.style = "";
                setSideBar(false);
                break;
            case "btn_save":
                fnSaveSelectedButton();
                break;
            case "btn_completed":
                fnCompletedSelectedButton();
                break;
            case "btn_crosssearch":
            case "btn_cancel_search":
                ctlAttribute.current[0].inputvalue = "";
                ctlAttribute.current[0].error.errorshow = false;
                ctlAttribute.current[1].inputvalue = "";
                ctlAttribute.current[1].error.errorshow = false;
                setAddOrder(false)
                break;
            case "btn_confirm_search":
                fnConfirmOrder();
                break;

        }
    }
    function handleGroupButtonClick(groupBtnName, index) {
        console.log(groupBtnName);
        console.log(index);

        switch (groupBtnName) {
            case "beanchlst":
                document.body.style.overflow = "hidden";
                const clonedData = structuredClone(ctlBench.current.groupbtndata[index].btn_values);
                ctlBench.current.groupbtnselectedname = ctlBench.current.groupbtndata[index].labelname;
                tbl_menu.current.grpbtnrowid = ctlBench.current.groupbtndata[index]._id;
                tbl_menu.current.tableData = clonedData;
                break;
        }
        setSideBar(true);
    }
    function handleTableActionClick(tablename, index, rowmode, rowaction) {
        switch (tablename) {
            case "tbl_orderlist":
                fnTableOrderList(index, rowmode, rowaction);
                break;
        }
    }


    useEffect(() => {


        // Initialize the socket connection
        socketRef.current = io(socketUrl);

        // Emit event to start server order placing
        socketRef.current.emit('joinServerOrderCompleted', getAppStoreData.companyName);

        // Listen for the 'menuList' event from the server
        socketRef.current.on('sendServerOrderCompleted', (responseData) => {
            initControl(responseData);
        });

        socketRef.current.on('documentUpdated', (docId, newContent, status) => {
            const index = responce_data.current.findIndex(item => item._id === docId);
            const newArr = responce_data.current.filter(item => item._id === docId);
            newArr[0].status = status;
            newArr[0].btn_values = newContent;
            console.log(newArr)
            const canArr = responce_data.current.splice(index, 1, newArr[0]);
            fnCreateBench(responce_data.current);
            setRerender(prevRerender => !prevRerender);
        })


        // Cleanup: Disconnect the socket on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

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
                                                    Order Placing
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
                                                <div className="card-body" id='card-body'>
                                                    <div className='border-bottom mb-3 pb-3'>
                                                        <h5 className='fw-semibold mb-1'>
                                                            Bench's
                                                        </h5>
                                                        <p>Select the Bench that you want to place the order</p>
                                                    </div>
                                                    <OPGroupButton
                                                        groupBtnName={ctlBench.current.groupbtnname}
                                                        groupBtnData={ctlBench.current.groupbtndata}
                                                        handleGroupButtonClick={handleGroupButtonClick}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className={`offcanvas offcanvas-end offcanvas-large ${(sideBar ? "show" : "hiding")}`}>
                        {sideBar && (
                            <>
                                <div className='offcanvas-header border-bottom'>
                                    <h4>{ctlBench.current.groupbtnselectedname}</h4>
                                    <OPButton
                                        ctl_Attribute={ctlAttribute.current[5]}
                                        handleButtonClick={handleButtonClick}
                                    />
                                </div>
                                <div className='offcanvas-body'>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <h4>Order</h4>
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[6]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </div>
                                    <OPVerticalTable
                                        tablename={tbl_menu.current.tablename}
                                        actionButton={tbl_menu.current.actionButton}
                                        tableMetaData={tbl_menu.current.tableMetaData}
                                        colMetaData={tbl_menu.current.colMetaData}
                                        tableData={tbl_menu.current.tableData}
                                        handleTableActionClick={handleTableActionClick}
                                    />
                                    <div className="mt-4 d-flex justify-content-end" >
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[8]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                        {!completed && <OPButton
                                            ctl_Attribute={ctlAttribute.current[9]}
                                            handleButtonClick={handleButtonClick}
                                        />}
                                        {completed && <OPButton
                                            ctl_Attribute={ctlAttribute.current[7]}
                                            handleButtonClick={handleButtonClick}
                                        />}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {sideBar && (
                        <div className='offcanvas-backdrop fade show' id='blurdiv' onClick={handleButtonClick} ></div>
                    )}
                    <div className={`modal custom-modal fade ${addOrder ? "show" : "hidding"}`} style={{ display: addOrder ? "block" : "none" }}>
                        {addOrder && (
                            <div className="modal-dialog modal-dialog-centered ">
                                <div className="modal-content" style={{ height: "400px" }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Order Please</h5>
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[2]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <div className="mb-5">
                                                    <OPLocalSearchBar
                                                        ctl_Attribute={ctlAttribute.current[0]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-5">
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[1]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                            </div>
                                            <div className='modal-btn text-end' style={{ marginTop: "150px" }}>
                                                <div className="mb-3">
                                                    <OPButton
                                                        ctl_Attribute={ctlAttribute.current[3]}
                                                        handleButtonClick={handleButtonClick}
                                                    />
                                                    <OPButton
                                                        ctl_Attribute={ctlAttribute.current[4]}
                                                        handleButtonClick={handleButtonClick}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

        </>

    )
}
