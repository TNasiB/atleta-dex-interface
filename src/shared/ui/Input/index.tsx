'use client'

import classNames from 'classnames'
import React, { forwardRef, useRef } from 'react'

import S from './Input.module.scss'

function generateId() {
  return `input-${Math.random().toString(36).slice(2, 11)}`
}

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  label?: string
  width?: 'form' | 'full'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, leftSlot, rightSlot, className, type, label, width, ...props }, ref) => {
    // const idref = useRef(generateId())

    return (
      <div
        className={classNames(
          S.root,
          {
            [S.labled]: !!leftSlot
          },
          className
        )}
      >
        {leftSlot && <div className={S.leftSlot}>{leftSlot}</div>}
        {label && (
          <label className={S.label} htmlFor={idref.current}>
            {label}
          </label>
        )}

        <input
          className={classNames(S.input, { [S.leftSlot]: !!leftSlot, [S.form]: width === 'form' })}
          // id={idref.current}
          ref={ref}
          onChange={onChange}
          type={type}
          {...props}
        />

        {rightSlot && <div className={S.rightSlot}>{rightSlot}</div>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
