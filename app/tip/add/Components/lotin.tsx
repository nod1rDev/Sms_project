"use client";
// components/LatCyrConverter.tsx
import { useEffect, useState } from "react";
import { TextField, Button, Container, Box, IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export const latinToCyrillic = (latin: string): string => {
  const map: { [key: string]: string } = {
    a: "а",
    A: "А",
    b: "б",
    B: "Б",
    c: "ц",
    C: "Ц",
    d: "д",
    D: "Д",
    e: "е",
    E: "Е",
    f: "ф",
    F: "Ф",
    g: "г",
    G: "Г",
    "g'": "ғ",
    "G'": "Ғ",
    h: "ҳ",
    H: "Ҳ",
    i: "и",
    I: "И",
    j: "ж",
    J: "Ж",
    k: "к",
    K: "К",
    l: "л",
    L: "Л",
    m: "м",
    M: "М",
    n: "н",
    N: "Н",
    o: "о",
    O: "О",
    "o'": "ў",
    "O'": "Ў",
    p: "п",
    P: "П",
    q: "қ",
    Q: "Қ",
    r: "р",
    R: "Р",
    s: "с",
    S: "С",
    t: "т",
    T: "Т",
    u: "у",
    U: "У",
    v: "в",
    V: "В",
    w: "ў",
    W: "Ў",
    x: "х",
    X: "Х",
    y: "й",
    Y: "Й",
    z: "з",
    Z: "З",
    sh: "ш",
    Sh: "Ш",
    SH: "Ш",
    ch: "ч",
    Ch: "Ч",
    CH: "Ч",
    Ye: "Е",
    YE: "Е",
    ye: "е",
    Yo: "Ё",
    YO: "Ё",
    yo: "ё",
    Yu: "Ю",
    YU: "Ю",
    yu: "ю",
    Ya: "Я",
    YA: "Я",
    ya: "я",
    " ": " ",
    "y'": "ь",
    "Y'": "ь",
    "'": "ь",
  };

  return latin.replace(
    /sh|Sh|SH|ch|Ch|CH|g'|G'|o'|O'|Ye|YE|ye|Yo|YO|yo|Yu|YU|yu|Ya|YA|ya|y'|Y'|'|./g,
    (char) => map[char] || char
  );
};

export const cyrillicToLatin = (cyrillic: string): string => {
  const map: { [key: string]: string } = {
    а: "a",
    А: "A",
    б: "b",
    Б: "B",
    ц: "c",
    Ц: "C",
    д: "d",
    Д: "D",
    е: "e",
    Е: "E",
    ф: "f",
    Ф: "F",
    г: "g",
    Г: "G",
    ғ: "g'",
    Ғ: "G'",
    ҳ: "h",
    Ҳ: "H",
    и: "i",
    И: "I",
    ж: "j",
    Ж: "J",
    к: "k",
    К: "K",
    л: "l",
    Л: "L",
    м: "m",
    М: "M",
    н: "n",
    Н: "N",
    о: "o",
    О: "O",
    ў: "o'",
    Ў: "O'",
    п: "p",
    П: "P",
    қ: "q",
    Қ: "Q",
    р: "r",
    Р: "R",
    с: "s",
    С: "S",
    т: "t",
    Т: "T",
    у: "u",
    У: "U",
    в: "v",
    В: "V",
    х: "x",
    Х: "X",
    й: "y",
    Й: "Y",
    з: "z",
    З: "Z",
    ш: "sh",
    Ш: "Sh",
    ч: "ch",
    Ч: "Ch",
    " ": " ",
  };

  return cyrillic.replace(/ш|ч|ғ|ў|./gi, (char) => map[char] || char);
};

const LatCyrConverter = ({
  setValue,
  value,
  clear,
}: {
  setValue: any;
  value: any;
  clear: any;
}) => {
  const [latinText, setLatinText] = useState("");

  const handleLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuee = e.target.value;
    setValue({ ...value, FIO: valuee });
    setLatinText(valuee);
  };

  useEffect(() => {
    setLatinText("");
  }, [clear]);

  return (
    <Box width={"100%"}>
      <TextField
        label={latinToCyrillic("FIO")}
        value={latinText}
        onChange={handleLatinChange}
        fullWidth
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        InputProps={{
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "false",
        }}
      />
    </Box>
  );
};

export default LatCyrConverter;
