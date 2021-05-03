import React from 'react'

import Badge, { BadgeVariant } from 'components/Badge'
import styled from 'styled-components'

import { MouseoverTooltip } from '../../components/Tooltip'
import { useTranslation } from 'react-i18next'
import { AlertCircle } from 'react-feather'

const BadgeWrapper = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
`

const BadgeText = styled.div`
  font-weight: 500;
  font-size: 14px;
`

const ActiveDot = styled.span`
  background-color: ${({ theme }) => theme.success};
  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin-right: 4px;
`

export const DarkBadge = styled.div`
  width: fit-content;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bg0};
  padding: 4px 6px;
`

export default function RangeBadge({ inRange }: { inRange?: boolean }) {
  const { t } = useTranslation()

  return (
    <BadgeWrapper>
      {inRange ? (
        <MouseoverTooltip
          text={`The price of this pair is within your selected range. Your positions is earning fees.`}
        >
          <Badge variant={BadgeVariant.DEFAULT}>
            <ActiveDot /> &nbsp;
            <BadgeText>{t('In range')}</BadgeText>
          </Badge>
        </MouseoverTooltip>
      ) : (
        <MouseoverTooltip
          text={`The price of this pair is outside of your selected range. Your positions is not earning fees.`}
        >
          <Badge variant={BadgeVariant.WARNING}>
            <AlertCircle width={14} height={14} />
            &nbsp;
            <BadgeText>{t('Out of range')}</BadgeText>
          </Badge>
        </MouseoverTooltip>
      )}
    </BadgeWrapper>
  )
}
