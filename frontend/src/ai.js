import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';

const RestaurantAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm Ember, your Fog & Flame assistant. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickQuestions = [
        "What are your hours?",
        "How can I make a reservation?",
        "Tell me about your menu",
        "Where are you located?"
    ];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        // Add user message
        const newMessage = { id: messages.length + 1, text: inputValue, isBot: false };
        setMessages([...messages, newMessage]);
        setInputValue('');
        handleBotResponse(inputValue);
    };

    const handleQuickQuestion = (question) => {
        // Add user message
        const newMessage = { id: messages.length + 1, text: question, isBot: false };
        setMessages([...messages, newMessage]);
        handleBotResponse(question);
    };

    const handleBotResponse = (userMessage) => {
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            setIsTyping(false);

            // Generate response based on user message
            let botResponse;
            const lowerCaseMessage = userMessage.toLowerCase();

            if (lowerCaseMessage.includes('hour') || lowerCaseMessage.includes('open')) {
                botResponse = "We're open Tuesday to Sunday from 11:00 AM to 10:00 PM. We're closed on Mondays.";
            } else if (lowerCaseMessage.includes('reservation') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('table')) {
                botResponse = "You can make a reservation through our website's reservation page, or by calling us at (555) 123-4567. We recommend booking at least 24 hours in advance for weekends.";
            } else if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('food') || lowerCaseMessage.includes('dish')) {
                botResponse = "Our menu features a fusion of international cuisines with a focus on fresh, locally-sourced ingredients. Our chef's specialties include our Gourmet Pasta, Exquisite Sushi, and Decadent Desserts. You can view our full menu on the Menu page.";
            } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address') || lowerCaseMessage.includes('where')) {
                botResponse = "We're located at 123 Culinary Avenue, Gourmet District. We're near the Central Park area, with convenient parking available nearby.";
            } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('expensive')) {
                botResponse = "Our main courses range from $18 to $35, with appetizers from $8 to $15. We also offer a price-fixed menu at $55 per person which includes an appetizer, main course, and dessert.";
            } else if (lowerCaseMessage.includes('special') || lowerCaseMessage.includes('event')) {
                botResponse = "We offer special event hosting for parties of 8 or more. We also have seasonal specials and chef's tasting events every month. Check our Events page for more details or ask our staff when you visit!";
            } else if (lowerCaseMessage.includes('allerg') || lowerCaseMessage.includes('dietary') || lowerCaseMessage.includes('vegan') || lowerCaseMessage.includes('vegetarian')) {
                botResponse = "We accommodate various dietary needs including vegetarian, vegan, gluten-free, and food allergies. Please inform our staff about any specific requirements when making your reservation or ordering.";
            } else {
                botResponse = "Thank you for your message. If you have questions about our menu, reservations, or special events, I'm happy to help. If you need more specific assistance, you can also call us at (555) 123-4567 or email us at info@fogandflame.com.";
            }

            const newBotMessage = { id: messages.length + 2, text: botResponse, isBot: true };
            setMessages(prevMessages => [...prevMessages, newBotMessage]);
        }, 1000);
    };

    return (
        <div className="fixed right-0 bottom-0 z-50 mr-4 mb-4">
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 flex items-center"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 overflow-hidden flex flex-col animate-fadeIn">
                    <div className="bg-black text-white p-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-xl mr-2">🔥</span>
                            <span className="font-bold">Fog & Flame Assistant</span>
                        </div>
                        <button onClick={toggleChat} className="text-white hover:text-gray-300">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="h-64 overflow-y-auto p-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-3 ${message.isBot ? 'text-left' : 'text-right'}`}
                            >
                                <div
                                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                        message.isBot
                                            ? 'bg-gray-200 text-black'
                                            : 'bg-black text-white'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="text-left mb-3">
                                <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-gray-200">
                        <div className="p-2">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {quickQuestions.map((question) => (
                                    <button
                                        key={question}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-gray-700 transition-colors duration-200"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSubmit} className="flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Type your question here..."
                                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <button
                                    type="submit"
                                    className="bg-black text-white p-2 rounded-r-lg hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantAssistant;