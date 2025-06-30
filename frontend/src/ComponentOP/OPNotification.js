import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const OPNotification = ({ nameProps, titleProps, photoProps, bool }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(bool)
    }, [bool]);

    return (
        <div className={`rectangle ${isVisible ? "visible" : "invisible"} justify-content-between`}>
            {isVisible && (
                <>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='notify-img p-1'>
                                <img
                                    src={require(`../assets/img/notify/${photoProps}.jpg`)}
                                    className="img-cover"
                                    alt="notify-img"
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <h6>{nameProps} </h6>
                                <p className='m-0'>{titleProps}</p>
                            </div>
                        </div>
                        <Link
                            style={{ marginLeft: "auto" }}
                            onClick={(e) => { setIsVisible(false) }}
                            className=' notify-cancel'>
                            <img
                                src={require("../assets/img/icons/circle-x.png")}
                                style={{ width: "15px" }}
                                className="img-fluid  "
                                alt="Cancel" />
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}