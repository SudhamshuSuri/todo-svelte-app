<script>
    import { onMount } from 'svelte';

    onMount(() => {
        // Ensure particles.js is loaded
        if (window.particlesJS) {
            particlesJS("particles-container", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#f5e0dc" }, // Catppuccin Mocha rosewater
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                    line_linked: { enable: true, distance: 150, color: "#cba6f7", opacity: 0.4, width: 1 }, // Catppuccin Mocha lavender
                    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "bounce", bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" }, // Repulse particles on hover
                        onclick: { enable: true, mode: "push" }, // Add particles on click
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 }, // Repulse configuration
                        push: { particles_nb: 4 }, // Number of particles added on click
                    },
                },
                retina_detect: true,
            });
        } else {
            console.error("particlesJS is not loaded.");
        }
    });
</script>

<style>
    /* Ensure the particles canvas spans the background */
    #particles-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: #1e1e2e; /* Catppuccin Mocha base */
    }
</style>

<div id="particles-container"></div>
