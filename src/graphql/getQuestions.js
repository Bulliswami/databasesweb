
var query = `query GetPropertyQuestions($domainName:String) {
    getPropertyQuestions(domainName:$domainName){
        propertyQuestion
        propertyName
        allowedValues{
          allowedValue
          allowedValueCode
        }
        displayorder
        propertyDisplayType
      }
}`;

export default async function Query(domain) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { domainName: domain },
        })
    })
        .then(r => r.json())
        .then(data => data);
}
