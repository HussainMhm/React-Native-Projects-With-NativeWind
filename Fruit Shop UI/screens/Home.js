import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { Bars3CenterLeftIcon, ShoppingCartIcon, HeartIcon } from "react-native-heroicons/solid";

import { themeColors } from "../theme";
import { categories, featuredFruits } from "../constants";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

const safeArea = Platform.OS === "android" ? "pt-11" : "pt-3";

function Home({ navigation }) {
    function renderHeaderBar() {
        return (
            <View className="flex-row justify-between mx-5 items-center">
                <TouchableOpacity className="p-2 rounded-xl bg-orange-100">
                    <Bars3CenterLeftIcon size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="p-2 rounded-xl bg-orange-100"
                    onPress={() => navigation.navigate("Cart")}
                >
                    <ShoppingCartIcon size={30} color="orange" />
                </TouchableOpacity>
            </View>
        );
    }

    function renderTitle() {
        return (
            <View className="mt-4">
                <Text
                    style={{ color: themeColors.text }}
                    className="text-2xl tracking-widest font-medium ml-5"
                >
                    Seasonal
                </Text>
                <Text style={{ color: themeColors.text }} className="text-3xl font-semibold ml-5">
                    Fruits and Vegetables
                </Text>
            </View>
        );
    }

    function renderCategories() {
        const [activeCategory, setActiveCategory] = useState("Oranges");

        return (
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-8 px-5">
                    {categories.map((category, index) => {
                        let isActive = activeCategory === category;
                        let textClass = `text-xl ${isActive ? "font-bold" : ""}`;
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-8 "
                                onPress={() => setActiveCategory(category)}
                            >
                                <Text style={{ color: themeColors.text }} className={textClass}>
                                    {category}
                                </Text>

                                {isActive && (
                                    <Text className="font-extrabold text-orange-400 -mt-3 ml-2">
                                        __ _
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }

    function renderProducts() {
        return (
            <View className="mt-8">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredFruits.map((fruit, index) => {
                        return renderProductItem(fruit, index);
                    })}
                </ScrollView>
            </View>
        );
    }

    function renderProductItem(fruit, index) {
        const [isFavorite, setIsFavorite] = useState(false);
        return (
            <View
                key={index}
                style={{
                    width: 270,
                    borderRadius: 40,
                    backgroundColor: fruit.color(1),
                }}
                className="mx-5"
            >
                <View className="flex-row justify-end">
                    <TouchableOpacity
                        key={index}
                        className="p-3 rounded-full mr-4 mt-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <HeartIcon size={25} color={isFavorite ? "red" : "white"} />
                    </TouchableOpacity>
                </View>

                <View
                    className="flex-row justify-center"
                    style={{
                        shadowColor: fruit.shadow,
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 50 },
                        shadowOpacity: 0.6,
                    }}
                >
                    <Image source={fruit.image} style={{ width: 175, height: 175 }} />
                </View>

                <View className="ml-4 my-4">
                    <Text className="font-bold text-xl text-white shadow">{fruit.name}</Text>
                    <Text className="font-bold text-xl text-white shadow tracking-wide">
                        $ {fruit.price}
                    </Text>
                </View>
            </View>
        );
    }

    function renderHotSales() {
        return (
            <View className="mt-8 pl-5 space-y-1">
                <Text style={{ color: themeColors.text }} className="text-xl font-bold">
                    Hot Sales
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ overflow: "visible" }}
                >
                    {[...featuredFruits].reverse().map((fruit, index) => {
                        return renderFruitCardItem(index, fruit);
                    })}
                </ScrollView>
            </View>
        );
    }

    function renderFruitCardItem(index, fruit) {
        return (
            <View className="mr-6 bg" key={index}>
                <TouchableOpacity
                    // key={index}
                    className="items-center -mb-9 shadow-lg z-20"
                    onPress={() =>
                        navigation.navigate("Product", { ...fruit, color: fruit.color(1) })
                    }
                >
                    <Image
                        source={fruit.image}
                        style={{
                            height: 65,
                            width: 65,
                            shadowColor: fruit.shadow,
                            overflow: "visible",
                            shadowRadius: 15,
                            shadowOffset: { width: 0, height: 20 },
                            shadowOpacity: 0.4,
                        }}
                    />
                </TouchableOpacity>

                <View
                    style={{ backgroundColor: fruit.color(0.4), height: 75, width: 80 }}
                    className={` rounded-3xl flex justify-end items-center`}
                >
                    <Text className="font-semibold text-center text-gray-800 tracking-wide pb-3">
                        $ {fruit.price}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView className={"flex-1 bg-orange-50 " + safeArea}>
            <StatusBar style="auto" />
            {renderHeaderBar()}
            {renderTitle()}
            {renderCategories()}
            {renderProducts()}
            {renderHotSales()}
        </SafeAreaView>
    );
}

export default Home;
