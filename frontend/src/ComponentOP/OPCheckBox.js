import React from 'react'

export const OPCheckBox = ({ ctl_Attribute, handleCheckBox }) => {
    return (
        <div className='form-check form-check-md d-flex align-items-center'>
            <input
                className={ctl_Attribute.csstheme.classname}
                id={ctl_Attribute.csstheme.id}
                type="checkbox"
                // checked={ctl_Attribute.csstheme.checked}
                onClick={handleCheckBox}
            />
            <label htmlFor={ctl_Attribute.csstheme.id} className='form-check-label'>{ctl_Attribute.csstheme.labletext}</label>
        </div>);
}

/*
props data
    {
        arrayIndex: 4,
        csstheme: {
          labletext: "Show Password",
          classname: "form-check-input",
          id: "cb_showpassword",
        },
      },
props 
    <BrewCheckBox
    ctl_Attribute={ctl_attribute.current[4]}
     handleOnClick={handleOnForCheckBox}
     ></BrewCheckBox>

function 
    const handleOnForCheckBox = (e) => {
    let ctl_id = e.target.id;
    switch (ctl_id) {
      case "cb_showpassword":
        fnCheckBoxForPassword(e, ctl_attribute.current[1]);
        setRenderLoginQuestion(!render_LoginQuestion)
        break;
    }
    }

callback function
function fnCheckBoxForPassword(event, props) {
    console.log(event.target.checked);
    console.log(props);
    if (event.target.checked == true) {
      props.csstheme.inputType = "text"
      return (props.csstheme.inputType)
    } else {
      props.csstheme.inputType = "password"
      return (props.csstheme.inputType)
    }
  }

*/