import React from "react";
import red from "@mui/material/colors/red";
import { Autocomplete } from "@mui/material";
import { ValidatorComponent } from "react-material-ui-form-validator";

const red300 = red["500"];

const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  position: "absolute",
  marginTop: "-25px"
};
const styleBorder = {
  border: `1px solid ${red300}`
};

class AutoComplateValidator extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      errorMessages,
      validators,
      requiredError,
      value,
      ...rest
    } = this.props;

    return (
      <div>
        <Autocomplete
          {...rest}
          ref={r => {
            this.input = r;
          }}
        />
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return <div style={style}>{this.getErrorMessage()}</div>;
  }
}

export default AutoComplateValidator;
