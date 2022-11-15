import { RedesignVariant, useRedesignFlag } from 'featureFlags/flags/redesign'
import { darken } from 'polished'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components/macro'

const Wrapper = styled.button<{ bgColor?: string; isActive?: boolean; activeElement?: boolean; redesignFlag: boolean }>`
  align-items: center;
  background: ${({ isActive, theme, bgColor }) => (isActive ? bgColor ?? theme.rainbow : theme.unrainbow)};

  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  outline: none;
  padding: 0.4rem 0.4rem;
  width: 40px;
  height: 25px;
`

const turnOnToggle = keyframes`
  from {
    margin-left: 0em;
    margin-right: 1em;
  }
  to {
    margin-left: 1em;
    margin-right: 0em;
  }
`

const turnOffToggle = keyframes`
  from {
    margin-left: 1em;
    margin-right: 0em;
  }
  to {
    margin-left: 0em;
    margin-right: 1em;
  }
`

const ToggleElementHoverStyle = (hasBgColor: boolean, theme: any, isActive?: boolean) =>
  hasBgColor
    ? {
        opacity: '0.8',
      }
    : {
        background: isActive ? darken(0.05, theme.deprecated_primary1) : darken(0.05, theme.deprecated_bg4),
        color: isActive ? theme.deprecated_white : theme.deprecated_text3,
      }

const ToggleElement = styled.span<{ isActive?: boolean; bgColor?: string; isInitialToggleLoad?: boolean }>`
  animation: 0.1s
    ${({ isActive, isInitialToggleLoad }) => (isInitialToggleLoad ? 'none' : isActive ? turnOnToggle : turnOffToggle)}
    ease-in;
  background: ${({ theme, bgColor, isActive }) =>
    isActive ? bgColor ?? theme.deprecated_text1 : !!bgColor ? theme.deprecated_bg4 : theme.deprecated_text3};
  border-radius: 50%;
  height: 15px;
  // :hover {
  //   ${({ bgColor, theme, isActive }) => ToggleElementHoverStyle(!!bgColor, theme, isActive)}
  // }
  margin-left: ${({ isActive }) => (isActive ? '.8em' : '0em')};
  margin-right: ${({ isActive }) => (!isActive ? '.8em' : '0em')};
  width: 15px;
`

interface ToggleProps {
  id?: string
  bgColor?: string
  isActive: boolean
  toggle: () => void
}

export default function Toggle({ id, bgColor, isActive, toggle }: ToggleProps) {
  const [isInitialToggleLoad, setIsInitialToggleLoad] = useState(true)
  const redesignFlag = useRedesignFlag()
  const redesignFlagEnabled = redesignFlag === RedesignVariant.Enabled

  const switchToggle = () => {
    toggle()
    if (isInitialToggleLoad) setIsInitialToggleLoad(false)
  }

  return (
    <Wrapper id={id} isActive={isActive} onClick={switchToggle} redesignFlag={redesignFlagEnabled}>
      <ToggleElement isActive={isActive} bgColor={bgColor} isInitialToggleLoad={isInitialToggleLoad} />
    </Wrapper>
  )
}
