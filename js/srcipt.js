
let subjectsTable = [];

const addNewSubject = (nameSubject) => {
  subjectsTable = [
    ...subjectsTable,
    {
      content: nameSubject,
      marks: [],
      testMarks: [],
      importanceMarks: [],
    },
  ];

  renderSubjects();
};

const addNewMark = (buttonIndex, mark, test, importance) => {
  subjectsTable[buttonIndex].marks.push(mark);
  subjectsTable[buttonIndex].testMarks.push(test);
  subjectsTable[buttonIndex].importanceMarks.push(importance);
};

const renderMarks = (subject) => {
  let marksHtmlContent = "";
  let i = 0;
  let backgroundColor;
  for (mark of subject.marks) {
    if (mark >= 1 && mark < 1.75) {
      backgroundColor = "list__item--mark--backgroundRed";
    } else if (mark >= 1.75 && mark < 2.75) {
      backgroundColor = "list__item--mark--backgroundViolet";
    } else if (mark >= 2.75 && mark < 3.75) {
      backgroundColor = "list__item--mark--backgroundYellow";
    } else if (mark >= 3.75 && mark < 4.75) {
      backgroundColor = "list__item--mark--backgroundBlue";
    } else if (mark >= 4.75 && mark < 5.75) {
      backgroundColor = "list__item--mark--backgroundGreen";
    } else {
      backgroundColor = "list__item--mark--backgroundGreenyYellow";
    }

    marksHtmlContent += `
        <li class="list__item--mark ${backgroundColor}">
          <div class="list__item--number">${mark}</div>
          <div class="list__item--test">${subject.testMarks[i]}</div>
          <button class="js-button--deleteMark list__item--buttonDeleteMark">Usuń</button>
        </li>
      `;
    i++;
  }
  return marksHtmlContent;
};

const calculateAverageMark = (subject) => {
  let sum = 0;
  let counter = 0;
  for (let i = 0; i < subject.marks.length; i++) {
    sum += subject.marks[i] * subject.importanceMarks[i];
    counter += subject.importanceMarks[i];
  }

  if (counter === 0) {
    return 0;
  } else {
    return (sum / counter).toFixed(2);
  }
};

const renderSubjects = () => {
  let subjectHtmlContent = "";

  for (const subject of subjectsTable) {
    let marksHtmlContent = renderMarks(subject);
    let averageMark = calculateAverageMark(subject);

    subjectHtmlContent += `
        <li>
          <div class="list__item--backgroundGrey">
            <p class="list__item--paragraph">${subject.content}</p>
            <p class="list__item--paragraph">Średnia: ${averageMark}</p>
            <p class="list__item--paragraph">Oceny</p>
          </div>
          <ul class="list--marks js-list--marks">
            ${marksHtmlContent}
            <button class="js-button--addMark list__item--buttonAddMark"></button>
          </ul>
        </li>
        <form class="js-form--addMark form--addMark"></form>
      `;
  }

  document.querySelector(".js-list").innerHTML = subjectHtmlContent;
  const buttonsRenderFormMark = document.querySelectorAll(".js-button--addMark");
  buttonsRenderFormMark.forEach((buttonRenderFormMark, buttonIndex) => {
    buttonRenderFormMark.addEventListener("click", onButtonRenderFormMark(buttonIndex));
  });
};

const onButtonRenderForm = () => {
  let formHtmlInput = "";
  formHtmlInput += `
          <p>
            <label>
              <span class="form__labelText">*Nazwa przedmiotu</span>
              <input class="js-nameSubject form__field" required>
            </label> 
          </p>
          <button class="form__button--addSubject">DODAJ PRZEDMIOT</button>
        `;
  document.querySelector(".js-form--addSubject").innerHTML = formHtmlInput;

  const formAddSubject = document.querySelector(".js-form--addSubject");
  formAddSubject.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameSubjectElement = document.querySelector(".js-nameSubject");
    const nameSubject = nameSubjectElement.value.trim();

    if (nameSubject !== "") {
      addNewSubject(nameSubject);
      nameSubjectElement.value = "";
    }
  });
};

const onButtonRenderFormMark = (buttonIndex) => {
  return () => {
    let formHtmlInput = "";
    formHtmlInput += `
    <p>
      <label>
        <span class="form__labelText">
          Ocena:
        </span>
        <select class="js-mark form__field">
          <option value="1">1</option>
          <option value="1.5">1+</option>
          <option value="1.75">2-</option>
          <option value="2">2</option>
          <option value="2.5">2+</option>
          <option value="2.75">3-</option>
          <option value="3">3</option>
          <option value="3.5">3+</option>
          <option value="3.75">4-</option>
          <option value="4">4</option>
          <option value="4.5">4+</option>
          <option value="4.75">5-</option>
          <option value="5">5</option>
          <option value="5.5">5+</option>
          <option value="5.75">6-</option>
          <option value="6">6</option>
        </select> 
      </label>
    </p>
    <p>
      <label>
        <span class="form__labelText">
          *Otrzmano za:
        </span>
        <input class="js-test form__field" required>
      </label>
    </p>
    <p>
      <label>
        <span class="form__labelText">
          Waga oceny:
        </span>
        <select class="js-importance form__field">
          <option value="1">1</option>
          <option value="2">2</option>
        </select> 
      </label>
    </p>
    <button class="form__button--addMark">DODAJ OCENĘ</button>
  `;

    const formAddMark = document.querySelectorAll(".js-form--addMark")[buttonIndex];
    formAddMark.innerHTML = formHtmlInput;
    formAddMark.addEventListener("submit", (event) => {
      event.preventDefault();
      const markElement = formAddMark.querySelector(".js-mark");
      const mark = Number(markElement.value);
      const testElement = formAddMark.querySelector(".js-test");
      const test = testElement.value.trim();
      const importanceElement = formAddMark.querySelector(".js-importance");
      const importance = Number(importanceElement.value);

      if (test !== "") {
        addNewMark(buttonIndex, mark, test, importance);
      }

      renderSubjects();
    });
  }
}

const init = () => {
  renderSubjects();
  const buttonRenderFormSubject = document.querySelector(".js-button--renderFormSubject");
  buttonRenderFormSubject.addEventListener("click", onButtonRenderForm);
}

init();
