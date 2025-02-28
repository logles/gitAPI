// import { useState, useEffect } from "react";
// import { searchGithub, searchGithubUser } from "../api/API";
// import { Candidate } from "../interfaces/Candidate.interface";

// const CandidateSearch = () => {
//   const [candidate, setCandidate] = useState<Candidate | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

//   // load localStorage
//   useEffect(() => {
//     const storedCandidates = localStorage.getItem("savedCandidates");
//     if (storedCandidates) {
//       setSavedCandidates(JSON.parse(storedCandidates));
//     }
//   }, []);

//   // + button code
//   const saveCandidate = () => {
//     if (candidate) {
//       const updatedCandidates = [...savedCandidates, candidate];
//       setSavedCandidates(updatedCandidates);
//       localStorage.setItem(
//         "savedCandidates",
//         JSON.stringify(updatedCandidates)
//       );
//       loadCandidate();
//     }
//   };

//   // - button code
//   const skipCandidate = () => {
//     loadCandidate();
//   };

//   // load a candidate
//   const loadCandidate = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const candidates = await searchGithub();
//       console.log("Candidates response:", candidates);
//       if (candidates && candidates.length > 0) {
//         const candidateData = candidates[0];
//         const detailedCandidate = await searchGithubUser(candidateData.login);
//         setCandidate(detailedCandidate);
//       } else {
//         setError("No candidates found.");
//       }
//     } catch (err) {
//       setError("Error fetching candidate data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load candidate
//   useEffect(() => {
//     loadCandidate();
//   }, []);

//   if (loading) return <div>Loading candidate...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>CandidateSearch</h1>
//       {candidate && (
//         <>
//           <div className="candidateDetails">
//             <img src={candidate.avatar_url} alt={candidate.name} />
//             <h2>{`Name: ${candidate.name}`}</h2>
//             <p>{`Location: ${candidate.location}`}</p>
//             <p>{`Email: ${candidate.email}`}</p>
//             <p>{`Company: ${candidate.company}`}</p>
//             <p>{`Bio: ${candidate.bio}`}</p>
//           </div>
//           <div className="buttons">
//             <button className="minus" onClick={skipCandidate}>
//               –
//             </button>
//             <button className="plus" onClick={saveCandidate}>
//               +
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CandidateSearch;

import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to load a candidate from the API
  const loadCandidate = async () => {
    setLoading(true);
    setError("");
    try {
      const candidates = await searchGithub();
      console.log("Candidates response:", candidates);
      if (candidates && candidates.length > 0) {
        const candidateData = candidates[0]; // For simplicity, we use the first candidate.
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

  // Load the first candidate when the component mounts
  useEffect(() => {
    loadCandidate();
  }, []);

  // Handler for the "+" button:
  // Save the current candidate and then load the next candidate.
  const saveCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem(
        "savedCandidates",
        JSON.stringify(updatedCandidates)
      );
      loadCandidate();
    }
  };

  // Handler for the "–" button:
  // Simply load the next candidate without saving the current one.
  const skipCandidate = () => {
    loadCandidate();
  };

  if (loading) return <div>Loading candidate...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>CandidateSearch</h1>
      {candidate && (
        <>
          <div className="candidateDetails">
            <img
              className="avatar"
              src={candidate.avatar_url}
              alt={candidate.name}
            />
            <h2>{`Name: ${candidate.name}`}</h2>
            <p>{`Location: ${candidate.location}`}</p>
            <p>{`Email: ${candidate.email}`}</p>
            <p>{`Company: ${candidate.company}`}</p>
            <p>{`Bio: ${candidate.bio}`}</p>
          </div>
          <div className="buttons">
            <button className="minus" onClick={skipCandidate}>
              –
            </button>
            <button className="plus" onClick={saveCandidate}>
              +
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateSearch;
