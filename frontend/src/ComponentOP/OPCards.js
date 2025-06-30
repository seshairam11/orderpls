import React from 'react'

export const OPCards = ({ Ctl_Card }) => {
    return (
        <>
            {Ctl_Card.map((item) => {
                return (
                    <div className='col-lg-4 col-md-6 d-flex'>
                        <div className='card border shadow-none flex-fill mb-3'>
                            <div className='card-body d-flex justify-content-between flex-column'>
                                <div className="mb-3">
                                    <div className='d-flex align-items-center justify-content-between mb-1'>
                                        <h6 className="fw-semibold">{item.title}</h6>
                                    </div>
                                    <p>
                                        {item.para}
                                        <span className='text-gray-9'>{item.span}</span>
                                    </p>
                                </div>
                                <div>
                                    {item.whitebutton?.showbutton &&
                                        <button
                                            id={item.whitebutton?.id}
                                            className='btn btn-light me-3 btn2lnk'>
                                            {item.whitebutton?.labelname}
                                        </button>
                                    }
                                    {item.redbutton?.showbutton &&
                                        <button
                                            id={item.redbutton?.id}
                                            className='btn btn-primary btn2lnk'>
                                            {item.redbutton?.labelname}
                                        </button>
                                    }
                                    {item.linkbutton?.showbutton &&
                                        <button
                                            id={item.linkbutton?.id}
                                            className='link-danger fw-semibold btn2lnk'>
                                            {item.linkbutton?.labelname}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}



{/*
    {
                arrayindex: 0,
                title: "Password",
                para: "Last Changed 03 Jan 2023, 09:00 AM",
                span: "",
                whitebutton: {
                    showbutton: true,
                    id: "changepassword",
                    labelname: "Change Password",
                },
                redbutton: {
                    showbutton: false,
                    labelname: "Change Password",
                },
                linkbutton: {
                    showbutton: false,
                    labelname: "Change Password",
                }
            },
    */}