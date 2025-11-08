"use strict";

// 🌸 1. Restore saved data if it exists (so user doesn't lose progress)
const saved = JSON.parse(localStorage.getItem("portfolioData") || "{}");
if (saved.name) document.getElementById("name").value = saved.name;
if (saved.title) document.getElementById("title").value = saved.title;
if (saved.about) document.getElementById("about").value = saved.about;
if (saved.skills)
  document.getElementById("skills").value = saved.skills.join(", ");
if (saved.projects) {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = ""; // clear existing
  saved.projects.forEach((proj) => {
    const newProject = document.createElement("div");
    newProject.classList.add("projectInput");
    newProject.innerHTML = `
      <input type="text" placeholder="Project Title" class="projectTitle" value="${proj.title}">
      <textarea placeholder="Project Description" class="projectDescription">${proj.description}</textarea>
    `;
    container.appendChild(newProject);
  });
}

// 🌸 2. Add “Add Project” button functionality
document.getElementById("addProject").addEventListener("click", () => {
  const container = document.getElementById("projectsContainer");
  const newProject = document.createElement("div");
  newProject.classList.add("projectInput");
  newProject.innerHTML = `
    <input type="text" placeholder="Project Title" class="projectTitle">
    <textarea placeholder="Project Description" class="projectDescription"></textarea>
  `;
  container.appendChild(newProject);
});

// 🌸 3. Handle form submission
document
  .getElementById("portfolioForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic text inputs
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const about = document.getElementById("about").value;
    const skills = document.getElementById("skills").value.split(",");

    // Optional photo upload
    const photoInput = document.getElementById("photo");
    let photoURL = "";

    if (photoInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        photoURL = e.target.result;
        saveData();
      };
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      saveData();
    }

    // Save all data to localStorage
    function saveData() {
      const projectElements = document.querySelectorAll(".projectInput");
      const projects = Array.from(projectElements).map((proj) => ({
        title: proj.querySelector(".projectTitle").value,
        description: proj.querySelector(".projectDescription").value,
      }));

      const portfolioData = { name, title, about, skills, photoURL, projects };
      localStorage.setItem("portfolioData", JSON.stringify(portfolioData));

      // Redirect to preview page
      window.location.href = "preview.html";
    }
  });

document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("portfolioPreview");
  const options = {
    margin: 10,
    filename: `${data.name || "portfolio"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(options).from(element).save();
});
