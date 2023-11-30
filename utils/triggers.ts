import toast from 'react-hot-toast'

export async function handleDelete(url: string, { arg }) {
  try {
    await fetch(process.env.NEXT_PUBLIC_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    toast.success('its gone like the wind')
  } catch (err) {
    toast.error(`oof... ${err}`)
  }
}

export async function handleCreate(url: string, { arg }) {
  try {
    await fetch(process.env.NEXT_PUBLIC_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    toast.success('thank you for your important contribution')
  } catch (err) {
    toast.error(`oof... ${err}`)
  }
}

export async function handleUpdate(url: string, { arg }) {
  try {
    await fetch(process.env.NEXT_PUBLIC_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    toast.success('thank you for your important contribution')
  } catch (err) {
    toast.error(`oof... ${err}`)
  }
}
