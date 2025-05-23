import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContinueButton } from '../../../components/ContinueButton';
import { AuthStackParamList } from '../../../types/navigation';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'PersonalQuestions'>;

interface Question {
  id: string;
  text: string;
  category: 'self-care' | 'about-me' | 'bit-of-fun' | 'looking-for';
  answer?: string;
}

export const PersonalQuestionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeCategory, setActiveCategory] = useState<string>('self-care');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));
  const windowHeight = Dimensions.get('window').height;

  const categories = [
    { id: 'self-care', label: 'Self-care' },
    { id: 'bit-of-fun', label: 'Bit of fun' },
    { id: 'about-me', label: 'About me' },
    { id: 'looking-for', label: 'Looking for' },
  ];

  const questions: Question[] = [
    { id: 'therapist', text: 'What my therapist would say about me', category: 'self-care' },
    { id: 'learned', text: 'Something I recently learned about myself is', category: 'self-care' },
    { id: 'boundary', text: 'My most important boundary is', category: 'self-care' },
    { id: 'morning', text: 'My morning routine looks like', category: 'self-care' },
    { id: 'obsession', text: 'My healthy obsession is', category: 'self-care' },
    { id: 'unplug', text: 'When I unplug I like to', category: 'self-care' },
    { id: 'proud', text: "I'm really proud of", category: 'self-care' },
    { id: 'selfcare', text: 'To me, self-care is', category: 'self-care' },
  ];

  const handleQuestionPress = (questionId: string) => {
    setSelectedQuestion(questionId);
    setCurrentAnswer(answers[questionId] || '');
    setModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleAnswerSubmit = () => {
    if (selectedQuestion && currentAnswer.trim()) {
      setAnswers(prev => ({
        ...prev,
        [selectedQuestion]: currentAnswer.trim()
      }));
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
        setSelectedQuestion(null);
        setCurrentAnswer('');
      });
      Keyboard.dismiss();
    }
  };

  const handleCancelAnswer = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedQuestion(null);
      setCurrentAnswer('');
    });
    Keyboard.dismiss();
  };

  const handleContinue = () => {
    if (Object.keys(answers).length >= 3) {
      const answeredQuestions = questions
        .filter(q => answers[q.id])
        .map(q => ({ ...q, answer: answers[q.id] }));
      console.log('Answered questions:', answeredQuestions);
      navigation.navigate('Photos');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Photos');
  };

  const renderQuestion = (question: Question) => (
    <TouchableOpacity
      key={question.id}
      onPress={() => handleQuestionPress(question.id)}
      className={`flex-row items-center justify-between py-4 border-b border-pump-white/10 ${
        answers[question.id] ? 'bg-pump-white/5' : ''
      }`}
    >
      <Text className="text-lg text-pump-white flex-1 mr-4">
        {question.text}
      </Text>
      <View className="flex-row items-center">
        {answers[question.id] && (
          <View className="w-2 h-2 rounded-full bg-pump-orange mr-2" />
        )}
        <Text className="text-2xl text-pump-white/50">→</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-pump-black">
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="h-1 bg-pump-white/10 rounded-full mt-2 mb-8">
          <View className="h-1 bg-pump-orange rounded-full w-[75%]" />
        </View>

        {/* Title */}
        <Text className="text-4xl font-bold text-pump-white mb-4">
          What's it like to date you?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-pump-white/70 mb-8">
          A joy, obviously, but go ahead and answer in your own words.
        </Text>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View className="flex-row space-x-4">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategory(category.id)}
                className="relative"
              >
                <Text
                  className={`text-lg pb-2 ${
                    activeCategory === category.id
                      ? 'text-pump-orange font-semibold'
                      : 'text-pump-white/50'
                  }`}
                >
                  {category.label}
                </Text>
                {activeCategory === category.id && (
                  <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-pump-orange rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Questions List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-24">
            {questions
              .filter(q => q.category === activeCategory)
              .map(renderQuestion)}
          </View>
        </ScrollView>

        {/* Modal for answering questions */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="none"
          onRequestClose={handleCancelAnswer}
        >
          <Animated.View
            className="flex-1 bg-black/50"
            style={{
              opacity: modalAnimation,
            }}
          >
            <TouchableOpacity
              className="flex-1"
              activeOpacity={1}
              onPress={handleCancelAnswer}
            >
              <Animated.View
                className="absolute bottom-0 left-0 right-0 bg-pump-black rounded-t-3xl p-6"
                style={{
                  transform: [{
                    translateY: modalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [windowHeight, 0],
                    }),
                  }],
                }}
              >
                <View className="w-12 h-1 bg-pump-white/20 rounded-full self-center mb-6" />
                <Text className="text-xl font-semibold text-pump-white mb-4">
                  {questions.find(q => q.id === selectedQuestion)?.text}
                </Text>
                <TextInput
                  className="bg-pump-white/10 rounded-xl p-4 text-pump-white text-lg min-h-[120px] mb-6"
                  multiline
                  placeholder="Type your answer..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={currentAnswer}
                  onChangeText={setCurrentAnswer}
                  autoFocus
                />
                <View className="flex-row justify-end space-x-4">
                  <TouchableOpacity
                    onPress={handleCancelAnswer}
                    className="px-6 py-3 rounded-xl"
                  >
                    <Text className="text-pump-white/70 text-lg">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAnswerSubmit}
                    className="bg-pump-orange px-6 py-3 rounded-xl"
                    disabled={!currentAnswer.trim()}
                  >
                    <Text className="text-pump-white text-lg font-semibold">Save</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute bottom-8 left-5"
        >
          <Text className="text-pump-white/90 text-lg font-semibold">Skip</Text>
        </TouchableOpacity>

        {/* Counter */}
        <View className="absolute bottom-8 right-24">
          <Text className="text-pump-white/70 text-lg">
            {Object.keys(answers).length}/3 added
          </Text>
        </View>

        {/* Continue Button */}
        <ContinueButton
          onPress={handleContinue}
          isEnabled={Object.keys(answers).length >= 3}
          className="absolute bottom-8 right-5"
        />
      </View>
    </SafeAreaView>
  );
};
