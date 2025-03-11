
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Loader2, Mic, MicOff, Send, User, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Hello! I\'m your AI shopping assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Mock responses based on user input
  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hello! How can I assist you with your shopping today?';
    } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
      return 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, and express delivery is 1-2 business days.';
    } else if (lowerQuery.includes('return') || lowerQuery.includes('refund')) {
      return 'Our return policy allows you to return items within 30 days of delivery for a full refund. Please ensure the items are in their original condition.';
    } else if (lowerQuery.includes('payment') || lowerQuery.includes('pay')) {
      return 'We accept credit/debit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency. For orders over $200, we also offer Buy Now, Pay Later options.';
    } else if (lowerQuery.includes('discount') || lowerQuery.includes('coupon')) {
      return 'You can use the code WELCOME10 for 10% off your first purchase. We also have seasonal sales and special offers for newsletter subscribers.';
    } else if (lowerQuery.includes('track') || lowerQuery.includes('order status')) {
      return 'To track your order, please go to your account page and select "Orders". You can view real-time delivery status there.';
    } else if (lowerQuery.includes('size') || lowerQuery.includes('fit')) {
      return 'We recommend checking our detailed size guides for each product. If you\'re between sizes, most customers prefer to size up for comfort.';
    } else if (lowerQuery.includes('material') || lowerQuery.includes('fabric')) {
      return 'You can find detailed material information on each product page. We prioritize sustainable and high-quality materials for all our products.';
    } else if (lowerQuery.includes('recommendation') || lowerQuery.includes('suggest')) {
      return 'Based on current trends, our Premium Wireless Headphones and Smart Home Hub are very popular choices. Would you like more specific recommendations?';
    } else {
      return 'I\'m not sure I understand. Could you please rephrase your question or ask about our products, shipping, returns, or payment options?';
    }
  };
  
  // Simulate voice recognition
  const toggleVoiceRecognition = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      return;
    }
    
    setIsListening(true);
    
    // Simulate voice recognition with a timeout
    setTimeout(() => {
      const mockVoiceInput = "Can you tell me about your shipping options?";
      setInput(mockVoiceInput);
      setIsListening(false);
    }, 3000);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: getMockResponse(userMessage.content),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'
        }`}
      >
        <Bot className="h-6 w-6" />
      </button>
      
      {/* Chat Window */}
      <div className={`fixed bottom-5 right-5 z-50 w-[90%] sm:w-[400px] rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      } ${theme === 'dark' ? 'bg-card' : 'bg-card'} border`}>
        {/* Chat Header */}
        <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">AI Shopping Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Chat Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-muted rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs opacity-70">Now</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="p-3 border-t">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleVoiceRecognition}
              className={isListening ? 'text-red-500 border-red-500' : ''}
            >
              {isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isListening ? 'Listening...' : 'Type a message...'}
              disabled={isListening}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
