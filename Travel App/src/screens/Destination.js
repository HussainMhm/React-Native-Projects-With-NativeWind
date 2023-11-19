import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, Image, Alert, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";

const safeArea = Platform.OS === "android" ? "mt-10" : "mt-3";

function Destination({ route, navigation }) {
    let { destination } = route.params;

    function renderHeader() {
        const [isFavorite, setIsFavorite] = useState(false);

        return (
            <SafeAreaView
                className={"flex-row justify-between items-center w-full absolute " + safeArea}
            >
                <TouchableOpacity
                    className="p-2 rounded-full ml-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={3} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="p-2 rounded-full mr-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <HeartIcon size={wp(7)} strokeWidth={3} color={isFavorite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    function renderContent() {
        return (
            <View
                style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                className="flex-1 px-5 bg-white pt-8 -mt-14"
            >
                <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                    {/* Title and Price */}
                    <View className="flex-row justify-between pt-4">
                        <Text style={{ fontSize: wp(7) }} className="text-neutral-700 font-bold">
                            {destination.title}
                        </Text>
                        <Text
                            style={{ fontSize: wp(7), color: theme.text }}
                            className="font-semibold"
                        >
                            $ {destination.price}
                        </Text>
                    </View>

                    {/* Description */}
                    <Text
                        style={{ fontSize: wp(3.7) }}
                        className="text-neutral-700 tracking-wide mb-2"
                    >
                        {destination.longDescription}
                    </Text>

                    {/* More Details */}
                    <View className="flex-row justify-between mx-1">
                        {/* Duration */}
                        <View className="flex-row justify-start space-x-2">
                            <ClockIcon size={wp(7)} color="skyblue" />
                            <View className="space-y-2">
                                <Text
                                    style={{ fontSize: wp(4.5) }}
                                    className="font-bold text-neutral-700"
                                >
                                    {destination.duration}
                                </Text>
                                <Text className="text-neutral-600 tracking-wide">Duration</Text>
                            </View>
                        </View>

                        {/* Distance */}
                        <View className="flex-row justify-start space-x-2">
                            <MapPinIcon size={wp(7)} color="#f87171" />
                            <View className="space-y-2">
                                <Text
                                    style={{ fontSize: wp(4.5) }}
                                    className="font-bold text-neutral-700"
                                >
                                    {destination.distance}
                                </Text>
                                <Text className="text-neutral-600 tracking-wide">Distance</Text>
                            </View>
                        </View>

                        {/* Sunny */}
                        <View className="flex-row justify-start space-x-2">
                            <SunIcon size={wp(7)} color="orange" />
                            <View className="space-y-2">
                                <Text
                                    style={{ fontSize: wp(4.5) }}
                                    className="font-bold text-neutral-700"
                                >
                                    {destination.weather}
                                </Text>
                                <Text className="text-neutral-600 tracking-wide">Sunny</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    function renderButton() {
        return (
            <TouchableOpacity
                style={{ backgroundColor: theme.bg(0.8), height: wp(15), width: wp(50) }}
                className="mb-6 mx-auto justify-center items-center rounded-full"
                onPress={() =>
                    Alert.alert("Booking Status", "Your booking has been issued successfully.")
                }
            >
                <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
                    Book now
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <Image source={destination.image} style={{ width: wp(100), height: hp(55) }} />
            <StatusBar style="light" />

            {renderHeader()}
            {renderContent()}
            {renderButton()}
        </View>
    );
}

export default Destination;
