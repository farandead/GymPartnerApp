import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LikedScreen = () => {
  // Dummy data to demonstrate scrolling
  const dummyLikes = Array(12).fill(null).map((_, i) => ({
    id: `like_${i}`,
  }));

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-pump-black">
      {/* Header */}
      <View className="pt-6 px-4 pb-6 border-b-2 border-white">
        <Text className="text-pump-white text-xl font-semibold">Liked You</Text>
        <Text className="text-gray-400 mt-1">
            See who likes you and match with them instantly with Premium.
        </Text>
      </View>

      {/* Content Area with Scrolling */}
      <ScrollView 
        className="flex-1 w-full p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >        {/* Grid of blurred profile images */}        <View className="flex-row flex-wrap justify-between">
          {dummyLikes.map(like => (
            <View key={like.id} style={styles.profileItem}>
              <Text style={styles.questionMark}>?</Text>
              <View style={styles.blurOverlay} />
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Fixed bottom action button */}
      <SafeAreaView edges={['bottom']} className="bg-pump-black px-4 pb-2 pt-2">
        <TouchableOpacity 
          className="bg-pump-orange w-full py-4 rounded-full"
          onPress={() => {/* TODO: Implement premium upgrade */}}
        >
          <Text className="text-white text-center font-semibold text-lg">
            See who likes you
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>  );
};

// Define styles for the profile items
const styles = StyleSheet.create({
    profileItem: {
        width: '100%', // Full width for one item per row
        aspectRatio: 9/16, // 9:16 aspect ratio
        backgroundColor: '#3D3D3D',
        borderRadius: 12,
        marginBottom: 8,
        borderColor: '#666',
        borderWidth: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionMark: {
        fontSize: 50,
        color: '#FFFFFF',
        fontWeight: '200',
        opacity: 0.6,
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
});
