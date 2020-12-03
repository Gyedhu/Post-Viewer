const emailInput = document.querySelector("#email");
const submit = document.querySelector("#submit");
const loading = document.querySelector("#loading");

let data = null;

submit.onclick = async () => {

  const email = emailInput.value;

  if (email) {

    loading.style.top = "0";

    try {

      // fetching user data
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();

      // getting user email
      let userData = users.filter(user => user.email === email);
      userData = userData[0];

      // checking user is available or not
      if (userData) data = userData;
      else loading.innerHTML = "No user record found";
    }
    catch {
      loading.innerHTML = "Error while feching data";
    }
    finally {
      if (loading.innerHTML !== "Loading...") {
        setTimeout(() =>
          loading.style.top = "-100px",
          3000
        );
      } else {
        loading.style.top = "-100px";
      }
    }

  } else {
    loading.style.top = "0";
    loading.innerHTML = "Please enter an email";

    setTimeout(() => {
      loading.style.top = "-100px"
      loading.innerHTML = "Loading..."
    },
      3000
    );
  }

}
