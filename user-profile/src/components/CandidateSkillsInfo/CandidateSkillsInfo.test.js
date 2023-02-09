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
        expect(fetch).toHaveBeenCalledTimes(2);
        const {skill, proficiency} = mockData[0]
        await waitFor(() => {
            const sk = screen.getAllByText(skill);
            const lv = screen.getAllByText(proficiency)
            sk.forEach((ele) =>{
                expect(ele).toBeInTheDocument();
            });
            lv.forEach((ele) => {
                expect(ele).toBeInTheDocument();
            })
        })
        
    });

    it('should be able to add new skill details when we click Add button', () => {
        render(<CandidateskillInfo />);
        const addBtn = screen.getByText("Add");
        fireEvent(addBtn, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
     waitFor(() => {
            expect(screen.getByPlaceholderText('skill')).toBeInTheDocument();
        })
         waitFor(() => {
            expect(screen.getByText('level')).toBeInTheDocument();
        })
    });

    it('text can be inputted into the Skill field', () => {
        render(<CandidateskillInfo />);
        const addBtn = screen.getByText("Add");
       // fireEvent(addAnotherBut, new MouseEvent('click', {
       //     bubbles: true,
       //     cancelable: true
       // }));
        let skillInput;
        waitFor(() => {
            skillInput = screen.getByPlaceholderText("skill")
        })
        fireEvent.change(skillInput, { target: { value: 'Python' } })
        expect(skillInput.value).toBe('Python')
        let levelInput;
        waitFor(() => {
            levelInput = screen.getByDisplayValue("level")
        })
        fireEvent.input(levelInput, { target: { value: '5' } })
        expect(levelInput.value).toBe('5')
      });

    //   it('should send post request on clicking Add button on add details page', async () => {
        // render(<CandidateskillInfo />);
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