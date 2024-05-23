'use client'

import * as Select from '@radix-ui/react-select'
import ArrowDown from 'public/icons/arrow-round.svg'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Text } from '../Text'
import {
  SelectValue,
  StyledContent,
  StyledItem,
  StyledTrigger
} from './Select.styled'

type StyledSelectProps = {
  list: { value: string; label: string | number }[]
  placeholder?: string
  name: string
  control: any
}

const StyledSelect = ({
  list,
  placeholder,
  name,
  control
}: StyledSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Select.Root value={value} onValueChange={onChange}>
          <StyledTrigger>
            <SelectValue placeholder={placeholder}>
              {value}

              <Select.Icon className="SelectIcon">
                <ArrowDown width={12} height={12} />
              </Select.Icon>
            </SelectValue>
          </StyledTrigger>
          <StyledContent position="popper">
            {list.map((listItem, i) => (
              <StyledItem key={i} value={listItem.value}>
                <Text>{listItem.label}</Text>
              </StyledItem>
            ))}
          </StyledContent>
        </Select.Root>
      )}
    />
  )
}

export default StyledSelect
