// const MultiSelectComponent = (props) => {
//     const [selectedMulti, setMulti] = useState([]);
//     const onOptionChange = (e) => {
//         let tselectedMulti = [...selectedMulti];
//         let tind = tselectedMulti.map(it => it.val).indexOf(e.value[0].name);
//         if (tind !== -1) {
//             tselectedMulti.splice(tind, 1);
//         }
//         else {
//             tselectedMulti.push({ name: e.value[0].name, code: e.value[0].val, qno: e.value[0].displayOrder, question: e.value[0].question });
//         }
//         setMulti(tselectedMulti);
//     }

//     const options = props.allowedValues.map((ele, id) => {
//         return {
//             key: id,
//             name: ele.allowedValue,
//             val: ele.allowedValueCode,
//             displayOrder: props.displayOrder,
//             question: props.question
//         }
//     })
//     return <MultiSelect options={options} value={selectedMulti.map(e => e.name)} onChange={(e) => onOptionChange(e)} optionLabel="name" placeholder={props.question} display="chip" />

// }
// // {props.displayType === "multiselect" ? (<MultiSelectComponent displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues}></MultiSelectComponent>) : (<div></div>)}