
import './App.css';
import React, { useState, useEffect } from "react";
import Question from "./Question";
import { JSJP } from "./asserts";
import { Dropdown } from 'primereact/dropdown';
import Loader from './ProgressSpinner';
import Execute from "./graphql/getQuestions";
import { AutoQuery, ClgQuery, Check } from "./graphql/getValues";
import getBookmarks from "./graphql/getBooks";
import { InputText } from "primereact/inputtext";
import "./App.css";
import { Paginator } from "primereact/paginator";
import Table from "./Datatable";
function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState({ name: "sd" });
  const [propQuestions, setpropQuestions] = useState([]);
  const [loadingquestions, setLoadingQuestions] = useState(true);
  const [loadingTable, setLoadingTable] = useState(null);
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [data, setData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const domains = [
    { name: 'Colleges', code: 'CY' },
    { name: 'Automobiles', code: 'AY' }
  ];

  const resetUser = () => {
    setQuestions([])
    setReset(true)
    setLoadingTable(null)
    setUser('');
    setSelectedDomain({ name: "sd" })
  }

  useEffect(() => {
    if (user !== '' && selectedDomain.name !== "sd") {
      getBookmarks(user, selectedDomain.name).then(res => setBookmarks(res.data.getBookmarks))
    }
  }, [user, selectedDomain])



  console.log(user);

  const onDomainChange = (e) => {

    setSelectedDomain(e.value);
    setLoadingTable(null);
    setLoadingQuestions(true);
    Execute(e.value.name).then((data) => {

      setpropQuestions(data.data.getPropertyQuestions);
    }).then(() => {
      setLoadingQuestions(false);
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
    orginalQuestions = orginalQuestions.filter(q => q.values.length !== 0);

    setQuestions(orginalQuestions);
  }



  const call = () => {
    setLoadingTable(true);
    let lquestions = questions.filter(ques => ques.values.length !== 0);
    setQuestions(lquestions);
    if (selectedDomain.name === "Colleges") {
      ClgQuery(lquestions).then(data => setData(data.data.getCollegePropertyAnswers)).then(setLoadingTable(false));
    }
    else {
      AutoQuery(lquestions).then(data => {

        setData(data.data.getAutomobilePropertyAnswers)
      }
      ).then(setLoadingTable(false))
    }
  }

  return (

    <div className="App">
      <h1>
        MULTIDIMENSIONAL DATABASE SEARCH
      </h1>
      <InputText value={user} onChange={(e) => setUser(e.target.value)} disabled={selectedDomain.name !== "sd"} />
      <Dropdown disabled={user === ''} value={selectedDomain} options={domains} onChange={onDomainChange} optionLabel="name" placeholder="Select a Domain" />
      <button disabled={user === ''} onClick={resetUser}>Reset User</button>
      <button onClick={call}>Fetch Answers</button>
      <button onClick={() => {
        setQuestions([])
        setReset(true)
        setLoadingTable(null)
      }}>Reset Choices</button>
      {
        bookmarks.map(ele => <button className='link' onClick={() => { console.log(ele.bookmark) }}>{ele.bname}</button>)
      }
      {
        user !== '' && selectedDomain.name !== "sd" && (loadingquestions ? < Loader></Loader> :
          <div className='fle'>
            {
              propQuestions.map((ele, id) => <Question reset={reset} afterSet={() => setReset(false)} update={(updatedQuestion) => Accomodate(updatedQuestion)} key={id} propertyName={ele.propertyName} propertyQuestion={ele.propertyQuestion} allowedValues={ele.allowedValues} displayOrder={ele.displayorder} displayType={ele.propertyDisplayType}></Question>)
            }
          </div>)
      }
      {/* <Paginator first={first} rows={rows} totalRecords={propQuestions.length} onPageChange={(e) => {
        setFirst(e.first);
        setRows(e.rows);
      }}>
      </Paginator> */}


      {loadingTable !== null ? (loadingTable ? <Loader></Loader> : <Table dataItems={data} field1={selectedDomain.name === "Colleges" ? "name" : "autoID"} field2="url"></Table>) : <></>}

    </div >
  );
}

export default App;
