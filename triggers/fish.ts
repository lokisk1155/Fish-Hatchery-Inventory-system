export async function handleDelete(url: string, { arg }) {
  return await fetch(process.env.NEXT_PUBLIC_URL + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

export async function handleCreate(url: string, { arg }) {
  return await fetch(process.env.NEXT_PUBLIC_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

export async function handleUpdate(url: string, { arg }) {
  return await fetch(process.env.NEXT_PUBLIC_URL + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}
