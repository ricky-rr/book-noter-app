if (localStorage.object !== undefined) {
  var myLibrary = JSON.parse(localStorage.object);
} else {
  myLibrary = {
    titles: [],
    authors: [],
    pages: [],
    read: [],
  };
}

var container = document.getElementsByClassName("form");
var form = document.getElementById("mainform");
var plus = document.getElementsByClassName("icon-plus-sign");

container[0].style.visibility = "hidden";
form.style.visibility = "hidden";

function myListener(event) {
  var isClickInside = form.contains(event.target);
  if (!isClickInside) {
    formClose();
  }
}
var index;
function formClose() {
  form.style.visibility = "hidden";
  container[0].style.visibility = "hidden";
  plus[0].style.visibility = "visible";
  index = 1;
  let bin = document.getElementsByClassName("bin");
  bin[0].style.visibility = "visible";
  let num = localStorage.boxes + 1;
  for (i = 0; i < localStorage.boxes; i++) {
    let bin = document.getElementsByClassName("bin");
    if (index == 1) {
      bin[i].style.visibility = "visible";
    } else {
    }
  }
}

var numOpen = 0;

function formOpen() {
  numOpen += 1;
  container[0].style.visibility = "visible";
  form.style.visibility = "visible";
  plus[0].style.visibility = "hidden";
  document.addEventListener("click", myListener, true);
  index = 0;
  if (numOpen >= 1) {
    (function binIndex() {
      let num = localStorage.boxes;
      for (i = 0; i < num; i++) {
        let bin = document.getElementsByClassName("bin");
        if (index == 0) {
          bin[i].style.visibility = "hidden";
        } else {
        }
      }
    })();
  }
}

document.getElementById("add-book").onclick = function () {
  formOpen();
};

var submit = document.getElementById("submit");
var box = document.getElementById("container-1");

var containerNum = 0;

if (localStorage.boxes > 0) {
  for (i = 0; i < localStorage.boxes; i++) {
    containerNum += 1;
    concaten = "bin" + containerNum;
    var containerToInsert = document.createElement("div");
    containerToInsert.classList.add("container");
    containerToInsert.classList.add(concaten);
    const titleBox = document.createElement("div");
    titleBox.classList.add("content");
    titleBox.textContent = myLibrary.titles[i];
    const authorBox = document.createElement("div");
    authorBox.classList.add("content");
    authorBox.textContent = myLibrary.authors[i];
    const pagesBox = document.createElement("div");
    pagesBox.classList.add("content");
    pagesBox.textContent = `Pages: ${myLibrary.pages[i]}`;
    const readBox = document.createElement("div");
    readBox.classList.add("content");
    var yesNo = myLibrary.read[i] ? "Yes" : "No";
    readBox.textContent = `Read: ${yesNo}`;
    var bin = document.createElement("bin");
    bin.classList.add(concaten);
    bin.classList.add("bin");
    document.body.append(containerToInsert);
    containerToInsert.appendChild(titleBox);
    containerToInsert.appendChild(authorBox);
    containerToInsert.appendChild(pagesBox);
    containerToInsert.appendChild(readBox);
    containerToInsert.appendChild(bin);
  }
}

containerNum = 0;

function formToSubmit() {
  containerNum += 1;

  concaten = "bin" + containerNum;

  var containerToInsert = document.createElement("div");
  containerToInsert.classList.add("container");
  containerToInsert.classList.add(concaten);

  let author = document.getElementById("author").value;
  myLibrary.authors.push(author);

  let title = document.getElementById("title").value;
  myLibrary.titles.push(title);

  let pages = document.getElementById("pages").value;
  myLibrary.pages.push(Number(pages));

  let read = document.getElementById("checkbox");
  if (read.checked == true) {
    read = true;
  } else {
    read = false;
  }

  myLibrary.read.push(read);

  localStorage.object = JSON.stringify(myLibrary);

  document.body.append(containerToInsert);

  const titleBox = document.createElement("div");
  titleBox.classList.add("content");
  titleBox.textContent = title;
  const authorBox = document.createElement("div");
  authorBox.classList.add("content");
  authorBox.textContent = author;
  const pagesBox = document.createElement("div");
  pagesBox.classList.add("content");
  pagesBox.textContent = `Pages: ${pages}`;
  const readBox = document.createElement("div");
  readBox.classList.add("content");
  var yesNo = read ? "Yes" : "No";
  readBox.textContent = `Read: ${yesNo}`;
  var bin = document.createElement("bin");
  bin.classList.add(concaten);
  bin.classList.add("bin");

  containerToInsert.appendChild(titleBox);
  containerToInsert.appendChild(authorBox);
  containerToInsert.appendChild(pagesBox);
  containerToInsert.appendChild(readBox);
  containerToInsert.appendChild(bin);
  boxesCounter();
  formClose();
}

function boxesCounter() {
  if (typeof Storage !== "undefined") {
    if (localStorage.boxes) {
      localStorage.boxes = Number(localStorage.boxes) + 1;
    } else {
      localStorage.boxes = 1;
    }
  } else {
    document.getElementById("head").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}

function minusBoxesCounter() {
  if (typeof Storage !== "undefined") {
    if (localStorage.boxes) {
      localStorage.boxes = Number(localStorage.boxes) - 1;
    } else {
      localStorage.boxes = 1;
    }
  } else {
    document.getElementById("head").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}

var elements = document.getElementsByClassName("binContainer");

var binEmpty = function (event) {
  var containrName = event.target.className;
  var nameBox = containrName.substring(0, 4);
  console.log(containrName);
  console.log(nameBox);
  if (containrName.substring(5, 8) == "bin") {
    let containerIndex = Number(containrName[3]) - 1;
    myLibrary.authors.splice(containerIndex, 1);
    myLibrary.pages.splice(containerIndex, 1);
    myLibrary.read.splice(containerIndex, 1);
    myLibrary.titles.splice(containerIndex, 1);
    localStorage.object = JSON.stringify(myLibrary);
    minusBoxesCounter();
    [].forEach.call(document.querySelectorAll(`.${nameBox}`), function (el) {
      el.style.visibility = "hidden";
    });
    location.reload();
  }
};

document.addEventListener("click", binEmpty, false);
