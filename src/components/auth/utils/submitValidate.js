export const submitValidate = (registerCredentials, setRegisterError) => {
  if (registerCredentials.firstName === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        firstName: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.lastName === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        lastName: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.password.length < 7) {
    setRegisterError((prev) => {
      return {
        ...prev,
        password: "Password should be more than 7 characters long",
      };
    });
  }

  if (registerCredentials.password === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        password: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.confirmPassword === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        confirmPassword: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.number === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        number: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.email === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        email: "This field cannot be empty",
      };
    });
  }

  if (registerCredentials.password !== registerCredentials.confirmPassword) {
    setRegisterError((prev) => {
      return {
        ...prev,
        confirmPassword: "Password donot match",
      };
    });
  }

  if (registerCredentials.address === "") {
    setRegisterError((prev) => {
      return {
        ...prev,
        address: "This field cannot be empty",
      };
    });
  }
};
