import React from 'react';
import { View, Text, AppState } from 'react-native';

const SIZE = 1000000;

export default class DetailsScreen extends React.Component {
  memory = new Array(SIZE).join('|');
  interval = null;
  state = { count: 1 };

  componentDidMount() {
    AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        this.interval = setInterval(this.refresh, 1000);
      } else {
        clearInterval(this.interval);
      }
    });
    this.interval = setInterval(this.refresh, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refresh = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View>
        <Text>
          Allocated {SIZE} bytes, go back to see the memory gets retained
        </Text>
        <Text>Foreground time counter: {this.state.count} sec</Text>
      </View>
    );
  }
}
