import { useSelector } from "react-redux"
import getFormattedValue from "./utils/getFormattedValue"
import ToggleButton from "./components/ToggleButton"
import UpdateTimeButton from "./components/UpdateTimeButton"

function App() {
  const chronoValues = useSelector((state) => state.chrono)

  return (
    <div>

      <div className="bg-slate-700 text-slate-100 pt-20 min-h-screen">


        <div className="max-w-xl mx-auto border border-s-slate-500 rounded p-10"> 
        
        <h1 className="text-center text-3xl mb-8">Pomodoro APP</h1>

        <div className="flex justify-center mb-8">

          {/* SessionBlock  */}

          <div className="mr-10">
            <p className="text-center mb-1">Sessions</p>
            <div className="flex">
              <UpdateTimeButton sign={"-"} type={"session"}/>
              <div className="mx-4 text-xl">{chronoValues.session.value / 60}</div>
              <UpdateTimeButton sign={"+"} type={"session"}/>
            </div>
          </div>

          {/* Pause block  */}

          <div>
            <p className="text-center mb-1">Pauses</p>
            <div className="flex">
          <UpdateTimeButton sign={"-"} type={"pause"}/>
              <div className="mx-4 text-xl">{chronoValues.pause.value / 60}</div>
        <UpdateTimeButton sign={"+"} type={"pause"}/>
            </div>
          </div>

        </div>
          <p className="text-center mb-2 tex-xl font-semibold">
            {chronoValues.displayedValue.heading}
          </p>

          <p className="text-center flex justify-center mb-1">

            <span className="text-4xl p-4 rounded bg-slate-300 text-slate-900">
              {getFormattedValue(chronoValues.displayedValue.value).value}
            </span>
          </p>

          <p className="mb-10 text-center">
           Passed cycle(s) : {chronoValues.cycles}
          </p>
    <ToggleButton/>
        </div>

      </div>

    </div>
  )
}

export default App
