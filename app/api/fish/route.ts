import { getDB } from '@/data/firebaseApp'
import { Database, push, ref } from 'firebase/database'
import { fishDataArray } from 'mockData/fish'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json(fishDataArray)
}
