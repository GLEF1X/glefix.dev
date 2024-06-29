import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion, type HTMLMotionProps } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { headerNavLinks } from '~/data/headerNavLinks'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Link } from './Link'
import { MobileNavToggle } from './MobileNavToggle'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Header({ navShow, onToggleNav }: { onToggleNav: () => void; navShow: boolean }) {
  const router = useRouter()
  const currentPageInfo = headerNavLinks.find((l) => router.pathname.startsWith(l.href))
  const [hoveredLinkLabel, setHoveredLinkLabel] = useState(currentPageInfo?.label ?? '')

  useEffect(() => {
    setHoveredLinkLabel(currentPageInfo?.label ?? '')
  }, [router.pathname, currentPageInfo?.label])

  return (
    <nav className="supports-[backdrop-blur]:bg-white/95 sticky top-0 z-50 overflow-hidden bg-white/75 py-3 backdrop-blur dark:bg-dark/75">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label="Gleb's Blog">
          <div className="flex items-center justify-between" data-umami-event="logo">
            <div className="mr-3 flex items-center justify-center">
              <NextImage
                src="/static/images/logo.jpg"
                alt="Gleb's Blog logo"
                priority
                className="rounded-full"
                width={45}
                height={45}
              />
            </div>
          </div>
        </Link>
        <LayoutGroup>
          <div className="flex items-center">
            <div className="hidden sm:block">
              {headerNavLinks.map(({ href, label }) => {
                const isHovered = label === hoveredLinkLabel
                return (
                  <Link key={href} href={href} style={{ position: 'relative' }}>
                    <NavItem
                      isHovered={isHovered}
                      label={label}
                      onHoverStart={() => setHoveredLinkLabel(label)}
                      onHoverEnd={() => setHoveredLinkLabel(currentPageInfo?.label ?? '')}
                    />
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center pl-1 gap-1">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <MobileNavToggle navShow={navShow} onToggleNav={onToggleNav} />
            </div>
          </div>
        </LayoutGroup>
      </div>
    </nav>
  )
}

function NavItem({
  isHovered,
  label,
  ...rest
}: HTMLMotionProps<'span'> & { isHovered: boolean; label: string }) {
  const { t } = useTranslation('common')

  return (
    <motion.span className="p-5 font-medium rounded-md" {...rest}>
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            layoutId="nav"
            className={clsx(
              'absolute top-[-10px] left-0 right-0 p-5 rounded-md -z-10 bg-gray-200 dark:bg-gray-700'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>
      {t(label)}
    </motion.span>
  )
}
