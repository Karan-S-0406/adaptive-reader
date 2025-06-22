import React, { useState } from "react";
import { Typography, MenuItem, Select, IconButton, Tooltip } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import "./SideBySideReader.css";

const content = {
  original: `Mrs. Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow, fringed with alders and ladies’ eardrops and traversed by a brook that had its source away back in the woods of the old Cuthbert place; it was reputed to be an intricate, headlong brook in its earlier course through those woods, with dark secrets of pool and cascade; but by the time it reached Lynde’s Hollow it was a quiet, well-conducted little stream, for not even a brook could run past Mrs. Rachel Lynde’s door without due regard for decency and decorum; it probably was conscious that Mrs. Rachel was sitting at her window, keeping a sharp eye on everything that passed, from brooks and children up, and that if she noticed anything odd or out of place she would never rest until she had ferreted out the whys and wherefores thereof.

There are plenty of people in Avonlea and out of it, who can attend closely to their neighbor’s business by dint of neglecting their own; but Mrs. Rachel Lynde was one of those capable creatures who can manage their own concerns and those of other folks into the bargain. She was a notable housewife; her work was always done and well done; she “ran” the Sewing Circle, helped run the Sunday-school, and was the strongest prop of the Church Aid Society and Foreign Missions Auxiliary.`,
  gold: `Mrs. Rachel Lynde lived right where the Avonlea main road dipped down into a small hollow. The hollow was edged with alder trees and ladies’ eardrops, and a brook ran through it that started way back in the woods of the old Cuthbert place. The brook was known to be wild and fast in the woods, with hidden pools and waterfalls. But by the time it got to Lynde’s Hollow, it was a calm, well-behaved little stream. This was important because nothing, not even a stream, could pass by Mrs. Rachel Lynde’s house without behaving properly. Mrs. Rachel watched everything from her window, including brooks and children, and if she saw anything strange, she wouldn’t stop until she figured out what was going on.

Many people in Avonlea, and outside of it, spent more time watching their neighbors than doing their own work. But Mrs. Rachel was different. She could handle her own tasks and still keep an eye on everyone else. She was a great housewife; her chores were always done well. She led the Sewing Circle, helped run the Sunday-school, and was a big support to the Church Aid Society and the Foreign Missions Auxiliary.`,
  silver: `Mrs. Rachel Lynde lived by a small stream in Avonlea. The stream started in the woods and was wild there, but by the time it reached Mrs. Lynde’s house, it was calm and quiet. Mrs. Rachel liked to watch everything from her window. If she saw something strange, she would always find out what happened.

Mrs. Rachel was very good at taking care of her home and helping others. She finished her work, helped with the Sewing Circle and Sunday-school, and supported the church.`,
};

const content_es = {
  original: `La señora Rachel Lynde vivía justo donde la carretera principal de Avonlea bajaba a un pequeño valle, bordeado de alisos y pendientes de dama, y atravesado por un arroyo que nacía en los bosques de la antigua finca Cuthbert; se decía que era un arroyo complicado y precipitado en su curso anterior a través de esos bosques, con oscuros secretos de pozas y cascadas; pero cuando llegaba al Valle de Lynde era un arroyuelo tranquilo y bien portado, pues ni siquiera un arroyo podía pasar por la puerta de la señora Rachel Lynde sin el debido respeto a la decencia y el decoro; probablemente era consciente de que la señora Rachel estaba sentada en su ventana, vigilando todo lo que pasaba, desde arroyos hasta niños, y que si notaba algo raro o fuera de lugar no descansaría hasta descubrir el porqué de ello.

Hay mucha gente en Avonlea y fuera de ella que puede atender de cerca los asuntos de sus vecinos descuidando los propios; pero la señora Rachel Lynde era de esas personas capaces que pueden manejar sus propios asuntos y los de los demás además. Era una excelente ama de casa; su trabajo siempre estaba hecho y bien hecho; dirigía el Círculo de Costura, ayudaba en la escuela dominical y era el mayor apoyo de la Sociedad de Ayuda de la Iglesia y la Auxiliar de Misiones Extranjeras.`,
  gold: `La señora Rachel Lynde vivía justo donde la carretera principal de Avonlea bajaba a un pequeño valle. El valle estaba bordeado de alisos y pendientes de dama, y un arroyo lo atravesaba desde los bosques de la antigua finca Cuthbert. El arroyo era salvaje en el bosque, pero cuando llegaba al Valle de Lynde, era tranquilo y bien portado. Esto era importante porque nada, ni siquiera un arroyo, podía pasar por la casa de la señora Rachel Lynde sin comportarse bien. La señora Rachel miraba todo desde su ventana, incluidos los arroyos y los niños, y si veía algo extraño, no paraba hasta averiguar qué pasaba.

Mucha gente en Avonlea, y fuera de ella, pasaba más tiempo mirando a sus vecinos que haciendo su propio trabajo. Pero la señora Rachel era diferente. Podía hacer sus tareas y aún así vigilar a todos los demás. Era una gran ama de casa; sus tareas siempre estaban bien hechas. Dirigía el Círculo de Costura, ayudaba en la escuela dominical y apoyaba mucho a la Sociedad de Ayuda de la Iglesia y la Auxiliar de Misiones Extranjeras.`,
  silver: `La señora Rachel Lynde vivía junto a un arroyo pequeño en Avonlea. El arroyo empezaba en el bosque y era salvaje allí, pero cuando llegaba a la casa de la señora Lynde, era tranquilo y silencioso. A la señora Rachel le gustaba mirar todo desde su ventana. Si veía algo raro, siempre averiguaba qué había pasado.

La señora Rachel era muy buena cuidando su casa y ayudando a los demás. Terminaba su trabajo, ayudaba en el Círculo de Costura y la escuela dominical, y apoyaba a la iglesia.`,
};

