import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/dataTables.bootstrap5.min.css"
import "../index.css"

export const OPReadOnlyListTable = ({
    tablename,
    actionButton,
    tableMetaData,
    colMetaData,
    tableData,
    handleChangeSearch,
    handleClickTable,
    handleSort,
    handleKeyDown,
    isTableChanged, }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const optionBoxRefs = useRef([]);

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
                                    <tr key={`list${index}`} onClick={(e) => handleClickTable(index)}>
                                        {item.table_value.map((tdata, tindex) => {
                                            return (<td key={tdata.t_key} >
                                                {tindex !== 1 && (
                                                    <>
                                                        {tdata.t_value}
                                                    </>
                                                )}
                                                {tindex === 1 && (
                                                    <>
                                                        {
                                                             tdata.t_value === "Server" || tdata.t_value === "Chef" || tdata.t_value === "Casher" ?
                                                                < span className={`badge ${tdata.t_value === "Server" ? "bg-success" : tdata.t_value === "Chef" ? "bg-blue text-white" : tdata.t_value === "Casher" ? "bg-secondary" : ""}`
                                                                } >
                                                                    <span className="badge-label">
                                                                        {tdata.t_value}
                                                                    </span>
                                                                </span>
                                                                :
                                                                <>
                                                                    {tdata.t_value}
                                                                </>
                                                        }
                                                    </>
                                                )}
                                            </td>)
                                        })}
                                    </tr>
                                ))
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    </>);
}