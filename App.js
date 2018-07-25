import { createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ListenerLeak from './ListenerLeak';
import ScopeLeak from './ScopeLeak';

export default createStackNavigator(
  {
    HomeScreen,
    ListenerLeak,
    ScopeLeak,
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
