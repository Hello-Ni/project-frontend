import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import MainWindow from '../screens/MainScreen'
import MapWindow from '../screens/MapScreen'

const screens={
    MainWindow:{
        screen:MainWindow,
        navigationOptions:{
            title:'MainWindow',
            headerStyle:{backgroundColor: 'coral',},
            headerTintColor: '#fff',

        }
    },
    MapWindow:{
        screen:MapWindow,
        navigationOptions:{
            title:'MapWindow',
            headerStyle:{backgroundColor: 'coral',},
            headerTintColor: '#fff',
        }
    }

}
const HomeStack=createStackNavigator(screens)
export default createAppContainer(HomeStack)
