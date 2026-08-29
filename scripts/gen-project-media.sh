#!/bin/bash
# Submits the project still images to Higgsfield. Async: this writes slug<TAB>jobId to
# content/higgsfield/projects/jobs.tsv; scripts/fetch-higgsfield-jobs.mjs collects them.
#
# The shared clause below is the brand. Every prompt carries it verbatim so the set reads
# as one world. The negatives are the whole differentiation: the glowing brain, the
# humanoid robot, the circuit-board metaphor and the neon cyberpunk grid ARE the visual
# cliche of AI consulting, and avoiding them is most of what makes this look credible.
cd "$(dirname "$0")/.."
mkdir -p content/higgsfield/projects

SHARED="Dark, restrained documentary engineering photography. Low-key lighting, deep near-black background, a single warm practical light source, shallow depth of field, muted desaturated palette with one warm amber accent, real hardware and real workspaces, 35mm look with natural grain, unstaged. Negative: no readable text, no legible code, no logos, no watermark, no brand marks, no glowing blue brain, no humanoid robot, no android, no circuit-board metaphor, no neon cyberpunk grid, no floating holograms, no identifiable faces, no stock-photo smiles, no copyrighted characters or franchise imagery."

gen(){ local slug="$1" prompt="$2" n=0 id=""
  while [ $n -lt 5 ]; do
    id=$(higgsfield generate create gpt_image_2 --prompt "$prompt $SHARED" \
         --aspect-ratio 16:9 --quality high --resolution 2k --json 2>/dev/null | tr -d '[]" \n')
    case "$id" in *-*-*-*-*) break;; esac
    n=$((n+1)); echo "  retry $n $slug"; sleep 10
  done
  [ -n "$id" ] && { printf '%s\t%s\n' "$slug" "$id" >> content/higgsfield/projects/jobs.tsv; echo "OK   $slug -> $id"; } || echo "FAIL $slug"
  # Throttle: the boost-credit bucket caps CONCURRENCY, not request rate.
  sleep 3; }

: > content/higgsfield/projects/jobs.tsv

gen block-brain-puzzle "Overhead view of brightly coloured geometric wooden puzzle blocks and a set of dice scattered on a matte black desk beside a laptop closed shut, one warm lamp raking across from the left, pieces casting long shadows."
gen mcp-chain-of-draft "A single terminal window glowing on a dark monitor in an otherwise unlit room, hands resting on a mechanical keyboard, the screen content abstract and out of focus, warm desk lamp behind."
gen cisco-wwai "A long aisle between server cabinets in a dark data centre, orderly bundled cabling in disciplined runs, small amber status LEDs receding into depth, one maintenance light overhead."
gen moderation-agent "A quiet review workstation at night: several small matte monitors arranged in a shallow arc, screens deliberately blurred and abstract, a notebook and pen beside the keyboard, warm lamp from camera-left."
gen carparts "A distribution warehouse at night, a conveyor line of unlabelled cardboard cartons receding into darkness, steel racking towering above, one sodium work light."
gen utelogy "A dark control room with a wall of dozens of matte monitors tiled into one large display, screens abstract and softly out of focus, an empty operator chair in the foreground."
gen fallout-ccxp "A convention hall exhibition floor late at night after closing, an empty custom-built game kiosk with an unbranded arcade cabinet, crowd barriers and cable runs, ambient amber light."
gen sisu "A film post-production suite at night: a colour-grading desk with control surfaces and trackballs, a large reference monitor showing an abstract dark frame, warm bias light behind."

echo "SUBMITTED: $(wc -l < content/higgsfield/projects/jobs.tsv) jobs"
