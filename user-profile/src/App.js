import './App.css';
import CandidateAcademicInfo from './components/CandidateAcademicInfo/CandidateAcademicInfo';
import CandidatePersonalInfo from './components/CandidatePersonalInfo/CandidatePersonalInfo';
import CandidateSkillsInfo from './components/CandidateSkillsInfo/CandidateSkillsInfo';
import { CandidateWorkInfo } from './components/CandidateWorkInfo/CandidateWorkInfo';



function App() {
  return (
    <div className="App">
     {/* <CandidatePersonalInfo></CandidatePersonalInfo> 
    <CandidateAcademicInfo />
     <CandidateWorkInfo /> */}
    <CandidateSkillsInfo />
    </div>
  );
}

export default App;
