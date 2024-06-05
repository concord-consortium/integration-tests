import {ClamSimElements as e} from "../elements/clam_sim_elements";
import {time} from "../testdata/testdata_automatedtestactivity_clamsim_ap";

export function verifyInitialDisplay() {
  e.verifyControlsLabel();
  e.verifyInputSlider("Algae", "High", "Med.", "Low");
  e.verifyInputSlider("Clams", "10", "5", "0");
  e.verifyWaterTemp(" 35°F");

  e.verifyNewTrialButtonDisabled();
  e.verifyPlayButtonEnabled();
  e.verifySliderDisabled();
  e.verifySliderLabel("May");

  e.verifyTableTitle();
  e.verifyDeleteButtonLabel();
  e.verifyTableColumnNames();

  e.verifyGraphHeaderTitle();
  e.verifyLineGraphTitle();
  e.verifyXAxisLabel();
  e.verifyXTicksLabel("Algae");
  e.verifyXTicksLabel("Nitrate");
  e.verifyXTicksLabel("Turbidity");
  e.verifyYTicksLabel("Algae");
  e.verifyYTicksLabel("Nitrate");
  e.verifyYTicksLabel("Turbidity");
}

export function runExperiment(c) {
  e.moveInputSlider("Algae", c.algae);
  e.moveInputSlider("Clams", c.clams);

  e.playSimulation(time);

  e.verifyWaterTemp(" 37°F");
  e.verifyNewTrialButtonEnabled();
  e.verifyPlayButtonDisabled();
  e.verifySliderEnabled();  
}

export function verifyPreviousTrial(c) {
  e.selectTrial(c.trial-1);
  e.checkPlayback(c.result, c.trial);
}