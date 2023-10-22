import { getDB } from '@/data/firebaseApp'
import { Database, push, set, ref, get } from 'firebase/database'
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/options'
import { Role } from 'interfaces/session'

export interface FishRecord {
  id: number
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
  id: number
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

export async function GET() {
  try {
    const DB = await getDB()
    const fishRef = ref(DB as Database, 'fish')
    const snapshot = await get(fishRef)
    const fishDataArray: CreateRecord[] = Object.values(snapshot.val())
    return NextResponse.json(fishDataArray)
  } catch {
    NextResponse.error()
  }
}

function isValidRecord(body: any): body is CreateRecord {
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

export async function POST(req) {
  const token = await getToken({ req })

  if (!token || !token.role) {
    return NextResponse.error()
  }

  const requestBody = await req.json()

  if (!isValidRecord(requestBody)) {
    NextResponse.error()
  }

  try {
    const DB = await getDB()
    const newFishRef = push(ref(DB as Database, 'fish'))
    await set(newFishRef, requestBody)
    return NextResponse.json('good')
  } catch {
    NextResponse.error()
  }
}
