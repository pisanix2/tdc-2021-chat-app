export const contractSave = (data, fn) => {
  console.log(`Connecting socket...`)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  fetch(`${process.env.REACT_APP_API_URL}/api/contact`, requestOptions)
    .then(response => response.json())
    .then(fn)
}

export const loadContactJoined = (contact_id, fn) => {
  fetch(
    `${process.env.REACT_APP_API_URL}/api/contact/${contact_id}/joined`
  )
    .then(res => res.json())
    .then(data => {
      fn(data)
    })
}