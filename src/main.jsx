import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const PRICE = '$20 / month';

const RECIPES = [
  { id: 'proposal', name: 'Proposal', blurb: 'Scope, timeline, and a price the client can approve.' },
  { id: 'invoice', name: 'Invoice', blurb: 'Line items, your business name, and a total.' },
  { id: 'email', name: 'Client email', blurb: 'The note that sends the proposal or the invoice.' },
  { id: 'rewrite', name: 'Rewrite', blurb: 'Same facts, clearer sentences, the tone you pick.' },
  { id: 'social', name: 'Social trio', blurb: 'One finished job, turned into three short posts.' },
  { id: 'meeting', name: 'Meeting follow-up', blurb: 'Paste rough notes. Get a recap and the next email.' },
  { id: 'week', name: 'Week plan', blurb: 'Five concrete tasks from the job you just described.' }
];

const draftFor = (recipe, form) => {
  const business = form.business || 'Your studio';
  const client = form.client || 'the client';
  const job = form.job || 'the project we discussed';
  const rate = form.rate || 'the fee we agree before work starts';
  const tone = form.tone || 'warm and direct';
  if (recipe === 'proposal') {
    return `${business}\nProposal for ${client}\n\nOverview\n${job}\n\nScope\n• Discovery and a written plan\n• The core deliverable\n• One round of revisions\n\nTimeline\nAbout two weeks from approval, unless you name a different date.\n\nInvestment\n${rate}\n\nNext step\nReply to approve, and ${business} will send the invoice and a start date.\n\nTone of this draft: ${tone}.`;
  }
  if (recipe === 'invoice') {
    return `INVOICE\n${business}\n\nBill to: ${client}\nFor: ${job}\n\nDescription                         Amount\n${job}                              ${rate}\n\nTotal due                           ${rate}\n\nPlease reply if a detail needs to change before you pay.`;
  }
  if (recipe === 'email') {
    return `Subject: ${job} — next step from ${business}\n\nHi,\n\nHere is the ${job} for ${client}. The fee is ${rate}.\n\nIf this looks right, reply and I will send the invoice. If something should change, tell me what to adjust.\n\nThank you,\n${business}`;
  }
  if (recipe === 'rewrite') {
    const source = form.job || 'Thanks for the note. We can start next week if the scope still matches what we discussed.';
    return `Clearer version (${tone}):\n\n${source.replace(/\s+/g, ' ').trim()}\n\nWhat changed: shorter sentences, the same facts, no new promises. Read it once before you send it.`;
  }
  if (recipe === 'social') {
    return `Three posts from the same job\n\n1. Just wrapped ${job} for a client. The useful part was agreeing the scope before the design started.\n\n2. A proposal is easier to approve when the price and the timeline sit on the same page. That is how ${business} writes them.\n\n3. If you need ${job}, the first step is a short brief. I will send back scope, timing, and ${rate}.`;
  }
  if (recipe === 'meeting') {
    return `Recap for ${client}\n\nWe talked about: ${job}\nFee discussed: ${rate}\n\nAgreed next steps\n• ${business} sends this recap\n• Client confirms the scope\n• Work starts after the invoice is approved\n\nSubject: Notes from our conversation\n\nHi,\n\nThanks for the time. Here is what I heard, and the next step on my side. Correct anything I missed.\n\n${business}`;
  }
  return `Week plan — ${business}\nClient: ${client}\nJob: ${job}\n\n1. Confirm the scope in one paragraph.\n2. Send the proposal with ${rate}.\n3. Block two focused work sessions.\n4. Share a midpoint check-in.\n5. Send the invoice and a short close-out note.`;
};

