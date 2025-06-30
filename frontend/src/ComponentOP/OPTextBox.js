import "../assets/plugins/tabler-icons/tabler-icons.css";
import { useEffect, useState } from "react";
import { OPValidations } from '../CommonOP/OPValidations';
import { Tooltip } from "react-tooltip";

export const OPTextBox = ({ ctl_Attribute, rerender }) => {

    const [l_rerender, l_setRerender] = useState(false)
    const validate = OPValidations();
    useEffect(() => { }, [rerender]);

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
            <input
                ref={(el) => {
                    ctl_Attribute.tooltip.isfocus = el
                    ctl_Attribute.tooltip.errorshow = el
                }}
                className={`${ctl_Attribute.csstheme.classname} ${ctl_Attribute.error.errorshow ? "err-border" : ""}`}
                type="text"
                data-tooltip-content={ctl_Attribute.error.errorshow ? ctl_Attribute.error.errormsg : ctl_Attribute.csstheme.hinttext}
                data-tooltip-id={ctl_Attribute.csstheme.id}
                data-tooltip-place={ctl_Attribute.tooltip.place}
                data-tooltip-class-name={ctl_Attribute.tooltip.classname}
                readOnly={ctl_Attribute.csstheme.readonly}
                id={ctl_Attribute.csstheme.id}
                disabled={ctl_Attribute.csstheme.readonly}
                maxLength={ctl_Attribute.csstheme.length}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                value={ctl_Attribute.inputvalue}
                onChange={handleOnChange}
                autoComplete="off"
            // required={ctl_Attribute.validate.mandatory}
            />
            <Tooltip id={ctl_Attribute.csstheme.id} isOpen={ctl_Attribute.tooltip.isvalidation} />
        </>
    )
}
