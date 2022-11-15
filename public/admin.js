const add_doctor_btn = document.getElementById("add-doctor-btn");
console.log(add_doctor_btn);
add_doctor_btn.addEventListener("click", () => {
  const form = document.getElementById("add-doctor-form");

  if (form.style.display === "none") {
    // 👇️ this SHOWS the form
    form.style.display = "block";
  } else {
    // 👇️ this HIDES the form
    form.style.display = "none";
  }
});

const url = "http://localhost:3000/";

// Doctors list btn
const view_doctors_btn = document.getElementById("view-doctors-btn");
view_doctors_btn.addEventListener("click", getDoctors);

async function getDoctors() {
  await axios
    .get("http://localhost:3000/doctors", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/doctors",
      },
    })
    .then(function (response) {
      console.log(response.data);
      var list = "<ul class='list-group'>";
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].name);
        list +=
          "<li class='list-group-item'>" + response.data[i].name + "</li>";
      }
      list += "</ul>";
      document.getElementById("doctors-list").innerHTML = list;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

// View Lab Techs
const view_lab_techs_btn = document.getElementById("view-lab-techs-btn");
view_lab_techs_btn.addEventListener("click", getLabTechs);

async function getLabTechs() {
  await axios
    .get("http://localhost:3000/lab_technicians", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/lab_technicians",
      },
    })
    .then(function (response) {
      console.log(response.data);
      var list = "<ul class='list-group'>";
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].name);
        list +=
          "<li class='list-group-item'>" + response.data[i].name + "</li>";
      }
      list += "</ul>";
      document.getElementById("lab-techs-list").innerHTML = list;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

// show appointment form
const appointment_form_btn = document.getElementById("appointment-form-btn");
appointment_form_btn.addEventListener("click", () => {
  const form = document.getElementById("appointment-form");

  if (form.style.display === "none") {
    // 👇️ this SHOWS the form
    form.style.display = "block";
  } else {
    // 👇️ this HIDES the form
    form.style.display = "none";
  }
});
