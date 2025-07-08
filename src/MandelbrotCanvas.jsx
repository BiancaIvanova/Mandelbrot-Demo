import { useEffect, useRef } from "react";
import fragmentShader from "./shaders/shader.frag?raw";

const vertexShader = `
attribute vec4 a_position;
void main() {
    gl_Position = a_position;
}
`;

export default function MandelbrotCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");

        function compileShader(type, source)
        {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
            }

            return shader;
        }

        const vs = compileShader(gl.VERTEX_SHADER, vertexShader);
        const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
        const program = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, position);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1,  1, -1, -1,  1,
                -1,  1,  1, -1,  1,  1
            ]),
            gl.STATIC_DRAW
        );

        const posLoc = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLoc = gl.getUniformLocation(program, "iResolution");
        const iTimeLoc = gl.getUniformLocation(program, "iTime");

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const supersampleValue = 2; // x2 the device pixel ratio
            const width = Math.round(window.innerWidth * dpr * supersampleValue);
            const height = Math.round(window.innerHeight * dpr * supersampleValue);

            canvas.width = width;
            canvas.height = height;

            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";

            gl.viewport(0, 0, width, height);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let animationId;
        function render(time) {
            // Check if WebGL context is still valid
            if (gl.isContextLost()) {
                return;
            }
            
            gl.viewport(0, 0, canvas.width, canvas.height);

            gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
            gl.uniform1f(iTimeLoc, time * 0.001);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationId = requestAnimationFrame(render);
        }

        render(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };

    }, []);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} />
        </div>
    );
}