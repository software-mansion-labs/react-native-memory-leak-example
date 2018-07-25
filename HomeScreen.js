import React from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Listener Leak"
          onPress={() => this.props.navigation.navigate('ListenerLeak')}
        />
        <Button
          title="Scope Leak"
          onPress={() => this.props.navigation.navigate('ScopeLeak')}
        />
        <Button
          title={`Tapped ${this.state.count} times`}
          onPress={() => this.setState({ count: this.state.count + 1 })}
        />
      </View>
    );
  }
}
