import { useState } from "react";
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import JourneyScreen from "./components/journey/JourneyScreen";
import ExploreScreen from "./components/explore/ExploreScreen";
import ServicesScreen from "./components/services/ServicesScreen";

function App() {
  // "welcome" → "journey" → "explore" → "services"
  const [screen, setScreen] = useState("welcome");
  const [explored, setExplored] = useState([]); // problems the visitor explored (saved with the lead)
  const home = () => { setExplored([]); setScreen("welcome"); };

  if (screen === "journey") return <JourneyScreen onFinish={() => setScreen("explore")} onExit={home} />;
  if (screen === "explore") return <ExploreScreen onFinish={(ids) => { setExplored(Array.isArray(ids) ? ids : []); setScreen("services"); }} onExit={home} />;
  if (screen === "services") return <ServicesScreen explored={explored} onExit={home} />;

  return  <WelcomeScreen
    onStart={() => setScreen("journey")}
    onExploreServices={() => setScreen("services")}
    onGetInTouch={() => {}}
  />
  
}

export default App;