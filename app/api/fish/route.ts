import { DB } from '@/data/firebaseApp'
import { Database, push, set, ref, get, remove } from 'firebase/database'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export interface FishRecord {
  id: string
  name: string
  type: string
  location: string
  lure: string
  total_length: number
  weight: number
  tracking_code: string
  images: string
  date_caught: Date
}

export interface CreateRecord {
  id: string
  name: string
  type: string
  location: string
  lure: string
  total_length: number
  weight: number
  tracking_code: string
  images: string
  date_caught: string
}

function isAdmin(token): boolean {
  return token && token.role === 'admin'
}

function isValidRecord(body): body is CreateRecord {
  return (
    body &&
    typeof body.name === 'string' &&
    typeof body.type === 'string' &&
    typeof body.location === 'string' &&
    typeof body.lure === 'string' &&
    typeof body.total_length === 'number' &&
    typeof body.weight === 'number' &&
    typeof body.tracking_code === 'string' &&
    typeof body.images === 'string' &&
    typeof body.date_caught === 'string'
  )
}

export async function GET() {
  try {
    const fishRef = ref(DB as Database, 'fish')
    const snapshot = await get(fishRef)
    const fishDataArray: CreateRecord[] = Object.values(snapshot.val())
    return NextResponse.json(fishDataArray)
  } catch {
    NextResponse.error()
  }
}

export async function POST(req) {
  const token = await getToken({ req })

  if (!token || !token.role) {
    return NextResponse.error()
  }

  const requestBody = await req.json()

  if (!isValidRecord(requestBody)) {
    return NextResponse.error()
  }

  try {
    const newFishRef = push(ref(DB as Database, 'fish'))
    await set(newFishRef, { ...requestBody, id: newFishRef.key })
    return NextResponse.json(newFishRef.key)
  } catch {
    return NextResponse.error()
  }
}

export async function PUT(req) {
  const token = await getToken({ req })

  if (!isAdmin(token)) {
    return NextResponse.error()
  }

  const requestBody = await req.json()

  if (!isValidRecord(requestBody) || typeof requestBody.id !== 'string') {
    return NextResponse.error()
  }

  try {
    const fishRef = ref(DB as Database, `fish/${requestBody.id}`)
    await set(fishRef, requestBody)
    return NextResponse.json('updated')
  } catch {
    return NextResponse.error()
  }
}

export async function DELETE(req) {
  const token = await getToken({ req })

  if (!isAdmin(token)) {
    return NextResponse.error()
  }

  const requestBody = await req.json()

  if (typeof requestBody !== 'string') {
    return NextResponse.error()
  }

  try {
    const fishRef = ref(DB as Database, `fish/${requestBody}`)
    await remove(fishRef)
    return NextResponse.json('deleted')
  } catch {
    return NextResponse.error()
  }
}
