/*
 * @module Validate - Module for handle validations
 *
 * @method registerForm - Method to be called by the register-form to do the validation
 * @return {Boolean}    - True if is valid, False if is invalid.
 *
 * @method shareForm - Method to be called by the share-form to do the validation
 * @return {Boolean} - True if is valid, False if is invalid.
 */

const Validate = (function () {
  /*
   * Check if a email input is valid.
   * @param  {String}  email - E-mail to be checked.
   * @return {Boolean}       - True if is valid, False if is invalid.
   */
  const isValidEmail = email => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email.toLowerCase());
  };

  /*
   * Check if a CPF input is valid.
   * @param  {String}  cpf - CPF to be checked.
   * @return {Boolean}     - True if is valid, False if is invalid.
   */
  const isValidCPF = cpf => {
    const pattern = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    return pattern.test(cpf);
  };

  /*
   * Check if a radios input group is valid.
   * @param {Array} radios - Array of radio input elements to be checked.
   * @return {Boolean} - True if is valid, False if is invalid.
   */
  const areValidRadios = radios => {
    let validation = false;
    radios.forEach(radio => {
      if (radio.checked) validation = true;
    });
    return validation;
  };

  // Clears the validation error view of text inputs when typing
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      input.parentElement.classList.remove("is-invalid");
    });
  });

  /*
   * Clears the validation error view of a radio input group when a radio is selected.
   * @param {Array} radios - Array of radio input elements to be cleared.
   */
  const cleanRadiosValidation = radios => {
    radios.forEach(radio => {
      radio.addEventListener("click", () => {
        radios.forEach(element => {
          element.parentElement.classList.remove("is-invalid");
        });
      });
    });
  };

  /*
   * Check if the register-form is valid
   * @return {Boolean} - True if is valid, False if is invalid.
   */
  const registerForm = () => {
    let validation = true;
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const cpf = document.querySelector("#cpf");
    const genderRadios = document.querySelectorAll('[name="gender"]');
    if (!name.value) {
      validation = false;
      name.parentElement.classList.add("is-invalid");
    }
    if (!isValidEmail(email.value)) {
      validation = false;
      email.parentElement.classList.add("is-invalid");
    }
    if (!isValidCPF(cpf.value)) {
      validation = false;
      cpf.parentElement.classList.add("is-invalid");
    }
    if (!areValidRadios(genderRadios)) {
      validation = false;
      genderRadios.forEach(radio => {
        radio.parentElement.classList.add("is-invalid");
      });
    }
    cleanRadiosValidation(genderRadios);
    return validation;
  };

  /*
   * Check if the share-form is valid
   * @return {Boolean} - True if is valid, False if is invalid.
   */
  const shareForm = () => {
    let validation = true;
    const friendName = document.querySelector("#friend-name");
    const friendEmail = document.querySelector("#friend-email");

    if (!friendName.value) {
      validation = false;
      friendName.parentElement.classList.add("is-invalid");
    }
    if (!isValidEmail(friendEmail.value)) {
      validation = false;
      friendEmail.parentElement.classList.add("is-invalid");
    }
    return validation;
  };
  return {
    registerForm,
    shareForm
  };
})();
