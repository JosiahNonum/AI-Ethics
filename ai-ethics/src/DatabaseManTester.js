import React from "react";
import { auth } from "./firebase";
import databaseManager from "./databaseManager";

function DatabaseManTester() {
  // function that console fetches then logs the glossary word
  async function fetchGlossary(word) {
    const glossaryWord = await databaseManager.fetchGlossary(word);
    console.log(glossaryWord);
  }

  // function that fetches then logs all leaderboard entries by quiz ID
  async function fetchLeaderboardByQuizID(quizID) {
    const leaderboard = await databaseManager.fetchLeaderboardByQuizID(quizID);
    console.log(leaderboard);
  }

  // function that fetches then logs all leaderboard entries by user ID
  async function fetchLeaderboardByUserID(userID) {
    const leaderboard = await databaseManager.fetchLeaderboardByUserID(userID);
    console.log(leaderboard);
  }

  // function that fetches then logs a user's profile
  async function fetchUserProfile(userID) {
    const user = auth.currentUser;
    if (user) {
      userID = user.uid;
    }

    const userProfile = await databaseManager.fetchUserProfile(userID);
    console.log(userProfile);
  }

  // function that logs the uid of the currently logged in user
  function fetchCurrentUser() {
    console.log(databaseManager.getCurrentUserId());
  }

  // function that fetches then logs all words from the glossary
  async function fetchAllWords() {
    const allWords = await databaseManager.fetchAllGlossary();
    console.log(allWords);
  }

  return (
    <div>
      <div
        style={{
          height: "100px",
          width: "100%",
          backgroundColor: "transparent",
        }}
      ></div>
      <button onClick={() => fetchGlossary("API")}>
        Click me to retrieve "LLM" glossary word
      </button>
      <button onClick={() => fetchLeaderboardByQuizID("foo")}>
        Click me to retrieve leaderboard by quiz ID foo
      </button>
      <button onClick={() => fetchLeaderboardByUserID("bar")}>
        Click me to retrieve leaderboard by user ID bar
      </button>
      <button onClick={() => fetchUserProfile("baz")}>
        Click me to retrieve user profile by user ID or logged in User (if you
        are logged in it will retrieve your profile)
      </button>
      <button onClick={fetchCurrentUser}>
        Click me to retrieve the current user's UID (if no user is logged in it
        will throw an error)
      </button>
      <button onClick={fetchAllWords}>
        Click me to retrieve all words from the glossary
      </button>
    </div>
  );
}

export default DatabaseManTester;