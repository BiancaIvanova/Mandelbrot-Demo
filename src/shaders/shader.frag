precision mediump float;

uniform vec2 iResolution;
uniform float iTime;

vec2 squareImaginary( in vec2 n )
{
   return vec2 (
       n.x * n.x - n.y * n.y,
       2.0 * n.x * n.y
   );
}

void drawAxes( in vec2 currentPoint, inout vec4 color )
{
    float axesThickness = 0.002;
    float axis = 0.0;

    axis += smoothstep(axesThickness, 0.0, abs(currentPoint.x));
    axis += smoothstep(axesThickness, 0.0, abs(currentPoint.y));

    color.rgb = mix(color.rgb, vec3(1.0), clamp(axis, 0.0, 1.0));
}

void main()
{
    vec2 fragCoord = gl_FragCoord.xy;

    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float scale = 2.5;
    vec2 center = vec2(-0.5, 0.0);
    vec2 currentPoint = uv * scale + center;
    
    vec3 colorWeights = vec3(10.0, 10.0, 10.0 + sin(iTime));

    const int maxIterations = 256;
    vec2 mandelbrotNum = vec2(0, 0);
     
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    
    for (int i = 0; i < maxIterations; i += 1)
    {
        // Z(n+1) = Z(n)^2 + C
        vec2 oldMandelbrotNum = mandelbrotNum;
        mandelbrotNum = squareImaginary(oldMandelbrotNum) + currentPoint;
        
        if (dot(mandelbrotNum, mandelbrotNum) > 20.0)
        {
            float brightness = (float(i) - log2(log2(dot(mandelbrotNum, mandelbrotNum))) + 4.0) /
                                    float(maxIterations);
            color = vec4(vec3(brightness) * colorWeights, 1.0);
            break;
        }
        else
        {
            color = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }

    // Draw axes
    drawAxes(currentPoint, color);

    gl_FragColor = color;
}