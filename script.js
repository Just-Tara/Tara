document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const firstname = document.getElementById("first-name");
  const lastname = document.getElementById("last-name");
  const email = document.getElementById("email");
  const textarea = document.getElementById("textarea");
  const checkbox = document.getElementById("checkbox");
  const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkInput()) {
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
        location.reload(); 
      }, 3000); 
    }
  })

  function checkInput() {
    const isValid = [
      validateName(firstname),
      validateName(lastname, "This field is required"),
      validateEmail(email),
      validateMessage(textarea, "This field is required"),
      validateCheckbox(checkbox, "To submit this form, please consent to being contacted"),
      validateRadio(queryTypeInputs, "Please select a query type")
    ].every(Boolean);
    return isValid;
  }

  function validateName(input) {
    if (input.value.trim() === '') {
      setErrorFor(input, "This field is required");
      return false;
    } else {
      setSuccessFor(input);
      return true;
    }
  }

  function validateEmail(input) {
    if (input.value.trim() === '') {
      setErrorFor(input, "This field required");
      return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value.trim())) {
      setErrorFor(input, "Please enter a valid email");
      return false;
    } else {
      setSuccessFor(input);
      return true;
    }
  }

  function validateMessage(input, errorMessage) {
    if (input.value.trim() === '') {
      setErrorFor(input, errorMessage);
      return false;
    } else {
      setSuccessFor(input);
      return true;
    }
  }

  function validateCheckbox(input, errorMessage) {
    if (!input.checked) {
      setErrorFor(input, errorMessage);
      return false;
    } else {
      setSuccessFor(input);
      return true;
    }
  }

  function validateRadio(inputs, errorMessage) {
    if (!Array.from(inputs).some(input => input.checked)) {
      setErrorFor(inputs[0], errorMessage);
      return false;
    } else {
      setSuccessFor(inputs[0]);
      return true;
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.closest('.form-control');
    formControl.style.display = 'block';
    const small = formControl.querySelector('small');
    small.style.display = 'block';
    small.innerText = message;
    small.setAttribute('aria-invalid', 'true');
    formControl.className = 'form-control error';
  }

  function setSuccessFor(input) {
    const formControl = input.closest('.form-control');
    formControl.style.display = 'block';
    const small = formControl.querySelector('small');
    small.style.display = 'block';
    small.innerText = '';
    small.setAttribute('aria-invalid', 'false');
    formControl.className = 'form-control success';
  }
});