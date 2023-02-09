import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockData from "./mockData"
import CandidateskillInfo from './CandidateSkillsInfo';


describe('CandidateSkillsInfo component test', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
            status: 200
        })
    });
        // **************************************** Skills ****************************************

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
        let skillInput;
        waitFor(() => {
            skillInput = screen.getByPlaceholderText("skill")
        })
        fireEvent.change(skillInput, { target: { value: 'Python' } })
        expect(skillInput.value).toBe('Python')
        let levelInput;
        waitFor(() => {
            levelInput = screen.getByDisplayValue("Level")
        })
        fireEvent.change(levelInput, { target: { value: '5' } })
        expect(levelInput.value).toBe('5')
      });

      it('should send post request on clicking Add button', () => {
        render(<CandidateskillInfo />);
        const addBtn = screen.getByText("Add");
        fireEvent(addBtn, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        let addButton;
         waitFor(() => {
            addButton = screen.getByText("Add")
        })
        fireEvent(addButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        expect(fetch).toHaveBeenCalledTimes(4);
    });

    // **************************************** Certificates ****************************************
    it('should get user Certificate Data on first render', async () => {
        render(<CandidateskillInfo />);
        expect(fetch).toHaveBeenCalledTimes(2);
        const { originalFileName, category} = mockData[1]
        await waitFor(() => {
            const cert = screen.getAllByText(originalFileName);
            const cat = screen.getAllByText(category)
            cert.forEach((ele) =>{
                expect(ele).toBeInTheDocument();
            });
            cat.forEach((ele) => {
                expect(ele).toBeInTheDocument();
            })
        })
        
    });
    it('should be able to add new Certificate when we click Add button', () => {
        render(<CandidateskillInfo />);
        const uploadBtn = screen.getByText("Upload");
        fireEvent(uploadBtn, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
     waitFor(() => {
            expect(screen.getByText('No file selected.')).toBeInTheDocument();
        })
         waitFor(() => {
            expect(screen.getByText('Category')).toBeInTheDocument();
        })
    });

    it('file should be selected in inputted of the certificate field', () => {
        render(<CandidateskillInfo />);
        const uploadBtn = screen.getByText("Upload");
        let certInput;
        waitFor(() => {
            certInput = screen.getByPlaceholderText("Certificate")
        }) 
        const file = new File([""], "Build+Your+API+with+Spring.pdf", { type: "application/pdf" });
        fireEvent.change(certInput, { target: { files: [file] } });
        expect(certInput.files[0].name).toBe('Build+Your+API+with+Spring.pdf')
        let catInput;
        waitFor(() => {
            catInput = screen.getByDisplayValue("Category")
        })
        fireEvent.change(catInput, { target: { value: 'Other' } })
        expect(catInput.value).toBe('Other')
      });

      it('should send post request on clicking Add button', () => {
        render(<CandidateskillInfo />);
        const uploadBtn = screen.getByText("Upload");
        fireEvent(uploadBtn, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});