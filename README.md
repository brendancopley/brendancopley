<img src="assets/readme/banner.svg" alt="Brendan Copley, Principal AI Engineer. Your agent works in a demo. I make it work in production." width="100%">

I am a principal engineer with 12+ years shipping production software, now working on agentic
AI systems: multi-agent architecture, tool and permission design, evaluation pipelines, and
fine-tuning when a local model beats an API call.

Senior AI Software Engineer at **Cisco**. Consulting independently through **RADFAB**.

[brendancopley.com](https://brendancopley.com) · [LinkedIn](https://www.linkedin.com/in/brendancopley) · [Book a call](https://cal.com/radfab)

---

## How I build agents that survive production

Most agent architectures put the model in the data path: it holds a token, calls an API,
reasons over the rows. That is the obvious design, and it is the one that fails an enterprise
security review.

Invert it. The model does not call anything. It **emits a structured intent** and the platform
decides whether to execute it.

<img src="portfolio/public/projects/diagram-cisco.svg" alt="Orchestration diagram. A request is classified by a routing layer and dispatched to domain-specialised agents. Those agents emit validated calls rather than making them. The platform validates, authorises against a least-privilege scope, logs, and only then reaches the approved Workday and Finance endpoints. The model sits outside the credential boundary." width="100%">

The model still reasons over the data. It never holds the credential, never builds the
request, and never reaches an endpoint nobody approved. You get an audit trail from your own
code rather than from a model's account of what it thinks it did, and a prompt injection can
at worst ask for something the caller was already allowed to ask for.

This is the shape of the workforce-planning platform I architected at Cisco: roughly 2M
records in under five seconds, a multi-day planning cycle reduced to hours, on OpenShift and
Kubernetes.

---

## How I know it is working

An agent that cannot be measured cannot be improved, only fiddled with. Someone adjusts a
prompt, it looks better on the three examples anyone remembers, and something else silently
regresses.

<img src="portfolio/public/projects/diagram-renaissance.svg" alt="Evaluation pipeline diagram. A domain corpus feeds synthetic data generation, which fine-tunes Qwen 2.5 with LoRA on MLX. A held-out eval set is graded blind, results loop back into fine-tuning as reinforcement learning, and a release gate holds the accuracy and hallucination thresholds." width="100%">

This is the pipeline behind the content-moderation agent at Renaissance Learning: synthetic
data for the edge cases the corpus lacks, a held-out eval set that is never trained on, blind
grading, and a release gate rather than a judgement call. It reached 100% on the moderation
filter and under 1% hallucination on domain tasks, then went out across every production
agent on a platform serving 44 million students daily.

---

## Selected work

<table>
<tr>
<td width="50%" valign="top">

<a href="https://www.linkedin.com/in/brendancopley"><img src="portfolio/public/projects/cisco-wwai.webp" alt="Illustrative image for the Cisco WWAI multi-agent platform" width="100%"></a>

**Cisco WWAI Multi-Agent Platform**
LangGraph routing layer dispatching to domain-specialised agents, each with least-privilege
access to approved REST endpoints. ~2M records in under 5s.

</td>
<td width="50%" valign="top">

<a href="https://www.linkedin.com/in/brendancopley"><img src="portfolio/public/projects/moderation-agent.webp" alt="Illustrative image for the Renaissance Learning content moderation agent" width="100%"></a>

**Content Moderation Agent, Renaissance Learning**
Locally fine-tuned Qwen 2.5 in NestJS, with synthetic data, RL from eval results and blind
grading. 100% on the moderation filter, under 1% hallucination. 44M students daily.

</td>
</tr>
<tr>
<td width="50%" valign="top">

<a href="https://github.com/brendancopley/mcp-chain-of-draft-prompt-tool"><img src="portfolio/public/projects/shot-mcp-repo.webp" alt="Screenshot of the mcp-chain-of-draft-prompt-tool repository on GitHub" width="100%"></a>

**MCP Chain of Draft**
Chain-of-Draft prompting delivered as a Model Context Protocol server, usable with whichever
model you bring. My most-starred repository, adopted by 30+ engineers.

</td>
<td width="50%" valign="top">

<a href="https://blockbrainpuzzle.com"><img src="portfolio/public/projects/shot-block-brain-puzzle.webp" alt="Screenshot of Block Brain Puzzle mid-game, with seven dice setting the blocker positions on a six by six board" width="100%"></a>

**Block Brain Puzzle**
62,208 valid boards from a seven-dice roll, with a solver validating every generated board is
actually solvable. Final project for CS50 at Harvard; scored 100.

</td>
</tr>
<tr>
<td width="50%" valign="top">

<a href="https://jeremywalkerportfolio.com/work/Fallout-CCXP"><img src="portfolio/public/projects/shot-fallout-ccxp.webp" alt="Screenshot of the Fallout CCXP activation, a Vault-Tec terminal screen built for the CCXP Brazil launch" width="100%"></a>

**Fallout at CCXP**
On-prem LibSQL leaderboard game for the Fallout TV launch with Amazon Prime Video and
Bethesda. 5,000+ players across CCXP Brazil and Mexico City.

</td>
<td width="50%" valign="top">

<a href="https://www.ethika.com"><img src="portfolio/public/projects/shot-ethika.webp" alt="Screenshot of the ethika.com storefront" width="100%"></a>

**Ethika**
Orders and shipping refactored onto AWS Lambda and API Gateway, storefront moved to a Vue SPA
on S3 and CloudFront, with CI/CD and Cypress end-to-end tests behind it.

</td>
</tr>
</table>

---

## Work with me

I take AI systems from prototype to production. If you have an agent that works in a demo and
needs to survive real data, real permissions and real volume, that is the work I do.

<a href="https://cal.com/radfab"><img src="assets/readme/cta-book-a-call.svg" alt="Book a call" width="200"></a>

---

## Currently

- Senior AI Software Engineer at **Cisco**
- Consulting independently through **RADFAB**
- Speaker at the **OC AI Tinkerers Guild**, Chapman University
- Reading for a **BLA in Computer Science, Harvard Extension School**

<details>
<summary><b>Full career</b></summary>

<br>

| | | |
|---|---|---|
| **Cisco** | Senior AI Software Engineer | Jun 2025 - Present |
| **RADFAB** | AI Software Engineer Consultant | Mar 2015 - Present |
| **Renaissance Learning** | Senior Software Engineer | May 2023 - May 2025 |
| **Ethika** | Senior Web Developer, DevOps | Apr 2018 - May 2023 |
| **Utelogy** | Lead Software Developer | Nov 2016 - Apr 2018 |
| **TRAFFIK** | Web Developer | Sep 2016 - Nov 2016 |
| **Young Company** | Programmer & Web Designer | Jun 2016 - Sep 2016 |
| **AKUA Mind & Body** | Programmer, Web Designer & SEO Manager | Jan 2016 - Jun 2016 |
| **Independent** | Freelance Web Developer | Sep 2009 - Jun 2016 |

Full write-ups, with the situation and the result for each, are on
[brendancopley.com](https://brendancopley.com).

</details>

<details>
<summary><b>Stack</b></summary>

<br>

**Agents and models** LangGraph · LangChain · LangSmith · Model Context Protocol · MLX · LoRA and QLoRA fine-tuning · evaluation pipelines

**Languages** Python · TypeScript · C# · PHP

**Platform** Kubernetes · OpenShift · AWS · Azure · Docker · Kafka · NestJS · Nuxt and Vue

</details>

<details>
<summary><b>GitHub stats</b></summary>

<br>

> These cards are rendered by a third-party service and are sometimes unavailable.

<img src="https://github-readme-stats.vercel.app/api?username=brendancopley&show_icons=true&hide_border=true&theme=dark&bg_color=0B0B0D&title_color=F0A07A&icon_color=D9541E&text_color=FFFFFF" alt="GitHub stats for brendancopley" width="48%">
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=brendancopley&layout=compact&hide_border=true&theme=dark&bg_color=0B0B0D&title_color=F0A07A&text_color=FFFFFF" alt="Most used languages" width="42%">

</details>
