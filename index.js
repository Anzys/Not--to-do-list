// get form data on button click
// store data in a global array
// create a function to display all the data from the array to our entry list

let taskList = [];
let badList = [];
let invalidChars = ["+", "-", "e", "E"];

const hrsPerWeek = 168;

const invalid = document.querySelector(".hrs-input");
invalid.addEventListener("keydown", (e) => {
  invalidChars.includes(e.key) && e.preventDefault();
});
// top 3 divs
document.querySelector("#form-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const task = document.querySelector(".task-input").value;
  const hr = document.querySelector(".hrs-input").value;
  if (!task && !hr) return;

  const obj = {
    task,
    hr,
  };

  const totalAllocatedHrs = totalTaskHours();

  console.log(totalAllocatedHrs);
  if (totalAllocatedHrs + hr > hrsPerWeek) {
    return alert(
      "Sorry, your do not have enough time to add more taks this week"
    );
  }
  taskList.push(obj);

  displayTasks();
  totalTaskHours();
});
// display of entry lists
const displayTasks = () => {
  let str = "";
  taskList.map((item, i) => {
    str += `
        <tr>
        <td> ${i + 1}</td>
        <td> ${item.task}</td>
        <td> ${item.hr} hrs</td>
        <td class="text-end">
        <button onclick="deleteTask(${i})"class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button onclick="markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
        </td>
        </tr>
        `;
  });
  document.querySelector("#task-list").innerHTML = str;
};
// table of not to do lists
const displayBadTasks = () => {
  let str = "";
  badList.map((item, i) => {
    str += `
          <tr>
          <td> ${i + 1}</td>
          <td> ${item.task}</td>
          <td> ${item.hr} hrs</td>
          <td class="text-end">
          <button onclick="deleteBadTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
          <button onclick="markAsToDo(${i})"class="btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
          </td>
          </tr>
          `;
  });
  totalBadTaskHours();
  document.querySelector("#bad-list").innerHTML = str;
};
// entry to no to do
const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1);
  badList.push(item[0]);

  displayTasks();
  displayBadTasks();
};
// no to do to entry
const markAsToDo = (i) => {
  const item = badList.splice(i, 1);
  taskList.push(item[0]);

  displayTasks();
  displayBadTasks();
};
// delete entry lis tasks
const deleteTask = (i) => {
  if (window.confirm("Area you sure you want to delete this task?")) {
    taskList = taskList.filter((item, index) => index !== i);
    displayTasks();
    totalTaskHours();
  }
};
// delete not to list task
const deleteBadTask = (i) => {
  if (window.confirm("Area you sure you want to delete this task?")) {
    badList = badList.filter((item, index) => index !== i);
    displayBadTasks();
  }
};

// total bad task horus
const totalBadTaskHours = () => {
  const total = badList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalBadHrs").innerText = total;
  return total;
};

// total hours

const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalHrs").innerText = total + totalBadTaskHours();
  return total;
};
