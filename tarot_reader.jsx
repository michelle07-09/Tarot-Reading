import { useState, useEffect, useRef } from "react";

const MAJOR_ARCANA = [
  { name: "The Fool", symbol: "✦", number: "0",
    upright: "New beginnings, innocence, spontaneity, a free spirit",
    reversed: "Recklessness, risk-taking, inexperience, naivety",
    keywords_u: ["adventure", "potential", "leap of faith"],
    keywords_r: ["carelessness", "poor judgment", "hesitation"] },
  { name: "The Magician", symbol: "⊕", number: "I",
    upright: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, trickery, wasted talent, illusion",
    keywords_u: ["willpower", "creation", "skill"],
    keywords_r: ["deceit", "untapped talent", "delays"] },
  { name: "The High Priestess", symbol: "☽", number: "II",
    upright: "Intuition, sacred knowledge, inner wisdom, the subconscious",
    reversed: "Secrets, disconnected from intuition, repressed feelings",
    keywords_u: ["mystery", "insight", "feminine energy"],
    keywords_r: ["withdrawal", "surface knowledge", "confusion"] },
  { name: "The Empress", symbol: "♀", number: "III",
    upright: "Femininity, beauty, nature, nurturing, abundance",
    reversed: "Creative block, dependence on others, smothering",
    keywords_u: ["fertility", "sensuality", "growth"],
    keywords_r: ["stagnation", "neglect", "emptiness"] },
  { name: "The Emperor", symbol: "♂", number: "IV",
    upright: "Authority, structure, control, fatherhood, stability",
    reversed: "Domination, excessive control, rigidity, inflexibility",
    keywords_u: ["leadership", "discipline", "foundation"],
    keywords_r: ["tyranny", "obstruction", "lack of discipline"] },
  { name: "The Hierophant", symbol: "⛨", number: "V",
    upright: "Spiritual wisdom, tradition, conformity, institutions",
    reversed: "Personal beliefs, freedom, challenging norms, subversion",
    keywords_u: ["convention", "guidance", "ceremony"],
    keywords_r: ["rebellion", "unconventional", "restriction"] },
  { name: "The Lovers", symbol: "✿", number: "VI",
    upright: "Love, harmony, relationships, values alignment, choices",
    reversed: "Self-love issues, imbalance, misalignment of values",
    keywords_u: ["union", "partnership", "decision"],
    keywords_r: ["disharmony", "indecision", "misalignment"] },
  { name: "The Chariot", symbol: "◈", number: "VII",
    upright: "Control, willpower, success, determination, action",
    reversed: "Self-discipline lacking, opposition, lack of direction",
    keywords_u: ["ambition", "victory", "drive"],
    keywords_r: ["aggression", "scattered energy", "obstacles"] },
  { name: "Strength", symbol: "∞", number: "VIII",
    upright: "Strength, courage, patience, inner strength, compassion",
    reversed: "Inner strength doubted, low energy, raw emotion",
    keywords_u: ["resilience", "bravery", "influence"],
    keywords_r: ["weakness", "self-doubt", "insecurity"] },
  { name: "The Hermit", symbol: "⊙", number: "IX",
    upright: "Soul-searching, introspection, solitude, inner guidance",
    reversed: "Isolation, loneliness, withdrawal, self-imposed exile",
    keywords_u: ["wisdom", "reflection", "guidance"],
    keywords_r: ["seclusion", "abandonment", "lost path"] },
  { name: "Wheel of Fortune", symbol: "⊛", number: "X",
    upright: "Good luck, karma, cycles, destiny, a turning point",
    reversed: "Bad luck, lack of control, breaking cycles, resistance",
    keywords_u: ["change", "fortune", "turning point"],
    keywords_r: ["misfortune", "external forces", "setback"] },
  { name: "Justice", symbol: "⚖", number: "XI",
    upright: "Justice, fairness, truth, cause and effect, law",
    reversed: "Unfairness, lack of accountability, dishonesty",
    keywords_u: ["balance", "truth", "consequence"],
    keywords_r: ["bias", "injustice", "dishonesty"] },
  { name: "The Hanged Man", symbol: "⊼", number: "XII",
    upright: "Suspension, restriction, letting go, new perspectives",
    reversed: "Delays, resistance, stalling, indecision",
    keywords_u: ["sacrifice", "pause", "surrender"],
    keywords_r: ["martyrdom", "stagnation", "resistance"] },
  { name: "Death", symbol: "⧖", number: "XIII",
    upright: "Endings, change, transformation, transition, letting go",
    reversed: "Resistance to change, inability to move on, clinging",
    keywords_u: ["transformation", "endings", "new chapter"],
    keywords_r: ["fear of change", "stagnation", "clinging to past"] },
  { name: "Temperance", symbol: "⌗", number: "XIV",
    upright: "Balance, moderation, patience, purpose, meaning",
    reversed: "Imbalance, excess, self-healing, realignment needed",
    keywords_u: ["harmony", "patience", "moderation"],
    keywords_r: ["extremes", "excess", "lack of balance"] },
  { name: "The Devil", symbol: "⛧", number: "XV",
    upright: "Shadow self, attachment, addiction, restriction, materialism",
    reversed: "Releasing limiting beliefs, detachment, reclaiming power",
    keywords_u: ["bondage", "temptation", "materialism"],
    keywords_r: ["freedom", "release", "awareness"] },
  { name: "The Tower", symbol: "⚡", number: "XVI",
    upright: "Sudden change, upheaval, chaos, revelation, awakening",
    reversed: "Fear of change, avoiding disaster, resisting upheaval",
    keywords_u: ["disruption", "revelation", "collapse"],
    keywords_r: ["avoidance", "fear", "narrow escape"] },
  { name: "The Star", symbol: "★", number: "XVII",
    upright: "Hope, faith, purpose, renewal, spirituality",
    reversed: "Faithlessness, discouragement, insecurity, hopelessness",
    keywords_u: ["inspiration", "serenity", "optimism"],
    keywords_r: ["despair", "disconnection", "lack of faith"] },
  { name: "The Moon", symbol: "☾", number: "XVIII",
    upright: "Illusion, fear, the unconscious, confusion, complexities",
    reversed: "Release of fear, repressed emotions rising, confusion clearing",
    keywords_u: ["intuition", "mystery", "subconscious"],
    keywords_r: ["misinterpretation", "fear lifting", "clarity coming"] },
  { name: "The Sun", symbol: "☀", number: "XIX",
    upright: "Positivity, fun, warmth, success, vitality",
    reversed: "Inner child, feeling down, overly optimistic, blocked",
    keywords_u: ["joy", "radiance", "success"],
    keywords_r: ["pessimism", "ego", "blocked energy"] },
  { name: "Judgement", symbol: "⊗", number: "XX",
    upright: "Judgement, rebirth, inner calling, absolution",
    reversed: "Self-doubt, refusal of self-examination, ignored calls",
    keywords_u: ["reflection", "reckoning", "awakening"],
    keywords_r: ["self-criticism", "ignoring signs", "denial"] },
  { name: "The World", symbol: "◎", number: "XXI",
    upright: "Completion, integration, accomplishment, travel",
    reversed: "Seeking closure, shortcuts, incomplete journey",
    keywords_u: ["fulfillment", "wholeness", "achievement"],
    keywords_r: ["incompleteness", "delay", "unfinished work"] },
];

