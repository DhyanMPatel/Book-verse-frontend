import { useState, useCallback } from "react";
import { Joyride, STATUS } from "react-joyride";

const TUTORIAL_STORAGE_KEY = "bookverse_tutorial_completed";

const JOYRIDE_STYLES = {
  options: {
    arrowColor: "#ffffff",
    backgroundColor: "#ffffff",
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#0284c7",
    textColor: "#1f2937",
    zIndex: 1000,
    width: 380,
  },
  tooltipContainer: {
    textAlign: "left",
  },
  tooltipContent: {
    padding: "16px 20px",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
  tooltipTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  buttonSkip: {
    color: "#6b7280",
    fontWeight: 500,
  },
  buttonNext: {
    backgroundColor: "#0284c7",
    borderRadius: "8px",
    fontWeight: 600,
    padding: "8px 20px",
  },
  buttonBack: {
    color: "#6b7280",
    fontWeight: 500,
    marginRight: 8,
  },
};

const JOYRIDE_LOCALE = {
  back: "Back",
  close: "Close",
  last: "Finish",
  next: "Next",
  skip: "Skip Tour",
};

function isTutorialCompleted() {
  return localStorage.getItem(TUTORIAL_STORAGE_KEY) === "true";
}

/**
 * JoyrideTutorial component.
 *
 * When `run` prop is provided, it fully controls the tour.
 * When `run` prop is NOT provided, the component auto-starts on first visit.
 *
 * Use a unique `key` on the component to force re-mount when needed
 * (e.g., when you want to re-trigger auto-start behavior).
 */
const JoyrideTutorial = ({ steps, run: externalRun, onFinish }) => {
  // If externally controlled, use externalRun. Otherwise, determine from localStorage.
  const [runState, setRunState] = useState(
    externalRun !== undefined
      ? externalRun
      : !isTutorialCompleted() && steps && steps.length > 0
  );

  const handleJoyrideCallback = useCallback(
    (data) => {
      const { status } = data;

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRunState(false);
        localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
        if (onFinish) {
          onFinish({ status });
        }
      }
    },
    [onFinish]
  );

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous={true}
      run={externalRun !== undefined ? externalRun : runState}
      steps={steps}
      showProgress={true}
      showSkipButton={true}
      disableOverlayClose={true}
      hideCloseButton={false}
      spotlightPadding={8}
      styles={JOYRIDE_STYLES}
      locale={JOYRIDE_LOCALE}
    />
  );
};

export default JoyrideTutorial;