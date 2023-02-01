
import './App.css';
import React, { useState, useEffect } from "react";
import Question from "./Question";
import { JSJP } from "./asserts";
import { Dropdown } from 'primereact/dropdown';
import Loader from './ProgressSpinner';
import Execute from "./graphql/getQuestions";
import { AutoQuery, ClgQuery } from "./graphql/getValues";
import getBookmarks from "./graphql/getBooks";
import AddBook from "./graphql/AddBook";
import DeleteBook from "./graphql/deleteBook";
import { InputText } from "primereact/inputtext";
import "./App.css";

import Table from "./Datatable";

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState({ name: "sd" });
  const [propQuestions, setpropQuestions] = useState([]);
  const [loadingquestions, setLoadingQuestions] = useState(true);
  const [loadingTable, setLoadingTable] = useState(null);
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState('');


  const [data, setData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmark, setBookmark] = useState({});
  const [bname, setBname] = useState('');
  const [bookmarkClicked, SetBookmarkClicked] = useState(false);
  const [hard, setHard] = useState(true);

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
    SetBookmarkClicked(false);
    setBname('');
    setBookmarks([]);
  }

  useEffect(() => {
    if (user !== '' && selectedDomain.name !== "sd") {
      getBookmarks(user, selectedDomain.name).then(res => setBookmarks(res.data.getBookmarks))
    }
  }, [user, selectedDomain])

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


  useEffect(() => {
    let res = [];
    propQuestions.forEach((ele) => {
      if (Object.keys(bookmark).includes(ele["propertyName"])) {
        let ny = {}
        let val = []
        ny["question"] = ele["propertyQuestion"];
        ny["property"] = ele["propertyName"];
        ny["qno"] = ele["displayorder"];
        bookmark[ele["propertyName"]].forEach((ite) => {
          let yn = {}
          yn["key"] = ite
          yn["name"] = ele.allowedValues.filter((iyt) => iyt.allowedValueCode === ite)[0].allowedValue;
          yn["val"] = ite
          val.push(yn);
        })
        ny["values"] = val;
        res.push(ny);
      }
    })
    setQuestions(res);
  }, [hard])

  const makeStr = () => {
    let str = '';
    questions.forEach(it => {
      for (let i = 0; i < it.values.length; i++) {
        str += (it["property"] + "=" + it["values"][i].val + ",")
      }
    })
    str = str.slice(0, str.length - 1);
    AddBook(user, selectedDomain.name, bname, str).then((res) => {
      if (res.data.Insertbookmark) {
        getBookmarks(user, selectedDomain.name).then(res => setBookmarks(res.data.getBookmarks)).then(() => {
          setBname('');
        })
      }
      else {
        alert("Sorry there is a bookmark with the same name please change it!");
      }
    });
  }

  const FilterOutAndSelect = (st) => {
    let oy = {};
    let vas = st.split(',').map(e => e.split('='));
    vas.forEach(e => {
      if (Object.keys(oy).includes(e[0])) {
        oy[e[0]].push(e[1])
      } else {
        oy[e[0]] = [e[1]]
      }
    });
    setBookmark(oy);
    SetBookmarkClicked(true);
    let Hard = !hard;
    setHard(Hard);
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
      <div className="sec-1">
        <InputText className='mar' placeholder='User' value={user} onChange={(e) => setUser(e.target.value)} disabled={selectedDomain.name !== "sd"} />
        <InputText className='mar' placeholder='Bookmark' value={bname} onChange={(e) => setBname(e.target.value)} disabled={selectedDomain.name === "sd" || user === ''} />
        <Dropdown className='mar' disabled={user === ''} value={selectedDomain} options={domains} onChange={onDomainChange} optionLabel="name" placeholder="Select a Domain" />
      </div>
      <div className='sec-2'>
        <button disabled={user === ''} onClick={resetUser}>Reset User</button>
        <button onClick={call} disabled={selectedDomain.name === "sd" || user === ''}>Fetch Answers</button>
        <button onClick={makeStr} disabled={bookmarks.length >= 5 || selectedDomain.name === "sd" || user === '' || bname === ''}>Add to Bookmark</button>
        <button onClick={() => {
          setQuestions([])
          setReset(true)
          setLoadingTable(null)
        }}
          disabled={selectedDomain.name === "sd" || user === ''}
        >Reset Choices</button>
      </div>

      <div className='sec-3'>
        <div style={{ color: "blue", background: "red" }}>Bookmarks</div>

        {
          bookmarks.map((ele, ind) => <div className='it' key={ind}><i onClick={() => {
            DeleteBook(user, selectedDomain.name, ele.bname).then(() => {
              getBookmarks(user, selectedDomain.name).then(res => setBookmarks(res.data.getBookmarks))
            })
          }} className="fa fa-trash"></i> <button key={ind} className='link' onClick={() => { FilterOutAndSelect(ele.bookmark) }}>{ele.bname}</button></div>)
        }
      </div>
      {
        user !== '' && selectedDomain.name !== "sd" && (loadingquestions ? < Loader></Loader> :
          <div className='fle'>
            {
              propQuestions.map((ele, id) => <Question key={id} reset={reset} afterSet={() => setReset(false)} bookmark={bookmark} bookmarkClicked={bookmarkClicked} update={(updatedQuestion) => Accomodate(updatedQuestion)} propertyName={ele.propertyName} propertyQuestion={ele.propertyQuestion} allowedValues={ele.allowedValues} displayOrder={ele.displayorder} displayType={ele.propertyDisplayType}></Question>)
            }
          </div>)
      }



      {loadingTable !== null ? (loadingTable ? <Loader></Loader> : <><p className='para'>Results</p> <div className='tab'><Table showGridlines size="small" dataItems={data} field1={selectedDomain.name === "Colleges" ? "name" : "autoID"} field2="url"></Table></div></>) : <></>}

      <p className='footer'>&copy;Designed by Bulli Swami Reddy Goluguri & Srujan Kumar Kondi</p>
    </div>
  );
}

export default App;
