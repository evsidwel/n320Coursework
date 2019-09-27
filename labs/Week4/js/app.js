let numBoxes = 6; // Set the number of boxes on the page

for (i = 1; i < numBoxes + 1; i++) {
  //generate boxes
  let newBox = document.createElement("article");
  newBox.addEventListener("mouseover", focus);
  newBox.addEventListener("mouseout", unfocus);
  newBox.addEventListener("click", hideIt);
  // newBox.addEventListener("mouseout", showIt);
  document.querySelector("#boxAppend").appendChild(newBox);
}
function focus(event) {
  //alert(event.target);
  //console.log(event);
  //console.log(event.target);
  event.target.classList.add("focus");
  event.target.classList.remove("unfocus");
}
function unfocus(event) {
  event.target.classList.add("unfocus");
  event.target.classList.remove("focus");
}
function hideIt(event) {
  //   console.log(event);
  //   console.log(event.target);
  event.target.classList.add("hidden");
  event.target.classList.remove("shown");
}
function showIt(event) {
  event.target.classList.remove("hidden");
  event.target.classList.add("shown");
}
