import React from 'react';
import { View, Text, Button, TextInput, SectionList } from 'react-native';

function extractLetters(items) {
  const letters = new Set();
  items.forEach(item => letters.add(item.substring(0, 1)));
  return Array.from(letters).sort();
}

class Item extends React.Component {
  render() {
    return (
      <Text style={{ padding: 10, backgroundColor: '#eee' }}>
        {this.props.name}
      </Text>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <Text style={{ padding: 10 }}>SECTION {this.props.section.letter}</Text>
    );
  }
}

class NamesList extends React.Component {
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState && prevState.data.length == nextProps.data.length) {
      const hasNewData = nextProps.data.some(
        (item, index) => item != prevState.data[index]
      );
      if (!hasNewData) {
        return null;
      }
    }
    const letters = extractLetters(nextProps.data);
    return {
      data: nextProps.data,
      memory: new Array(100000).join('|'),
      sections: letters.map(letter => {
        const data = nextProps.data.filter(item => item.startsWith(letter));
        return {
          letter,
          data,
          renderItem: ({ item }) => (
            <Item color={nextProps.color} name={item} />
          ),
        };
      }),
    };
  };

  render() {
    return (
      <SectionList
        sections={this.state.sections}
        renderSectionHeader={({ section }) => <Header section={section} />}
      />
    );
  }
}

export default class DetailsScreen extends React.Component {
  state = {
    count: 0,
    data: new Array(600).fill().map(() =>
      Math.random()
        .toString(36)
        .substring(7)
    ),
  };

  addNewItem = () => {
    this.setState(prevState => {
      return {
        data: [prevState.input, ...prevState.data],
        input: '',
      };
    });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="New item title"
          value={this.state.input}
          style={{ padding: 10 }}
          onChangeText={input => this.setState({ input })}
        />
        <Button title="ADD NEW ITEM" onPress={this.addNewItem} />
        <Button
          title={`Tapped ${this.state.count} times`}
          onPress={() => this.setState({ count: this.state.count + 1 })}
        />
        <NamesList data={this.state.data} />
      </View>
    );
  }
}
