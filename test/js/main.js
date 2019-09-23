let result;
let resultArray;
let main = document.getElementById("main");

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);

xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState != 4) return;

  if (xhr.status != 200) {
    // обработать ошибку
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    result = JSON.parse(xhr.responseText);
    resultArray = result.results;
    render(resultArray);
  }
}

function render(array) {
  for (let i = 0; i < array.length; i++) {
    let avatar = document.createElement('div');
    avatar.className = "avatar";
    avatar.addEventListener('click', function () {
      let information = document.createElement('div');
      let button = document.createElement('button');
      button.innerHTML = "Закрыть";
      information.className = "informationTitle";
      information.innerHTML = `
            <ul>
              <li><img src=${resultArray[i].picture.large} alt="medium avatar"></li>
              <li>Улица: ${resultArray[i].location.street}</li>
              <li>Город: ${resultArray[i].location.city}</li>
              <li>Штат: ${resultArray[i].location.state}</li>
              <li>E-mail: ${resultArray[i].email}</li>
              <li>Телефон: ${resultArray[i].phone}</li>
            </ul>
            `;
      information.append(button);
      button.addEventListener('click', function () {
        information.remove();
      });
      main.append(information);
    });
    avatar.innerHTML = `<img src=${resultArray[i].picture.medium} alt="medium avatar">`;
    main.append(avatar);


    let title = document.createElement('div');
    title.className = "title";
    title.innerHTML = `<p>${resultArray[i].name.title}. 
                            <p>${resultArray[i].name.first}</p> 
                            <p>${resultArray[i].name.last}</p>`;
    avatar.append(title);
  }
}

function sort(array) {
  main.innerHTML = "";
  let newArray = array.sort(function (a, b) {
    if (a.name.last < b.name.last) return -1;
    if (a.name.last > b.name.last) return 1;
  });
  render(newArray);
}
function reverseSort(array) {
  main.innerHTML = "";
  let newArray = array.sort(function (a, b) {
    if (a.name.last > b.name.last) return -1;
    if (a.name.last < b.name.last) return 1;
  });
  render(newArray);
}

function changeSelect() {
  let select = document.getElementById("select").value;
  if (select === "0") {
    sort(resultArray);
  }
  if (select == "1") {
    reverseSort(resultArray);
  }
}