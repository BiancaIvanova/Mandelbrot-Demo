import React, { useState, useEffect} from 'react';
import './FloatingUI.css';
import githubLogo from '/assets/github-mark.svg';

export const GitHubLink = () => {
    return (
        <div className="github-container">
            <a
                href="https://github.com/BiancaIvanova/Mandelbrot-Demo"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={githubLogo} alt="GitHub Logo"/>
            </a>
        </div>
    )
}