const SUITS = [
  { name: "Wands", symbol: "🜂", element: "Fire", theme: "passion, career, energy" },
  { name: "Cups", symbol: "🜄", element: "Water", theme: "emotions, relationships, intuition" },
  { name: "Swords", symbol: "🜁", element: "Air", theme: "intellect, conflict, truth" },
  { name: "Pentacles", symbol: "🜃", element: "Earth", theme: "material, body, finances" },
];

const SUIT_CARDS = [
  { rank: "Ace", upright: "New beginnings, raw potential, seed of", reversed: "Blocked, delays, missed opportunity in" },
  { rank: "Two", upright: "Balance, partnership, duality in", reversed: "Imbalance, indecision, stalemate in" },
  { rank: "Three", upright: "Collaboration, creativity, growth in", reversed: "Isolation, delays, lack of progress in" },
  { rank: "Four", upright: "Stability, foundations, rest related to", reversed: "Disruption, restlessness, change in" },
  { rank: "Five", upright: "Conflict, challenge, change around", reversed: "Recovery, moving past conflict in" },
  { rank: "Six", upright: "Harmony, transition, solutions found in", reversed: "Unresolved, stuck in the past regarding" },
  { rank: "Seven", upright: "Perseverance, strategy, vision within", reversed: "Scattered focus, evasion, lack of strategy in" },
  { rank: "Eight", upright: "Movement, rapid change, action in", reversed: "Delays, frustration, stagnation in" },
  { rank: "Nine", upright: "Resilience, nearly complete journey in", reversed: "Exhaustion, pessimism, last hurdles in" },
  { rank: "Ten", upright: "Completion, fulfillment, end of a cycle in", reversed: "Burden, excess, failed endings in" },
  { rank: "Page", upright: "Curiosity, enthusiasm, messages about", reversed: "Immaturity, delays, recklessness around" },
  { rank: "Knight", upright: "Action, adventure, moving quickly toward", reversed: "Impulsiveness, scattered energy regarding" },
  { rank: "Queen", upright: "Mastery, intuitive understanding, nurturing", reversed: "Insecurity, cold, overbearing in" },
  { rank: "King", upright: "Authority, wisdom, mastery of", reversed: "Abuse of power, lack of control, tyranny over" },
];