const LANGUAGES = [
  { value: "en", label: "ENGLISH" },
  { value: "es", label: "SPANISH" },
];

const LEVELS = [
  { value: "original", label: "ORIGINAL", color: "#4CADA8" },
  { value: "gold", label: "GOLD", color: "#E6B15C" },
  { value: "silver", label: "SILVER", color: "#B0B0B0" },
];

function speak(text, lang) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === "es" ? "es-ES" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function ReaderColumn({ language, setLanguage, level, setLevel, content, audioLang }) {
  return (
    <section className="reader-col">
      <div className="reader-col-header">
        <Select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          variant="standard"
          className="reader-select"
        >
          {LANGUAGES.map(l => (
            <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
          ))}
        </Select>
        <Select
          value={level}
          onChange={e => setLevel(e.target.value)}
          variant="standard"
          className="reader-select"
          sx={{
            ml: 2,
            fontWeight: 600,
            color: LEVELS.find(l => l.value === level)?.color,
          }}
        >
          {LEVELS.map(l => (
            <MenuItem key={l.value} value={l.value}>
              <span style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: l.color,
                marginRight: 8,
                verticalAlign: "middle"
              }} />
              {l.label}
            </MenuItem>
          ))}
        </Select>
        <Tooltip title="Listen">
          <IconButton
            sx={{ ml: 2 }}
            onClick={() => speak(content, audioLang)}
            aria-label="Listen"
          >
            <VolumeUpIcon />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => window.speechSynthesis.pause()} aria-label="Pause">
          <PauseIcon />
        </IconButton>
        <IconButton onClick={() => window.speechSynthesis.resume()} aria-label="Resume">
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={() => window.speechSynthesis.cancel()} aria-label="Stop">
          <StopIcon />
        </IconButton>
      </div>
      <div className="reader-col-content">
        <Typography sx={{ fontSize: 16, color: "#222", whiteSpace: "pre-line" }}>
          {content}
        </Typography>
      </div>
    </section>
  );
}

export default function SideBySideReader() {
  const [leftLang, setLeftLang] = useState("en");
  const [rightLang, setRightLang] = useState("en");
  const [leftLevel, setLeftLevel] = useState("original");
  const [rightLevel, setRightLevel] = useState("gold");

  return (
    <div className="reader-root">
      <div className="reader-toolbar">
        <Typography className="reader-chapter" variant="subtitle1">
          <span role="img" aria-label="book">📖</span> CHAPTER I. Mrs. Rachel Lynde
        </Typography>
        <Typography className="reader-page" variant="body2">
          1 / 428
        </Typography>
        <div style={{ flex: 1 }} />
        <Typography className="reader-toolbar-option">
          <span style={{ marginRight: 8 }}>Default</span>
        </Typography>
        <Typography className="reader-toolbar-option">
          <span style={{ marginRight: 8 }}>2 Columns</span>
        </Typography>
      </div>
      <div className="reader-cols">
        <ReaderColumn
          language={leftLang}
          setLanguage={setLeftLang}
          level={leftLevel}
          setLevel={setLeftLevel}
          content={leftLang === "en" ? content[leftLevel] : content_es[leftLevel]}
          audioLang={leftLang}
        />
        <ReaderColumn
          language={rightLang}
          setLanguage={setRightLang}
          level={rightLevel}
          setLevel={setRightLevel}
          content={rightLang === "en" ? content[rightLevel] : content_es[rightLevel]}
          audioLang={rightLang}
        />
      </div>
    </div>
  );
}