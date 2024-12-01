import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatBubble } from '../components/ChatBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { ChatHeader } from '../components/ChatHeader';

export const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialMessage, setHasInitialMessage] = useState(false);
  const flatListRef = useRef(null);

  const mockResponses = [
    "I understand what you're saying. Let me help you with that.",
    "That's an interesting point. Here's what I think...",
    "I can definitely assist you with this matter.",
    "Let me provide some additional information about that.",
  ];

  const streamResponse = async (response) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);
    
    let currentText = '';
    const newMessage = { id: Date.now(), text: '', isUser: false };
    setMessages(prev => [...prev, newMessage]);

    for (let char of response) {
      currentText += char;
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, text: currentText }
            : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  };

  useEffect(() => {
    if (!hasInitialMessage) {
      setHasInitialMessage(true);
      streamResponse("Let me know what you need.");
    }
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Generate random response
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    await streamResponse(randomResponse);
  };

  return (
    <View style={styles.container}>
      <ChatHeader />
      <View style={{ height: 8 }} />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <ChatBubble message={item.text} isUser={item.isUser} />}
        keyExtractor={item => item.id.toString()}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListFooterComponent={() => isTyping ? <TypingIndicator /> : null}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type something..."
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={24} color={inputText.trim() ? '#456d3c' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
  },
});