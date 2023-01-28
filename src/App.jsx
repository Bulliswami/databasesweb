
import './App.css';
import React, { useState } from "react";
import Question from "./Question";
import { JSJP } from "./asserts";
import { Dropdown } from 'primereact/dropdown';
import Loader from './ProgressSpinner';
import Execute from "./graphql/getQuestions";
import { AutoQuery, ClgQuery, Check } from "./graphql/getValues";
import { Paginator } from "primereact/paginator";
function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState({});
  const [propQuestions, setpropQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const domains = [
    { name: 'Colleges', code: 'CY' },
    { name: 'Automobiles', code: 'AY' }
  ];

  const onDomainChange = (e) => {
    setSelectedDomain(e.value);
    setLoading(true);
    Execute(e.value.name).then((data) => {
      console.log(data.data.getPropertyQuestions);
      setpropQuestions(data.data.getPropertyQuestions);
    }).then(() => {
      setLoading(false);
      setQuestions([]);
    });
  }

  const Accomodate = (selectedQuestion) => {
    let orginalQuestions = JSJP(questions);
    let flag = 1;
    for (let y = 0; y < orginalQuestions.length; y++) {
      if (orginalQuestions[y].qno === selectedQuestion.qno) {
        flag = 0;
        orginalQuestions[y] = selectedQuestion;
        orginalQuestions[y].values = selectedQuestion.values
      }
    }
    if (flag === 1) {
      orginalQuestions.push(selectedQuestion);
    }
    setQuestions(orginalQuestions);
  }

  console.log(questions);

  const call = () => {
    console.log(selectedDomain);
    let lquestions = questions.filter(ques => ques.values.length !== 0);
    setQuestions(lquestions);
    if (selectedDomain.name === "Colleges") {
      ClgQuery(lquestions)
    }
    else {
      AutoQuery(lquestions)
    }
  }

  return (
    <div className="App">
      <h1>
        MULTIDIMENSIONAL DATABASE SEARCH
      </h1>
      <Dropdown value={selectedDomain} options={domains} onChange={onDomainChange} optionLabel="name" placeholder="Select a Domain" />
      {
        loading ? < Loader></Loader> :
          propQuestions.map((ele, id) => <Question update={(updatedQuestion) => Accomodate(updatedQuestion)} key={id} propertyName={ele.propertyName} propertyQuestion={ele.propertyQuestion} allowedValues={ele.allowedValues} displayOrder={ele.displayorder} displayType={ele.propertyDisplayType}></Question>)
      }
      {/* <Paginator first={first} rows={rows} totalRecords={propQuestions.length} onPageChange={(e) => {
        setFirst(e.first);
        setRows(e.rows);
      }}>
      </Paginator> */}
      <button onClick={call}>Submit</button>
    </div >
  );
}

export default App;
