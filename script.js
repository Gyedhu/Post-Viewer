const emailInput = document.querySelector("#email");
const submit = document.querySelector("#submit");

submit.onclick = async () => {

  const email = emailInput.value;

  if (email) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();

      let userData = users.filter(user => user.email === email);
      userData = userData[0]; 

    } catch  {
      alert("Error");
    }

  } else {
    alert("Please enter an email");
  }

}
