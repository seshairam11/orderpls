import { useEffect, useState } from "react";
import { OPValidations } from "../CommonOP/OPValidations";
import { Tooltip } from "react-tooltip";

export const OPDropDown = ({ ctl_Attribute, rerender }) => {
    const [l_rerender, l_setRerender] = useState(false)

    useEffect(() => { }, [rerender]);
    const validate = OPValidations();
    const handleOnFocus = (e) => {
        e.currentTarget.setCustomValidity("")
        ctl_Attribute.tooltip.isvalidation = true;
        l_setRerender(!l_rerender);
    };
    const handleOnChange = (e) => {
        ctl_Attribute.error.errorshow = false;
        ctl_Attribute.inputvalue = e.currentTarget.value;
        l_setRerender(!l_rerender);
    };
    function handleOnBlur(e) {
        ctl_Attribute.inputvalue = e.currentTarget.value;
        ctl_Attribute.tooltip.isvalidation = false;
        let err = validate(ctl_Attribute);
        if (err.founderror == true) {
            ctl_Attribute.error.errormsg = err.errmsg;
            ctl_Attribute.error.errorshow = true;
            e.currentTarget.setCustomValidity(err.errmsg)
        }
        l_setRerender(!l_rerender);
    };

    return (
        <>
            <label htmlFor={ctl_Attribute.csstheme.id} className="col-form-label ">{ctl_Attribute.csstheme.labletext}{ctl_Attribute.validate.mandatory ? (<span className="text-danger">&nbsp;*</span>) : null}</label>
            <select
                ref={(el) => {
                    ctl_Attribute.tooltip.isfocus = el
                    ctl_Attribute.tooltip.errorshow = el
                }}
                className={`${ctl_Attribute.csstheme.classname} ${ctl_Attribute.error.errorshow ? "err-border" : ""}`}
                data-tooltip-content={ctl_Attribute.error.errorshow ? ctl_Attribute.error.errormsg : ctl_Attribute.csstheme.hinttext}
                data-tooltip-id={ctl_Attribute.csstheme.id}
                data-tooltip-place={ctl_Attribute.tooltip.place}
                data-tooltip-class-name={ctl_Attribute.tooltip.classname}
                disabled={ctl_Attribute.csstheme.readonly}
                value={ctl_Attribute.inputvalue}

                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                onChange={handleOnChange}
                id={ctl_Attribute.csstheme.id}
            >
                <option id="dd-Option" key="000" value="">
                    Select
                </option>
                {ctl_Attribute.dropdata.map((item, index) => (
                    <option id={`dd-Option ${index}`} key={index} value={item.keylistvalue}>
                        {item.keylistvalue}
                    </option>
                ))};
            </select>
            <Tooltip id={ctl_Attribute.csstheme.id} isOpen={ctl_Attribute.tooltip.isvalidation} />
        </>
    );
}