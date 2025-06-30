import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/dataTables.bootstrap5.min.css"
import "../index.css"

export const OPRough = ({
    tableName,
    actionButton,
    tableMetaData,
    colMetaData,
    tableData,
    handleChangeSearch,
    handleTableActionClick,
    handleSort,
    handleKeyDown,
    isTableChanged, }) => {
    const optionBoxRefs = useRef([]);
    const [openIndex, setOpenIndex] = useState(null);
    const optionBoxHeight = 80;
    useEffect(() => {
        if (openIndex !== null) {
            const buttonRect = optionBoxRefs.current[openIndex].button.getBoundingClientRect();
            const divRect = document.getElementById('orderMenu').getBoundingClientRect();
            // Replace with your div's ID          
            const spaceBelow = divRect.bottom - buttonRect.bottom;
            const optionBox = optionBoxRefs.current[openIndex].optionBox;
            if (optionBox) {
                if (spaceBelow < optionBoxHeight) {
                    // Not enough space below, position above              
                    optionBox.style.top = `-${optionBoxHeight}px`;
                }
            }
        }
    }, [openIndex]);

    function handleListOnMouseDown(e) { console.log(e.target.id); }
    function handleOnBlur() {
        setOpenIndex(null);
    }
    function handleOnFocus(index) {
        setOpenIndex(index);
    }

    return (<>
        <div className="row dt-row">
            <div className="col-sm-12 table-responsive"
                style={{ overflowX: 'hidden' }}
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
                            return (<tr key={item.rowid}>
                                {item.table_value.map(tdata => {
                                    return (<td key={tdata.t_key} >
                                        {tdata.t_value}
                                    </td>)
                                })}
                                {actionButton.hasAction && (<td>
                                    <div className='dropdown table-action '>
                                        <button
                                            className='action-icon'
                                            id={`optbtn${index}`}
                                            style={{ position: 'relative' }}
                                            ref={(el) => (optionBoxRefs.current[index] = { button: el })}
                                            onClick={() => { handleOnFocus(index) }}
                                            onBlur={handleOnBlur}
                                        >
                                            <i className='fa fa-ellipsis-v'></i>
                                        </button>
                                        {openIndex === index && (
                                            <ul style={{ position: 'absolute', zIndex: 1000, right: '45px' }}
                                                ref={(el) => (optionBoxRefs.current[index].optionBox = el)}
                                                id={`optmenu${index}`}
                                                className='dropdown-menu dropdown-menu-right show'>
                                                {actionButton.canEditRow && (
                                                    <li
                                                        className='dropdown-item'
                                                        id={item.rowid}
                                                        onMouseDown={handleListOnMouseDown}>
                                                        <i className='ti ti-edit text-blue'></i>
                                                        &nbsp;Edit
                                                    </li>)}
                                                {actionButton.canDeleteRow && (
                                                    <li
                                                        className='dropdown-item'
                                                        id={item.rowid}
                                                        onMouseDown={handleListOnMouseDown}>
                                                        <i className='ti ti-trash text-danger'></i>
                                                        &nbsp;Delete
                                                    </li>)}
                                            </ul>)}
                                    </div>
                                </td>)}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    </>);
}