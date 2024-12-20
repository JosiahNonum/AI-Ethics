import React, { useState } from "react";
import "../styles/lessons.css";
import * as FaIcons from "react-icons/fa";
import LessonTour from "./tours/LessonTour";

// Import lesson components
import Mod1Sec1 from "./lessonContents/module1/mod1sec1";
import Mod1Sec2 from "./lessonContents/module1/mod1sec2";
import Mod1Sec3 from "./lessonContents/module1/mod1sec3";
import Mod1Sec4 from "./lessonContents/module1/mod1sec4";
import Mod1Sec5 from "./lessonContents/module1/mod1sec5";
import Mod1Sec6 from "./lessonContents/module1/mod1sec6";
import Mod1Sec7 from "./lessonContents/module1/mod1sec7";

// import Mod2Sec1 from "./lessonContents/module2/mod2sec1";
import Quiz from "./quiz";

// Module data with different section types (Lesson, Quiz, Video)
const moduleData = [
  {
    id: 1,
    title: "AI Ethics: An Introduction",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod1Sec1 /> },
      { type: "Lesson", contentComponent: <Mod1Sec2 /> },
      { type: "Lesson", contentComponent: <Mod1Sec3 /> },
      { type: "Lesson", contentComponent: <Mod1Sec4 /> },
      { type: "Lesson", contentComponent: <Mod1Sec5 /> },
      { type: "Lesson", contentComponent: <Mod1Sec6 /> },
      { type: "Lesson", contentComponent: <Mod1Sec7 /> },
      { type: "Quiz", contentComponent: <Quiz /> },
    ],
  },
  // {
  //   id: 2,
  //   title: "Module 2",
  //   time: "30min",
  //   sections: [
  //     { type: "Lesson", contentComponent: <Mod2Sec1 /> },
  //     { type: "Quiz", contentComponent: <Quiz /> },
  //   ],
  // },
  // Add more module data as necessary...
];


// Helper function to return icon and label based on type
const getSectionIconAndLabel = (type) => {
  switch (type) {
    case "Lesson":
      return { icon: <FaIcons.FaBrain />, label: "Lesson" };
    case "Quiz":
      return { icon: <FaIcons.FaQuestionCircle />, label: "Quiz" };
    case "Video":
      return { icon: <FaIcons.FaVideo />, label: "Video" };
    default:
      return { icon: <FaIcons.FaBook />, label: "Content" }; // Default icon/label if type is unknown
  }
};

const Lessons = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Track current section index
  const [selectedLessonContent, setSelectedLessonContent] = useState(null);
  const [selectedSectionType, setSelectedSectionType] = useState(null); // Track selected section type
  const [isLessonStarted, setIsLessonStarted] = useState(false); // Check if lesson is started
  const [selectedModule, setSelectedModule] = useState(null); // Track the selected module


  // Toggle Accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Filter sections by type
  const getSectionsByType = (module, type) => {
    return module.sections.filter((section) => section.type === type);
  };

  // Handle panel button click
  const handlePanelButtonClick = (moduleIndex, type) => {
    const module = moduleData[moduleIndex]; // Get the current module
    const filteredSections = getSectionsByType(moduleData[moduleIndex], type);
    setSelectedModule(module); // Set the selected module
    setSelectedSectionType(type);
    setCurrentSectionIndex(0); // Start at the first section of the selected type
    setSelectedLessonContent(filteredSections[0].contentComponent); // Render first section of the type
    setIsLessonStarted(true); // Mark as started
  };

  // Handle navigation between sections
  const handleNextClick = () => {
    const filteredSections = getSectionsByType(moduleData[0], selectedSectionType);
    if (currentSectionIndex < filteredSections.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      setSelectedLessonContent(filteredSections[nextIndex].contentComponent);
    }
  };

  const handlePrevClick = () => {
    const filteredSections = getSectionsByType(moduleData[0], selectedSectionType);
    if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(prevIndex);
      setSelectedLessonContent(filteredSections[prevIndex].contentComponent);
    }
  };

  // Dynamically render panel buttons based on unique section types
  const renderPanelButtons = (module, moduleIndex) => {
    const uniqueSectionTypes = [...new Set(module.sections.map((section) => section.type))];
    
    return uniqueSectionTypes.map((type) => {
      const { icon, label } = getSectionIconAndLabel(type);
      return (
        <button
          key={type}
          className={`panel-button ${selectedSectionType === type ? "active-panel-button" : ""}`}
          onClick={() => handlePanelButtonClick(moduleIndex, type)}
        >
          <span className="panel-button-icon">{icon}</span>
          <span className="panel-button-text">
            Module {module.id}: {label} <br />
            <span className="panel-button-time">{module.time}</span>
          </span>
          <span className="panel-button-status">&#10003;</span>
        </button>
      );
    });
  };

  return (
    <div className="lesson-container">
      <div className="module-navigation-container">
        <div className="module-header-container">
          <div className="main-header">Modules</div>
          <div className="sub-header">AI Ethics</div>
        </div>

        {moduleData.map((module, moduleIndex) => (
          <div key={module.id}>
            <button
              className={`accordion ${moduleIndex === 0 ? "first-accordion" : ""} ${activeAccordion === moduleIndex ? "active" : ""}`}
              onClick={() => toggleAccordion(moduleIndex)}
            >
              Module {module.id}
            </button>
            <div className="panel" style={{ maxHeight: activeAccordion === moduleIndex ? "300px" : "0" }}>
              {/* Render dynamic buttons for each unique section type */}
              {renderPanelButtons(module, moduleIndex)}
            </div>
          </div>
        ))}
      </div>

      <div className="module-content-container" style={{ backgroundColor: selectedSectionType === "Quiz" ? "#0056D121" : "whitesmoke" }}>
        {isLessonStarted && selectedModule ? (
          <>
            <div className="buttons-div" style={{ display: selectedSectionType === "Quiz" ? "none" : "" }}>
              <button
                id="prev-button"
                className="module-navigation-buttons"
                onClick={handlePrevClick}
                disabled={currentSectionIndex === 0}
              >
                &lt; Prev
              </button>
              <div className="module-title">{selectedModule.title}</div>
              <button
                id="next-button"
                className="module-navigation-buttons"
                onClick={handleNextClick}
                disabled={currentSectionIndex === getSectionsByType(moduleData[0], selectedSectionType).length - 1}
              >
                Next &gt;
              </button>
            </div>
            <div className="inner-module-container" style={{ height: selectedSectionType === "Quiz" ? "94vh" : "" }}>
              {selectedLessonContent}
            </div>
          </>
        ) : (
          <div>Select a lesson to begin</div>
        )}
      </div>

      <LessonTour />
    </div>
  );
};

export default Lessons;
