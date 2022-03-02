fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    query: `query user($id: String) {
      user(id: $id) {
          id,
          name,
      }
  }`,
    variables: {
      id: '1',
    },
  }),
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data))
