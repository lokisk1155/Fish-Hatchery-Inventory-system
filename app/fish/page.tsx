'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { SessionUser } from 'interfaces/session'
import { PageHeader } from '@/components/PageHeader'
import { fishPageHeaderProps } from '@/data/pageHeader'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'
import { FishRecord } from 'app/api/fish/route'
import ModalContext from 'app/ModalContext'
import FishRecordForm from './components/FishRecordForm'
import { onValue, ref } from 'firebase/database'
import { DB } from '@/data/firebaseApp'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data, error, isLoading } = useSWR(requestUrl, fetcher, { refreshInterval: 1000 })
  const [fishData, setFishData] = useState([])
  const session = useSession()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<FishRecord>()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const close = () => {
    setModalProps(undefined)
    toggleModal()
  }

  return (
    <>
      <ModalContext.Provider value={{ toggleModal, setModalProps }}>
        <PageHeader
          title={fishPageHeaderProps.title}
          description={fishPageHeaderProps.description}
        />
        <div className="flex flex-col items-center space-x-2">
          {data !== undefined ? (
            <>
              <Timeline
                recordedFishData={data}
                user={
                  session && session.data && session.data.user
                    ? (session.data.user as SessionUser)
                    : null
                }
              />
            </>
          ) : (
            <Loading />
          )}
        </div>
        {isModalOpen && session.data && session.data.user && session.data.user.email && (
          <div
            aria-hidden="true"
            onClick={() => close()}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          >
            {/* eslint-disable-next-line */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-h-[80%] overflow-scroll"
            >
              <FishRecordForm
                fishData={modalProps ? modalProps : null}
                author_email={session.data.user.email}
                close={close}
              />
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </>
  )
}
