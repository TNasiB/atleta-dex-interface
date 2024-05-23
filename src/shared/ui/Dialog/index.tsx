'use client'

import * as DialogRadix from '@radix-ui/react-dialog'
import classNames from 'classnames'

import S from './Dialog.module.scss'

type DialogProps = {
  children: React.ReactNode | JSX.Element
  title?: string
  withoutClose?: boolean
  open: boolean
  toggleOpen: (val: boolean) => void
  className?: string
}

const Dialog = ({ children, title, withoutClose, open, className, toggleOpen }: DialogProps) => {
  return (
    <DialogRadix.Root open={open} onOpenChange={toggleOpen}>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={S.overlay} />
        <DialogRadix.Content className={classNames(S.content, className)}>
          <div className={S.header}>
            {title && <DialogRadix.Title className={S.title}>{title}</DialogRadix.Title>}

            {!withoutClose && <DialogRadix.Close className={S.close}>x</DialogRadix.Close>}
          </div>

          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}

export default Dialog
