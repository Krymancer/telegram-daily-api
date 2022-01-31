import { EVENTS, loadedCalendar, refreshEvents } from "./calendar";
import { bot, verifyDaily } from "./telegram";

function getEvents() {
  if (loadedCalendar) {
    //console.log(EVENTS);
    console.log("Calendar loaded");
    return false;
  } else {
    console.log("Calendar not loaded yet");
    return true;
  }
}

function verifyEvents() {
  setTimeout(() => {
    verifyDaily(EVENTS);
    refreshEvents();
    verifyEvents();
  }, 60000);
}

function waitForCalendar() {
  setTimeout(() => {
    const result = getEvents();
    if (result) {
      waitForCalendar();
    }
  }, 1000);
}

waitForCalendar();
verifyEvents();
