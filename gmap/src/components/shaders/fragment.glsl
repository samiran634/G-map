// Texture uniform
uniform sampler2D uTexture;

// Interpolated UV coordinates and normal from the vertex shader
varying vec2 vUv;
varying vec3 vNormal;

// Light direction (you can adjust this)
const vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));

void main() {
    // Sample the texture using UV coordinates
    vec4 textureColor = texture2D(uTexture, vUv);

    // Calculate the lighting intensity based on the normal and light direction
    float lightIntensity = max(dot(vNormal, lightDirection), 0.0);

    // Apply lighting to the texture color
    vec3 shadedColor = textureColor.rgb * lightIntensity;

    // Set the final fragment color
    gl_FragColor = vec4(shadedColor, textureColor.a); // Preserve texture alpha
}
