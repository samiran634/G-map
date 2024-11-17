// Ensure the GLSL version is specified if needed
// #version 300 es // Uncomment if a specific version is required

// Pass UV coordinates to the fragment shader
varying vec2 vUv;

// Pass vertex normal to the fragment shader for smooth shading
varying vec3 vNormal;

// Declare necessary uniforms and attributes
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

void main() {
    // Assign UV coordinates
    vUv = uv;

    // Calculate the normal vector
    vNormal = normalize(normalMatrix * normal);

    // Set the position of the vertex
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
