// eslint-disable-next-line no-restricted-imports
import { t, Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import FeatureFlagModal from 'components/FeatureFlagModal/FeatureFlagModal'
import { PrivacyPolicyModal } from 'components/PrivacyPolicy'
import { L2_CHAIN_IDS } from 'constants/chains'
import { LOCALE_LABEL, SUPPORTED_LOCALES, SupportedLocale } from 'constants/locales'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { useLocationLinkProps } from 'hooks/useLocationLinkProps'
import { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Check, ChevronLeft, Globe, HelpCircle, Info, MessageCircle } from 'react-feather'
import { Link } from 'react-router-dom'
import { useDarkModeManager } from 'state/user/hooks'
import styled, { css } from 'styled-components/macro'

import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useModalIsOpen, useToggleModal } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import { ExternalLink } from '../../theme'
import { ButtonPrimary } from '../Button'

export enum FlyoutAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.deprecated_text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  background-color: #3b3c4e;
  padding: 0.15rem 0.5rem;
  border-radius: 12px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
`

const UNIbutton = styled(ButtonPrimary)`
  background-color: ${({ theme }) => theme.deprecated_bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
  border: none;
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span<{ flyoutAlignment?: FlyoutAlignment }>`
  min-width: 196px;
  max-height: 400px;
  overflow: auto;
  background-color: ${({ theme }) => theme.deprecated_bg1};
  box-shadow: 0px 6px 20px #0e0c14;
  border: 1px solid #282533;
  border-radius: 20px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 3rem;
  z-index: 100;
  ::-webkit-scrollbar {
    width: 0;
  }

  ${({ flyoutAlignment = FlyoutAlignment.RIGHT }) =>
    flyoutAlignment === FlyoutAlignment.RIGHT
      ? css`
          right: 0rem;
        `
      : css`
          left: 0rem;
        `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    bottom: unset;
    right: 0;
    left: unset;
  `};
`

const MenuItem = styled(ExternalLink)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  gap: 1rem;
  color: ${({ theme }) => theme.deprecated_text2};
  :hover {
    color: ${({ theme }) => theme.deprecated_text1};
    cursor: pointer;
    text-decoration: none;
  }
`

const InternalMenuItem = styled(Link)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.deprecated_text2};
  :hover {
    color: ${({ theme }) => theme.deprecated_text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const InternalLinkMenuItem = styled(InternalMenuItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.deprecated_text1};
    cursor: pointer;
    text-decoration: none;
  }
`

const ToggleMenuItem = styled.button`
  text-align: left;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex: 1;
  gap: 1rem;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.deprecated_text2};
  :hover {
    color: ${({ theme }) => theme.deprecated_text1};
    cursor: pointer;
    text-decoration: none;
  }
