import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'

export const OPQuantity = ({ ctl_Attribute, rerender }) => {
    const [l_inputValue, setInputValue] = useState("");

    function handleOnBlur(e) {

    }
    function handleOnFocus(e) {

    }
    function handleOnChange(e) {
        setInputValue(e.target.value);
        ctl_Attribute.inputvalue = e.target.value;
    }
    return (
        <div className="input-group">

            <input
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Hello world!"
                type='number'
                className='form-control mg-top-20'
                id={ctl_Attribute.csstheme.id}
                maxLength={ctl_Attribute.csstheme.length}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                value={ctl_Attribute.inputvalue}
                onChange={handleOnChange}
            />
            <Tooltip id="my-tooltip" openOnClick={true} variant={"dark"} />
            {/* <div className="input-group-text">
                Qty
            </div> */}
        </div>
    )
}
