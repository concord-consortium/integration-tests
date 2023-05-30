import {PlantGrowthElements as e} from "../elements/plant_growth_elements";
import {time} from "../testdata/testdata_automatedtestactivity_plantgrowth_ap";

export function verifyInitialDisplay() {
    e.verifyCreditsLabel();
    e.verifyReadAloudLabel();
    e.verifyControlsLabel();
    e.verifyInputSlider("Light");
    e.verifyInputSlider("Water");
    e.verifyInputSlider("CO2");
    e.verifyCO2Label("Some");
    e.verifyCmInToggle();

    e.verifyNewTrialButtonDisabled();
    e.verifyPlayButtonEnabled();
    e.verifySliderDisabled();
    e.verifySliderLabel("0");

    e.verifyTableTitle();
    e.verifyDeleteButtonLabel();
    e.verifyTableColumnNames();

    e.verifyBarGraphHeaderTitle();
    e.verifyBarGraphTitle();
    e.verifyYAxisLabel();
    e.verifyXTicksLabel("Graph1");
    e.verifyXTicksLabel("Graph2");
    e.verifyXAxisLabel();
}

export function runExperiment(c) {
    e.moveInputSlider("Light", c.light);
    e.moveInputSlider("Water", c.water);
    e.moveInputSlider("CO2", c.co2);
    e.verifyCO2Label(c.co2);

    e.playSimulation(time);

    e.verifyNewTrialButtonEnabled();
    e.verifyPlayButtonDisabled();
    e.verifySliderEnabled();  
}

export function verifyPreviousTrial(c) {
    e.selectTrial(c.trial-1);
    e.verifySugarUserBarGraph(c.graph);
    e.verifySugarCreatedBarGraph(c.graph);
    e.checkPlayback(c.result, c.trial);
}