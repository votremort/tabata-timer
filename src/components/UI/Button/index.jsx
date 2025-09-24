import * as SC from "./styles"

export const Button = ({ type, onClick, text }) => (
  <SC.Button {...(type ? { type } : {})} onClick={onClick} >{text}</SC.Button>
) 