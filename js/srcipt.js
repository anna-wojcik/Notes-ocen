
let subjectsTable = [
  {
    content: "Polski",
    marks: [4, 2, 5],
    testMarks: ["Aktywność", "Sprawdzian", "Kartkówka"],
  },
];
const addNewSubject = (nameSubject) => {
  subjectsTable = [
    ...subjectsTable,
    {
      content: nameSubject,
      marks: [],
      testMarks: [],
    },
  ];

  renderSubjects();
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
      `;
  }

  document.querySelector(".js-list").innerHTML = subjectHtmlContent;
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


const init = () => {
  renderSubjects();
  const buttonRenderFormSubject = document.querySelector(".js-button--renderFormSubject");
  buttonRenderFormSubject.addEventListener("click", onButtonRenderForm);
}

init();
