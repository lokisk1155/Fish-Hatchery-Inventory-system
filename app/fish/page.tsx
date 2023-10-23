'use client'
import React, { useState, MouseEvent } from 'react'
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

  const close = () => {
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
        {isModalOpen && session.data && session.data.user && session.data.user.email && (
          <div
            aria-hidden="true"
            onClick={() => close()}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="flex flex-col items-center justify-center bg-white dark:bg-black p-6 rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2">
              {modalProps ? (
                <UpdateRecord fishData={modalProps} author_email={session.data.user.email} />
              ) : (
                <AddRecord author_email={session.data.user.email} />
              )}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </>
  )
}
