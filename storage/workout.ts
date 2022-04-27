import { containsKey, getData, removeItem, storeData } from ".";
import * as data from '../data.json';
import { Workout } from "../types/data";

export const getWorkouts = async (): Promise<Workout[]> => {
    const workouts = await getData('workout-data');
    return workouts;
}

export const getWorkoutsBySlug = async (slug: string): Promise<Workout> => {
    const workouts = await getWorkouts();
    const workout: Workout = workouts.filter(x => x.slug === slug)[0];
    return workout;
}

export const initWorkouts = async (): Promise<boolean> => {
    const hasWorkout = await containsKey('workout-data');
    if (!hasWorkout) {
        await storeData('workout-data', data);
        return true;
    }

    return false;
}

export const clearWorkouts = async () => {
    await removeItem('workout-data');
}