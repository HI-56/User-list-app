async function fetchUsers() {
  console.log("fetching lowding...");

  let data;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await res.json();
  } catch (error) {
    console.log(`there is somting wrrong : ${error}`);
    data = [];
  }
  return data;
}

function filterUser(data) {
  let input = document.getElementById("input");
  data.forEach((e) => {
    let para = document.createElement("li");
    para.textContent = `id : ${e.id} | name =>  ${e.name} || email => ${e.email}`;
    dataContainer.appendChild(para);
  });
  input.addEventListener("input", () => {
    dataContainer.innerHTML = "";
    if (input.value === "") {
      dataContainer.innerHTML = "";
      data.forEach((e) => {
        let para = document.createElement("li");
        para.textContent = `id : ${e.id} | name =>  ${e.name} || email => ${e.email}`;
        dataContainer.appendChild(para);
      });
    } else {
      dataContainer.innerHTML = "";
      let newData = data.filter((a) => {
        return a.name.toLowerCase().includes(input.value.toLowerCase());
      });

      if (newData.length !== 0) {
        newData.forEach((e) => {
          let para = document.createElement("li");
          para.textContent = `id : ${e.id} | name =>  ${e.name} || email => ${e.email}`;
          dataContainer.appendChild(para);
        });
      } else if (newData.length === 0) {
        let para = document.createElement("li");
        para.textContent = "No users found";
        dataContainer.appendChild(para);
      }
    }
  });
}
const dataContainer = document.querySelector(".display-data");
dataContainer.textContent = "Loading...";

async function displayUsers() {
  let data = await fetchUsers();
  dataContainer.textContent = "";
  filterUser(data);
}
displayUsers();
