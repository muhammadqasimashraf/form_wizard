let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(tabNumber) {
  // This function will display the specified tab of the form...
  let Numberoftabs = document.getElementsByClassName("tab");
  Numberoftabs[tabNumber].style.display = "block";
  let total = Numberoftabs.length;
  // console.log('The percentage of the',tabNumber,'tab is',100/total);
  let dividend = 100 / total;
  let percentage;
  if (dividend !== null) {
    for (let i = 1; i <= total; i++) {
      console.log(
        "The percentage of the  tab",
        tabNumber,
        "is",
        dividend * (tabNumber + 1)
      );
      percentage = dividend * (tabNumber + 1);
    }
  }
  //... and fix the Back/Next buttons whne they will be display and when the back button will not display
  if (tabNumber == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (tabNumber == Numberoftabs.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Continue";
  }
  //... and run a function that will display the correct step indicator:
  adjustProgressBarWidth(tabNumber, percentage);
}

function nextPrev(tabNumber) {
  console.log("back button tabnumber is", tabNumber);
  // This function will figure out which tab to display
  var Numberoftabs = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (tabNumber == 1 && !validateForm()) return false;
  // Hide the current tab:
  Numberoftabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + tabNumber;
  // if you have reached the end of the form...
  if (currentTab >= Numberoftabs.length) {
    // ... the form gets submitted:
    submitform();
    // document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
function validateForm() {
  // // This function deals with validation of the form fields
  let Numberoftabs,
    formInputs,
    i,
    valid = true;
  Numberoftabs = document.getElementsByClassName("tab");
  console.log("tabs are", Numberoftabs);
  formInputs = Numberoftabs[currentTab].getElementsByTagName("input");

  console.log("elements by tag name inputs are", formInputs);
  for (i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value == "") {
      formInputs[i].className += " invalid";
      console.log("After invalid");
      valid = false;
    }
  }
  return valid; // return the valid status
}
function adjustProgressBarWidth(tabNumber, percentage) {
  {
    let i = 0;
    if (i == 0) {
      i = 1;
      let elem = document.getElementById("myBar");
      let elem2 = document.getElementById("tick");
      let width = percentage;
      let id = setInterval(frame, 10);
      function frame() {
        if (width > percentage) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          // elem.innerHTML = width + "%";
          elem2.style.marginLeft = width + "%";
        }
      }
    }
  }
}
// storing and showing the data in the single object when the form is submitted
function submitform() {
  const form = document.getElementById("regForm");

  form.addEventListener("submit", callbackFunction);
  function callbackFunction(event) {
    event.preventDefault();
  }
  const formElement = document.querySelector("form");
  const formData = new FormData(formElement);
  console.log(formData);
  const formDataObj = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);
}
//function that takes all inputs and remove the invalidation class from them when user focus on the input fields
let inputs = document.getElementsByTagName("input");
[...inputs].forEach(function (input) {
  input.addEventListener("focus", function (event) {
    console.log("event is ", event);
    input.classList.remove("invalid");
  });
});
