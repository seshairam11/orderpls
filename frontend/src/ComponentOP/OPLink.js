import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const OPLink = ({ ctl_Attribute }) => {
    // const [isLinkDisable, setIsLinkDisable] = useState();
    // useEffect(() => {
    //     setIsLinkDisable(ctl_Attribute.islinkdisable);
    // }, [rerender]);
    return (
        
            <Link
                to={ctl_Attribute.to}
                className={ctl_Attribute.csstheme.classname}
                id={ctl_Attribute.csstheme.id}>
                {ctl_Attribute.csstheme.labletext}
            </Link>
        
    )
}
