export interface Workout {
  id: string,
  name: string,
  type: string,
  detail: boolean,
  exercises: string[],
  goal: string,
  completed: boolean,
}
