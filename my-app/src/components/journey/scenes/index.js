import NoShowScene from "./NoShowScene";
import TriageScene from "./TriageScene";
import WaitingScene from "./WaitingScene";
import BedsScene from "./BedsScene";
import BlindScene from "./BlindScene";
import ClaimsScene from "./ClaimsScene";
import CostScene from "./CostScene";

// step id (see data/journeyData.js) → scene component
export default {
  noshow: NoShowScene, triage: TriageScene, waiting: WaitingScene,
  beds: BedsScene, blind: BlindScene, claims: ClaimsScene, cost: CostScene,
};
