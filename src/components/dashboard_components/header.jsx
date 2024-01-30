import React from 'react'
import Style from '../../styles/header.module.css'
import { getFormatedNo } from '../../utils/helper/helper_functions'

const Header = ({ info }) => {
  return (
    <div className={Style.headerContainer}>
      <div><h1>{getFormatedNo(info.totalQuizes)}</h1> <h2> Quiz Created</h2> </div>
      <div><h1>{getFormatedNo(info.totalQuestions)}</h1> <h2> Questions Created</h2></div>
      <div><h1>{getFormatedNo(info.totalImpressions)}</h1> <h2> Total Impressions</h2></div>
    </div>
  )
}

export default Header
