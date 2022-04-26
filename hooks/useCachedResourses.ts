import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function useCachedResourses() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await Font.loadAsync({
                    "montserrat-thin": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "montserrat": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "montserrat-medium": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "montserrat-bold": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "montserrat-semibold": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "montserrat-extrabold": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                })
            } catch (e) {
                console.warn(e);
            } finally {
                setIsLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}