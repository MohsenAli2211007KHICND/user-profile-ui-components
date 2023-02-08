import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockData from "./mockData"
import CandidateskillInfo from './CandidateSkillsInfo';


describe('CandidateSkillsInfo component test', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        })
    });

    it('should get user Skill Data on first render', async () => {
        render(<CandidateskillInfo />);
        expect(fetch).toHaveBeenCalledTimes(1);
        const {skill, proficiency} = mockData[0]
        await waitFor(() => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        })
        expect(screen.getByText(proficiency)).toBeInTheDocument();
        // expect(screen.getByText()).toBeInTheDocument();
        // expect(screen.getByText(degreeProgress)).toBeInTheDocument();
        // expect(screen.getByText(graduationDate)).toBeInTheDocument();
        // expect(screen.getByText(cgpa)).toBeInTheDocument();
        // expect(screen.getByText(finalYearProject)).toBeInTheDocument();
        
    });

    // it('should take us to adding educational details page when we click + Add Another button', async () => {
    //     render(<CandidateAcademicInfo />);
    //     const addAnotherButton = screen.getByText("+ Add New");
    //     fireEvent(addAnotherButton, new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true
    //     }));
    //     await waitFor(() => {
    //         expect(screen.getByPlaceholderText('School/University/College')).toBeInTheDocument();
    //     })
    //     await waitFor(() => {
    //         expect(screen.getByText('Cancel')).toBeInTheDocument();
    //     })
    // });

    // it('text can be inputted into the Title field on the add details page', async () => {
    //     render(<CandidateAcademicInfo />);
    //     const addAnotherButton = screen.getByText("+ Add New");
    //     fireEvent(addAnotherButton, new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true
    //     }));
    //     let titleInput;
    //     await waitFor(() => {
    //         titleInput = screen.getByPlaceholderText("Title (example Pre-Med, BSCS etc.)")
    //     })
    //     fireEvent.change(titleInput, { target: { value: 'Bachelor of Arts' } })
    //     expect(titleInput.value).toBe('Bachelor of Arts')
    //   });

    //   it('should send post request on clicking Add button on add details page', async () => {
    //     render(<CandidateAcademicInfo />);
    //     const addAnotherButton = screen.getByText("+ Add New");
    //     fireEvent(addAnotherButton, new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true
    //     }));
    //     let addButton;
    //     await waitFor(() => {
    //         addButton = screen.getByText("Add")
    //     })
    //     fireEvent(addButton, new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true
    //     }));
    //     expect(fetch).toHaveBeenCalledTimes(2);
    // });

});