import * as Select from '@radix-ui/react-select'
import styled from 'styled-components'

export const StyledTrigger = styled(Select.Trigger)`
  padding: 0 16px;
  border-radius: 10px;
  background: var(--background-label, #262a33);
  max-width: 300px;
  width: 100%;
  height: 51px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 16px;
  font-weight: 700;

  &[data-placeholder] {
    color: #f2f2f280;
  }

  & .SelectIcon {
    margin-left: auto;
  }

  & > span {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 1919px) {
    height: 44px;
  }
`

export const SelectValue = styled(Select.Value)`
  color: #fff;
  text-align: left;
  width: 100%;
`

export const StyledContent = styled(Select.Content)`
  overflow: hidden;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: var(--background-label, #262a33);
  position: relative;
  z-index: 200;
  max-width: 300px;
  width: 100%;

  & .rt-SelectItemIndicator {
    right: 0;
    left: unset;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;

    & svg {
      display: none;
    }
  }
`

export const StyledItem = styled(Select.Item)`
  all: unset;

  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 15px;
  z-index: 140;
  position: relative;
  user-select: none;
  cursor: pointer;
  color: #fff;

  & > span {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
