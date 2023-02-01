var query = `query AddBooks($userId:String!,$domainName:String!,$bookname:String!,$bookmark:String!) {
    Insertbookmark(userid:$userId,domainName:$domainName,bname:$bookname,bookmark:$bookmark)
}`;

export default async function Query(userId, domain, bookName, bookMark) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { userId: userId, domainName: domain, bookname: bookName, bookmark: bookMark },
        })
    })
        .then(r => r.json())
        .then(data => data);
}