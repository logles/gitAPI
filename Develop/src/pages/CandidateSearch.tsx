import React, { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Function to load a candidate
  const loadCandidate = async () => {
    setLoading(true);
    setError("");
    try {
      // Get a list of candidates from GitHub
      const candidates = await searchGithub();
      if (candidates && candidates.length > 0) {
        // Pick the first candidate from the list (or choose one randomly)
        const candidateData = candidates[0];
        // Get detailed information for the selected candidate
        const detailedCandidate = await searchGithubUser(candidateData.login);
        setCandidate(detailedCandidate);
      } else {
        setError("No candidates found.");
      }
    } catch (err) {
      setError("Error fetching candidate data.");
    } finally {
      setLoading(false);
    }
  };

  // Load a candidate when the component mounts
  useEffect(() => {
    loadCandidate();
  }, []);

  if (loading) return <div>Loading candidate...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>CandidateSearch</h1>
      {candidate && (
        <>
          <img src={candidate.avatar_url} alt={candidate.login} />
          <h2>{candidate.name || candidate.login}</h2>
          <p>{candidate.location}</p>
          <p>{candidate.email}</p>
          <p>{candidate.company}</p>
          <p>{candidate.bio}</p>
          {/* TO DO: Add + or - buttons */}
        </>
      )}
    </div>
  );
};

export default CandidateSearch;
