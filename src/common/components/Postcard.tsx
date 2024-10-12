import Sketch from "react-p5";
import P5 from "p5";

interface PostcardProps {
  backgroundColor: string;
  textColor: string;
  author: string;
  recipient: string;
  message: string;
}

export default function Postcard({
  backgroundColor,
  textColor,
  author,
  recipient,
  message,
}: PostcardProps): JSX.Element {
  const w = window.innerWidth * 0.35;

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(w, (w * 2) / 3).parent(canvasParentRef);
  };

  const draw = (p5: P5) => {
    p5.background(backgroundColor);
    p5.fill(textColor);

    p5.textWrap(p5.WORD);
    p5.textFont("Comic Neue");
    p5.textSize(p5.height * 0.1);

    p5.text(
      `From: ${author}`,
      p5.width * 0.1,
      (p5.height * 1) / 5,
      p5.width * 0.8
    );
    p5.text(
      `To: ${recipient}`,
      p5.width * 0.1,
      (p5.height * 1.5) / 5,
      p5.width * 0.8
    );
    p5.text(
      `${message}`,
      p5.width * 0.1,
      (p5.height * 2.2) / 3,
      p5.width * 0.8
    );
  };
  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{ border: "0.2em solid #fffbe6", height: `${(w * 2) / 3}px` }}
    />
  );
}
