import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/style.css"
import { Tooltip } from 'react-tooltip';
import { OPValidations } from '../CommonOP/OPValidations';

export const OPLocalSearchBar = ({ ctl_Attribute, rerender }) => {

  const [l_rerender, l_setRerender] = useState(false)
  const [isShowList, setIsShowList] = useState(false);
  const fltData = useRef([]);

  const validate = OPValidations();


  useEffect(() => {
    ctl_Attribute.tooltip.isfocus.focus();
  }, []);

  function handleOnFocus(e) {
    e.target.setCustomValidity("")
    ctl_Attribute.tooltip.isvalidation = true;
    fltData.current = ctl_Attribute.dropdownlist.filter(item => String(item.m_value).toLowerCase().startsWith(String(e.target.value).toLowerCase()))
    setIsShowList(true);
  }
  function handleOnMouseDown(e) {
    ctl_Attribute.inputvalue = e.target.value;
    ctl_Attribute.tooltip.isvalidation = true;
    ctl_Attribute.error.errorshow = false;
    l_setRerender(!l_rerender);
  }
  function handleOnChange(e) {
    ctl_Attribute.error.errorshow = false;
    ctl_Attribute.inputvalue = e.target.value;
    fltData.current = ctl_Attribute.dropdownlist.filter(item => String(item.m_value).toLowerCase().includes(String(e.target.value).toLowerCase()))
    l_setRerender(!l_rerender);
  }
  function handleOnBlur(e) {
    ctl_Attribute.inputvalue = e.target.value;
    ctl_Attribute.tooltip.isvalidation = false;
    let err = validate(ctl_Attribute);
    if (err.founderror == true) {
      ctl_Attribute.error.errormsg = err.errmsg;
      ctl_Attribute.error.errorshow = true;
      e.target.setCustomValidity(err.errmsg);
    }
    setIsShowList(false);
  }
  return (
    <>
      <div className="">
        <div className="select2-results">
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
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={ctl_Attribute.inputvalue}
            onChange={handleOnChange}
            autoComplete="off"

          />
          <Tooltip id={ctl_Attribute.csstheme.id} isOpen={ctl_Attribute.tooltip.isvalidation} />
          {isShowList && (
            <ul className='pos-absolute wth-77 table-view'>
              {fltData.current.map(item => {
                return (
                  <option
                    key={item.m_key}
                    className='pd-10 popup-toggle list-search'
                    onMouseDown={handleOnMouseDown}
                    value={item.m_value}
                  >&nbsp;{item.m_value}</option>
                )
              }).slice(0, 4)}
            </ul>
          )}

        </div >
      </div>
    </>
  )
}
