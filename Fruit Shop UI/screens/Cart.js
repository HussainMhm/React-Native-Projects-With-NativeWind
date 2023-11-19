import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { ChevronLeftIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";

import { cartItems } from "../constants";
import { themeColors } from "../theme";

function Cart({ navigation }) {
    function renderHeaderBar() {
        return (
            <View className="flex-row justify-start mx-5">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="border border-gray-300 rounded-xl"
                >
                    <ChevronLeftIcon size="30" color="gray" />
                </TouchableOpacity>
            </View>
        );
    }

    function renderCartContent() {
        return (
            <View className="cart mx-5 flex-1">
                {/* Title */}
                <Text style={{ color: themeColors.text }} className="text-2xl py-10">
                    Your <Text className="font-bold">cart</Text>
                </Text>

                {/* Cart items */}
                <View>{cartItems.map((item, index) => renderFruitCardItem(index, item))}</View>

                {/* Total price */}
                <View className="flex-row justify-end py-4">
                    <Text className="text-lg">
                        Total price: <Text className="font-bold text-yellow-500">240.70</Text>
                    </Text>
                </View>
            </View>
        );
    }

    function renderFruitCardItem(index, fruit) {
        return (
            <View key={index} className="flex-row justify-between items-center space-x-5 mb-4">
                {/* Image and background */}
                <View className="ml-5">
                    <TouchableOpacity className="flex-row justify-center -mb-10 -ml-10 shadow-lg z-20">
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

                    {/* Background */}
                    <View
                        style={{ backgroundColor: fruit.color(0.4), height: 60, width: 60 }}
                        className={` rounded-3xl flex justify-end items-center`}
                    ></View>
                </View>

                {/* Name and price */}
                <View className="flex-1 space-y-1">
                    <Text style={{ color: themeColors.text }} className=" text-base font-bold">
                        {fruit.name}
                    </Text>
                    <Text className="text-yellow-500 font-extrabold">$ {fruit.price}</Text>
                </View>

                {/* Quantity */}
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity className="bg-gray-300 p-1 rounded-lg">
                        <PlusIcon size="15" color="white" />
                    </TouchableOpacity>

                    <Text>{fruit.qty}</Text>

                    <TouchableOpacity className="bg-gray-300 p-1 rounded-lg">
                        <MinusIcon size="15" color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderPaymentButton() {
        return (
            <View className="flex-row justify-between items-center mx-7">
                <TouchableOpacity
                    style={{
                        backgroundColor: "orange",
                        opacity: 0.8,
                        shadowColor: "orange",
                        shadowRadius: 25,
                        shadowOffset: { width: 0, height: 15 },
                        shadowOpacity: 0.4,
                    }}
                    className="p-3 flex-1 rounded-xl"
                >
                    <Text className="text-xl text-center text-white font-bold">Payment</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 justify-between bg-orange-50">
            {renderHeaderBar()}
            {renderCartContent()}
            {renderPaymentButton()}
        </SafeAreaView>
    );
}

export default Cart;
