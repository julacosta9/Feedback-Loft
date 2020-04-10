
  // $.get("/api/getProjectAlgo").then(data => {
  //   console.log(data);
  // })

$( document ).ready(function() {
  $.ajax({
    crossOrigin: true,
    type: "GET",
    crossDomain: false,
    url: "/api/getProjectAlgo",
    success: function(data) {
      console.log(data);
    }
  });
});


// Creating array to hold projects
const projects = [];

// Used for workable data, creates simple objects
const newProject = (projectName, userGiven, userReceived, daysSinceComment) => {
  const project = {
    project: projectName,
    given: userGiven,
    received: userReceived,
    lastComment: daysSinceComment
  };
  projects.push(project);
  console.log(project);
  return project;
}

// Creating simple objects and push thwm into projects array
newProject("project 1", 6, 3, 1);
newProject("project 2", 2, 6, 4);
newProject("project 3", 8, 3, 3);
newProject("project 4", 1, 4, 15);
newProject("project 5", 13, 6, 1);
newProject("project 6", 24, 8, 4);
newProject("project 7", 1, 23, 14);
newProject("project 8", 56, 4, 9);

// Adds key value pair with a boolean that sets if the object is elgible to be commented
const checkElgibility = array => {
  array.forEach(obj => {
    obj.given < obj.received ? 
    obj.elgible = false :
    obj.elgible = true
    console.log(`Elgible: ${obj.elgible}`)
  });
};
checkElgibility(projects);

// Filters out unelgible projects and puts elgible ones into a new array
const sortElgibles = array => {
  const elgibles = array.filter(obj => {
    return (obj.elgible == true);
  })
  elgibles.forEach(obj => console.log(`Elgibles: ${obj.project}`));
  return elgibles;
}

// THis function goes through elgiple projects and decides which project should be chosen for review
const chooseProject = array => {
    // checks to see if a project has no comments, immediately returns first project with no comments
  for (let i = 0; i < array.length; i++) {
    if (array[i].lastComment === -1) {
      console.log(`Project: ${array[i]}`);
      return array[i];
    };
  };
    // Sorts projects by days since last commented, returns a new array with projects sorted from highest days to lowest days
  const sortedProjects = array.map((obj, i, arr) => {
    arr.sort((a, b) => {
      return b.lastComment - a.lastComment;
    });
  });
console.log(sortedProjects);
  const newArr = JSON.stringify(sortedProjects());
  console.log(`Sorted: ${newArr}`);
  return sortedProjects;
};

// Logging the actual function calls
console.log(chooseProject(sortElgibles(projects)));