import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { MagnifyingGlassIcon, CalendarDaysIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

import { theme } from "../theme";

function Home(props) {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);

    function handleLocation(loc) {
        console.log(loc);
    }

    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <Image
                blurRadius={70}
                source={require("../assets/images/bg.png")}
                className="absolute h-full w-full"
            />

            <SafeAreaView className="flex-1">
                {/* Search Section */}
                <View style={{ height: "7%" }} className="mx-4 relative z-50">
                    <View
                        className="flex-row justify-end items-center rounded-full"
                        style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent" }}
                    >
                        {/* Text Input */}
                        {showSearch && (
                            <TextInput
                                placeholder="Search city"
                                placeholderTextColor={"lightgray"}
                                className="pl-4 h-10 pb-1 flex-1 text-white, text-base"
                            />
                        )}

                        {/* Search Icon */}
                        <TouchableOpacity
                            style={{ backgroundColor: theme.bgWhite(0.3) }}
                            className="rounded-full p-3 m-1"
                            onPress={() => setShowSearch(!showSearch)}
                        >
                            <MagnifyingGlassIcon size={25} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Results */}
                    {locations.length > 0 && showSearch ? (
                        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                            {locations.map((loc, index) => {
                                let isLast = index === locations.length - 1;
                                let borderClass = isLast ? "" : "border-b-gray-400 border-b-2";

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        className={
                                            "flex-row items-center border-0 p-3 px-4 mb-1 " +
                                            borderClass
                                        }
                                        onPress={handleLocation(loc)}
                                    >
                                        <MapPinIcon size={20} color="gray" />
                                        <Text className="text-black text-lg ml-2">
                                            London, United Kingdom
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ) : null}
                </View>

                {/* Forecast Section */}
                <View className="mx-4 flex justify-around flex-1 mb-2">
                    {/* Location */}
                    <Text className="text-white text-center text-2xl font-bold">
                        London,
                        <Text className="text-lg font-semibold text-gray-300"> United Kingdom</Text>
                    </Text>

                    {/* Weather Icon */}
                    <View className="flex-row justify-center">
                        <Image
                            source={require("../assets/images/partlycloudy.png")}
                            className="w-52 h-52"
                        />
                    </View>

                    {/* Degree celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            23&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            Partly Cloudy
                        </Text>
                    </View>

                    {/* Other stats */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image
                                source={require("../assets/icons/wind.png")}
                                className="w-6 h-6"
                            />
                            <Text className="text-white font-semibold text-base">22km</Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image
                                source={require("../assets/icons/drop.png")}
                                className="w-6 h-6"
                            />
                            <Text className="text-white font-semibold text-base">23%</Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image
                                source={require("../assets/icons/sun.png")}
                                className="w-6 h-6"
                            />
                            <Text className="text-white font-semibold text-base">6:05 AM</Text>
                        </View>
                    </View>

                    {/* Forecast for next days */}
                    <View className="mb-2 space-y-3">
                        <View className="flex-row items-center mx-5 space-x-2">
                            <CalendarDaysIcon size="22" color="white" />
                            <Text className="text-white text-base">Daily forecast</Text>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            showsHorizontalScrollIndicator={false}
                        ></ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Home;
