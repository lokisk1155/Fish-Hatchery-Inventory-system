import LayoutWrapper from '@/components/LayoutWrapper'
import CustomLink from '@/components/Link'
import { PageHeader } from '@/components/PageHeader'
import { headerNavLinks } from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <LayoutWrapper>
      <PageHeader
        title={`${siteMetadata.title} Dashboard`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex flex-col items-start justify-evenly">
            {headerNavLinks.map(({ title, href }, index) => (
              <CustomLink href={href} key={index} className="hover:underline cursor-pointer mt-5">
                <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                  {title}
                </h1>
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
