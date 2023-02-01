// query{
// deleteBookmark(userid:"swami",domainName:"Colleges",bname:"s3567")

// }
//userid:"swami",domainName:"Colleges",bname:"s3567"
var query = `query DeleteBookmark($userId:String!,$domainName:String!,$bname:String!) {
    deleteBookmark(userid:$userId,domainName:$domainName,bname:$bname)
}`;

export default async function Query(userId, domain, bookName) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { userId: userId, domainName: domain, bname: bookName},
        })
    })
        .then(r => r.json())
        .then(data => data);
}