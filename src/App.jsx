
import './App.css';
import React, { useState } from "react";
import Question from "./Question";
import { JSJP } from "./asserts";
import { Dropdown } from 'primereact/dropdown';
import Loader from './ProgressSpinner';
import Execute from "./graphql/getQuestions";
import { AutoQuery, ClgQuery, Check } from "./graphql/getValues";
import Paginator
function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState({});
  const [propQuestions, setpropQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const call = () => {
    console.log(selectedDomain);
    if (selectedDomain.name === "Colleges") {
      ClgQuery(questions)
    }
    else {
      AutoQuery(questions)
    }
  }

  console.log(questions);

  return (
    <div className="App">
      <h1>
        MULTIDIMENSIONAL DATABASE SEARCH
      </h1>
      <Dropdown value={selectedDomain} options={domains} onChange={onDomainChange} optionLabel="name" placeholder="Select a Domain" />
      {
        loading ? < Loader></Loader> : 
        <Paginator first={basicFirst} rows={basicRows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onBasicPageChange}>
          {propQuestions.map((ele, id) => <Question update={(updatedQuestion) => Accomodate(updatedQuestion)} key={id} propertyName={ele.propertyName} propertyQuestion={ele.propertyQuestion} allowedValues={ele.allowedValues} displayOrder={ele.displayorder} displayType={ele.propertyDisplayType}></Question>)}
        </Paginator>
         
      }
<button onClick={call}>Submit</button>
    </div >
  );
}

export default App;
