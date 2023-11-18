import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { debounce } from "lodash";
import * as Progress from "react-native-progress";
import { MagnifyingGlassIcon, CalendarDaysIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

import { theme } from "../theme";
import { weatherImages } from "../constants";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { getData, storeData } from "../utils/asyncStorage";

function Home(props) {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    function handleSearch(search) {
        if (search && search.length > 2)
            fetchLocations({ cityName: search }).then((data) => {
                setLocations(data);
            });
    }

    function handleLocation(loc) {
        setLoading(true);
        setShowSearch(false);
        setLocations([]);
        fetchWeatherForecast({ cityName: loc?.name, days: "7" }).then((data) => {
            setLoading(false);
            setWeather(data);
            storeData("city", loc?.name);
        });
    }

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        let myCity = await getData("city");
        let cityName = "Damascus";
        if (myCity) {
            cityName = myCity;
        }
        fetchWeatherForecast({
            cityName,
            days: "7",
        }).then((data) => {
            setWeather(data);
            setLoading(false);
        });
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const { current, location } = weather;

    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <Image
                blurRadius={70}
                source={require("../assets/images/bg.png")}
                className="absolute h-full w-full"
            />

            {/* Loading */}
            {loading ? (
                <View className="flex-1 flex-row justify-center items-center">
                    <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                </View>
            ) : (
                <SafeAreaView
                    className={"flex-1"}
                    style={{ marginTop: Platform.OS === "android" ? 40 : null }}
                >
                    {/* Search Section */}
                    <View className="mx-4 relative z-50 ">
                        <View
                            className="flex-row justify-end items-center rounded-full"
                            style={{
                                backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
                            }}
                        >
                            {/* Text Input */}
                            {showSearch && (
                                <TextInput
                                    onChangeText={handleTextDebounce}
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
                                            onPress={() => handleLocation(loc)}
                                        >
                                            <MapPinIcon size={20} color="gray" />
                                            <Text className="text-black text-lg ml-2">
                                                {loc?.name}, {loc?.country}
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
                            {location?.name},
                            <Text className="text-2xl font-semibold text-gray-300">
                                {" "}
                                {location?.country}
                            </Text>
                        </Text>

                        {/* Weather Icon */}
                        <View className="flex-row justify-center">
                            <Image
                                source={weatherImages[current?.condition?.text || "other"]}
                                className="w-52 h-52"
                            />
                        </View>

                        {/* Degree celcius */}
                        <View className="space-y-2">
                            <Text className="text-center font-bold text-white text-6xl ml-5">
                                {current?.temp_c}&#176;
                            </Text>
                            <Text className="text-center text-white text-xl tracking-widest">
                                {current?.condition?.text}
                            </Text>
                        </View>

                        {/* Other stats */}
                        <View className="flex-row justify-between mx-4">
                            <View className="flex-row space-x-2 items-center">
                                <Image
                                    source={require("../assets/icons/wind.png")}
                                    className="w-6 h-6"
                                />
                                <Text className="text-white font-semibold text-base">
                                    {current?.wind_kph} km
                                </Text>
                            </View>
                            <View className="flex-row space-x-2 items-center">
                                <Image
                                    source={require("../assets/icons/drop.png")}
                                    className="w-6 h-6"
                                />
                                <Text className="text-white font-semibold text-base">
                                    {current?.humidity}%
                                </Text>
                            </View>
                            <View className="flex-row space-x-2 items-center">
                                <Image
                                    source={require("../assets/icons/sun.png")}
                                    className="w-6 h-6"
                                />
                                <Text className="text-white font-semibold text-base">
                                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                </Text>
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
                            >
                                {weather?.forecast?.forecastday?.map((item, index) => {
                                    const date = new Date(item.date);
                                    const options = { weekday: "long" };
                                    let dayName = date.toLocaleDateString("en-US", options);
                                    dayName = dayName.split(",")[0];

                                    return (
                                        <View
                                            key={index}
                                            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                            style={{ backgroundColor: theme.bgWhite(0.15) }}
                                        >
                                            <Image
                                                source={
                                                    weatherImages[
                                                        item?.day?.condition?.text || "other"
                                                    ]
                                                }
                                                className="w-11 h-11"
                                            />
                                            <Text className="text-white">{dayName}</Text>
                                            <Text className="text-white text-xl font-semibold">
                                                {item?.day?.avgtemp_c}&#176;
                                            </Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </View>
    );
}

export default Home;
