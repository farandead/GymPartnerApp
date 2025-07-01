import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

interface Match {
  id: string;
  name: string;
  profileImage: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface Chat {
  id: string;
  matchId: string;
  name: string;
  profileImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface LikedProfile {
  id: string;
  profileImage?: string;
}

export const MessagingScreen = ({ navigation }: any) => {
  // Mock data for demonstration
  const likedProfiles: LikedProfile[] = Array(2).fill(null).map((_, i) => ({
    id: `liked_${i}`,
    profileImage: undefined, // Blurred/hidden profiles
  }));
  const matches: Match[] = [
    {
      id: 'match_1',
      name: 'Sarah',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b6b44c4d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey! Ready for our workout session?',
      timestamp: '2m',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 'match_2',
      name: 'Emma',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'See you at the gym tomorrow!',
      timestamp: '1h',
      unreadCount: 2,
      isOnline: false,
    },
  ];
  // For now, we'll show empty state for chats
  const chats: Chat[] = [];

  const renderLikedProfile = (profile: LikedProfile, index: number) => (
    <View key={profile.id} style={styles.likedProfileContainer}>
      <View style={styles.likedProfileImage}>
        {index === 0 ? (
          // First item shows the count with heart icon
          <View style={styles.likedCountContainer}>
            <Icon name="heart" size={20} color="#FF8600" />
            <Text style={styles.likedCountText}>2</Text>
          </View>
        ) : (
          // Other items show blurred profiles
          <View style={styles.blurredProfile}>
            <Text style={styles.questionMark}>?</Text>
          </View>
        )}
      </View>
    </View>
  );
  const renderMatch = (match: Match) => (
    <TouchableOpacity 
      key={match.id} 
      style={styles.matchContainer}
      onPress={() => navigation.navigate('Chat', { matchUser: match })}
    >
      <View style={styles.matchImageContainer}>
        <Image source={{ uri: match.profileImage }} style={styles.matchImage} />
        {match.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <Text style={styles.matchName}>{match.name}</Text>
    </TouchableOpacity>
  );
  const EmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIllustration}>
        <View style={styles.mountainBase}>
          <View style={styles.flagContainer}>
            <Icon name="flag" size={24} color="#FFD700" />
          </View>
        </View>
      </View>
      
      <Text style={styles.emptyTitle}>There's no time like now</Text>
      
      <Text style={styles.emptyDescription}>
        Your matches get to Make the First Move. While you're waiting, why not find more people who catch your eye?
      </Text>
      
      <TouchableOpacity style={styles.keepConnectingButton}>
        <Text style={styles.keepConnectingText}>Keep connecting</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>        {/* Your matches section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your matches ({matches.length + 2})</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.matchesScrollView}
            contentContainerStyle={styles.matchesContent}
          >
            {/* Liked profiles (blurred) */}
            {likedProfiles.map(renderLikedProfile)}
            
            {/* Actual matches */}
            {matches.map(renderMatch)}
          </ScrollView>
        </View>

        {/* Chats section */}
        <View style={styles.section}>
          <View style={styles.chatsHeader}>
            <Text style={styles.sectionTitle}>Chats (Recent)</Text>
            <TouchableOpacity>
              <Icon name="menu" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {/* Empty state for now */}
          <EmptyState />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
  },
  matchesScrollView: {
    marginBottom: 20,
  },
  matchesContent: {
    paddingRight: 20,
  },  likedProfileContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  likedProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  likedCountContainer: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  likedCountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 18,
  },
  blurredProfile: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 28,
    color: '#999999',
    fontWeight: '300',
  },
  matchContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  matchImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  matchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  chatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIllustration: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mountainBase: {
    width: 100,
    height: 60,
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  flagContainer: {
    backgroundColor: '#FFD700',
    width: 30,
    height: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mountainShape: {
    width: 80,
    height: 40,
    backgroundColor: '#2A2A2A',
    marginTop: -20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  keepConnectingButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  keepConnectingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
