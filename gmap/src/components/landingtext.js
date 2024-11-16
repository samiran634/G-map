import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import world from "../assets/worldmap.png";
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
 
const text = "welcome to the map";
const StyledText = styled.div`
    width: 200%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    height: 60vh;
    color: black;
    font-size: 20em;
    font-weight: 600;
    font-family: 'monospace';
    overflow-x: hidden;
    white-space: nowrap;
     background-image: url(${world});
       background-size: 120%;
`;
const subtitle="Explore Gmap like never before";
const array = subtitle.split(" ");
const StyledSubtitle=styled.div`
    font-size: 2em;
    display: inline-flex;
    font-weight: 400;
    color: white;
    position:relative;
    left: 40%;
    
`;
const LandingText = (props) => {
    const textRef = useRef();
    const subtitleRef = useRef([]);
    console.log(props);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                scroller: "body",
                markers: true,
                start: "top 0",
                end: "top -650%",
                scrub: true,
                pin: true,
            }
        });

        // Animate the title first
        tl.to(textRef.current, {
            x: "-100%",
            ease: "power2.inOut",
            duration: 4,
        });

        // Then animate the subtitle
        tl.from(subtitleRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            delay: 1,
            stagger: 0.2,
        });
    }, [textRef, subtitleRef]);

    return (
        <>
            <StyledText ref={textRef} className="text">{text}</StyledText>
            <StyledSubtitle>
                {array.map((word, index) => (
                    <span
                        key={index}
                        ref={el => subtitleRef.current[index] = el}
                        style={{ display: 'inline-block' }}
                    >
                        {word} 
                    </span>
                ))}
            </StyledSubtitle>
        </>
    );
}

export default LandingText;