`

function LanguageMenuItem({ locale, active, key }: { locale: SupportedLocale; active: boolean; key: string }) {
  const { to, onClick } = useLocationLinkProps(locale)

  if (!to) return null

  return (
    <InternalLinkMenuItem onClick={onClick} key={key} to={to}>
      <div>{LOCALE_LABEL[locale]}</div>
      {active && <Check opacity={0.6} size={16} />}
    </InternalLinkMenuItem>
  )
}

function LanguageMenu({ close }: { close: () => void }) {
  const activeLocale = useActiveLocale()

  return (
    <MenuFlyout>
      <ToggleMenuItem onClick={close}>
        <ChevronLeft size={16} />
      </ToggleMenuItem>
      {SUPPORTED_LOCALES.map((locale) => (
        <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
      ))}
    </MenuFlyout>
  )
}

export default function Menu() {
  const { account, chainId } = useWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalIsOpen(ApplicationModal.MENU)
  const toggleMenu = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggleMenu : undefined)
  const togglePrivacyPolicy = useToggleModal(ApplicationModal.PRIVACY_POLICY)
  const openFeatureFlagsModal = useToggleModal(ApplicationModal.FEATURE_FLAGS)
  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  const showUNIClaimOption = Boolean(!!account && !!chainId && !L2_CHAIN_IDS.includes(chainId))

  const [darkMode, toggleDarkMode] = useDarkModeManager()

  const [menu, setMenu] = useState<'main' | 'lang'>('main')

  useEffect(() => {
    setMenu('main')
  }, [open])

  return (
    <>
      {/* // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
      <StyledMenu ref={node as any}>
        <StyledMenuButton onClick={toggleMenu} aria-label={t`Menu`}>
          <StyledMenuIcon />
        </StyledMenuButton>

        {open &&
          (() => {
            switch (menu) {
              case 'lang':
                return <LanguageMenu close={() => setMenu('main')} />
              case 'main':
              default:
                return (
                  <MenuFlyout>
                    <MenuItem href="https://uniswap.org/">
                      <Info opacity={0.6} size={16} />
                      <div>
                        <Trans>About</Trans>
                      </div>
                    </MenuItem>
                    <MenuItem href="https://help.uniswap.org/">
                      <HelpCircle opacity={0.6} size={16} />
                      <div>
                        <Trans>Help Center</Trans>
                      </div>
                    </MenuItem>
                    {/* <MenuItem href="https://uniswap.canny.io/feature-requests">
                      <Coffee opacity={0.6} size={16} />
                      <div>
                        <Trans>Request Features</Trans>
                      </div>
                    </MenuItem> */}
                    <MenuItem href="https://discord.gg/EQHqDab8Mj">
                      <MessageCircle opacity={0.6} size={16} />
                      <div>
                        <Trans>Discord</Trans>
                      </div>
                    </MenuItem>
                    <ToggleMenuItem onClick={() => setMenu('lang')}>
                      <Globe opacity={0.6} size={16} />
                      <div>
                        <Trans>Language</Trans>
                      </div>
                    </ToggleMenuItem>
                    {/* <ToggleMenuItem onClick={() => toggleDarkMode()}>
                      <div>{darkMode ? <Trans>Light Theme</Trans> : <Trans>Dark Theme</Trans>}</div>
                      {darkMode ? <Moon opacity={0.6} size={16} /> : <Sun opacity={0.6} size={16} />}
                    </ToggleMenuItem> */}
                    {/* <MenuItem href="https://docs.uniswap.org/">
                      <BookOpen opacity={0.6} size={16} />
                      <div>
                        <Trans>Docs</Trans>
                      </div>
                    </MenuItem> */}
                    {/* <ToggleMenuItem onClick={() => togglePrivacyPolicy()}>
                      <FileText opacity={0.6} size={16} />
                      <div>
                        <Trans>Legal & Privacy</Trans>
                      </div>
                    </ToggleMenuItem> */}
                    {/* {(isDevelopmentEnv() || isStagingEnv()) && (
                      <ToggleMenuItem onClick={openFeatureFlagsModal}>
                        <Flag opacity={0.6} size={16} /> Feature Flags
                      </ToggleMenuItem>
                    )} */}
                    {/* {showUNIClaimOption && (
                      <UNIbutton
                        onClick={openClaimModal}
                        padding="8px 16px"
                        width="100%"
                        $borderRadius="12px"
                        mt="0.5rem"
                      >
                        <Trans>Claim UNI</Trans>
                      </UNIbutton>
                    )} */}
                  </MenuFlyout>
                )
            }
          })()}
      </StyledMenu>
      <PrivacyPolicyModal />
      <FeatureFlagModal />
    </>
  )
}

interface NewMenuProps {
  flyoutAlignment?: FlyoutAlignment
  ToggleUI?: FunctionComponent<PropsWithChildren<unknown>>
  menuItems: {
    content: any
    link: string
    external: boolean
  }[]
}

const NewMenuFlyout = styled(MenuFlyout)`
  top: 3rem !important;
`
const NewMenuItem = styled(InternalMenuItem)`
  width: max-content;
  text-decoration: none;
`

const ExternalMenuItem = styled(MenuItem)`
  width: max-content;
  text-decoration: none;
`

export const NewMenu = ({ flyoutAlignment = FlyoutAlignment.RIGHT, ToggleUI, menuItems, ...rest }: NewMenuProps) => {
  const node = useRef<HTMLDivElement>()
  const open = useModalIsOpen(ApplicationModal.POOL_OVERVIEW_OPTIONS)
  const toggle = useToggleModal(ApplicationModal.POOL_OVERVIEW_OPTIONS)
  useOnClickOutside(node, open ? toggle : undefined)
  const ToggleElement = ToggleUI || StyledMenuIcon
  return (
    <StyledMenu ref={node as any} {...rest}>
      <ToggleElement onClick={toggle} />
      {open && (
        <NewMenuFlyout flyoutAlignment={flyoutAlignment}>
          {menuItems.map(({ content, link, external }, i) =>
            external ? (
              <ExternalMenuItem href={link} key={i}>
                {content}
              </ExternalMenuItem>
            ) : (
              <NewMenuItem to={link} key={i}>
                {content}
              </NewMenuItem>
            )
          )}
        </NewMenuFlyout>
      )}
    </StyledMenu>
  )
}
