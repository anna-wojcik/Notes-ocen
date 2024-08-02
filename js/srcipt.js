
let subjectsTable = [
  {
    content: "Polski",
    marks: [4, 2, 5],
    testMarks: ["Aktywność", "Sprawdzian", "Kartkówka"],
    importanceMarks: [1, 2, 1],
  },
  {
    content: "Matematyka",
    marks: [4, 5, 5],
    testMarks: ["Aktywność", "Sprawdzian", "Kartkówka"],
    importanceMarks: [1, 2, 2],
  },
];

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
  for (mark of subject.marks) {
    marksHtmlContent += `
        <li class="list__item--mark">
          <div class="list__item--number">${mark}</div>
          <div class="list__item--test">${subject.testMarks[i]}</div>
          <button class="js-button--deleteMark list__item--buttonDeleteMark">Usuń</button>
        </li>
      `;
    i++;
  }
  return marksHtmlContent;
}

const renderSubjects = () => {
  let subjectHtmlContent = "";

  for (const subject of subjectsTable) {
    let marksHtmlContent = renderMarks(subject);
    subjectHtmlContent += `
        <li class="list__item--subject">
          <p class="list__item--paragraph">${subject.content}</p>
          <p class="list__item--paragraph">Średnia: </p>
          <p class="list__item--paragraph">Oceny</p>
          <ul class="list--marks js-list--marks">
            ${marksHtmlContent}
            <button class="js-button--addMark list__item--buttonAddMark"></button>
          </ul>
        </li>
        <form class="js-form--addMark"></form>
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
            <input class="js-nameSubject" placeholder="Nazwa przedmiotu"> 
            <button>Dodaj</button>
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
      Ocena
        <select class="js-mark">
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
      <input class="js-test" required placeholder="*Otrzmano za">
    </p>
    <p>
      <label>
      Waga oceny
        <select class="js-importance">
        <option value="1">1</option>
        <option value="2">2</option>
      </select> 
    </label>
    </p>
    <button>Dodaj</button>
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