function buildDeck() {
  const deck = [...MAJOR_ARCANA.map(c => ({ ...c, suit: null, isMajor: true }))];
  SUITS.forEach(suit => {
    SUIT_CARDS.forEach(sc => {
      deck.push({
        name: `${sc.rank} of ${suit.name}`,
        symbol: suit.symbol,
        number: sc.rank,
        suit: suit.name,
        element: suit.element,
        isMajor: false,
        upright: `${sc.upright} ${suit.theme}`,
        reversed: `${sc.reversed} ${suit.theme}`,
        keywords_u: [suit.element.toLowerCase(), suit.theme.split(",")[0].trim(), sc.rank.toLowerCase()],
        keywords_r: ["blocked", suit.theme.split(",")[1]?.trim() || "disrupted", "reversed energy"],
      });
    });
  });
  return deck;
}

const DECK = buildDeck();

const SPREADS = {
  single: {
    label: "Single Card",
    positions: ["The Message"],
    description: "One card drawn for clarity on your question.",
  },
  three: {
    label: "Past · Present · Future",
    positions: ["Past", "Present", "Future"],
    description: "A three-card spread illuminating time and direction.",
  },
  five: {
    label: "Five-Card Cross",
    positions: ["Situation", "Challenge", "Advice", "Hidden Influence", "Outcome"],
    description: "A cross spread revealing layers of your question.",
  },
};

