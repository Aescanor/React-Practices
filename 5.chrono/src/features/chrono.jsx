import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: {
    value: 1500,
    runningValue: 1500,
  },
  pause: {
    value: 300,
    runningValue: 300,
  },
  isPlaying: false,
  interValID: undefined,
  cycles: 0,
  displayedValue: {
    value: 1500,
    heading: "Work",
  },
};

export const chrono = createSlice({
  name: "chrono",
  initialState,
  reducers: {
    updateChronoValues: (state, action) => {
      const chosenState = state[action.payload.type];

      // Bloquer les valeurs inférieures à 1
      if (chosenState.value + action.payload.value < 1) return;

      if (action.payload.type === "session") {
        if (!state.isPlaying) {
          chosenState.value += action.payload.value;
          chosenState.runningValue += action.payload.value;
          state.displayedValue.value = chosenState.runningValue;
        } else {
          chosenState.value += action.payload.value;
        }

        state.session.value += action.payload.value;
        state.session.runningValue += action.payload.value;
        state.displayedValue.value += action.payload.value;
      }

      else if (action.payload.type === "pause"){

        chosenState.value = chosenState.value + action.payload.value


      }

      // Si vous avez d'autres types (par exemple, "pause"), vous pouvez les traiter ici

      // Vous pourriez également avoir besoin d'ajouter une logique pour mettre à jour isPlaying, interValID et cycles
    },

    tick : (state, action) => { // action.payload = intervalID

      if(state.session.runningValue > 0){ // Si le chrono est en cours

        state.session.runningValue --  // On décrémente le runningValue
        state.displayedValue.value = state.session.runningValue // On met à jour le displayedValue
        state.displayedValue.heading = "Work" // On met à jour le heading

      } else if(state.pause.runningValue > 0){ // Si le chrono est en pause

        state.pause.runningValue -- // On décrémente le runningValue
        state.displayedValue.value = state.pause.runningValue // On met à jour le displayedValue
        state.displayedValue.heading = "Pause" // On met à jour le heading

      }else {
        state.cycles ++ // On incrémente le nombre de cycles
        state.session.runningValue = state.session.value -1 // On met à jour le runningValue
        state.displayedValue.value = state.session.value -1 // On met à jour le displayedValue
        state.displayedValue.heading = "Work" // On met à jour le heading
        state.pause.runningValue = state.pause.value // On met à jour le runningValue
      }

    },

    setUpChrono : (state, action) => { // action.payload = intervalID
      state.isPlaying = true // On lance le chrono
      state.interValID = action.payload // On stocke l'ID de l'intervalle
    },

    resetChrono : (state, action) => { // action.payload = intervalID
      window.clearInterval(state.interValID) // On arrête l'intervalle
      state.isPlaying = false // On arrête le chrono
      state.session.runningValue = state.session.value // On remet le runningValue à sa valeur <initiale></initiale>
      state.displayedValue.value = state.session.runningValue // On met à jour le displayedValue
      state.cycles = 0 // On remet le nombre de cycles à 0
    },
  },
});
  
// thunk :  fonction qui retourne une fonction qui prend en paramètre dispatch et getState
export function startChrono() {
  return function(dispatch, getState) {
    const intervalID = setInterval(() => {
      dispatch(chrono.actions.tick()); // Utilisez le nom complet du réducteur pour dispatcher "tick"
    }, 1000);

    dispatch(chrono.actions.setUpChrono(intervalID));
    dispatch(chrono.actions.tick()); // Vous pouvez appeler tick ici aussi si nécessaire
  };
}

export const { updateChronoValues,  setUpChrono, resetChrono} = chrono.actions;

export default chrono.reducer;
