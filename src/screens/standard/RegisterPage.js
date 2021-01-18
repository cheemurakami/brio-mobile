import {Text, View} from 'react-native'

import React from 'react'
import { connect } from 'react-redux'

export const RegisterPage = (props) => {
  return (
    <View>
      <Text>RegisterPage</Text>
    </View>
  )
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(RegisterPage)
