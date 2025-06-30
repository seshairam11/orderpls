import React from 'react'


export const OPGroupButton = ({ groupBtnName, groupBtnData, handleGroupButtonClick }) => {
    return (
        <div className='tasks-activity tasks collapse show'>
            <ul className='row'>
                {groupBtnData.map((item, index) => {
                    return (
                        item.showbutton && (
                            <li key={index}
                                className='d-flex flex-column col-xxl-2 col-xl-3 col-md-4 col-sm-6 ' style={{ padding: '12px' }}
                            >
                                <button className='grpbtn btn2lnk' onClick={(e) => { handleGroupButtonClick(groupBtnName, index) }}>
                                    <div className='grpbtn-text-content'>
                                        <p style={{ color: "#595757" }}>{item.labelname}</p>
                                    </div>
                                    <div className='grpbtn-bottom-content'>
                                        <div className='d-flex' style={{ gap: "5px" }} >
                                            {item.status === "open" &&
                                                <span className='grpbtn-single-seats'>
                                                    {item.maxseats}
                                                    <i className="ti ti-user-filled" style={{ color: "#228B22", fontSize: "1.2em" }} ></i> {/* Green icon */}
                                                </span>
                                            }
                                            {item.status !== "open" &&
                                                <span className='grpbtn-single-seats'>
                                                    {item.maxseats}
                                                    <i className="ti ti-user-filled" style={{ color: "#DC143C", fontSize: "1.2em" }} ></i> {/* Red icon */}
                                                </span>
                                            }
                                            <span className='grpbtn-group-seats'>
                                                {item.status === "open" &&
                                                    Array.from({ length: item.maxseats }).map((_, index) => (
                                                        <i key={index} className="ti ti-user-filled soft-success" style={{ color: "#228B22", fontSize: "1.2em" }}></i>
                                                    ))}
                                                {item.status !== "open" &&
                                                    Array.from({ length: item.maxseats }).map((_, index) => (
                                                        <i key={index} className="ti ti-user-filled " style={{ color: "#DC143C", fontSize: "1.2em" }}></i>
                                                    ))}
                                            </span>
                                        </div>
                                        <div>
                                            {item.status === "open" &&
                                                <>
                                                    <i className="fa-solid fa-lock-open fa-bounce mr-5-im"></i>
                                                    Open...
                                                </>
                                            }
                                            {item.status === "process" &&
                                                <>
                                                    <i className="fas fa-spinner fa-spin me-2 mr-5-im"></i>
                                                    Process...
                                                </>
                                            }
                                            {item.status === "close" &&
                                                <>
                                                    <i className="fa-solid fa-lock fa-shake mr-5-im"></i>
                                                    Close...
                                                </>
                                            }
                                            {item.status === "waiting" &&
                                                <>
                                                    <i className="fa-solid fa-hourglass-start fa-fade mr-5-im"></i>
                                                    Waiting...
                                                </>
                                            }
                                            {item.status === "completed" &&
                                                <>
                                                    <i class="fa-solid fa-money-bill fa-flip mr-5-im"></i>
                                                    Completed...
                                                </>
                                            }
                                        </div>
                                    </div>
                                </button>
                            </li>
                        )
                    )
                }
                )}
            </ul>
        </div>
    )
}
