import { useEffect, useState } from "react";
import { getWorkoutsBySlug } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkoutBySlug = (slug: string) => {
    const [workout, setWorkout] = useState<Workout>();

    useEffect(() => {
        async function getData() {
            const _workouts = await getWorkoutsBySlug(slug);
            setWorkout(_workouts);
        }

        getData();
    }, []);

    return workout;
}