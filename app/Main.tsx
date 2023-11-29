import LayoutWrapper from '@/components/LayoutWrapper'
import CustomLink from '@/components/Link'
import { PageHeader } from '@/components/PageHeader'
import { fishImages, fishTypes } from '@/data/fishTypes'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <LayoutWrapper>
      <PageHeader title={'Who We Are'} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 flex items-center justify-center ">
          <div className="flex flex-row flex-wrap items-center justify-evenly w-full md:w-[75%]">
            {fishTypes.map((fishType) => (
              <CustomLink
                className="flex flex-col items-center border-2 p-5 m-5"
                href={`/fish?type=${fishType}`}
                key={fishType}
              >
                <img
                  src={fishImages[fishType]}
                  alt={fishType}
                  className="h-40 w-40 object-cover" // Ensure images are of fixed height and width
                />
                <p className="text-center mt-2">{fishType}</p>
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
