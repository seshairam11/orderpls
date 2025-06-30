import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/dataTables.bootstrap5.min.css"
import "../index.css"
import { useSelector } from 'react-redux';

export const OPVerticalTable = ({
    tablename,
    actionButton,
    tableMetaData,
    colMetaData,
    tableData,
    handleChangeSearch,
    handleTableActionClick,
    handleSort,
    handleKeyDown,
    isTableChanged, }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const optionBoxRefs = useRef([]);
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    useEffect(() => { handleDropDownList() }, [openIndex])

    function handleDropDownList() {
        if (openIndex !== null) {
            const buttonRect = optionBoxRefs.current[openIndex].button.getBoundingClientRect();
            const lstRect = document.getElementById(`optmenu${openIndex}`).getBoundingClientRect();
            const innerHight = window.innerHeight;
            // Replace with your div's ID          
            const spaceBelow = innerHight - buttonRect.bottom;
            const optionBox = optionBoxRefs.current[openIndex].optionBox;
            if (optionBox) {
                if (spaceBelow < lstRect.height) {
                    // Not enough space below, position above              
                    optionBox.style.top = `-${lstRect.height}px`;
                } else {
                    optionBox.style.top = "33px"
                }
            }
        }
    }

    function handleOnBlur() {
        setOpenIndex(null);
    }
    function handleOnFocus(index) {
        setOpenIndex(index);
    }

    return (<>
        <div className="row dt-row">
            <div className="col-sm-12 table-responsive"
                style={{ overflowX: 'visible' }}
                id='orderMenu'>
                <table className='table dataTable no-footer'>
                    <thead className='thead-light'>
                        <tr>
                            {colMetaData.map(item => {
                                return (<th className='sorting'
                                    // data-bs-toggle="dropdown"
                                    key={item.h_colindex}
                                    style={{ width: (item.h_width) }}
                                >
                                    {item.h_name}
                                </th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => {
                            return (
                                item.showrow && (
                                    <tr key={`list ${index}`}>
                                        {item.table_value.map((tdata, tindex) => {
                                            return (<td key={tdata.t_key} >
                                                {tindex !== 2 && (
                                                    <>
                                                        {tdata.t_value}
                                                    </>
                                                )}
                                                {tindex === 2 && (
                                                    <span className={`badge ${tdata.t_value == "New" ? "bg-success" : tdata.t_value === "Waiting" ? "bg-warning" : tdata.t_value === "Processing" ? "bg-secondary" : tdata.t_value === "Completed" ? "bg-info" : ""}`} >
                                                        <span className="badge-label">
                                                            {tdata.t_value}
                                                        </span>
                                                    </span>
                                                )}
                                            </td>)
                                        })}
                                        {getAppStoreData.usertype ==="server" && actionButton.hasAction && (<td>
                                            <div className='dropdown table-action '>
                                                <button
                                                    className='action-icon'
                                                    id={`optbtn${index}`}
                                                    style={{ position: 'relative' }}
                                                    ref={(el) => { optionBoxRefs.current[index] = { button: el } }}
                                                    onClick={() => { handleOnFocus(index) }}
                                                    onBlur={handleOnBlur}
                                                >
                                                    <i className='fa fa-ellipsis-v'></i>
                                                </button>
                                                {openIndex === index && (
                                                    <ul style={{ position: 'absolute', zIndex: 1000, right: '45px' }}
                                                        ref={(el) => (optionBoxRefs.current[index].optionBox = el)}
                                                        id={`optmenu${index}`}
                                                        className=' dropdown-menu dropdown-menu-right show'>
                                                        {actionButton.canEditRow && (
                                                            <li
                                                                className='dropdown-item'
                                                                style={
                                                                    !["New", "Waiting"].includes(item.table_value[2].t_value)
                                                                        ? { cursor: "not-allowed", opacity: "0.7", backgroundColor: "#f0f0f0" }
                                                                        : {}
                                                                }
                                                                id={item.rowid}
                                                                onMouseDown={(e) => {
                                                                    if (["New", "Waiting"].includes(item.table_value[2].t_value)) {
                                                                        handleTableActionClick(tablename, index, item.rowmode, 1);
                                                                        setOpenIndex(null);
                                                                    }
                                                                }}
                                                            >
                                                                <i className='ti ti-edit text-blue'></i>
                                                                &nbsp;Edit
                                                            </li>)}
                                                        {actionButton.canDeleteRow && (
                                                            <li
                                                                className='dropdown-item'
                                                                style={
                                                                    !["New", "Waiting"].includes(item.table_value[2].t_value)
                                                                        ? { cursor: "not-allowed", opacity: "0.7", backgroundColor: "#f0f0f0" }
                                                                        : {}
                                                                }
                                                                id={item.rowid}
                                                                onMouseDown={(e) => {
                                                                    if (["New", "Waiting"].includes(item.table_value[2].t_value)) {
                                                                        handleTableActionClick(tablename, index, item.rowmode, 2);
                                                                        setOpenIndex(null);
                                                                    }
                                                                }}>
                                                                <i className='ti ti-trash text-danger'></i>
                                                                &nbsp;Delete
                                                            </li>)}
                                                    </ul>)}
                                            </div>
                                        </td>)}
                                    </tr>
                                ))
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    </>);
}