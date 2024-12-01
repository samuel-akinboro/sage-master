import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubbleContainer, isUser ? styles.userBubble : styles.botBubble]}>
    <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  userBubble: {
    backgroundColor: '#346424',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  botText: {
    color: '#1E471A',
    fontWeight: '600',
  },
});