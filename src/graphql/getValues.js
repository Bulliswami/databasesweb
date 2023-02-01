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