const POSITION_CONTEXT = {
  "The Message": "This card speaks directly to the heart of your inquiry.",
  "Past": "This energy has shaped the path that brought you here.",
  "Present": "This is the current energy surrounding your situation.",
  "Future": "This energy is moving toward you on the horizon.",
  "Situation": "This card reflects the core of what you are facing.",
  "Challenge": "This is the primary obstacle or tension in play.",
  "Advice": "The universe offers this guidance for your path forward.",
  "Hidden Influence": "An unseen force is quietly shaping this situation.",
  "Outcome": "Should current energies continue, this is what approaches.",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawCards(n) {
  const shuffled = shuffle(DECK);
  return shuffled.slice(0, n).map(card => ({
    ...card,
    reversed: Math.random() > 0.5,
  }));
}

function generateReading(card, position) {
  const meaning = card.reversed ? card.reversed : card.upright;
  const context = POSITION_CONTEXT[position] || "";
  const keywords = card.reversed ? card.keywords_r : card.keywords_u;
  const orientation = card.reversed ? "reversed" : "upright";

  const openings = [
    `In the position of ${position}, ${card.name} (${orientation}) speaks of`,
    `${card.name} in ${position} carries the energy of`,
    `The ${orientation} ${card.name} placed in ${position} reflects`,
    `Here in the ${position} position, ${card.name} (${orientation}) reveals`,
  ];

  const closings = [
    `This invites you to consider the themes of ${keywords.join(", ")} as you move forward.`,
    `The essence of ${keywords[0]} and ${keywords[1] || "reflection"} is asking for your attention.`,
    `Allow the vibration of ${keywords.join(" and ")} to guide your understanding.`,
    `Sit with the energy of ${keywords[0]} — it holds a message meant for you.`,
  ];

  const opening = openings[Math.floor(Math.random() * openings.length)];
  const closing = closings[Math.floor(Math.random() * closings.length)];

  return `${opening} ${meaning.toLowerCase()}. ${context} ${closing}`;
}

const CARD_BACK_PATTERN = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 120 200">
    <rect width="120" height="200" fill="#1a0e2e"/>
    <rect x="6" y="6" width="108" height="188" rx="3" fill="none" stroke="#c8a96e" stroke-width="0.8" opacity="0.6"/>
    <rect x="10" y="10" width="100" height="180" rx="2" fill="none" stroke="#c8a96e" stroke-width="0.4" opacity="0.4"/>
    <circle cx="60" cy="100" r="35" fill="none" stroke="#c8a96e" stroke-width="0.6" opacity="0.5"/>
    <circle cx="60" cy="100" r="25" fill="none" stroke="#c8a96e" stroke-width="0.3" opacity="0.4"/>
    <polygon points="60,68 67,90 90,90 72,103 78,125 60,112 42,125 48,103 30,90 53,90" fill="none" stroke="#c8a96e" stroke-width="0.5" opacity="0.6"/>
    <line x1="60" y1="65" x2="60" y2="35" stroke="#c8a96e" stroke-width="0.4" opacity="0.3"/>
    <line x1="60" y1="135" x2="60" y2="165" stroke="#c8a96e" stroke-width="0.4" opacity="0.3"/>
    <line x1="25" y1="100" x2="55" y2="100" stroke="#c8a96e" stroke-width="0.4" opacity="0.3"/>
    <line x1="65" y1="100" x2="95" y2="100" stroke="#c8a96e" stroke-width="0.4" opacity="0.3"/>
    <circle cx="60" cy="100" r="3" fill="#c8a96e" opacity="0.5"/>
    <circle cx="60" cy="35" r="1.5" fill="#c8a96e" opacity="0.4"/>
    <circle cx="60" cy="165" r="1.5" fill="#c8a96e" opacity="0.4"/>
    <circle cx="25" cy="100" r="1.5" fill="#c8a96e" opacity="0.4"/>
    <circle cx="95" cy="100" r="1.5" fill="#c8a96e" opacity="0.4"/>
  </svg>
`;

function CardBack({ size = "md" }) {
  const sizes = { sm: "w-16 h-24", md: "w-24 h-36", lg: "w-32 h-48" };
  return (
    <div
      className={`${sizes[size]} rounded-lg overflow-hidden`}
      style={{ background: "#1a0e2e", border: "1px solid rgba(200,169,110,0.4)" }}
      dangerouslySetInnerHTML={{ __html: CARD_BACK_PATTERN }}
    />
  );
}

function TarotCardFace({ card, size = "md", revealed = true }) {
  const sizeMap = {
    sm: { w: "64px", h: "96px", nameSize: "7px", numSize: "8px", symSize: "16px" },
    md: { w: "96px", h: "144px", nameSize: "8.5px", numSize: "9px", symSize: "22px" },
    lg: { w: "128px", h: "192px", nameSize: "10px", numSize: "11px", symSize: "28px" },
  };
  const s = sizeMap[size];
  const isRev = card.reversed;
  const suitColor = card.suit
    ? { Wands: "#e8956d", Cups: "#7eb8d4", Swords: "#b8b8d4", Pentacles: "#8cc87e" }[card.suit]
    : "#c8a96e";

  return (
    <div
      style={{
        width: s.w,
        height: s.h,
        background: "linear-gradient(160deg, #1e1330 0%, #0f0a1e 100%)",
        border: `1px solid ${suitColor}55`,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 4px",
        transform: isRev ? "rotate(180deg)" : "rotate(0deg)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 30%, ${suitColor}10 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{ fontSize: s.numSize, color: `${suitColor}88`, fontFamily: "serif", letterSpacing: "0.1em" }}>
        {card.number}
      </div>
      <div style={{ fontSize: s.symSize, color: suitColor, lineHeight: 1 }}>
        {card.symbol}
      </div>
      <div style={{
        fontSize: s.nameSize,
        color: "#e8dfc8",
        textAlign: "center",
        fontFamily: "Georgia, serif",
        lineHeight: 1.2,
        padding: "0 2px",
        letterSpacing: "0.02em",
      }}>
        {card.name}
      </div>
    </div>
  );
}

function FlipCard({ card, position, delay = 0, onReveal }) {
  const [flipped, setFlipped] = useState(false);
  const [reading, setReading] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setFlipped(true);
      setReading(generateReading(card, position));
      if (onReveal) onReveal();
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div style={{ fontSize: "10px", color: "#c8a96e99", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "serif" }}>
        {position}
      </div>
      <div style={{ perspective: "600px", width: "96px", height: "144px" }}>
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            <CardBack size="md" />
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <TarotCardFace card={card} size="md" />
          </div>
        </div>
      </div>
      {flipped && (
        <div style={{
          maxWidth: "140px",
          textAlign: "center",
          animation: "fadeUp 0.5s ease forwards",
        }}>
          <div style={{ fontSize: "11px", color: card.reversed ? "#d4856a" : "#8cc87e", letterSpacing: "0.1em", marginBottom: "4px" }}>
            {card.reversed ? "↓ reversed" : "↑ upright"}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TarotReader() {
  const [spread, setSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [readings, setReadings] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [phase, setPhase] = useState("home"); // home | select | reading | detail
  const [question, setQuestion] = useState("");
  const [allRevealed, setAllRevealed] = useState(false);

  const revealCount = useRef(0);

  function startReading(spreadKey) {
    setSpread(spreadKey);
    setPhase("question");
  }

  function drawAndReveal() {
    const s = SPREADS[spread];
    const drawn = drawCards(s.positions.length);
    const r = drawn.map((card, i) => generateReading(card, s.positions[i]));
    setCards(drawn);
    setReadings(r);
    revealCount.current = 0;
    setAllRevealed(false);
    setActiveCard(0);
    setPhase("reading");
  }

  function handleCardReveal() {
    revealCount.current += 1;
    if (revealCount.current >= SPREADS[spread]?.positions.length) {
      setTimeout(() => setAllRevealed(true), 600);
    }
  }

  function reset() {
    setSpread(null);
    setCards([]);
    setReadings([]);
    setActiveCard(null);
    setPhase("home");
    setQuestion("");
    setAllRevealed(false);
    revealCount.current = 0;
  }

  const bgStyle = {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 50% 0%, #1f0f3a 0%, #0a0614 60%, #060410 100%)",
    color: "#e8dfc8",
    fontFamily: "Georgia, 'Times New Roman', serif",
    padding: "0",
    position: "relative",
    overflow: "hidden",
  };

  const goldText = { color: "#c8a96e" };
  const mutedText = { color: "#a09070" };
  const thinBorder = { border: "0.5px solid rgba(200,169,110,0.25)" };

  return (
    <div style={bgStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cinzel { font-family: 'Cinzel', Georgia, serif !important; }
        .cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .spread-btn {
          background: transparent;
          border: 0.5px solid rgba(200,169,110,0.35);
          border-radius: 8px;
          padding: 16px 20px;
          cursor: pointer;
          color: #e8dfc8;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
        }
        .spread-btn:hover {
          background: rgba(200,169,110,0.08);
          border-color: rgba(200,169,110,0.6);
        }
        .card-slot {
          cursor: pointer;
          transition: transform 0.2s ease;
          border-radius: 8px;
        }
        .card-slot:hover { transform: translateY(-4px); }
        .card-slot.active { filter: drop-shadow(0 0 12px rgba(200,169,110,0.4)); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .star { animation: starPulse 3s ease-in-out infinite; }
        .star:nth-child(2) { animation-delay: 1s; }
        .star:nth-child(3) { animation-delay: 2s; }
        .reading-text {
          font-size: 15px;
          line-height: 1.8;
          color: #c8b89a;
          font-style: italic;
        }
        .gold-divider {
          width: 60px;
          height: 0.5px;
          background: rgba(200,169,110,0.4);
          margin: 0 auto;
        }
        textarea {
          background: rgba(200,169,110,0.05);
          border: 0.5px solid rgba(200,169,110,0.25);
          border-radius: 8px;
          color: #e8dfc8;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          padding: 12px 16px;
          width: 100%;
          resize: none;
          outline: none;
        }
        textarea:focus { border-color: rgba(200,169,110,0.55); }
        textarea::placeholder { color: rgba(200,169,110,0.35); font-style: italic; }
      `}</style>

      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="star" style={{
            position: "absolute",
            width: i % 3 === 0 ? "2px" : "1px",
            height: i % 3 === 0 ? "2px" : "1px",
            borderRadius: "50%",
            background: "#c8a96e",
            top: `${5 + (i * 37 % 85)}%`,
            left: `${3 + (i * 53 % 94)}%`,
            animationDelay: `${(i * 0.4)}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ ...goldText, fontSize: "11px", letterSpacing: "0.4em", marginBottom: "12px" }} className="cinzel">
            ✦ ARCANA ✦
          </div>
          <h1 style={{ fontSize: "38px", fontWeight: 400, letterSpacing: "0.08em", marginBottom: "8px" }} className="cinzel">
            The Tarot
          </h1>
          <div style={{ ...mutedText, fontSize: "14px", fontStyle: "italic" }} className="cormorant">
            Seek wisdom in the cards
          </div>
        </div>

        {/* HOME */}
        {phase === "home" && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ ...thinBorder, borderRadius: "12px", padding: "32px", marginBottom: "24px", background: "rgba(200,169,110,0.03)" }}>
              <div style={{ ...goldText, fontSize: "12px", letterSpacing: "0.25em", marginBottom: "20px", textAlign: "center" }} className="cinzel">
                CHOOSE YOUR SPREAD
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(SPREADS).map(([key, s]) => (
                  <button key={key} className="spread-btn" onClick={() => startReading(key)}>
                    <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }} className="cinzel">
                      {s.label}
                    </div>
                    <div style={{ ...mutedText, fontSize: "13px", fontStyle: "italic" }} className="cormorant">
                      {s.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ ...mutedText, fontSize: "12px", letterSpacing: "0.15em" }} className="cinzel">
                78 CARDS · MAJOR & MINOR ARCANA
              </div>
            </div>
          </div>
        )}

        {/* QUESTION */}
        {phase === "question" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div style={{ ...thinBorder, borderRadius: "12px", padding: "32px", background: "rgba(200,169,110,0.03)" }}>
              <div style={{ ...goldText, fontSize: "12px", letterSpacing: "0.25em", marginBottom: "8px", textAlign: "center" }} className="cinzel">
                {SPREADS[spread].label.toUpperCase()}
              </div>
              <div className="gold-divider" style={{ marginBottom: "24px" }} />

              <div style={{ ...mutedText, fontSize: "15px", fontStyle: "italic", textAlign: "center", marginBottom: "20px", lineHeight: 1.7 }} className="cormorant">
                Still your mind. Focus on what you wish to know.<br />
                You may speak your question aloud, or hold it silently within.
              </div>

              <textarea
                rows={3}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="What is your question for the cards? (optional)"
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button className="spread-btn" style={{ flex: 1, textAlign: "center" }} onClick={drawAndReveal}>
                  <span style={{ ...goldText, fontSize: "13px", letterSpacing: "0.2em" }} className="cinzel">
                    ✦ DRAW THE CARDS ✦
                  </span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", ...mutedText, fontSize: "12px", letterSpacing: "0.1em" }} className="cinzel">
                ← back
              </button>
            </div>
          </div>
        )}

        {/* READING */}
        {phase === "reading" && spread && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            {question && (
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ ...mutedText, fontSize: "13px", fontStyle: "italic", letterSpacing: "0.05em" }} className="cormorant">
                  "{question}"
                </div>
              </div>
            )}

            {/* Cards Row */}
            <div style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}>
              {cards.map((card, i) => (
                <div
                  key={i}
                  className={`card-slot ${activeCard === i ? "active" : ""}`}
                  onClick={() => setActiveCard(i)}
                >
                  <FlipCard
                    card={card}
                    position={SPREADS[spread].positions[i]}
                    delay={i * 600}
                    onReveal={handleCardReveal}
                  />
                </div>
              ))}
            </div>

            {/* Reading Detail */}
            {allRevealed && activeCard !== null && (
              <div style={{ animation: "fadeUp 0.6s ease", ...thinBorder, borderRadius: "12px", padding: "24px", background: "rgba(200,169,110,0.03)" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "16px" }}>
                  <TarotCardFace card={cards[activeCard]} size="sm" />
                  <div>
                    <div style={{ ...goldText, fontSize: "11px", letterSpacing: "0.2em", marginBottom: "4px" }} className="cinzel">
                      {SPREADS[spread].positions[activeCard]}
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 400, marginBottom: "4px" }} className="cinzel">
                      {cards[activeCard].name}
                    </div>
                    <div style={{ ...mutedText, fontSize: "12px", letterSpacing: "0.1em" }} className="cormorant">
                      {cards[activeCard].reversed ? "↓ Reversed" : "↑ Upright"}
                      {cards[activeCard].suit && ` · ${cards[activeCard].element}`}
                    </div>
                    <div style={{ ...mutedText, fontSize: "12px", marginTop: "6px", fontStyle: "italic" }} className="cormorant">
                      {(cards[activeCard].reversed ? cards[activeCard].keywords_r : cards[activeCard].keywords_u).join(" · ")}
                    </div>
                  </div>
                </div>

                <div className="gold-divider" style={{ marginBottom: "16px" }} />

                <p className="reading-text cormorant">
                  {readings[activeCard]}
                </p>

                {cards.length > 1 && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    {cards.map((_, i) => (
                      <button
                        key={i}
                        className="spread-btn"
                        style={{ width: "auto", padding: "6px 14px", fontSize: "11px", letterSpacing: "0.15em", textAlign: "center" }}
                        onClick={() => setActiveCard(i)}
                      >
                        <span className="cinzel" style={activeCard === i ? goldText : {}}>
                          {SPREADS[spread].positions[i].toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {allRevealed && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button onClick={reset} style={{ background: "none", border: "0.5px solid rgba(200,169,110,0.3)", borderRadius: "8px", cursor: "pointer", color: "#a09070", fontSize: "12px", letterSpacing: "0.2em", padding: "10px 24px" }} className="cinzel">
                  ✦ NEW READING ✦
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <div style={{ ...mutedText, fontSize: "11px", letterSpacing: "0.2em" }} className="cinzel">
            ✦ · ✦ · ✦
          </div>
        </div>

      </div>
    </div>
  );
}