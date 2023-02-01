var query = `query GetBooks($userId:String!,$domainName:String!) {
	getBookmarks(userid:$userId,domainName:$domainName){ 
        bookmark
  	    bname
  }
}`;

export default async function Query(userId, domain) {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { userId: userId, domainName: domain },
        })
    })
        .then(r => r.json())
        .then(data => data);
}