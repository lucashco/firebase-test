import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  loading: boolean;
}

export default function TaskEmpty({loading}: Props) {
  let component = (
    <Text style={styles.emptyMessage}>There are no tasks 😢</Text>
  );

  if (loading) {
    component = <ActivityIndicator color="primary" />;
  }

  return <View style={styles.container}>{component}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