function Shell({ page, setPage, children }) {
  const links = [
    ['home', 'Home'],
    ['recipes', 'Recipes'],
    ['pricing', 'Pricing'],
    ['desk', 'Open the desk']
  ];
  return (
    <>
      <header className="top">
        <button className="brand" onClick={() => setPage('home')}>GigaLab<i>Pro</i> Desk</button>
        <nav>
          {links.map(([id, label]) => (
            <button key={id} className={page === id ? 'is-on' : undefined} onClick={() => setPage(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>
      {children}
      <footer className="site">
        {links.map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)}>{label}</button>
        ))}
        <span>Proposal · {PRICE}</span>
      </footer>
    </>
  );
}

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <p className="kicker">A desk for client work</p>
        <h1>Send the work. Then get paid.</h1>
        <p className="lede">
          GigaLabPro Desk keeps the proposal, the invoice, and the follow-up in one place.
          It also rewrites a draft, turns finished work into three posts, and makes a five-step week plan.
          Pro is {PRICE}.
        </p>
        <div className="row">
          <button className="solid" onClick={() => setPage('desk')}>Try the desk</button>
          <button className="ghost" onClick={() => setPage('pricing')}>Why $20</button>
        </div>
        <div className="stage">
          <aside>
            <p>Today</p>
            <button>Proposal</button>
            <button>Invoice</button>
            <button>Follow-up</button>
            <button>Week plan</button>
          </aside>
          <article>
            <h2>Northwind Cafe</h2>
            <p>
              One-page site, menu, and a contact form. Two weeks. $1,800.
              The desk writes the proposal with that price already in it, then the email that asks for a yes.
            </p>
          </article>
        </div>
      </section>
      <section className="band">
        <h2>What people keep paying for, in one subscription.</h2>
        <div className="grid">
          <article className="card">
            <h3>Start from a recipe</h3>
            <p>You do not face an empty chat box. Each job has a shape: proposal, invoice, email, rewrite, posts, meeting notes, or a week plan.</p>
          </article>
          <article className="card">
            <h3>Your business stays put</h3>
            <p>Name, client, rate, and tone are filled once. The next draft starts from them instead of from scratch.</p>
          </article>
          <article className="card">
            <h3>You still edit</h3>
            <p>The draft is yours to change, then copy. Nothing is sent until you decide it is ready.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function Recipes({ setPage }) {
  return (
    <main className="page">
      <p className="kicker">Seven recipes</p>
      <h1>The jobs worth opening every week.</h1>
      <p className="lede">Each one is a page in the desk. Pick it, add the facts, and edit the result.</p>
      <div className="recipes" style={{ marginTop: 28 }}>
        {RECIPES.map((recipe) => (
          <button key={recipe.id} onClick={() => setPage('desk')}>
            <h3>{recipe.name}</h3>
            <p>{recipe.blurb}</p>
          </button>
        ))}
      </div>
    </main>
  );
}

function Pricing({ setPage }) {
  return (
    <main className="page">
      <p className="kicker">Pricing</p>
      <h1>One price. The whole desk.</h1>
      <p className="lede">Free lets you try the flow. Pro is {PRICE} when the desk becomes how you send client work.</p>
      <div className="prices" style={{ marginTop: 28 }}>
        <article>
          <h2>Free</h2>
          <strong>$0</strong>
          <ul>
            <li>All seven recipes</li>
            <li>Two drafts a day</li>
            <li>Copy what you write</li>
          </ul>
          <button className="line" onClick={() => setPage('desk')}>Try the desk</button>
        </article>
        <article className="pro">
          <h2>Pro</h2>
          <strong>{PRICE}</strong>
          <ul>
            <li>Business name, rate, and tone remembered</li>
            <li>300 drafts a day</li>
            <li>Saved clients and saved drafts</li>
            <li>The proposal, the invoice, and the follow-up together</li>
          </ul>
          <button className="solid" onClick={() => setPage('desk')}>Open the desk</button>
        </article>
      </div>
    </main>
  );
}

function Desk() {
  const [recipe, setRecipe] = useState('proposal');
  const [form, setForm] = useState({
    business: 'Northwind Studio',
    client: 'Northwind Cafe',
    rate: '$1,800',
    tone: 'Warm and direct',
    job: 'A one-page site with the menu and a contact form, ready in two weeks.'
  });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const current = RECIPES.find((item) => item.id === recipe);

  return (
    <div className="desk">
      <aside className="side">
        <p className="kicker">Desk</p>
        {RECIPES.map((item) => (
          <button key={item.id} className={item.id === recipe ? 'is-on' : undefined} onClick={() => setRecipe(item.id)}>
            {item.name}
          </button>
        ))}
      </aside>
      <div className="work">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOutput(draftFor(recipe, form));
            setCopied(false);
          }}
        >
          <p className="kicker">{current.name}</p>
          <p className="note">{current.blurb}</p>
          <label>Business<input value={form.business} onChange={set('business')} /></label>
          <label>Client<input value={form.client} onChange={set('client')} /></label>
          <label>Rate<input value={form.rate} onChange={set('rate')} /></label>
          <label>Tone<input value={form.tone} onChange={set('tone')} /></label>
          <label>
            {recipe === 'rewrite' ? 'Text to rewrite' : recipe === 'meeting' ? 'Rough notes' : 'The job'}
            <textarea value={form.job} onChange={set('job')} />
          </label>
          <button className="solid" type="submit">Write the draft</button>
        </form>
        <section className="paper">
          <div className="tools">
            <button
              className="line"
              type="button"
              onClick={async () => {
                if (!output) return;
                await navigator.clipboard.writeText(output);
                setCopied(true);
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            placeholder="Your draft will land here. Edit it before you copy."
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
          <p className="note">This preview writes from your fields so you can feel the flow. A live model would replace the wording, not the steps.</p>
        </section>
      </div>
    </div>
  );
}

const pageFromLocation = () => window.location.hash.replace(/^#/, '') || 'home';

function App() {
  const [page, setPageState] = useState(pageFromLocation);
  const setPage = (next) => {
    const id = next || 'home';
    if (pageFromLocation() !== id) {
      window.history.pushState({ page: id }, '', `#${id}`);
    }
    setPageState(id);
  };

  React.useEffect(() => {
    const onPop = () => setPageState(pageFromLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  let view = <Home setPage={setPage} />;
  if (page === 'recipes') view = <Recipes setPage={setPage} />;
  if (page === 'pricing') view = <Pricing setPage={setPage} />;
  if (page === 'desk') view = <Desk />;
  return (
    <Shell page={page} setPage={setPage}>
      {view}
    </Shell>
  );
}

createRoot(document.getElementById('root')).render(<App />);
