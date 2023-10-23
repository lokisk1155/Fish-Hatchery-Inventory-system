'use client'
import React, { useState } from 'react'
import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { SessionUser } from 'interfaces/session'
import { PageHeader } from '@/components/PageHeader'
import { fishPageHeaderProps } from '@/data/pageHeader'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import AddRecord from './components/AddRecord'
import UpdateRecord from './components/UpdateRecord'
import { FishRecord } from 'app/api/fish/route'
import ModalContext from 'app/ModalContext'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data, error, isLoading } = useSWR(requestUrl, fetcher)
  const session = useSession()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<FishRecord>()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <ModalContext.Provider value={{ toggleModal, setModalProps }}>
        <PageHeader
          title={fishPageHeaderProps.title}
          description={fishPageHeaderProps.description}
        />
        <div className="flex flex-col items-center space-x-2">
          {isLoading || error ? (
            <Loading />
          ) : (
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
          )}
        </div>
        {isModalOpen && (
          <div
            onClick={toggleModal}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="">
              {modalProps ? <UpdateRecord fishData={modalProps} /> : <AddRecord />}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </>
  )
}
