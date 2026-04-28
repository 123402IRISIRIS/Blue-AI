import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User, Mail, LogOut, Heart, Shield, Bell } from "lucide-react-native";
import useUser from "@/utils/auth/useUser";
import { useAuth } from "@/utils/auth/useAuth";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: user, loading } = useUser();
  const { signOut, signIn, isAuthenticated } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0F0F14" }}>
        <StatusBar style="light" />
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0F0F14" }}>
        <StatusBar style="light" />

        {/* Header */}
        <View
          style={{
            backgroundColor: "#1A1B25",
            borderBottomWidth: 1,
            borderBottomColor: "#262630",
            paddingTop: insets.top,
            paddingBottom: 16,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Profile
          </Text>
        </View>

        {/* Not Signed In State */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#262630",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <User size={40} color="rgba(255, 255, 255, 0.4)" />
          </View>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Sign In to Continue
          </Text>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 32,
              lineHeight: 20,
            }}
          >
            Create an account to save your conversations with Blue and access
            your profile across devices.
          </Text>
          <TouchableOpacity
            onPress={() => signIn()}
            style={{
              backgroundColor: "#7A5AF8",
              paddingHorizontal: 32,
              paddingVertical: 14,
              borderRadius: 12,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
              Sign In / Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0F14" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#1A1B25",
          borderBottomWidth: 1,
          borderBottomColor: "#262630",
          paddingTop: insets.top,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Profile
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: "#1A1B25",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "#262630",
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "#7A5AF8",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 32, fontWeight: "700" }}
                >
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {user.name || "User"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Mail size={14} color="rgba(255, 255, 255, 0.6)" />
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 14,
                    marginLeft: 6,
                  }}
                >
                  {user.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Blue Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 12,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            ABOUT BLUE
          </Text>
          <View
            style={{
              backgroundColor: "#1A1B25",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "#262630",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <Heart
                size={20}
                color="#7A5AF8"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  Your Mental Health Friend
                </Text>
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  Blue is here to listen, support, and be a friend when you need
                  one. Available 24/7 💙
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <Shield
                size={20}
                color="#10B981"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  Safe & Confidential
                </Text>
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  Your conversations are private and secure. We're here to help,
                  never to judge.
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Bell
                size={20}
                color="#F59E0B"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  Crisis Support
                </Text>
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  If Blue detects you're in crisis, we'll connect you with
                  professional help immediately.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: "#262630",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#EF4444" />
            <Text
              style={{
                color: "#EF4444",
                fontSize: 16,
                fontWeight: "700",
                marginLeft: 12,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 40,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: 12,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Blue is your friend, but not a replacement for professional mental
            health care. If you're experiencing a mental health emergency,
            please contact emergency services or a crisis hotline.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
