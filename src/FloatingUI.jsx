import React, { useState, useEffect} from 'react';
import './FloatingUI.css';

export const GitHubLink = () => {
    return (
        <div className="github-container">
            <a
                href="https://github.com/BiancaIvanova/Mandelbrot-Demo"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/Mandelbrot-Demo/assets/github-mark.svg" alt="GitHub Logo"/>
            </a>
        </div>
    )
}