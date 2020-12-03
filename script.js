const emailInput = document.querySelector("#email");
const submit = document.querySelector("#submit");
const loading = document.querySelector("#loading");

const form = document.querySelector(".container");
const profileContainer = document.querySelector(".profile-container");
const postContainer = document.querySelector(".post-box");

let data = null;

const loadPost = function (posts) {

  for (let post of posts) {

    const postBox = document.createElement("div");
    postBox.classList.add("post");

    let title = document.createElement("p");
    title.innerText = post.title;
    postBox.appendChild(title);

    let content = document.createElement("p");
    content.innerText = post.body;
    postBox.appendChild(content);

    postContainer.appendChild(postBox);
  }

}

const fetchPost = async function () {
  loading.style.top = "0";
  loading.innerHTML = "Fetching posts";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    const userPost = posts.filter(post => post.userId === data.id);
    loadPost(userPost);
    loading.innerHTML = "Done";

  } catch (error) {
    console.log(error);
    loading.innerHTML = "Error while fetching posts";
  }
  finally {
    if (loading.innerHTML !== "Loading...") {
      setTimeout(() =>
        loading.style.top = "-100px",
        2000
      );
    } else {
      loading.style.top = "-100px";
    }
  }
}

const loadProfile = function () {
  document.querySelector(".image").style.backgroundImage = "url('https://robohash.org/" + data.name + "')";
  document.querySelector(".user-info p:nth-child(1)").innerHTML = data.name;
  document.querySelector(".user-info p:nth-child(2)").innerHTML = data.email;
  fetchPost();
}

const gotoForm = function () {
  form.style.display = "flex";
  profileContainer.style.display = "none";
}

const gotoProfile = function () {
  form.style.display = "none";
  profileContainer.style.display = "flex";

  loadProfile();
}

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
      userData = userData[0]

      // checking user is available or not
      if (userData) {
        data = userData;
        gotoProfile();
      }
      else loading.innerHTML = "No user record found";
    }
    catch {
      loading.innerHTML = "Error while feching data";
    }
    finally {
      if (loading.innerHTML !== "Loading...") {
        setTimeout(() =>
          loading.style.top = "-100px",
          2000
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
      2000
    );
  }
}  
