const emailInput = document.querySelector("#email");
const submit = document.querySelector("#submit");

submit.onclick = () => {

  const email = emailInput.value;

  if (email) {
    alert(email);
  } else {
    alert("Please enter an email");
  }

}
