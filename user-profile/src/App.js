import './App.css';
import CandidateAcademicInfo from './components/CandidateAcademicInfo/CandidateAcademicInfo';
import CandidatePersonalInfo from './components/CandidatePersonalInfo/CandidatePersonalInfo';
import CandidateSkillsInfo from './components/CandidateSkillsInfo/CandidateSkillsInfo';
import { CandidateWorkInfo } from './components/CandidateWorkInfo/CandidateWorkInfo';
import SkillsTab from './components/ViewCandidateProfileInfo/SkillsTab';
import ViewCandidateProfileInfo from './components/ViewCandidateProfileInfo/ViewCandidateProfileInfo';



function App() {
  return (
    <div className="App">
     {/* <CandidatePersonalInfo></CandidatePersonalInfo> 
    <CandidateAcademicInfo />
     <CandidateWorkInfo /> */}
    <CandidateSkillsInfo />
    {/* <ViewCandidateProfileInfo /> */}
    {/* <SkillsTab /> */}
    {/* <ViewCandidateProfileInfo/> */}
    </div>
  );
}

export default App;
