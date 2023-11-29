'use client'
import React, { useState } from 'react'
import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { PageHeader } from '@/components/PageHeader'
import { fishPageHeaderProps } from '@/data/pageHeader'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { FishRecord } from 'app/api/fish/route'
import ModalContext from 'app/ModalContext'
import FishRecordForm from './components/FishRecordForm'
import { SessionUser } from 'interfaces/session'
import LayoutWrapper from '@/components/LayoutWrapper'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data, error, isLoading } = useSWR(requestUrl, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 10000,
  })

  const { data: session } = useSession()

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
    <LayoutWrapper>
      <ModalContext.Provider value={{ toggleModal, setModalProps }}>
        <PageHeader
          title={fishPageHeaderProps.title}
          description={fishPageHeaderProps.description}
        />
        <div className="flex flex-col items-center space-x-2">
          {isLoading || error ? (
            <Loading />
          ) : (
            <Timeline
              recordedFishData={data}
              /* added user.role as an extra property on next auth's session */
              user={session?.user ? (session?.user as SessionUser) : null}
            />
          )}
        </div>
        {isModalOpen && (
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
              <FishRecordForm fishData={modalProps ? modalProps : null} close={close} />
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </LayoutWrapper>
  )
}
