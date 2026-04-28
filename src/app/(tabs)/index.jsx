import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Send,
  Smile,
  Image as ImageIcon,
  AlertTriangle,
  Phone,
} from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import useUser from "@/utils/auth/useUser";
import { useAuth } from "@/utils/auth/useAuth";

const EMOJI_QUICK_PICKS = ["😊", "😂", "❤️", "👍", "🎉", "💙", "😢", "😔"];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { data: user, loading: userLoading } = useUser();
  const { signIn, isReady, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Check if user needs to sign in
  useEffect(() => {
    if (isReady && !isAuthenticated && !userLoading) {
      Alert.alert("Sign In Required", "Please sign in to chat with Blue", [
        {
          text: "Sign In",
          onPress: () => signIn(),
        },
      ]);
    }
  }, [isReady, isAuthenticated, userLoading]);

  const handleSendMessage = async () => {
    const finalContent = messageText.trim();
    if (!finalContent) return;

    const userMessage = {
      role: "user",
      content: finalContent,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessageText("");
    setShowEmojiPicker(false);
    setIsLoading(true);

    try {
      // Crisis detection (server extracts IP automatically)
      try {
        const crisisCheck = await fetch("/api/crisis-detection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: finalContent,
          }),
        });

        if (crisisCheck.ok) {
          const crisisData = await crisisCheck.json();
          if (
            crisisData.isCrisis &&
            (crisisData.riskLevel === "high" ||
              crisisData.riskLevel === "severe")
          ) {
            const alertResponse = await fetch("/api/get-crisis-resources", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });

            if (alertResponse.ok) {
              const alertData = await alertResponse.json();
              setCrisisDetected({
                ...crisisData,
                nearestCrisisLine: alertData.crisisLine,
              });
            }
          }
        }
      } catch (error) {
        console.error("Crisis detection failed:", error);
      }

      // Get Blue's response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText(messageText + emoji);
    setShowEmojiPicker(false);
  };

  const handleCallCrisisLine = (phoneNumber) => {
    if (Platform.OS === "web") {
      window.open(`tel:${phoneNumber}`);
    } else {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    return (
      <View
        style={{
          flexDirection: isUser ? "row-reverse" : "row",
          alignItems: "flex-start",
          marginBottom: 20,
          paddingHorizontal: 16,
        }}
      >
        {/* Avatar */}
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: "hidden",
            backgroundColor: isUser ? "#3D9DF6" : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isUser ? (
            <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14 }}>
              {user?.name?.charAt(0)?.toUpperCase() || "Y"}
            </Text>
          ) : (
            <Image
              source={{
                uri: "https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/",
              }}
              style={{ width: 36, height: 36 }}
            />
          )}
        </View>

        {/* Message Content */}
        <View style={{ flex: 1, maxWidth: "80%", marginHorizontal: 12 }}>
          <View
            style={{
              flexDirection: isUser ? "row-reverse" : "row",
              alignItems: "baseline",
              marginBottom: 4,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 13 }}>
              {isUser ? "You" : "Blue"}
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: 11,
                marginHorizontal: 8,
              }}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <Text
            style={{
              color: message.isError ? "#EF4444" : "#FFFFFF",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {message.content}
          </Text>
        </View>
      </View>
    );
  };

  const CrisisAlert = ({ crisis }) => {
    return (
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 16,
          padding: 16,
          backgroundColor: "#dc2626",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#ef4444",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <AlertTriangle size={24} color="#FFFFFF" style={{ marginTop: 4 }} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              🆘 We're Here to Help
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                marginBottom: 12,
                lineHeight: 18,
              }}
            >
              I've detected that you might be going through a difficult time.
              Your safety is important. Crisis support services have been
              notified and help is available 24/7.
            </Text>
            {crisis.nearestCrisisLine && (
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Phone size={16} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "700",
                      fontSize: 13,
                      marginLeft: 8,
                    }}
                  >
                    Crisis Support Near You
                  </Text>
                </View>
                <Text
                  style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}
                >
                  {crisis.nearestCrisisLine.service}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    handleCallCrisisLine(crisis.nearestCrisisLine.phone)
                  }
                  style={{ marginTop: 4 }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {crisis.nearestCrisisLine.phone}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 11,
                    opacity: 0.8,
                    marginTop: 4,
                  }}
                >
                  Available {crisis.nearestCrisisLine.hours || "24/7"} •{" "}
                  {crisis.nearestCrisisLine.country}
                </Text>
              </View>
            )}
            <Text style={{ color: "#FFFFFF", fontSize: 11, opacity: 0.9 }}>
              💙 You're not alone. These services are free, confidential, and
              staffed by people who care.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (userLoading || !isReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#64748B",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#7A5AF8" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#64748B" }}>
        <StatusBar style="light" />

        {/* Header */}
        <View
          style={{
            backgroundColor: "#94A3B8",
            borderBottomWidth: 1,
            borderBottomColor: "#CBD5E1",
            paddingTop: insets.top,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Image
                source={{
                  uri: "https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/",
                }}
                style={{ width: 44, height: 44 }}
              />
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "700" }}
              >
                Blue
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ color: "#10B981", fontSize: 12, fontWeight: "600" }}
                >
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Crisis Alert */}
        {crisisDetected && <CrisisAlert crisis={crisisDetected} />}

        {/* Messages Area */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 100,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                  marginBottom: 24,
                }}
              >
                <Image
                  source={{
                    uri: "https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/",
                  }}
                  style={{ width: 96, height: 96 }}
                />
              </View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: "700",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                Hi, I'm Blue 💙
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 8,
                  textAlign: "center",
                  maxWidth: 340,
                }}
              >
                You don't have to figure everything out alone.
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: "center",
                  maxWidth: 340,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Talk to Blue — a supportive AI companion that listens,
                understands, and helps you take the next step.
              </Text>
            </View>
          ) : (
            <>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isLoading && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 20,
                    paddingHorizontal: 16,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://ucarecdn.com/5e8c6bd4-3eb6-4b9f-8149-da7ac23a4468/-/format/auto/",
                      }}
                      style={{ width: 36, height: 36 }}
                    />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ color: "#7A5AF8", fontSize: 13 }}>
                      Blue is typing...
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Emoji Quick Picks */}
        {showEmojiPicker && (
          <View
            style={{
              position: "absolute",
              bottom: 140,
              left: 0,
              right: 0,
              backgroundColor: "#94A3B8",
              borderTopWidth: 1,
              borderTopColor: "#CBD5E1",
              padding: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {EMOJI_QUICK_PICKS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => handleEmojiSelect(emoji)}
                  style={{
                    padding: 8,
                    backgroundColor: "#CBD5E1",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input Area */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#94A3B8",
            borderTopWidth: 1,
            borderTopColor: "#CBD5E1",
            paddingBottom: insets.bottom + 64,
            padding: 16,
          }}
        >
          <View
            style={{
              backgroundColor: "#CBD5E1",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Left Icons */}
            <TouchableOpacity
              onPress={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ marginRight: 8 }}
            >
              <Smile size={22} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>

            {/* Text Input */}
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Tell me"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              style={{
                flex: 1,
                color: "#FFFFFF",
                fontSize: 14,
                paddingVertical: 0,
              }}
              editable={!isLoading}
              multiline
              maxLength={1000}
            />

            {/* Send Button */}
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!messageText.trim() || isLoading}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor:
                  messageText.trim() && !isLoading ? "#7A5AF8" : "#4A4A4A",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
              }}
            >
              <Send size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Disclaimer Text */}
          <View style={{ marginTop: 12, paddingHorizontal: 8 }}>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: 10,
                textAlign: "center",
                lineHeight: 14,
              }}
            >
              Blue is here to support you, not replace real help. It does not
              diagnose or treat anything. If you are going through something
              serious, please talk to a trusted adult or a qualified
              professional. In emergencies, contact your local emergency
              services.
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 10,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Made By Iris N-O for Technovation Girls 2025/2026
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
