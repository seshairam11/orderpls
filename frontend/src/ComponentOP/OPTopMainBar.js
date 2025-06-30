import React from 'react'

export const OPTopMainBar = () => {
    return (
        <div className="card">
            <div className='card-body pb-0 pt-2'>
                <ul className='nav nav-tabs nav-tabs-bottom'>
                    {ctlNavlink.current.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className='nav-item me-3'>
                                <NavLink
                                    to={item.to}
                                    id={item.csstheme.id}
                                    className={({ isActive }) => {
                                        return isActive ? `${item.csstheme.classname} active` : item.csstheme.classname
                                    }}
                                >{item.csstheme.labelname}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

/*
 let navLinks = [
            {
                arrayindex: 0,
                csstheme: {
                    labelname: "Order Placing",
                    classname: "nav-link px-0",
                    id: "lin_placing",
                    icon: "",
                },
                to: "/demo",
            },
            {
                arrayindex: 1,
                csstheme: {
                    labelname: "Order Cooking",
                    classname: "nav-link px-0",
                    id: "lin_cooking",
                    icon: "",
                },
                to: "/orderpls/user",
            },
            {
                arrayindex: 2,
                csstheme: {
                    labelname: "Order Cooked",
                    classname: "nav-link px-0",
                    id: "lin_cooked",
                    icon: "",
                },
                to: "/orderpls/user",
            },
            {
                arrayindex: 3,
                csstheme: {
                    labelname: "Order Delivered",
                    classname: "nav-link px-0",
                    id: "lin_delivered",
                    icon: "",
                },
                to: "/orderpls/user",
            },
        ]
        ctlNavlink.current = navLinks;
*/
