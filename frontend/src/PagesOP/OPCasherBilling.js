import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPGroupButton } from '../ComponentOP/OPGroupButton';
import { OPButton } from '../ComponentOP/OPButton';
import { OPVerticalTable } from '../ComponentOP/OPVerticalTable';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export const OPCasherBilling = () => {
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [sideBar, setSideBar] = useState(false);
    const [rerender, setRerender] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlBench = useRef({});
    const tbl_menu = useRef([])
    const hotel_Bench = useRef([]);
    const menu_List = useRef([]);
    const price_Total = useRef(null);

    const socketUrl = 'https://orderpls.onrender.com'
    const socketRef = useRef(null);
    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    function initControl(responceData) {
        menu_List.current = responceData.menuList
        let ctlArray = [
            {
                /*btn:cross : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "",
                    classname: "btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle",
                    id: "btn_cross",
                    icon: "ti ti-x",
                },
            },
            {
                /*btn:Take : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Finish",
                    classname: "btn btn-primary",
                    id: "btn_finish",
                },
            },
            {
                /*btn:cancel : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel",
                },
            },
        ]
        ctlAttribute.current = ctlArray;
        fnCreateBench(responceData.hotelBench);
        fnBuildMenuList();
        setStartRender(true);
        setStartLoader(false);
    }
    function fnCreateBench(l_responceData) {
        hotel_Bench.current = l_responceData;

        const benchlst = l_responceData
            .filter(sts => sts.status == "completed")

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
                    h_name: "Price",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 4,
                    h_name: "Total",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: [],
        };
        tbl_menu.current = l_tbl_menu
    }

    function fnFinishSelectedButton() {
        const docId = tbl_menu.current.grpbtnrowid;
        const newContent = [];
        const companyName = getAppStoreData.companyName;
        socketRef.current.emit('updateCasherBilling', docId, newContent, companyName);

        document.body.style = "";
        setSideBar(false);
    }
    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;

        switch (btn_id) {

            case "btn_cross":
            case "blurdiv":
            case "btn_cancel":
                document.body.style = "";
                price_Total.current = null;
                setSideBar(false);
                break;
            case "btn_finish":
                fnFinishSelectedButton();
                break;
        }
    }
    function handleGroupButtonClick(groupBtnName, index) {

        switch (groupBtnName) {
            case "beanchlst":
                document.body.style.overflow = "hidden";
                console.log(menu_List.current)
                const clonedData = structuredClone(ctlBench.current.groupbtndata[index].btn_values).map(item => {
                    const filteredMenu = menu_List.current.filter(menu => menu.menuItem === item.table_value[0].t_value);
                    price_Total.current += Number(item.table_value[1].t_value) * filteredMenu[0].price
                    return {
                        showrow: true,
                        table_value: [
                            { t_key: 0, t_value: item.table_value[0].t_value },
                            { t_key: 1, t_value: item.table_value[1].t_value },
                            { t_key: 2, t_value: item.table_value[2].t_value },
                            { t_key: 3, t_value: filteredMenu[0].price },
                            { t_key: 4, t_value: Number(item.table_value[1].t_value) * filteredMenu[0].price }
                        ]
                    }
                }); // Remove null entries (if any) from the final result

                ctlBench.current.groupbtnselectedname = ctlBench.current.groupbtndata[index].labelname;
                tbl_menu.current.grpbtnrowid = ctlBench.current.groupbtndata[index]._id;
                tbl_menu.current.grpbtnindex = index;
                tbl_menu.current.tableData = clonedData;
                console.log(price_Total.current);
                break;
        }
        setSideBar(true);
    }
    function handleTableActionClick(tablename, index, rowmode, rowaction) {
        switch (tablename) {

        }
    }


    useEffect(() => {


        // Initialize the socket connection
        socketRef.current = io(socketUrl);

        // Emit event to start server order placing
        socketRef.current.emit('joinCasherBilling', getAppStoreData.companyName);

        // Listen for the 'menuList' event from the server
        socketRef.current.on('sendCasherBilling', (responceData) => {
            initControl(responceData);
        });

        socketRef.current.on('documentUpdated', (docId, newContent, status) => {
            const index = hotel_Bench.current.findIndex(item => item._id === docId);
            const newArr = hotel_Bench.current.filter(item => item._id === docId);
            newArr[0].status = status;
            newArr[0].btn_values = newContent;
            const canArr = hotel_Bench.current.splice(index, 1, newArr[0]);
            fnCreateBench(hotel_Bench.current);
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
                                        ctl_Attribute={ctlAttribute.current[0]}
                                        handleButtonClick={handleButtonClick}
                                    />
                                </div>
                                <div className='offcanvas-body'>
                                    <h4>Order</h4>
                                    <OPVerticalTable
                                        tablename={tbl_menu.current.tablename}
                                        actionButton={tbl_menu.current.actionButton}
                                        tableMetaData={tbl_menu.current.tableMetaData}
                                        colMetaData={tbl_menu.current.colMetaData}
                                        tableData={tbl_menu.current.tableData}
                                        handleTableActionClick={handleTableActionClick}
                                    />
                                    <div className="mt-2 d-flex" >
                                        <h6 style={{ marginLeft: "27rem" }}>
                                            <span style={{ marginLeft: "2rem" }}>GST@ 18%  &nbsp; :&nbsp; </span>{price_Total.current / 18}
                                        </h6>
                                    </div>
                                    <div className="d-flex" >
                                        <h3 style={{ marginLeft: "27rem" }}>
                                            <span style={{ marginLeft: "2rem" }}>Total &nbsp; : </span>{price_Total.current / 18 + price_Total.current}
                                        </h3>
                                    </div>
                                    <div className="mt-4 d-flex justify-content-end" >
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[2]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[1]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {sideBar && (
                        <div className='offcanvas-backdrop fade show' id='blurdiv' onClick={handleButtonClick} ></div>
                    )}

                </>
            )}

        </>

    )
}
