


var clgquery = `query GetCollegeAnswers($graHas:[propertyans]) {
    getCollegePropertyAnswers(properties:$graHas){
        name
        url
      }
}`;
var autoquery = `query GetDet($graHas:[propertyans]) {
    getAutomobilePropertyAnswers(properties:$graHas){
        autoID
        url
      }
}`;

var query = `query GetDet($graHas:[Cu]) {
    Getand(iuy:$graHas){
       name
       url
      }
}`;

export async function AutoQuery(domain) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: autoquery,
            variables: { graHas: domain },
        })
    })
        .then(r => r.json())
        .then(data => console.log(data));
}

export async function ClgQuery(domain) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: clgquery,
            variables: { graHas: domain },
        })
    })
        .then(r => r.json())
        .then(data => data);
}

export async function Check(domain) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { graHas: domain },
        })
    })
        .then(r => r.json())
        .then(data => data);
}