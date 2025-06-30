import React, { useState } from 'react'

export const OPIncrementalTextbox = ({ ctl_Attribute }) => {
    const [rerender, setRerender] = useState(false);
    function handleOnClickAdd(e) {
        let incrementValue = Number(document.getElementById(ctl_Attribute.csstheme.id).value);
        incrementValue += 1;
        document.getElementById(ctl_Attribute.csstheme.id).value = incrementValue;
    }
    function handleOnClickMinus() {
        let decrementValue = Number(document.getElementById(ctl_Attribute.csstheme.id).value);
        decrementValue -= 1;
        document.getElementById(ctl_Attribute.csstheme.id).value = decrementValue;
    }
    function handleOnChange(e) {
        ctl_Attribute.inputvalue = e.target.value
        setRerender(!rerender);
    }
    return (
        <>
            <div className="row mb-3">
                <div className="col-xxl-6 col-md-6 col-sm-6 col-10 d-flex align-items-center">
                    <label htmlFor="" className="col-lg-3 col-form-label" style={{ width: "170px", paddingLeft: "10px" }}>
                        {ctl_Attribute.csstheme.labletext}
                    </label>
                    <span style={{ marginRight: "10px" }}>:</span>
                    <div className="btn-group" style={{ width: "40%" }}>
                        <button className="btn btn-light" onClick={handleOnClickMinus}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                            type='number'
                            id={ctl_Attribute.csstheme.id}
                            className='form-control text-center'
                            value={ctl_Attribute.inputvalue}
                            onChange={handleOnChange}
                            style={{ borderRadius: "0", boxShadow: "none" }} />
                        <button className="btn btn-light" onClick={handleOnClickAdd}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
