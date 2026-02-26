import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator'
import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {

  return (
// 

    //auth context
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}

