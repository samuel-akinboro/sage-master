import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export const TypingIndicator = () => {
  const dots = [useRef(new Animated.Value(0)).current, 
                useRef(new Animated.Value(0)).current,
                useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = dots.map((dot, index) => (
      Animated.sequence([
        Animated.delay(index * 200),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ),
      ])
    ));

    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={[styles.bubbleContainer, styles.botBubble, { flexDirection: 'row', padding: 16 }]}>
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [{
                translateY: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -6],
                }),
              }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 3,
  },
});