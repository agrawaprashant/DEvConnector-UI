import React from "react";
import { updateObject, buildFormControl } from "../../../shared/utility";
import { checkValidity } from "../../../shared/checkInputValidity";
import InputWithIcon from "../../../components/UI/InputWithIcon/input-icon.component";
import classes from "./add-social.module.css";

class AddSocial extends React.Component {
  state = {
    socialLinksForm: {
      github: buildFormControl(
        "input",
        { type: "text", placeholder: "Github" },
        { value: "" },
        {},
        { iconClass: "fab fa-github" }
      ),
      linkedin: buildFormControl(
        "input",
        { type: "text", placeholder: "Linkedin" },
        { value: "" },
        {},
        { iconClass: "fab fa-linkedin" }
      ),
      twitter: buildFormControl(
        "input",
        { type: "text", placeholder: "Twitter" },
        { value: "" },
        {},
        { iconClass: "fab fa-twitter-square" }
      ),
      facebook: buildFormControl(
        "input",
        { type: "text", placeholder: "Facebook" },
        { value: "" },
        {},
        { iconClass: "fab fa-facebook-square" }
      ),
      instagram: buildFormControl(
        "input",
        { type: "text", placeholder: "Instagram" },
        { value: "" },
        {},
        { iconClass: "fab fa-instagram" }
      ),
      youtube: buildFormControl(
        "input",
        { type: "text", placeholder: "Youtube" },
        { value: "" },
        {},
        { iconClass: "fab fa-youtube" }
      ),
    },
  };
  inputChangedHandler = (event, controlName) => {
    let valid = checkValidity(
      event.target.value,
      this.state.socialLinksForm[controlName].validationRules
    );
    let updatedFormControl = updateObject(
      this.state.socialLinksForm[controlName],
      {
        value: event.target.value,
        valid: valid,
        touched: true,
      }
    );
    let updatedForm = updateObject(this.state.socialLinksForm, {
      [controlName]: updatedFormControl,
    });

    this.setState({ socialLinksForm: updatedForm });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    let formControls = [];
    for (let key in this.state.socialLinksForm) {
      formControls.push({
        controlName: key,
        elementType: this.state.socialLinksForm[key].elementType,
        elementConfig: this.state.socialLinksForm[key].elementConfig,
        value: this.state.socialLinksForm[key].value,
        valid: this.state.socialLinksForm[key].valid,
        touched: this.state.socialLinksForm[key].touched,
        styles: this.state.socialLinksForm[key].styles,
      });
    }
    let formElements = formControls.map((control) => {
      return (
        <InputWithIcon
          key={control.controlName}
          elementType={control.elementType}
          elementConfig={control.elementConfig}
          iconClass={control.styles.iconClass}
          valid={control.valid}
          value={control.value}
          touched={control.touched}
          changed={(event) =>
            this.inputChangedHandler(event, control.controlName)
          }
        />
      );
    });
    return (
      <form className={classes.SocialForm}>
        {formElements}
        <button disabled className={classes.SaveBtn}>
          Save
        </button>
      </form>
    );
  }
}

export default AddSocial;
