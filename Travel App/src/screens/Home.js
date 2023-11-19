import { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    TextInput,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { LinearGradient } from "expo-linear-gradient";

import { categoriesData, sortCategoryData, destinationData } from "../constants";
import { theme } from "../theme";

const safeArea = Platform.OS === "android" ? "mt-10" : "mt-3";

function Home({ navigation }) {
    function renderHeader() {
        return (
            <View className="flex-row mx-5 mb-10 justify-between items-center">
                <Text className="font-bold text-neutral-700" style={{ fontSize: wp(7) }}>
                    Let's Discover
                </Text>
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/avatar.png")}
                        style={{ width: wp(12), height: wp(12) }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderSearchBar() {
        return (
            <View className="mx-5 mb-4">
                <View className="flex-row items-center bg-neutral-200 p-4 rounded-full">
                    <MagnifyingGlassIcon size={20} color="gray" strokeWidth={3} />
                    <TextInput
                        placeholder="Search Destination"
                        placeholderTextColor="gray"
                        className="ml-2 text-base
                            mb-1 tracking-wider"
                    />
                </View>
            </View>
        );
    }

    function renderCategories() {
        return (
            <View className="space-y-5">
                <View className="mx-5 flex-row justify-between items-center">
                    <Text className="font-semibold text-neutral-800" style={{ fontSize: wp(4.5) }}>
                        Categories
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: wp(4.5), color: theme.text }}>See all</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className="space-x-4"
                >
                    {categoriesData.map((category, index) => {
                        return (
                            <TouchableOpacity key={index} className="items-center space-y-2">
                                <Image
                                    source={category.image}
                                    style={{ width: wp(20), height: wp(20) }}
                                    className="rounded-3xl"
                                />
                                <Text
                                    className="text-neutral-700 font-medium"
                                    style={{ fontSize: wp(4) }}
                                >
                                    {category.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }

    function renderSortCategories() {
        const [activeCategory, setActiveCategory] = useState("Popular");
        return (
            <View className="flex-row items-center justify-around mx-4 p-2 px-4 space-x-2 bg-neutral-100 rounded-full">
                {sortCategoryData.map((category, index) => {
                    let isActive = category === activeCategory;
                    let activeButtonStyle = isActive ? "bg-white" : "";

                    return (
                        <TouchableOpacity
                            key={index}
                            className={`p-3 px-4 rounded-full ${activeButtonStyle}`}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text
                                className="font-semibold"
                                style={{
                                    fontSize: wp(4),
                                    color: isActive ? theme.text : "rgba(0,0,0,0.6)",
                                }}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    function renderDestinations() {
        return (
            <View className="mx-4 flex-row justify-between flex-wrap ">
                {destinationData.map((destination, index) => {
                    const [isFavorite, setIsFavorite] = useState(false);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ width: wp(44), height: wp(65) }}
                            className="justify-end relative p-4 py-6 space-y-2 mb-5"
                            onPress={() => navigation.navigate("Destination", { destination })}
                        >
                            <Image
                                source={destination.image}
                                style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
                                className="absolute"
                            />

                            <LinearGradient
                                colors={["transparent", "rgba(0,0,0,0.8)"]}
                                style={{
                                    width: wp(44),
                                    height: hp(15),
                                    borderBottomLeftRadius: 35,
                                    borderBottomRightRadius: 35,
                                }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />

                            <TouchableOpacity
                                style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                                className="absolute top-1 right-3 rounded-full p-3"
                                onPress={() => setIsFavorite(!isFavorite)}
                            >
                                <HeartIcon size={wp(5)} color={isFavorite ? "red" : "white"} />
                            </TouchableOpacity>

                            <View>
                                <Text
                                    className="text-white font-semibold"
                                    style={{ fontSize: wp(4) }}
                                >
                                    {destination.title}
                                </Text>
                                <Text className="text-white" style={{ fontSize: wp(2.5) }}>
                                    {destination.shortDescription}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className={"space-y-6 " + safeArea}>
                {renderHeader()}
                {renderSearchBar()}
                {renderCategories()}
                {renderSortCategories()}
                {renderDestinations()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
