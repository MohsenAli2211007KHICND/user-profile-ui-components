import React from 'react'
import AcademicTab from './AcademicTab'
import PersonalInfoTab from './PersonalInfoTab'

export default function ViewCandidateProfileInfo() {
  return (
    <div>
      <PersonalInfoTab />
      <AcademicTab />
    </div>
  )
}
